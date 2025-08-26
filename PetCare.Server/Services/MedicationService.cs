using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;
namespace PetCare.Server.Services;

public class MedicationService : IMedicationService
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

    public async Task<IEnumerable<UserMedsDTO>> GetAllMeds(string ownerId)
    {
        var animalMeds = await context.Medications
            .Include(m => m.Animal)
            .Include(m => m.MedicationLogs)
            .Where(m => m.Animal.OwnerId == ownerId)
            .ToListAsync();

        return mapper.Map<IEnumerable<UserMedsDTO>>(animalMeds);
    }

    public async Task<MedicationDTO> AddMedication(MedicationDTO medicationDto)
    {
        var medication = mapper.Map<Medication>(medicationDto);
        context.Medications.Add(medication);
        await context.SaveChangesAsync();
        return mapper.Map<MedicationDTO>(medication);
    }
}
