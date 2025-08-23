using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AnimalsController : Controller
{
    private readonly IAnimalService animalService;
    public AnimalsController(IAnimalService animalService)
    {
        this.animalService = animalService;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Animal>>> GetAnimals()
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        var animals = await animalService.GetUserAnimals(userId);
        return Ok(animals);
    }

    [HttpPost]
    public async Task<ActionResult> AddAnimal([FromBody] AnimalDTO animalDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        try
        {
            var animal = await animalService.AddAnimal(animalDto, userId);
            return CreatedAtAction(nameof(GetAnimals), new { id = animal.Id }, animal);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("{animalId:int}")]
    public async Task<ActionResult> GetAnimalDetails(int animalId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        var animalDetails = await animalService.GetAnimalDetails(animalId);
        if (animalDetails == null)
            return NotFound();
        return Ok(animalDetails);
    }
}
