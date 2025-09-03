using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;
using PetCare.Server.Services.Interfaces;

namespace PetCare.Server.Services;

public class AppointmentService : IAppointmentService
{
    private readonly AppDbContext context;
    private readonly IMapper mapper;

    public AppointmentService(AppDbContext context, IMapper mapper)
    {
        this.context = context;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<UserAppointmentsDTO>> GetAppointments(string userId)
    {
        var today = DateTime.Today;
        var appointments = await context.Appointments
            .Include(m => m.Animal)
            .Where(a => a.Animal.OwnerId == userId && a.Date >= today)
            .OrderBy(a => a.Date)
            .ToListAsync();

        return mapper.Map<IEnumerable<UserAppointmentsDTO>>(appointments);
    }

    public async Task<AppointmentDTO> AddAppointment(AppointmentDTO appointmentDto)
    {
        var appointment = mapper.Map<Appointment>(appointmentDto);
        context.Appointments.Add(appointment);
        await context.SaveChangesAsync();
        return mapper.Map<AppointmentDTO>(appointment);
    }

    public async Task<IEnumerable<AppointmentDTO>> GetAnimalAppointments(int animalId)
    {
        var today = DateTime.Today;
        var animalAppointments = await context.Appointments
            .Where(a => a.AnimalId == animalId && a.Date >= today)
            .OrderBy(a => a.Date )
            .ToListAsync();
        return mapper.Map<IEnumerable<AppointmentDTO>>(animalAppointments);
    }

    public async Task<bool> DeleteAppointment(int appointmentId, string userId)
    {
        var appointment = await context.Appointments
            .Include(a => a.Animal)
            .FirstOrDefaultAsync(a => a.Id == appointmentId && a.Animal.OwnerId == userId);

        if (appointment == null)
            return false;

        context.Appointments.Remove(appointment);
        await context.SaveChangesAsync();
        return true;
    }
}
