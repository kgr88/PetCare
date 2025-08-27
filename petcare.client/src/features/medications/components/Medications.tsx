import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMedications } from '../hooks/useMedications';
import { Badge } from '@/components/ui/badge';
import MedicationLog from './MedicationLog';
import formatDate from '@/utils/formatDate';

export default function Medications() {
  const { data: medications, error, isLoading } = useMedications();
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <ScrollArea className="max-h-92 shadow-sm rounded-xl">
      <Card className="px-4 py-2 gap-0 min-h-92">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Current Medications</h1>
          <MedicationLog medications={medications ?? []} />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {medications?.map((medication) => (
            <AccordionItem value={String(medication.id)} key={medication.id}>
              <AccordionTrigger>
                <span>
                  {medication.animalName}: {medication.name}
                  <Badge variant="outline" className="mx-2">
                    {medication.dosage}
                  </Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 text-balance">
                <div className="flex gap-1">
                  <Badge variant="default">{medication.startDate}</Badge>
                  {medication.endDate ? (
                    <Badge variant="destructive">{medication.startDate}</Badge>
                  ) : (
                    medication.endDate
                  )}
                </div>
                <div>
                  {medication.lastTaken ? (
                    <>
                      <span className="font-bold">Last taken: </span>
                      <span>
                        {(() => {
                          const formatted = formatDate(
                            new Date(medication.lastTaken)
                          );
                          return `${formatted.monthDay} ${formatted.year}, ${formatted.time}`;
                        })()}
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                </div>
                <div>
                  <span className="font-bold">Type: </span>
                  {medication.type == 'recurring'
                    ? `Take every ${medication.frequency} ${medication.frequencyType}`
                    : 'As needed'}
                </div>
                <div>
                  <span className="font-bold">Instructions: </span>
                  {medication.instructions}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </ScrollArea>
  );
}
