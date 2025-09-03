using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services;
using PetCare.Server.Services.Interfaces;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentService appointmentService;
    public AppointmentsController(IAppointmentService appointmentService)
    {
        this.appointmentService = appointmentService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentDTO>>> GetAppointments()
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var appointments = await appointmentService.GetAppointments(userId);
        return Ok(appointments);
    }

    [HttpGet]
    [Route("{animalId:int}")]
    public async Task<ActionResult> GetAnimalAppointments(int animalId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        try
        {
            var animalAppointments = await appointmentService.GetAnimalAppointments(animalId, userId);
            return Ok(animalAppointments);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddAppointment([FromBody] AppointmentDTO appointmentDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        try
        {
            var appointment = await appointmentService.AddAppointment(appointmentDto, userId);
            return CreatedAtAction(nameof(GetAnimalAppointments), new { animalId = appointment.AnimalId }, appointment);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpDelete]
    [Route("{appointmentId:int}")]
    public async Task<ActionResult> DeleteAppointment(int appointmentId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var deleted = await appointmentService.DeleteAppointment(appointmentId, userId);
        if (!deleted)
            return NotFound("Appointment not found or you don't have permission to delete it");

        return NoContent();
    }
}