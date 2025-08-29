import { useState } from 'react';
import WeightLogForm from './WeightLogForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function WeightLog({ animalId }: { animalId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Log</Button>
      </DialogTrigger>
      <DialogContent className="w-fit" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Weight Log</DialogTitle>
        </DialogHeader>
        <WeightLogForm onClose={() => setOpen(false)} animalId={animalId} />
      </DialogContent>
    </Dialog>
  );
}
