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
import { Input } from '@/components/ui/input';

interface UsernameFieldProps {
  form: UseFormReturn<z.infer<typeof UserSchema>>;
  isLoading: boolean;
}

export function UsernameField({ form, isLoading }: UsernameFieldProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-label-1">First Name</FormLabel>
            <FormControl>
              <Input
                // placeholder="John.."
                className="font-medium text-black rounded-full pl-5 border-2 border-slate-100"
                {...field}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-label-1">Last Name</FormLabel>
            <FormControl>
              <Input
                // placeholder="Doe.."
                className="font-medium text-black rounded-full pl-5 border-2 border-slate-100"
                {...field}
                disabled={isLoading}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
