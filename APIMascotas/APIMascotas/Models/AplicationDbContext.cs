using Microsoft.EntityFrameworkCore;
namespace APIMascotas.Models
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Mascota>Mascotas{get;set;}
    }
}
