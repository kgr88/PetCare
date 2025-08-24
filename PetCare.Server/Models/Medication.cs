namespace PetCare.Server.Models;

public class Medication
{
    public int Id { get; set; }
    public int AnimalId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Dosage { get; set; }
    public string? Instructions { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? FrequencyType { get; set; }
    public int? Frequency { get; set; }
    public ICollection<MedicationLog> MedicationLogs { get; } = new List<MedicationLog>();
    public Animal Animal { get; set; } = null!;

}
