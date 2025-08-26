import AnimalsList from '@/features/dashboard/AnimalsList';
import Appointments from '@/features/dashboard/Appointments';
import MedicationList from '@/features/medications/components/MedicationList';
export default function Dashboard() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Appointments />
        <MedicationList />
      </div>
      <AnimalsList />
    </>
  );
}
