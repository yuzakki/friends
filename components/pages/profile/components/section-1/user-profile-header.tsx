'use client';

import Image from 'next/image';
import { z } from 'zod';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCamera } from 'react-icons/fa';

import { updateMyAccount } from '@/actions/account';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { IUser } from '@/models/userModel';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormError } from '@/components/forms/form-error';
import { FormSuccess } from '@/components/forms/form-success';
import { handleImageUpload } from '@/components/handle-image-upload';

import { ProfileImage } from './profile-image';
import { ProfileCover } from './cover-image';
import { PiSpinnerBold } from 'react-icons/pi';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  user: IUser | null | undefined;
  isExternalUser?: boolean;
}

const formSchema = z.object({
  photo: z.string().url(),
});

// GOOD
// FUcking Good

export function UserProfileHeader({ user, isExternalUser = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
  }>({
    error: '',
    success: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing('media');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: user?.photo || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const blob = values.photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.photo = imgRes[0].url;
      }

      const data = { photo: values.photo };

      await updateMyAccount(data)
        .then((data) => {
          if (data?.success) {
            setIsOpen(false);
            setStatus({ success: data.success });
          }
        })
        .catch(() => {
          setStatus({ error: 'You have exceeded the limit of 4 MB.' });
        });
    } else if (!hasImageChanged) {
      setStatus({ error: 'Please choose an image' });
    }
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    handleImageUpload(e, fieldChange, setFiles);
  };

  return (
    <section className="h-56">
      <div className="relative w-full sm:h-56 h-36 overflow-hidden rounded-b-lg">
        <ProfileCover user={user} isExternalUser={isExternalUser} />
      </div>

      <div className="relative -translate-y-1/2 laptop:translate-x-10 laptop:mx-0 mx-auto sm:h-[200px] sm:w-[200px] xs:w-[130px] xs:h-[130px] w-[120px] h-[120px]">
        {isUploading ? (
          <div className="rounded-full border-4 bg-slate-100 flex-center border-white sm:h-[200px] sm:w-[200px] xs:w-[130px] xs:h-[130px] w-[120px] h-[120px]">
            <PiSpinnerBold className="text-gray-600 w-6 h-6 animate-spin" />
          </div>
        ) : (
          <ProfileImage photo={user?.photo} />
        )}

        {!isExternalUser && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="absolute right-0 bottom-4 z-10 rounded-full border-2 border-white text-white w-10 h-10 flex-center cursor-pointer overflow-hidden">
                <div className="bg-primary-1 hover:bg-primary1-hover w-full h-full flex-center transition">
                  <div className="w-full h-full flex-center cursor-pointer">
                    <FaCamera size={16} />
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit your image profile</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="profileImage">
                          {field.value ? (
                            <Image
                              src={field.value}
                              blurDataURL={field.value}
                              placeholder="blur"
                              alt="profile image"
                              width={96}
                              height={96}
                              priority
                              className="object-cover !h-[96px] rounded-full cursor-pointer"
                            />
                          ) : (
                            <Image
                              src="/assets/images/default-photo.jpg"
                              alt="profile image"
                              width={96}
                              height={96}
                              className="object-contain rounded-full cursor-pointer"
                            />
                          )}
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            placeholder="Upload a photo"
                            onChange={(e) =>
                              handleImageChange(e, field.onChange)
                            }
                            disabled={isUploading}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormError message={status.error} />
                  <FormSuccess message={status.success} />

                  <DialogFooter className="flex gap-2 !justify-between">
                    <DialogClose className="h-10 px-4 py-2">Cancel</DialogClose>
                    <Button type="submit" disabled={isUploading}>
                      Upload
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
