using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models;
using PetCare.Server.Services;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AnimalsController : Controller
{
    private readonly AnimalService animalService;
    public AnimalsController(AnimalService animalService)
    {
        this.animalService = animalService;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Animal>>> GetAnimals()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();
        var animals = await animalService.GetUserAnimals(userId);
        return Ok(animals);
    }
}
