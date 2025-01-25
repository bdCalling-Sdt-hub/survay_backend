import { z } from 'zod';

const createStoryValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must not exceed 255 characters'),
    story_image: z.string().url('Story image must be a valid URL').optional(),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(5000, 'Description must not exceed 5000 characters'),
  }),
});
const updateStoryValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must not exceed 255 characters')
      .optional(),
    story_image: z.string().optional(),
    description: z.string().optional(),
  }),
});

const blogValidations = {
  createStoryValidationSchema,
  updateStoryValidationSchema,
};

export default blogValidations;
