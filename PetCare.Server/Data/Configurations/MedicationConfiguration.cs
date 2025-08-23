using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetCare.Server.Models;

namespace PetCare.Server.Data.Configurations;

public class MedicationConfiguration : IEntityTypeConfiguration<Medication>
{
    public void Configure(EntityTypeBuilder<Medication> builder)
    {
        builder.Property(m => m.Name)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(m => m.Dosage)
            .HasMaxLength(50);

        builder.Property(m => m.Instructions)
            .HasMaxLength(500);

        builder.Property(m => m.Type)
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(m => m.FrequencyType)
            .HasMaxLength(5);

    }
}
