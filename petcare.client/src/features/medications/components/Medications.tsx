import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import AddMedicationForm from './AddMedicationForm';
import type { Animal } from '@/types';
import DeleteButton from '@/components/DeleteButton';
import CardSkeleton from '@/components/CardSkeleton';

export default function Medications({
  animalId,
  singleAnimal = false,
  animals,
}: {
  animalId?: number;
  singleAnimal?: boolean;
  animals: Animal[];
}) {
  const {
    data: medications,
    error,
    isLoading,
  } = useMedications(singleAnimal, animalId);

  const [addMedOpen, setAddMedOpen] = useState(false);
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading) return <CardSkeleton />;
  return (
    <ScrollArea className="max-h-92 shadow-sm rounded-xl overflow-y-auto h-full">
      <Card className="px-4 py-2 gap-0 min-h-92">
        <div className="flex justify-between items-center gap-2 mb-4">
          <h1 className="text-lg font-bold">Current Medications</h1>
          <div className="flex gap-2 flex-col lg:flex-row">
            <MedicationLog medications={medications ?? []} />
            <Dialog open={addMedOpen} onOpenChange={setAddMedOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Add Medication</Button>
              </DialogTrigger>
              <DialogContent className="w-fit" aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>Add Medication</DialogTitle>
                </DialogHeader>
                <AddMedicationForm
                  animals={animals ?? []}
                  onClose={() => setAddMedOpen(false)}
                  closeAction={
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  }
                />
                <DialogFooter className="sm:justify-start mt-2"></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {!isLoading &&
        (medications?.length == 0 || medications == undefined) ? (
          <div className="flex w-full justify-center font-bold text-xl text-center">
            You don't have any medications currently.
          </div>
        ) : (
          medications?.map((medication) => (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              key={medication.id}
            >
              <AccordionItem value={String(medication.id)}>
                <AccordionTrigger>
                  <span>
                    {!singleAnimal ? `${medication.animalName}: ` : ''}
                    {medication.name}
                    <Badge variant="outline" className="mx-2">
                      {medication.dosage}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 text-balance">
                  <div className="flex justify-between">
                    <div className="flex gap-1">
                      <Badge variant="default">{medication.startDate}</Badge>
                      {medication.endDate ? (
                        <Badge variant="destructive">
                          {medication.endDate}
                        </Badge>
                      ) : (
                        medication.endDate
                      )}
                    </div>
                    <DeleteButton id={medication.id} entityType="medications" />
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
            </Accordion>
          ))
        )}
      </Card>
    </ScrollArea>
  );
}
