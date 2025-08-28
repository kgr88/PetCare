using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces;

public interface IWeightLogService
{
    Task<WeightLogDTO> AddWeightLog(CreateWeightLogDTO dto);
    Task<IEnumerable<WeightLogDTO>> GetAnimalWeightLogs(int animalId);
}
