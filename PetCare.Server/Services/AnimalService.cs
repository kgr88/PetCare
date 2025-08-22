using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services;

public class AnimalService : IAnimalService
{
    private readonly AppDbContext context;

    public AnimalService(AppDbContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<AnimalDTO>> GetUserAnimals(string ownerId)
    {
        var animals = await context.Animals
            .Where(a => a.OwnerId == ownerId)
            .ToListAsync();

        return animals.Select(a => new AnimalDTO
        {
            Id = a.Id,
            Name = a.Name,
            Breed = a.Breed,
            Species = a.Species,
            DateOfBirth = a.DateOfBirth,
            MicrochipId = a.MicrochipId
        });
    }
}
