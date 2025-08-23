namespace PetCare.Server.Models;

public class MedicationSchedule
{
    public int Id { get; set; }
    public int MedicationId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? FrequencyType { get; set; }
    public int? Frequency { get; set; }
    public Medication Medication { get; set; } = null!;
    public ICollection<MedicationLog> MedicationLogs { get; } = new List<MedicationLog>();



}
