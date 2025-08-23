namespace PetCare.Server.Models;

public class MedicationLog
{
    public int Id { get; set; }
    public int ScheduleId { get; set; }
    public DateTime TimeTaken { get; set; }
    public MedicationSchedule MedicationSchedule { get; set; } = null!;

}
