using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;

namespace PetCare.Server.Controllers;

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
        var result = await service.AddWeightLog(dto);
        return CreatedAtAction(nameof(GetWeightLogsForAnimal), new { animalId = result.AnimalId }, result);
    }

    [HttpGet("{animalId:int}")]
    public async Task<ActionResult<IEnumerable<WeightLogDTO>>> GetWeightLogsForAnimal(int animalId)
    {
        var logs = await service.GetAnimalWeightLogs(animalId);
        return Ok(logs);
    }
}
