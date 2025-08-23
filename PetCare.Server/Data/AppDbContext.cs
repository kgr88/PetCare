namespace PetCare.Server.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data.Configurations;
using PetCare.Server.Models;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<Animal> Animals { get; set; }
    public DbSet<Medication> Medications { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ApplicationUser>()
            .HasMany(e => e.Animals)
            .WithOne()
            .HasForeignKey(e => e.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ApplyConfiguration(new AnimalConfiguration());
        builder.ApplyConfiguration(new MedicationConfiguration());
    }
}