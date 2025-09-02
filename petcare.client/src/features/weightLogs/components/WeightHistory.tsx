import { Card, CardHeader } from '@/components/ui/card';
import { useWeightLogs } from '../hooks/useWeightLogs';
import WeightChart from './WeightChart';
import WeightLog from './WeightLog';
import CardSkeleton from '@/components/CardSkeleton';

export default function WeightHistory({ animalId }: { animalId: number }) {
  const {
    data: weightLogs,
    error,
    isLoading,
    isFetching,
  } = useWeightLogs(animalId);
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading || isFetching || weightLogs === undefined)
    return <CardSkeleton />;
  return (
    <Card className="h-92 py-2">
      <CardHeader className="font-bold text-xl flex items-center justify-between gap-2">
        <span>Weight History</span>
        <div className="ml-auto">
          <WeightLog animalId={animalId} />
        </div>
      </CardHeader>
      {!Array.isArray(weightLogs) || !weightLogs.length ? (
        <div className="flex h-64 items-center justify-center font-bold text-xl">
          You don’t have any weight logs yet.
        </div>
      ) : (
        <WeightChart weightLogs={weightLogs} />
      )}
    </Card>
  );
}
