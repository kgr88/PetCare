using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces
{
    public interface IMedicationLogService
    {
        Task<IEnumerable<MedicationLogDTO>> GetLogs(int medicationId, string userId);
        Task<MedicationLogDTO> AddLog(MedicationLogDTO logDto, string userId);
    }
}
