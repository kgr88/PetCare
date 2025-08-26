using PetCare.Server.Models;

namespace PetCare.Server.Services.Interfaces;

public interface IAppointmentService
{
    Task<IEnumerable<UserAppointmentsDTO>> GetAppointments(string userId);
    
}
