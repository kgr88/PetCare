using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;

namespace PetCare.Server.Services;

public class WeightLogService : IWeightLogService
{
    private readonly AppDbContext context;
    private readonly IMapper mapper;

    public WeightLogService(AppDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<WeightLogDTO> AddWeightLog(CreateWeightLogDTO dto, string userId)
    {
        var animal = await context.Animals
            .FirstOrDefaultAsync(a => a.Id == dto.AnimalId && a.OwnerId == userId);
        if (animal == null)
            throw new UnauthorizedAccessException("You don't have permission to add weight logs for this animal.");

        var log = mapper.Map<WeightLog>(dto);
        context.WeightLogs.Add(log);
        await context.SaveChangesAsync();
        return mapper.Map<WeightLogDTO>(log);
    }

    public async Task<IEnumerable<WeightLogDTO>> GetAnimalWeightLogs(int animalId, string userId)
    {
        var animal = await context.Animals
            .FirstOrDefaultAsync(a => a.Id == animalId && a.OwnerId == userId);
        if (animal == null)
            throw new UnauthorizedAccessException("You don't have permission to view weight logs for this animal.");

        var logs = await context.WeightLogs
            .Where(w => w.AnimalId == animalId)
            .OrderBy(w => w.Date)
            .ToListAsync();
        return mapper.Map<IEnumerable<WeightLogDTO>>(logs);
    }
}
