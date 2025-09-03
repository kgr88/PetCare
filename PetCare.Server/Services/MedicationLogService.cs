using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;
namespace PetCare.Server.Services;

public class MedicationLogService : IMedicationLogService
{
    private readonly AppDbContext context;
    private readonly IMapper mapper;
    public MedicationLogService(AppDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<MedicationLogDTO>> GetLogs(int medicationId, string userId)
    {
        var medication = await context.Medications
            .Include(m => m.Animal)
            .FirstOrDefaultAsync(m => m.Id == medicationId && m.Animal.OwnerId == userId);
        if (medication == null)
            throw new UnauthorizedAccessException("You don't have permission to view logs for this medication.");
        
        var logs = await context.MedicationLogs
            .Where(m => m.MedicationId == medicationId)
            .ToListAsync();

        return mapper.Map<IEnumerable<MedicationLogDTO>>(logs);
    }

    public async Task<MedicationLogDTO> AddLog(MedicationLogDTO logDto, string userId)
    {
        var medication = await context.Medications
            .Include(m => m.Animal)
            .FirstOrDefaultAsync(m => m.Id == logDto.MedicationId && m.Animal.OwnerId == userId);
        if (medication == null)
            throw new UnauthorizedAccessException("You don't have permission to add logs for this medication.");

        var log = mapper.Map<MedicationLog>(logDto);
        context.MedicationLogs.Add(log);
        await context.SaveChangesAsync();
        return mapper.Map<MedicationLogDTO>(log);
    }
}
