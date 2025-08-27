using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;

namespace PetCare.Server.Services.Interfaces;

public interface IAppointmentService
{
    Task<IEnumerable<UserAppointmentsDTO>> GetAppointments(string userId);
    Task<AppointmentDTO> AddAppointment(AppointmentDTO appointmentDto);
    Task<IEnumerable<AppointmentDTO>> GetAnimalAppointments(int animalId);

}
