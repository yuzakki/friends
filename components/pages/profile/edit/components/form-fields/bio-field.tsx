import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

import { UserSchema } from '@/schemas/user';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface BioFieldProps {
  form: UseFormReturn<z.infer<typeof UserSchema>>;
  isLoading: boolean;
}

export function BioField({ form, isLoading }: BioFieldProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-label-1">Bio</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={5}
                placeholder="Tell others a little bit about yourself"
                className="resize-none font-normal text-black"
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
