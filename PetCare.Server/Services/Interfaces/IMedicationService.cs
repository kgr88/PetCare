using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces
{
    public interface IMedicationService
    {
        Task<IEnumerable<MedicationDTO>> GetAnimalMeds(int id);
        Task<MedicationDTO> AddMedication(MedicationDTO medicationDto);
    }
}
