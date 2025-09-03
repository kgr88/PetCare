using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces;

public interface IAnimalService
{
    Task<IEnumerable<AnimalDTO>> GetUserAnimals(string userId);
    Task<AnimalDTO> AddAnimal(AnimalDTO animalDto, string ownerId);
    Task<AnimalDTO?> GetAnimalDetails(int animalId, string userId);
}
