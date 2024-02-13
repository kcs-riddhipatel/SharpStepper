using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Tuitionclass.API.Models;
using Tuitionclass.API.Data;

namespace Tuitionclass.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class StudentController : ControllerBase
    {
        private readonly TuitionclassDBContext _dbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public StudentController(TuitionclassDBContext dbContext, IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _webHostEnvironment = webHostEnvironment;
        }
       
        [HttpGet("GetAllStudents")]
        public async Task<IActionResult> GetAllStudents([FromQuery] int page = 1)
        {
            try
            {
                int pageSize = 5;
                int skip = (page - 1) * pageSize;
                var students = await _dbContext.Student
                    .OrderBy(s => s.ID) 
                    .Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();

                int totalStudents = await _dbContext.Student.CountAsync();

                int totalPages = (int)Math.Ceiling((double)totalStudents / pageSize);

                var result = new
                {
                    Students = students,
                    TotalPages = totalPages
                };

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent([FromForm] Student studentForm)
        {
            var _uploadfiles = Request.Form.Files;
            foreach (IFormFile source in _uploadfiles)
            {
                string Filename = source.FileName;
                string FilePath = GetFilePath(Filename);               
                if (System.IO.File.Exists(FilePath))
                {
                    System.IO.File.Delete(FilePath);
                }
                using (FileStream stream = System.IO.File.Create(FilePath))
                {
                    await source.CopyToAsync(stream);
                }
                studentForm.ProfileImage = FilePath;
            }
            await _dbContext.Student.AddAsync(studentForm);
            await _dbContext.SaveChangesAsync();
            
            return Ok(studentForm);
        }

        [NonAction]
        private string GetFilePath(string imagename)
        {
            return this._webHostEnvironment.WebRootPath + "\\Uploads\\Student\\" + imagename;
        }

        [HttpGet("GetImage")]
        public IActionResult GetImage(string imageName)
        {
            imageName = imageName.Replace('\\', '/');          

            if (System.IO.File.Exists(imageName))
            {
                var imageBytes = System.IO.File.ReadAllBytes(imageName);
                return File(imageBytes, "image/png");
            }

            return NotFound();
        } 

        [HttpGet("GetStudent")]
        public async Task<IActionResult> GetStudent([FromQuery] Guid id)
        {
            var student = await _dbContext.Student.FirstOrDefaultAsync(x => x.ID == id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPut("UpdateStudent")]
        public async Task<IActionResult> UpdateStudent([FromForm] Student updateStudentRequest)
        {
            var student = await _dbContext.Student.FindAsync(updateStudentRequest.ID);
            if (student == null)
            {
                return NotFound();
            }
            string existingImagePath = student.ProfileImage;
            // Update student data
            student.FirstName = updateStudentRequest.FirstName;
            student.LastName = updateStudentRequest.LastName;
            student.Email = updateStudentRequest.Email;
            student.Mobile = updateStudentRequest.Mobile;
            student.DOB = updateStudentRequest.DOB;
            student.Gender = updateStudentRequest.Gender;

            // Check if a new image is provided
            var _uploadfiles = Request.Form.Files;
            if (_uploadfiles != null)
            {
                // Delete the existing image file
                if (!string.IsNullOrEmpty(existingImagePath) && System.IO.File.Exists(existingImagePath))
                {
                    System.IO.File.Delete(existingImagePath);
                }
                // Save the new image file to the server
                foreach (IFormFile source in _uploadfiles)
                {
                    string Filename = source.FileName;
                    string newImagePath = GetFilePath(Filename);
                    using (FileStream stream = System.IO.File.Create(newImagePath))
                    {
                        await source.CopyToAsync(stream);
                    }
                    student.ProfileImage = newImagePath;
                }
            }
            await _dbContext.SaveChangesAsync();         
            return Ok(student);
        }

        [HttpDelete("DeleteStudent")]
        public async Task<IActionResult> DeleteStudent([FromQuery] Guid id)
        {
            var student = await _dbContext.Student.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            _dbContext.Student.Remove(student);
            await _dbContext.SaveChangesAsync();

            return Ok(student);
        }
    }
}

