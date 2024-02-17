'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SignUpSchema } from '@/schemas/auth';
import { signup } from '@/actions/auth/signup';

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

import { InputField } from '../components/input-field';
import { ForgotPasswordBtn } from '../components/buttons';
import { redirect } from 'next/navigation';

// GOOD

export function SignUpForm() {
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
  }>({
    error: '',
    success: '',
  });

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    startTransition(async () => {
      await signup(data).then((data) => {
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputField
                  disabled={isPending}
                  placeholder="Username"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputField
                  disabled={isPending}
                  placeholder="Email address"
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
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={status.error} />
        <FormSuccess message={status.success} />

        <Button disabled={isPending} type="submit" variant="auth">
          Sign Up
        </Button>
      </form>

      {/* <Social /> */}
    </Form>
  );
}
