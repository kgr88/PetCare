import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import DateTimePicker from './DateTimePicker';
import type { Medication, MedicationLog } from '@/types';
import formatFormDate from '../utils/formatFormDate';
import getCurrentTime from '../utils/getCurrentTime';
import { useCreateMedLog } from '../hooks/useCreateMedLog';
import { useState } from 'react';

const formSchema = z.object({
  medicationId: z.string().min(1, { message: 'Please select a medication.' }),
  date: z.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Please select a time.' }),
});
type FormValues = z.infer<typeof formSchema>;

export default function MedicationLogForm({
  medications,
  onClose,
  closeAction,
}: {
  medications: Medication[];
  onClose?: () => void;
  /** rendered next to the Submit button (e.g. DialogClose asChild) */
  closeAction?: React.ReactNode;
}) {
  const createMedLog = useCreateMedLog();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicationId: '',
      date: new Date(),
      time: getCurrentTime(),
    },
  });

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    const timeTaken = formatFormDate(values.date, values.time);
    const payload: MedicationLog = {
      medicationId: Number(values.medicationId),
      timeTaken,
    };

    createMedLog.mutate(payload, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="medicationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a medication" />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.map((m) => (
                      <SelectItem key={m.id} value={String(m.id)}>
                        <span className="font-bold">{m.animalName}</span>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select which medication this log is for.
              </FormDescription>
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
            <Button type="submit" disabled={createMedLog.isPending}>
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
