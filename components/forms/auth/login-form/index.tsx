'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';

import { LoginSchema } from '@/schemas';
import { login } from '@/actions/auth/login';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { FormError } from '@/components/forms/form-error';
import { FormSuccess } from '@/components/forms/form-success';

import { ForgotPasswordBtn } from '../components/buttons';
import { InputField } from '../components/input-field';

// GOOD

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
  }>({
    error: '',
    success: '',
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      await login(data).then((data) => {
        if (data?.error) {
          setStatus({ error: data.error });
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputField
                  placeholder="Email address"
                  disabled={isPending}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputField
                  disabled={isPending}
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ForgotPasswordBtn />

        <FormError message={status.error} />
        <FormSuccess message={status.success} />

        <Button disabled={isPending} type="submit" variant="auth">
          Login
        </Button>
      </form>

      {/* <Social /> */}
    </Form>
  );
}
