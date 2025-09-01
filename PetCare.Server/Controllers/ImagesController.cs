using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetCare.Server.Services.Interfaces;
using System.Security.Claims;

namespace PetCare.Server.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ImagesController : ControllerBase
{
    private readonly IImagesService imagesService;

    public ImagesController(IImagesService imagesService)
    {
        this.imagesService = imagesService;
    }

    [HttpPost]
    [Route("{animalId:int}")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file, int animalId)
    {
        if (User.FindFirstValue(ClaimTypes.NameIdentifier) is not string userId)
            return Unauthorized();

        var url = await imagesService.UploadPhoto(file, userId, animalId);
        return Ok(new { url });
    }
}
