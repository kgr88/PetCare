namespace PetCare.Server.Models;

public class Medication
{
    public int Id { get; set; }
    public int AnimalId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Dosage { get; set; }
    public string? Instructions { get; set; }

    public MedicationSchedule Schedule { get; set; } = null!;

}
