using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Models;
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
        var appointments = await context.Appointments
            .Include(m => m.Animal)
            .Where(a => a.Animal.OwnerId == userId)
            .ToListAsync();

        return mapper.Map<IEnumerable<UserAppointmentsDTO>>(appointments);
    }
}
