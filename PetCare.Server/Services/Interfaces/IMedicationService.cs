using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces
{
    public interface IMedicationService
    {
        Task<IEnumerable<UserMedsDTO>> GetAnimalMeds(int animalId, string userId);
        Task<IEnumerable<UserMedsDTO>> GetAllMeds(string ownerId);
        Task<MedicationDTO> AddMedication(MedicationDTO medicationDto, string userId);
        Task<bool> DeleteMedication(int medicationId, string userId);
    }
}
