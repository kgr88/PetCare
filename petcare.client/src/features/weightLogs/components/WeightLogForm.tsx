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
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import type { WeightLog } from '@/types';
// ...existing code...
import { useCreateWeightLog } from '../hooks/useCreateWeightLog';
import { useState } from 'react';

const formSchema = z.object({
  date: z.date(),
  weight: z.number().positive({ message: 'Please enter a weight.' }),
});
type FormValues = z.infer<typeof formSchema>;

export default function WeightLogForm({
  animalId,
  onClose,
}: {
  animalId: number;
  onClose?: () => void;
}) {
  const createWeightLog = useCreateWeightLog();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      weight: undefined as unknown as number,
    },
  });

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    const d = values.date;
    const yyyy = d.getFullYear();
    const MM = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const date = `${yyyy}-${MM}-${dd}`;
    const payload: WeightLog = {
      id: 0,
      animalId,
      weight: values.weight,
      date,
    };

    createWeightLog.mutate(payload, {
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
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-44 justify-between"
                    type="button"
                  >
                    {field.value
                      ? field.value.toLocaleDateString()
                      : 'Select date'}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={(d) => field.onChange(d ?? null)}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === '') {
                      field.onChange(undefined as unknown as number);
                      return;
                    }
                    field.onChange(Number(v));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={createWeightLog.isPending}>
              Submit
            </Button>
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
