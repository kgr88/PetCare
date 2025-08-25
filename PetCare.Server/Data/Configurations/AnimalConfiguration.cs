using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetCare.Server.Models;

namespace PetCare.Server.Data.Configurations;

public class AnimalConfiguration : IEntityTypeConfiguration<Animal>
{
    public void Configure(EntityTypeBuilder<Animal> builder)
    {
        builder.Property(a => a.Name)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(a => a.Species)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(a => a.Breed)
            .HasMaxLength(50);

        builder.Property(a => a.MicrochipId)
            .HasMaxLength(15)
            .IsRequired(false);

        builder.Property(a => a.OwnerId)
            .IsRequired();

        builder.HasOne(a => a.Owner)
            .WithMany(u => u.Animals)
            .HasForeignKey(a => a.OwnerId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
