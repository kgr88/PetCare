import Appointments from '@/features/appointments/components/Appointments';
import Animals from '@/features/animals/components/Animals';
import Medications from '@/features/medications/components/Medications';
import { Separator } from '@/components/ui/separator';
import { useAnimals } from '@/features/animals/hooks/useAnimals';
export default function Dashboard() {
  const { data: animals, error, isLoading } = useAnimals();
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <Appointments animals={animals ?? []} />
        <Medications />
      </div>
      <Separator className="my-2" />
      <Animals animals={animals ?? []} />
    </>
  );
}
