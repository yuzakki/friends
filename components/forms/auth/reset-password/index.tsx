'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetPasswordSchema } from '@/schemas';
import { resetPassword } from '@/actions/auth/reset-password';

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

export function ResetPasswordForm({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
  }>({
    error: '',
    success: '',
  });

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  function onSubmit(data: z.infer<typeof ResetPasswordSchema>) {
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      setStatus({
        error: 'Password do not match!',
      });
      return;
    }

    startTransition(async () => {
      await resetPassword({ token, newPassword: password }).then((data) => {
        data?.error && setStatus({ error: data.error });
      });
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    placeholder="new password"
                    type="password"
                    disabled={
                      isPending ||
                      form.formState.isLoading ||
                      form.formState.isSubmitting
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputField
                    placeholder="Confirm new password"
                    type="password"
                    disabled={
                      form.formState.isLoading ||
                      form.formState.isSubmitting ||
                      isPending
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={status.error} />
          <FormSuccess message={status.success} />

          <Button
            type="submit"
            variant="auth"
            disabled={
              form.formState.isLoading ||
              form.formState.isSubmitting ||
              isPending
            }
            className="!lowercase"
          >
            update password
          </Button>
        </form>
      </Form>
    </div>
  );
}
