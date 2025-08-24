using AutoMapper;
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
    private readonly IMapper mapper;

    public AnimalService(AppDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<AnimalDTO>> GetUserAnimals(string ownerId)
    {
        var animals = await context.Animals
            .Where(a => a.OwnerId == ownerId)
            .ToListAsync();

        return animals.Select(a => mapper.Map<AnimalDTO>(a));
    }

    public async Task<AnimalDTO> AddAnimal(AnimalDTO animalDto, string ownerId)
    {
        var animal = mapper.Map<Animal>(animalDto);
        animal.OwnerId = ownerId;

        context.Animals.Add(animal);
        await context.SaveChangesAsync();
        return mapper.Map<AnimalDTO>(animal);
    }

    public async Task<AnimalDTO?> GetAnimalDetails(int animalId)
    {
        var animalDetails = await context.Animals
            .Where(a => a.Id == animalId)
            .SingleOrDefaultAsync();

        if (animalDetails == null)
            return null;

        return mapper.Map<AnimalDTO>(animalDetails);
    }

}
