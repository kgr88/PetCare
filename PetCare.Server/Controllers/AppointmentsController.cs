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

        var animalMeds = await appointmentService.GetAnimalAppointments(animalId);
        return Ok(animalMeds);
    }

    [HttpPost]
    public async Task<ActionResult> AddAppointment([FromBody] AppointmentDTO appointmentDto)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();
        var appointment = await appointmentService.AddAppointment(appointmentDto);
        return CreatedAtAction(nameof(GetAnimalAppointments), new { animalId = appointment.AnimalId }, appointment);
    }

}
