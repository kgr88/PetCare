namespace PetCare.Server.Models;

public class WeightLog
{
    public int Id { get; set; }
    public int AnimalId { get; set; }
    public double Weight { get; set; }
    public DateOnly Date { get; set; }
}
