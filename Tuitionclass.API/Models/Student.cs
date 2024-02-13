using System.ComponentModel.DataAnnotations;

namespace Tuitionclass.API.Models
{
    public class Student
    {
        public Guid ID { get; set; }

        [Required (ErrorMessage = "FirstName is required")]
        [StringLength(20)]
        [Display(Name = "First Name")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        [StringLength(20)]
        [Display(Name = "Last Name")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        [StringLength(255)]
        [Display(Name = "Email")]
        public string? Email { get; set; }

        [Required (ErrorMessage = "Mobile is required")]
        [StringLength(10)]
        [Display(Name = "Mobile")]
        public string? Mobile { get; set; }
        [Required(ErrorMessage = "DOB is required")]

        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime? DOB { get; set; }
        [Required(ErrorMessage = "Gender is required")]

        [StringLength(10)]
        public string? Gender { get; set; }

        [StringLength(255)]
        [Display(Name = "Profile Image")]
        public string? ProfileImage { get; set; }

    }
}
