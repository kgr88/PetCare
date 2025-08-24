using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces
{
    public interface IMedicationLogService
    {
        Task<IEnumerable<MedicationLogDTO>> GetLogs(int medicationId);
        Task<MedicationLogDTO> AddLog(MedicationLogDTO logDto);
    }
}
