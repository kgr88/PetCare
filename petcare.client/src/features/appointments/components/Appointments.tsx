import { Card } from '@/components/ui/card';
import { useAppointments } from '../hooks/useAppointments';
import { Badge } from '@/components/ui/badge';
import formatDate from '@/utils/formatDate';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScheduleAppointment from './ScheduleAppointment';
import type { Animal } from '@/types';

export default function Appointments({
  animals,
  animalId,
  singleAnimal = false,
}: {
  animals: Animal[];
  animalId?: number;
  singleAnimal?: boolean;
}) {
  const {
    data: appointments,
    error,
    isLoading,
  } = useAppointments(singleAnimal, animalId);
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <ScrollArea className="max-h-92 shadow-sm rounded-xl">
      <Card className="px-4 py-2 text-sm min-h-92">
        <div className="flex justify-between ">
          <h1 className="text-lg font-bold">Upcoming Appointments</h1>
          <ScheduleAppointment animals={animals ?? []} />
        </div>
        <div className="flex flex-col gap-3">
          {appointments?.map((appointment) => {
            const date = formatDate(new Date(appointment.date));
            return (
              <div key={appointment.id} className="flex items-center gap-4">
                <div className="w-10 sm:w-20 text-center flex-shrink-0">
                  <div className="text-xl font-bold leading-none">
                    {date.monthDay}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {date.weekdayLong}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="border-1 text-primary rounded-lg p-3 shadow-sm">
                    <div className="font-bold flex gap-2">
                      {appointment.animalName}
                      <Badge variant="outline">{appointment.type}</Badge>
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      {appointment.location} • {date.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </ScrollArea>
  );
}
