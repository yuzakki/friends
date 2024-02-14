import * as z from 'zod';

const GenderEnum = z.enum(['male', 'female', 'unspecified']);

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(1, 'This field is required.')
    .trim()
    .max(30, 'Name must not be longer than 30 characters.'),

  lastName: z
    .string()
    .min(1, 'This field is required.')
    .trim()
    .max(30, 'Name must not be longer than 30 characters.'),

  gender: GenderEnum.optional(),

  photo: z.string().url().optional(),

  birthday: z.any(),

  bio: z
    .string()
    .max(250, {
      message: 'Bio must not be longer than 250 characters.',
    })
    .trim()
    .optional(),
});
