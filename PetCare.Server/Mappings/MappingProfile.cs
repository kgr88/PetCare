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
        CreateMap<Appointment, AppointmentDTO>().ReverseMap();
        CreateMap<Appointment, UserAppointmentsDTO>()
            .ForMember(dest => dest.AnimalName, opt => opt.MapFrom(src => src.Animal.Name));
        CreateMap<Medication, UserMedsDTO>()
            .ForMember(dest => dest.AnimalName, opt => opt.MapFrom(src => src.Animal.Name))
            .ForMember(dest => dest.LastTaken, opt => opt.MapFrom(src =>
                src.MedicationLogs
                    .OrderByDescending(log => log.TimeTaken)
                    .Select(log => (DateTime?)log.TimeTaken)
                    .FirstOrDefault()
    ));
        CreateMap<WeightLog, WeightLogDTO>().ReverseMap();
        CreateMap<CreateWeightLogDTO, WeightLog>();
    }
}