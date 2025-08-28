namespace PetCare.Server.Models.DTOs;

public class WeightLogDTO
{
    public int Id { get; set; }
    public int AnimalId { get; set; }
    public double Weight { get; set; }
    public DateOnly Date { get; set; }
}

public class CreateWeightLogDTO
{
    public int AnimalId { get; set; }
    public double Weight { get; set; }
    public DateOnly Date { get; set; }
}
