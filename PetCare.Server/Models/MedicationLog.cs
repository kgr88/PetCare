namespace PetCare.Server.Models;

public class MedicationLog
{
    public int Id { get; set; }
    public int MedicationId { get; set; }
    public DateTime TimeTaken { get; set; }
    public Medication Medication { get; set; } = null!;

}
