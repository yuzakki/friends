import { z } from 'zod';
import { format } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { UserSchema } from '@/schemas/user';

import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface BirthdayFieldProps {
  form: UseFormReturn<z.infer<typeof UserSchema>>;
  isLoading: boolean;
}

export function BirthdayField({ form, isLoading }: BirthdayFieldProps) {
  return (
    <FormField
      control={form.control}
      name="birthday"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-label-1">Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild disabled={isLoading}>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                fromYear={1960}
                toYear={2024}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
