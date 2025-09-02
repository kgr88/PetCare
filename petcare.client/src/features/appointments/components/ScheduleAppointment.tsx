import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Animal } from '@/types';
import { useState } from 'react';
import AppointmentForm from './AppointmentForm';

export default function ScheduleAppointment({
  animals,
}: {
  animals: Animal[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={animals === undefined || animals.length == 0}
          variant="outline"
        >
          Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Schedule Appointment</DialogTitle>
        </DialogHeader>
        <AppointmentForm
          animals={animals}
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
