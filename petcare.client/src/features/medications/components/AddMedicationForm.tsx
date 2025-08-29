import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import type { MedicationForm, Animal } from '@/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { useCreateMedication } from '../hooks/useCreateMedication';

const formSchema = z.object({
  animalId: z.number().min(1, { message: 'Please select an animal.' }),
  name: z.string().min(1, { message: 'Medication name is required.' }),
  dosage: z.string().min(1, { message: 'Dosage is required.' }),
  instructions: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  type: z.enum(['recurring', 'as needed']),
  frequencyType: z.enum(['days', 'hours']),
  frequency: z.number().min(1, { message: 'Frequency is required.' }),
});
type FormValues = z.infer<typeof formSchema>;

export default function AddMedicationForm({
  animals,
  onClose,
  closeAction,
}: {
  animals: Animal[];
  onClose?: () => void;
  closeAction?: React.ReactNode;
}) {
  const createMedication = useCreateMedication();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const today = new Date();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: 0,
      name: '',
      dosage: '',
      instructions: '',
      startDate: today,
      endDate: undefined,
      type: 'recurring',
      frequencyType: 'days',
      frequency: 1,
    },
  });

  function formatDate(date?: Date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    const payload: MedicationForm = {
      animalId: values.animalId,
      name: values.name,
      dosage: values.dosage,
      instructions: values.instructions,
      startDate: formatDate(values.startDate),
      endDate: values.endDate ? formatDate(values.endDate) : '',
      type: values.type,
      frequencyType: values.frequencyType,
      frequency: values.frequency,
    };
    console.log('Form submit values:', values);
    console.log('Payload sent:', payload);
    createMedication.mutate(payload, {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="animalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Animal</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value ? String(field.value) : ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {animals.map((a) => (
                      <SelectItem key={a.id} value={String(a.id)}>
                        {a.name}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Medication name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dosage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosage</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Dosage" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Instructions" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between px-2"
                      type="button"
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between px-2"
                      type="button"
                    >
                      {field.value
                        ? field.value.toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="as needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('type') === 'recurring' && (
          <div className="mb-2">
            <FormLabel className="mb-1 block">Once every:</FormLabel>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem className="mb-0">
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-16"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequencyType"
                render={({ field }) => (
                  <FormItem className="mb-0">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="days/hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">days</SelectItem>
                          <SelectItem value="hours">hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={createMedication.isPending}>
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
