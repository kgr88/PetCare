using Microsoft.AspNetCore.Identity;

namespace PetCare.Server.Models;

public class ApplicationUser: IdentityUser
{
    public ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
