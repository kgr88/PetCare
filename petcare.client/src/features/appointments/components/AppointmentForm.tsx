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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DateTimePicker from '@/components/DateTimePicker';
import type { Animal, AppointmentForm } from '@/types';
import formatFormDate from '../../../utils/formatFormDate';
import getCurrentTime from '../../../utils/getCurrentTime';
import { useCreateAppointment } from '../hooks/useCreateAppointment';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  animalId: z.string().min(1, { message: 'Please select an animal.' }),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Please select a time.' }),
  type: z.enum(['Veterinary', 'Grooming', 'Training', 'Other'], {
    message: 'Please select an appointment type.',
  }),
  location: z.string().min(1, { message: 'Please enter a location.' }),
});
type FormValues = z.infer<typeof formSchema>;

export default function AppointmentForm({
  onClose,
  closeAction,
  animals,
}: {
  onClose?: () => void;
  /** rendered next to the Submit button (e.g. DialogClose asChild) */
  closeAction?: React.ReactNode;
  animals: Animal[];
}) {
  const createAppointment = useCreateAppointment();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: '',
      date: new Date(),
      time: getCurrentTime(),
      type: 'Other',
      location: '',
    },
  });

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    const timeTaken = formatFormDate(values.date, values.time);
    const payload: AppointmentForm = {
      animalId: Number(values.animalId),
      date: timeTaken,
      type: values.type,
      location: values.location,
    };

    createAppointment.mutate(payload, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="animalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Animal</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {animals.map((m) => (
                      <SelectItem key={m.id} value={String(m.id)}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={1} value={String('Veterinary')}>
                      Veterinary
                    </SelectItem>
                    <SelectItem key={2} value={String('Grooming')}>
                      Grooming
                    </SelectItem>
                    <SelectItem key={3} value={String('Training')}>
                      Training
                    </SelectItem>
                    <SelectItem key={4} value={String('Other')}>
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="Enter a location"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateTimePicker
                  date={field.value ?? null}
                  time={form.getValues('time') ?? null}
                  onDateChange={(d) => field.onChange(d ?? null)}
                  onTimeChange={(t) => form.setValue('time', t ?? '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={createAppointment.isPending}>
              Submit
            </Button>
            {closeAction}
          </div>
          {submitError && (
            <p className="text-sm text-destructive" role="alert">
              {submitError}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
