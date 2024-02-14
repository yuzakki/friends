import * as z from 'zod';

const privacyEnum = z.enum(['public', 'onlyme']);

export const PostSchema = z.object({
  privacy: privacyEnum,
  content: z
    .string()
    .min(1, 'Post content cannot not be empty')
    .max(1000, 'Post content cannot be larger than 1000 characters'),

  image: z.string().url('Invalid Image URL').optional(),
});
