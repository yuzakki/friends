'use client';

import * as z from 'zod';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';

import { zodResolver } from '@hookform/resolvers/zod';
import { isBase64Image } from '@/lib/utils';
import { updateMyAccount } from '@/actions/account';
import { useUploadThing } from '@/lib/uploadthing';
import { IUser } from '@/models/userModel';

import { handleImageUpload } from '@/components/handle-image-upload';
import { Input } from '@/components/ui/input';
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
import { Button } from '@/components/ui/button';
import { PiSpinnerBold } from 'react-icons/pi';

interface Props {
  user: IUser | null | undefined;
  isExternalUser?: boolean;
}

const formSchema = z.object({
  cover: z.string().url(),
});

export function ProfileCover({ user, isExternalUser }: Props) {
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
      cover: user?.cover || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const blob = values.cover;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.cover = imgRes[0].url;
      }

      const data = { cover: values.cover };

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
    <>
      {isUploading ? (
        <div className="border-2 rounded-b-lg bg-slate-300/10 border-white h-full w-full flex-center">
          <PiSpinnerBold className="text-gray-600 w-6 h-6 animate-spin" />
        </div>
      ) : (
        <>
          {user?.cover ? (
            <Image
              className="object-cover h-full w-full"
              src={user?.cover}
              blurDataURL={user?.cover}
              placeholder="blur"
              alt="Cover Image"
              height={176}
              width={9999}
              quality={100}
              priority
            />
          ) : (
            <Image
              className="object-cover h-full w-full"
              src="/assets/images/default-cover.png"
              alt="Cover Image"
              height={176}
              width={9999}
              priority
            />
          )}
        </>
      )}

      {!isExternalUser && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="absolute right-2 bottom-2" variant="editCover">
              <div className="flex gap-2 items-center">
                <FaCamera size={16} />
                <span className="xs:block hidden">Edit cover</span>
              </div>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit your cover image</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="cover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="profileImage">
                        {field.value ? (
                          <Image
                            src={field.value}
                            blurDataURL={field.value}
                            placeholder="blur"
                            alt="profile image"
                            width={200}
                            height={96}
                            priority
                            className="object-cover w-full cursor-pointer"
                          />
                        ) : (
                          <Image
                            src="/assets/images/default-cover.png"
                            alt="profile image"
                            width={200}
                            height={96}
                            className="object-contain w-full cursor-pointer"
                          />
                        )}
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          placeholder="Upload a photo"
                          onChange={(e) => handleImageChange(e, field.onChange)}
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
    </>
  );
}
