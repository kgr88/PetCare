using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

    public async Task<Animal> AddAnimal(AnimalDTO animalDto, string ownerId)
    {
        var animal = new Animal
        {
            Id = animalDto.Id,
            Name = animalDto.Name,
            Breed = animalDto.Breed,
            Species = animalDto.Species,
            DateOfBirth = animalDto.DateOfBirth,
            MicrochipId = animalDto.MicrochipId,
            OwnerId = ownerId
        };

        context.Animals.Add(animal);
        await context.SaveChangesAsync();
        return animal;
    }

    public async Task<AnimalDTO?> GetAnimalDetails(int animalId)
    {
        var animalDetails = await context.Animals
            .Where(a => a.Id == animalId)
            .SingleOrDefaultAsync();

        if (animalDetails == null)
            return null;

        return new AnimalDTO
        {
            Id = animalDetails.Id,
            Name = animalDetails.Name,
            Breed = animalDetails.Breed,
            Species = animalDetails.Species,
            DateOfBirth = animalDetails.DateOfBirth,
            MicrochipId = animalDetails.MicrochipId
        };
    }

}
