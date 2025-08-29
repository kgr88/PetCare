import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { useAuthRedirect } from '@/features/auth/useAuthCheck';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

const formSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' })
      .regex(passwordRegex, {
        message:
          'Password must contain uppercase, lowercase, number, and special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

async function registerRequest(data: FormValues) {
  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed. Please try again.');
  }

  return {};
}

export default function Register() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      setSubmitError(null);
      setSuccess('Registration successful! You can now log in.');
    },
    onError: (err: Error) => {
      setSuccess(null);
      setSubmitError(err.message || 'An unexpected error occurred.');
    },
  });

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    setSuccess(null);
    mutation.mutate(values);
  }

  const { loading } = useAuthRedirect('/dashboard');
  if (loading) return <p>Checking authentication...</p>;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full shadow-lg max-w-92">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Register</h1>
            <p className="text-muted-foreground text-balance">
              Create your PetCare account
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        disabled={mutation.isPending}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        disabled={mutation.isPending}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        disabled={mutation.isPending}
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div>
                {submitError && (
                  <p className="text-sm text-red-500 text-center" role="alert">
                    {submitError}
                  </p>
                )}
                {success && (
                  <p
                    className="text-sm text-green-600 text-center"
                    role="status"
                  >
                    {success}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t mx-6">
          <span className="bg-card text-muted-foreground relative z-10 px-4">
            or
          </span>
        </div>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/login-page')}
            disabled={mutation.isPending}
            className="w-full"
          >
            Go to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
