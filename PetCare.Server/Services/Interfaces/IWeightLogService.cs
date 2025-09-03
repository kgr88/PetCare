using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces;

public interface IWeightLogService
{
    Task<WeightLogDTO> AddWeightLog(CreateWeightLogDTO dto, string userId);
    Task<IEnumerable<WeightLogDTO>> GetAnimalWeightLogs(int animalId, string userId);
}
