using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;
using System.Security.Claims;

namespace PetCare.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class WeightLogsController : ControllerBase
{
    private readonly IWeightLogService service;

    public WeightLogsController(IWeightLogService service)
    {
        this.service = service;
    }

    [HttpPost]
    public async Task<ActionResult<WeightLogDTO>> AddWeightLog([FromBody] CreateWeightLogDTO dto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        try
        {
            var result = await service.AddWeightLog(dto, userId);
            return CreatedAtAction(nameof(GetWeightLogsForAnimal), new { animalId = result.AnimalId }, result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpGet("{animalId:int}")]
    public async Task<ActionResult<IEnumerable<WeightLogDTO>>> GetWeightLogsForAnimal(int animalId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        try
        {
            var logs = await service.GetAnimalWeightLogs(animalId, userId);
            return Ok(logs);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }
}
