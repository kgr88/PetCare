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
import { useState, useRef } from 'react';
import { useUploadPhoto } from '@/features/animalDetails/hooks/useUploadPhoto';

const maxFileSize = 5 * 1024 * 1024; // 5MB
const acceptedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  photo: z
    .any()
    .refine((file) => file instanceof File, 'Please select a photo.')
    .refine((file) => file?.size <= maxFileSize, 'Photo must be less than 5MB.')
    .refine(
      (file) => acceptedImageTypes.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UploadPhotoForm({
  onClose,
  onSuccess,
  closeAction,
  animalId,
}: {
  onClose?: () => void;
  onSuccess?: (photoUrl: string) => void;
  closeAction?: React.ReactNode;
  animalId: number;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: undefined,
    },
  });

  const uploadMutation = useUploadPhoto(animalId);

  function onSubmit(values: FormValues) {
    if (!values.photo) return;
    setSubmitError(null);
    uploadMutation.mutate(values.photo, {
      onSuccess: (data) => {
        setSubmitError(null);
        onSuccess?.(data.url);
        onClose?.();
      },
      onError: (err: Error) => {
        setSubmitError(err.message || 'An unexpected error occurred.');
      },
    });
  }

  function handleFileChange(onChange: (file: File | null) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      onChange(file);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    };
  }

  function clearPhoto() {
    form.setValue('photo', undefined);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-60 md:min-w-80"
      >
        <FormField
          control={form.control}
          name="photo"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Choose File</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={fileInputRef}
                  type="file"
                  accept={acceptedImageTypes.join(',')}
                  onChange={handleFileChange(onChange)}
                  className="w-full"
                  disabled={uploadMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {preview && (
          <div className="space-y-2">
            <div className="relative">
              <img
                src={preview}
                alt="Photo preview"
                className="w-full max-w-xs rounded-lg border object-cover"
                style={{ maxHeight: '200px' }}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={clearPhoto}
                className="absolute top-2 right-2"
                disabled={uploadMutation.isPending}
              >
                Remove
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            disabled={uploadMutation.isPending || !form.watch('photo')}
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload Photo'}
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
