using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services;

public interface IAnimalService
{
    Task<IEnumerable<AnimalDTO>> GetUserAnimals(string ownerId);
    Task<Animal> AddAnimal(AnimalDTO animalDto, string ownerId);
    Task<AnimalDTO?> GetAnimalDetails(int animalId);
}
