import { useState } from 'react';
import MedicationLogForm from './MedicationLogForm';
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
import type { Medication } from '@/types';

export default function MedicationLog({
  medications,
}: {
  medications: Medication[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={medications.length == 0} variant="outline">
          Add Log
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Medication Log</DialogTitle>
        </DialogHeader>
        <MedicationLogForm
          medications={medications}
          onClose={() => setOpen(false)}
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
  );
}
