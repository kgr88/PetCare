using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MedicationsController : ControllerBase
{
    private readonly MedicationService medicationService;
    public MedicationsController(MedicationService medicationService)
    {
        this.medicationService = medicationService;
    }

    [HttpGet]
    [Route("{animalId:int}")]
    public async Task<ActionResult> GetAnimalMeds(int animalId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        var animalMeds = await medicationService.GetAnimalMeds(animalId);
        return Ok(animalMeds);
    }

    [HttpPost]
    public async Task<ActionResult> AddMedication([FromBody] MedicationDTO medicationDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var medication = await medicationService.AddMedication(medicationDto);
        return CreatedAtAction(nameof(GetAnimalMeds), new { animalId = medication.AnimalId }, medication);
    }
}
