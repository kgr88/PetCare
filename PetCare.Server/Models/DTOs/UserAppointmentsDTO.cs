namespace PetCare.Server.Models;

public class UserAppointmentsDTO
{
    public int? Id { get; set; }
    public int AnimalId { get; set; }
    public string? AnimalName { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime Date { get; set; }

}
