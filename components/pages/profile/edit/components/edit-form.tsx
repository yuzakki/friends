'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { UserSchema } from '@/schemas/user';
import { currentUser } from '@/actions/auth/current-user';
import { updateMyAccount } from '@/actions/account';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/forms/form-error';
import { FormSuccess } from '@/components/forms/form-success';

import { UsernameField } from './form-fields/username-field';
import { GenderField } from './form-fields/gender-field';
import { BirthdayField } from './form-fields/birthday-field';
import { BioField } from './form-fields/bio-field';

export function EditForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
    isFetching?: boolean;
  }>({
    error: '',
    success: '',
    isFetching: true,
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthday: new Date(),
      gender: undefined,
      bio: '',
    },
  });

  function onSubmit(data: z.infer<typeof UserSchema>) {
    const modifiedData = {
      ...data,
      fullName: `${data.firstName} ${data.lastName}`,
    };

    startTransition(async () => {
      await updateMyAccount(modifiedData)
        .then((data) => {
          if (data?.success) {
            setStatus({ success: data.success });
            router.push('/profile/info');
          }
        })
        .catch((error: any) => {
          setStatus({ error: error.message });
        });
    });
  }

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const { user } = await currentUser();

        // Update the form fields with fetched values
        form.setValue('firstName', user?.firstName || '');
        form.setValue('lastName', user?.lastName || '');
        form.setValue('birthday', user?.birthday);
        form.setValue('gender', user?.gender);
        form.setValue('bio', user?.bio);

        setStatus({ isFetching: false });
      } catch (error) {
        throw error;
      }
    }
    fetchUserInfo();
  }, [form]);

  return (
    <div className="space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <UsernameField
            form={form}
            isLoading={isPending || status.isFetching!}
          />

          <div className="flex xs:flex-row flex-col gap-4 xs:items-start">
            <div className="xs:basis-1/2 basis-full">
              <GenderField
                form={form}
                isLoading={isPending || status.isFetching!}
              />
            </div>

            <div className="xs:basis-1/2 basis-full">
              <BirthdayField
                form={form}
                isLoading={isPending || status.isFetching!}
              />
            </div>
          </div>

          <BioField form={form} isLoading={isPending || status.isFetching!} />

          <div className="flex justify-between gap-2 flex-col mt-3">
            <FormError message={status.error} />
            <FormSuccess message={status.success} />

            <div className="flex-between">
              <Button className="rounded-full" variant="outline" asChild>
                <Link href="/profile/info">Cancel</Link>
              </Button>
              <Button
                className="rounded-full"
                type="submit"
                disabled={isPending || status.isFetching!}
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
