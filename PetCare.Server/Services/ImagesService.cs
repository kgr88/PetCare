using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.EntityFrameworkCore;
using PetCare.Server.Data;
using PetCare.Server.Services.Interfaces;

public class ImagesService : IImagesService
{
    private readonly BlobServiceClient blobServiceClient;
    private const string ContainerName = "images";
    private readonly AppDbContext dbContext;

    public ImagesService(BlobServiceClient blobServiceClient, AppDbContext dbContext)
    {
        this.blobServiceClient = blobServiceClient;
        this.dbContext = dbContext;
    }

    public async Task<string> UploadPhoto(IFormFile file, string userId, int animalId)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("No file provided");
        if (!file.ContentType.StartsWith("image/"))
            throw new ArgumentException("Only images allowed");
        const long maxFileSize = 5 * 1024 * 1024; // 5MB
        if (file.Length > maxFileSize)
            throw new ArgumentException("File size cannot exceed 5MB");

        var animal = await dbContext.Animals
            .FirstOrDefaultAsync(a => a.Id == animalId && a.OwnerId == userId);
        if (animal == null)
            throw new ArgumentException("Animal not found or access denied");

        var container = blobServiceClient.GetBlobContainerClient(ContainerName);
        var ext = Path.GetExtension(file.FileName); 
        var blobName = $"{Guid.NewGuid()}{ext}";
        var blobClient = container.GetBlobClient(blobName);
        var headers = new BlobHttpHeaders { ContentType = file.ContentType };
        using var stream = file.OpenReadStream();
        await blobClient.UploadAsync(stream, new BlobUploadOptions { HttpHeaders = headers });
        
        var imageUrl = blobClient.Uri.ToString();
        animal.ImageUrl = imageUrl;
        await dbContext.SaveChangesAsync();
        return imageUrl;
    }
}