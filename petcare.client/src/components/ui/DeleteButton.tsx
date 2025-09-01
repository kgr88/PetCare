'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDelete } from '@/hooks/useDelete';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type EntityType = 'appointments' | 'medications';

interface DeleteButtonProps {
  id: number;
  entityType: EntityType;
  entityName?: string; //customize message text
  onDeleted?: () => void;
  children?: React.ReactNode;
}

export default function DeleteButton({
  id,
  entityType,
  entityName,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useDelete({
    entityType,
    onSuccess: () => {
      setOpen(false);
      toast(`${getEntityDisplayName()} has been successfuly deleted.`);
    },
    onError: (error) => {
      console.error(`Failed to delete ${entityType}:`, error);
      alert(`Failed to delete ${entityType}: ${error.message}`);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  const getEntityDisplayName = () => {
    if (entityName) return entityName;
    return entityType === 'appointments' ? 'appointment' : 'medication';
  };

  const isDeleting = deleteMutation.isPending;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isDeleting} className="w-8 h-8">
          {<Trash2 className="w-4 h-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{' '}
            {getEntityDisplayName()} from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-foreground"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
