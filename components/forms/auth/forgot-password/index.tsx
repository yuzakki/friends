'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotPassword } from '@/actions/auth/forgot-password';
import { ForgotPasswordSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/forms/form-error';
import { FormSuccess } from '@/components/forms/form-success';
import { InputField } from '../components/input-field';
import { AlreadyHaveAcc } from '../components/buttons';

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
  }>({
    error: '',
    success: '',
  });

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(async () => {
      await forgotPassword(data).then((data) => {
        data?.error && setStatus({ error: data.error });
        data?.success && setStatus({ success: data.success });
      });
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    placeholder="Email address"
                    type="email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={status.error} />
          <FormSuccess message={status.success} />

          <Button type="submit" variant="auth" disabled={isPending}>
            send link
          </Button>

          <AlreadyHaveAcc />
        </form>
      </Form>
    </div>
  );
}
