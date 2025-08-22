using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services;

public interface IAnimalService
{
    Task<IEnumerable<AnimalDTO>> GetUserAnimals(string ownerId);
}
