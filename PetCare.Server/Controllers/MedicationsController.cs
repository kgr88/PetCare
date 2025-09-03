using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MedicationsController : ControllerBase
{
    private readonly IMedicationService medicationService;
    public MedicationsController(IMedicationService medicationService)
    {
        this.medicationService = medicationService;
    }

    [HttpGet]
    [Route("{animalId:int}")]
    public async Task<ActionResult> GetAnimalMeds(int animalId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        try
        {
            var animalMeds = await medicationService.GetAnimalMeds(animalId, userId);
            return Ok(animalMeds);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult> GetAllMeds()
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var animalMeds = await medicationService.GetAllMeds(userId);
        return Ok(animalMeds);
    }

    [HttpPost]
    public async Task<ActionResult> AddMedication([FromBody] MedicationDTO medicationDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        try
        {
            var medication = await medicationService.AddMedication(medicationDto, userId);
            return CreatedAtAction(nameof(GetAnimalMeds), new { animalId = medication.AnimalId }, medication);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpDelete]
    [Route("{medicationId:int}")]
    public async Task<ActionResult> DeleteMedication(int medicationId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var deleted = await medicationService.DeleteMedication(medicationId, userId);
        if (!deleted)
            return NotFound("Medication not found or you don't have permission to delete it");

        return NoContent();
    }
}
