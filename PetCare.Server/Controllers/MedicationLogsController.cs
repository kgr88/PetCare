using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services;
using PetCare.Server.Services.Interfaces;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MedicationLogsController : ControllerBase
{
    private readonly IMedicationLogService medicationLogService;
    public MedicationLogsController(IMedicationLogService medicationLogService)
    {
        this.medicationLogService = medicationLogService;
    }
    [HttpGet]
    [Route("{medicationId:int}")]
    public async Task<ActionResult> GetLogs(int medicationId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        try
        {
            var logs = await medicationLogService.GetLogs(medicationId, userId);
            return Ok(logs);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddMedicationLog([FromBody] MedicationLogDTO logDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        try
        {
            var log = await medicationLogService.AddLog(logDto, userId);
            return CreatedAtAction(nameof(GetLogs), new { medicationId = log.MedicationId }, log);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }
}
