import AnimalsList from '@/features/dashboard/AnimalsList';
import Appointments from '@/features/dashboard/Appointments';
import MedicationList from '@/features/medications/MedicationList';
export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 h-64 my-2">
        <Appointments />
        <MedicationList />
      </div>
      <AnimalsList />
    </>
  );
}
