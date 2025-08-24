using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MedicationLogsController : ControllerBase
{
    private readonly MedicationLogService medicationLogService;
    public MedicationLogsController(MedicationLogService medicationLogService)
    {
        this.medicationLogService = medicationLogService;
    }
    [HttpGet]
    [Route("{medicationId:int}")]
    public async Task<ActionResult> GetLogs(int medicationId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var logs = await medicationLogService.GetLogs(medicationId);
        return Ok(logs);
    }

    [HttpPost]
    public async Task<ActionResult> AddMedicationLog([FromBody] MedicationLogDTO logDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        var log = await medicationLogService.AddLog(logDto);
        return CreatedAtAction(nameof(GetLogs), new { medicationId = log.MedicationId }, log);
    }
}
