import { z } from 'zod';
import { DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { PostSchema } from '@/schemas/new-post';

interface PrivacySelectFieldProps {
  form: UseFormReturn<z.infer<typeof PostSchema>>;
  isLoading: boolean;
}

export function PrivacySelectField({
  form,
  isLoading,
}: PrivacySelectFieldProps) {
  return (
    <FormField
      control={form.control}
      name="privacy"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <DialogTitle className="mb-2 text-xl">Create Post</DialogTitle>
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isLoading}
          >
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="onlyme">Only me</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
