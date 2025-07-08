using Microsoft.EntityFrameworkCore;
using Mission.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Security;
using System.Text;
using System.Threading.Tasks;

namespace Mission.Entities.context
{
    public class MissionDbContext : DbContext
    {
        public MissionDbContext(DbContextOptions<MissionDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            AppContext.SetSwitch("Npgsql.EnableLegancyTimestampBehavior", true);
            modelBuilder.Entity<User>().HasData(new User()
            {
                Id = 1,
                FirstName = "Parthiv",
                LastName = "Chudasama",
                EmailAddress = "parthivchudasama@gmail.com",
                UserType = "admin",
                Password = "Parthiv@123",
                PhoneNumber = "9512065400",
                CreatedDate = new DateTime(2019, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
