using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tuitionclass.API.Models;

namespace Tuitionclass.API.Data
{
    public class TuitionclassDBContext : IdentityDbContext<IdentityUser>
    {
        public TuitionclassDBContext(DbContextOptions options) : base(options) { }
        public DbSet<Student> Student { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
