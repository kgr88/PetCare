using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PetCare.Server.Data;
using PetCare.Server.Mappings;
using PetCare.Server.Models;
using PetCare.Server.Services;
using PetCare.Server.Services.Interfaces;
using System.Security.Claims;

namespace PetCare.Server;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));
        builder.Services.AddAuthorization();
        builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
            .AddEntityFrameworkStores<AppDbContext>();
        // Add services to the container.
        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.Services.AddScoped<IAnimalService, AnimalService>();
        builder.Services.AddScoped<IAppointmentService, AppointmentService>();
        builder.Services.AddScoped<IMedicationService, MedicationService>();
        builder.Services.AddScoped<IMedicationLogService, MedicationLogService>();
        builder.Services.AddScoped<IWeightLogService, WeightLogService>();
        builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfile));
        var app = builder.Build();

        app.UseDefaultFiles();
        app.MapStaticAssets();
        app.MapIdentityApi<ApplicationUser>();
        app.MapPost("/logout", async (SignInManager<ApplicationUser> SignInManager) =>
        {
            await SignInManager.SignOutAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapGet("/pingauth", (ClaimsPrincipal user) =>
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return Results.Json(new { Email = email });
        }).RequireAuthorization();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}
