namespace PetCare.Server.Models;

public class AppointmentDTO
{
    public int Id { get; set; }
    public int AnimalId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }

}
