namespace PetCare.Server.Mappings;
using AutoMapper;
using PetCare.Server.Models;
using PetCare.Server.Models.DTOs;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Medication, MedicationDTO>().ReverseMap();
        CreateMap<Animal, AnimalDTO>().ReverseMap();
        CreateMap<MedicationLog, MedicationLogDTO>().ReverseMap();
    }
}