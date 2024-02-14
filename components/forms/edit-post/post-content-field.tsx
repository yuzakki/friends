import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { PostSchema } from '@/schemas/new-post';
import { Textarea } from '@/components/ui/textarea';

interface PostContentFieldProps {
  form: UseFormReturn<z.infer<typeof PostSchema>>;
  isLoading: boolean;
}

export function PostContentField({ form, isLoading }: PostContentFieldProps) {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea
              disabled={isLoading}
              {...field}
              rows={6}
              placeholder="What's on your mind?"
              className="my-6"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
