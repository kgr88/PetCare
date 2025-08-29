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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Please enter your password.' }),
  rememberMe: z.boolean().optional(),
});
type FormValues = z.infer<typeof formSchema>;

async function loginRequest(data: FormValues) {
  const loginUrl = data.rememberMe
    ? '/login?useCookies=true'
    : '/login?useSessionCookies=true';

  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: data.email, password: data.password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid email or password.');
    }
    throw new Error('Login failed. Please try again.');
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export default function Login() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { loading } = useAuthRedirect('/dashboard');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      setSubmitError(null);
      navigate('/');
    },
    onError: (err: Error) => {
      setSubmitError(err.message || 'An unexpected error occurred.');
    },
  });

  function onSubmit(values: FormValues) {
    setSubmitError(null);
    mutation.mutate(values);
  }

  if (loading) return <p>Checking authentication...</p>;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-92 shadow-lg ">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your PetCare account
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
                        autoComplete="current-password"
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
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={mutation.isPending}
                        className="w-4 h-4"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Remember Me</FormLabel>
                  </FormItem>
                )}
              />
              <div>
                {submitError && (
                  <p className="text-sm text-red-500 text-center" role="alert">
                    {submitError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full"
              >
                {mutation.isPending ? 'Logging in...' : 'Login'}
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
            onClick={() => navigate('/register-page')}
            disabled={mutation.isPending}
            className="w-full"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
