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

    public async Task<IEnumerable<UserMedsDTO>> GetAnimalMeds(int animalId, string userId)
    {
        var animal = await context.Animals
            .FirstOrDefaultAsync(a => a.Id == animalId && a.OwnerId == userId);
        if (animal == null)
            throw new UnauthorizedAccessException("You don't have permission to view medications for this animal.");

        var today = DateOnly.FromDateTime(DateTime.Now);
        var animalMeds = await context.Medications
            .Include(m => m.Animal)
            .Include(m => m.MedicationLogs)
            .Where(m => m.AnimalId == animalId && (m.EndDate == null || m.EndDate >= today))
            .ToListAsync();
        return mapper.Map<IEnumerable<UserMedsDTO>>(animalMeds);
    }

    public async Task<IEnumerable<UserMedsDTO>> GetAllMeds(string ownerId)
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var animalMeds = await context.Medications
            .Include(m => m.Animal)
            .Include(m => m.MedicationLogs)
            .Where(m => m.Animal.OwnerId == ownerId && (m.EndDate == null || m.EndDate >= today))
            .ToListAsync();

        return mapper.Map<IEnumerable<UserMedsDTO>>(animalMeds);
    }

    public async Task<MedicationDTO> AddMedication(MedicationDTO medicationDto, string userId)
    {
        var animal = await context.Animals
            .FirstOrDefaultAsync(a => a.Id == medicationDto.AnimalId && a.OwnerId == userId);
        if (animal == null)
            throw new UnauthorizedAccessException("You don't have permission to add medications for this animal.");

        var medication = mapper.Map<Medication>(medicationDto);
        context.Medications.Add(medication);
        await context.SaveChangesAsync();
        return mapper.Map<MedicationDTO>(medication);
    }

    public async Task<bool> DeleteMedication(int medicationId, string userId)
    {
        var medication = await context.Medications
            .Include(m => m.Animal)
            .FirstOrDefaultAsync(m => m.Id == medicationId && m.Animal.OwnerId == userId);
        if (medication == null)
            return false;

        context.Medications.Remove(medication);
        await context.SaveChangesAsync();
        return true;
    }
}
