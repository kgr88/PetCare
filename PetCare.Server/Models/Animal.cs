namespace PetCare.Server.Models;

public class Animal
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Species { get; set; } = string.Empty;
    public string? Breed { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? MicrochipId { get; set; }
    public string OwnerId { get; set; } = string.Empty;
}
