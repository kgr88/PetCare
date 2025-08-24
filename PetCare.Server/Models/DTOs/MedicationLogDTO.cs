namespace PetCare.Server.Models.DTOs;

public class MedicationLogDTO
{
    public int? Id { get; set; }
    public int MedicationId { get; set; }
    public DateTime TimeTaken { get; set; }
}
