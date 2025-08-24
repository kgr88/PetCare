using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services;

public class MedicationService
{
    private readonly AppDbContext context;
    private readonly IMapper mapper;
    public MedicationService(AppDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<MedicationDTO>> GetAnimalMeds(int animalId)
    {
        var animalMeds = await context.Medications
            .Where(m => m.AnimalId == animalId)
            .ToListAsync();
        return mapper.Map<IEnumerable<MedicationDTO>>(animalMeds);
    }

    public async Task<MedicationDTO> AddMedication(MedicationDTO medicationDto)
    {
        var medication = mapper.Map<Medication>(medicationDto);
        context.Medications.Add(medication);
        await context.SaveChangesAsync();
        return mapper.Map<MedicationDTO>(medication);
    }
}
