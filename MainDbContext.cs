using $safeprojectname$.DataModels;
using Microsoft.EntityFrameworkCore;

namespace $safeprojectname$
{
    public partial class MainDbContext : DbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
        }

        public virtual DbSet<UserDataModel> Users { get; set; }
    }
}