namespace PetCare.Server.Services.Interfaces;

public interface IImagesService
{
    Task<string> UploadPhoto(IFormFile file, string userId, int animalId);
}
