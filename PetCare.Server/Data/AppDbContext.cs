namespace PetCare.Server.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Models;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<Animal> Animals { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ApplicationUser>()
            .HasMany(e => e.Animals)
            .WithOne()
            .HasForeignKey(e => e.OwnerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Animal>()
            .Property(a => a.Name)
            .IsRequired()
            .HasMaxLength(50);

        builder.Entity<Animal>()
            .Property(a => a.Species)
            .IsRequired()
            .HasMaxLength(50);

        builder.Entity<Animal>()
            .Property(a => a.Breed)
            .HasMaxLength(50);
        
        builder.Entity<Animal>()
            .Property(a => a.MicrochipId)
            .HasMaxLength(15)
            .IsRequired(false);

        builder.Entity<Animal>()
            .Property(a => a.OwnerId)
            .IsRequired();
    }
}