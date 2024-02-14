'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { LuImage } from 'react-icons/lu';

import { createPost } from '@/actions/posts';
import { PostSchema } from '@/schemas/new-post';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { handleImageUpload } from '@/components/handle-image-upload';
import { FormError } from '@/components/forms/form-error';
import { FormSuccess } from '@/components/forms/form-success';

import { PrivacySelectField } from './privacy-select-field';
import { PostContentField } from './post-content-field';

// GOOD

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreatePostForm({ setIsOpen }: Props) {
  const [status, setStatus] = useState<{
    error?: string | undefined;
    success?: string | undefined;
  }>({
    error: '',
    success: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing('media');

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      privacy: 'public',
      content: '',
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    const creatingPostToast = toast.loading('Creating post...');

    try {
      const blob = values.image;

      if (blob) {
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
          const imgRes = await startUpload(files);

          if (imgRes && imgRes[0].url) {
            values.image = imgRes[0].url;
          }
        }
      }

      const data = { ...values };
      if (values.image) {
        data.image = values.image;
      }

      await createPost(data)
        .then((data) => {
          if (data?.success) {
            setIsOpen(false);
            setStatus({ success: data.success });
            toast.success('Created!', {
              id: creatingPostToast,
            });
          }
        })
        .catch(() => {
          setStatus({ error: 'You have exceeded the limit of 4 MB.' });
          toast.error('Failed to create post', { id: creatingPostToast });
        });
    } catch (error: any) {
      toast.error('Failed to create post');
      throw error;
    }
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    handleImageUpload(e, fieldChange, setFiles);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PrivacySelectField
          form={form}
          isLoading={
            form.formState.isLoading ||
            form.formState.isSubmitting ||
            isUploading
          }
        />
        <PostContentField
          form={form}
          isLoading={
            form.formState.isLoading ||
            form.formState.isSubmitting ||
            isUploading
          }
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="w-fit block" htmlFor="contentImage">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="post image"
                    width={40}
                    height={40}
                    priority
                    className="object-cover cursor-pointer"
                  />
                ) : (
                  <div className="p-2 border border-border rounded-sm w-fit hover:bg-border transition-colors cursor-pointer">
                    <LuImage size={23} />
                  </div>
                )}
              </FormLabel>

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  id="contentImage"
                  placeholder="Upload a photo"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                  disabled={
                    form.formState.isLoading ||
                    form.formState.isSubmitting ||
                    isUploading
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormError message={status.error} />
        <FormSuccess message={status.success} />

        <DialogFooter>
          <Button
            type="submit"
            disabled={
              form.formState.isLoading ||
              form.formState.isSubmitting ||
              isUploading
            }
          >
            Create Post
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
