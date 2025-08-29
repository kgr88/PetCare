import { Card, CardHeader } from '@/components/ui/card';
import { useWeightLogs } from '../hooks/useWeightLogs';
import WeightChart from './WeightChart';
import WeightLog from './WeightLog';

export default function WeightHistory({ animalId }: { animalId: number }) {
  const {
    data: weightLogs,
    error,
    isLoading,
    isFetching,
  } = useWeightLogs(animalId);
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading || isFetching || weightLogs === undefined)
    return <p>Loading...</p>;
  return (
    <Card className="h-92 py-2">
      <CardHeader className="font-bold text-xl flex items-center justify-between gap-2">
        <span>Weight History</span>
        <div className="ml-auto">
          <WeightLog animalId={animalId} />
        </div>
      </CardHeader>
      {!Array.isArray(weightLogs) || !weightLogs.length ? (
        <div className="w-full h-full flex items-center justify-center text-center text-2xl font-extralight">
          There are no weight logs yet!
        </div>
      ) : (
        <WeightChart weightLogs={weightLogs} />
      )}
    </Card>
  );
}
