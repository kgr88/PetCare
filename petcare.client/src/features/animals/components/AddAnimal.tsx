import { useState } from 'react';
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
import AddAnimalForm from './AddAnimalForm';

export default function AddAnimal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Animal</Button>
      </DialogTrigger>
      <DialogContent className="w-fit" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Animal</DialogTitle>
        </DialogHeader>
        <AddAnimalForm
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
