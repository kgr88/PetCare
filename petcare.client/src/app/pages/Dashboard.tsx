import Appointments from '@/features/appointments/components/Appointments';
import Animals from '@/features/animals/Animals';
import Medications from '@/features/medications/components/Medications';
export default function Dashboard() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Appointments />
        <Medications />
      </div>
      <Animals />
    </>
  );
}
