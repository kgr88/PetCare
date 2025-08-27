import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { AnimalForm } from '@/types';
import { useCreateAnimal } from '../hooks/useCreateAnimal';
import { useState } from 'react';
import DateTimePicker from '@/components/DateTimePicker';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name.' }),
  species: z.string().min(1, { message: 'Please enter a species.' }),
  breed: z.string().optional().or(z.literal('')),
  dateOfBirth: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => v === undefined || v === '' || !isNaN(Date.parse(v)), {
      message: 'Invalid date',
    }),
  microchipId: z
    .string()
    .max(15, { message: 'Microchip ID must be at most 15 characters.' })
    .optional()
    .or(z.literal('')),
});
type FormValues = z.infer<typeof formSchema>;

export default function AddAnimalForm({
  onClose,
  closeAction,
}: {
  onClose?: () => void;
  closeAction?: React.ReactNode;
}) {
  const createAnimal = useCreateAnimal();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      dateOfBirth: '',
      microchipId: '',
    },
  });

  function onSubmit(values: FormValues) {
    setSubmitError(null);

    const payload: AnimalForm = {
      name: values.name,
      species: values.species,
      breed: values.breed ? values.breed : undefined,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.split('T')[0]
        : undefined,
      microchipId: values.microchipId ? values.microchipId : undefined,
    };

    createAnimal.mutate(payload, {
      onSuccess: () => {
        setSubmitError(null);
        onClose?.();
      },
      onError: (err: Error) => {
        setSubmitError(err.message || 'An unexpected error occurred.');
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-60 md:min-w-80"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter species"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breed (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Enter breed"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => {
            const dateValue = field.value ? new Date(field.value) : null;
            return (
              <FormItem>
                <FormLabel>Date of Birth (optional)</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={dateValue}
                    hideTime={true}
                    onDateChange={(d) =>
                      field.onChange(d ? d.toISOString().split('T')[0] : '')
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="microchipId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Microchip ID (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full rounded border px-3 py-2"
                  placeholder="Microchip number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={createAnimal.isPending}>
            Submit
          </Button>
          {closeAction}
        </div>

        {submitError && (
          <p className="text-sm text-destructive" role="alert">
            {submitError}
          </p>
        )}
      </form>
    </Form>
  );
}
