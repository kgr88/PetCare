import AppointmentsList from '@/features/appointments/components/Appointments';
import AnimalsList from '@/features/animals/AnimalsList';
import Medications from '@/features/medications/components/Medications';
export default function Dashboard() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <AppointmentsList />
        <Medications />
      </div>
      <AnimalsList />
    </>
  );
}
