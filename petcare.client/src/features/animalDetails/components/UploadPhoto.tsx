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
import UploadPhotoForm from './UploadPhotoForm';
import { useState } from 'react';
import { Image } from 'lucide-react';

export default function UploadPhoto({ animalId }: { animalId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-40 lg:w-60 mt-4">
          <Image />
          Update Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Upload Photo</DialogTitle>
        </DialogHeader>
        <UploadPhotoForm
          animalId={animalId}
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
