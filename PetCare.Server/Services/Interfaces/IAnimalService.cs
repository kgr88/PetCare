using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces;

public interface IAnimalService
{
    Task<IEnumerable<AnimalDTO>> GetUserAnimals(string ownerId);
    Task<AnimalDTO> AddAnimal(AnimalDTO animalDto, string ownerId);
    Task<AnimalDTO?> GetAnimalDetails(int animalId);
}
