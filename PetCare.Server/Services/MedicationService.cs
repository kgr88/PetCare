using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services;

public class MedicationService
{
    private readonly AppDbContext context;
    public MedicationService(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<MedicationDTO>> GetAnimalMeds(int animalId)
    {
        var animalMeds = await context.Medications
            .Where(m => m.AnimalId == animalId)
            .ToListAsync();
        return animalMeds.Select(m => new MedicationDTO
        {
            AnimalId = m.AnimalId,
            Name = m.Name,
            Dosage = m.Dosage,
            Instructions = m.Instructions,
            StartDate = m.StartDate,
            EndDate = m.EndDate,
            Type = m.Type,
            FrequencyType = m.FrequencyType,
            Frequency = m.Frequency
        });
    }

    public async Task<Medication> AddMedication(MedicationDTO medicationDto)
    {
        var medication = new Medication
        {
            AnimalId = medicationDto.AnimalId,
            Name = medicationDto.Name,
            Dosage = medicationDto.Dosage,
            Instructions = medicationDto.Instructions,
            StartDate = medicationDto.StartDate,
            EndDate = medicationDto.EndDate,
            Type = medicationDto.Type,
            FrequencyType = medicationDto.FrequencyType,
            Frequency = medicationDto.Frequency
        };
        context.Medications.Add(medication);
        await context.SaveChangesAsync();
        return medication;
    }
}
