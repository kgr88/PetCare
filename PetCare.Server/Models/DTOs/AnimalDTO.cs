namespace PetCare.Server.Models.DTOs;

public class AnimalDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Species { get; set; } = string.Empty;
    public string? Breed { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? MicrochipId { get; set; }
    public string? ImageUrl { get; set; } = string.Empty;
}
