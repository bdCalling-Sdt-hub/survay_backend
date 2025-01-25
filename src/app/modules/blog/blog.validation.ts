import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must not exceed 255 characters'),
    hashtag: z
      .string()
      .regex(
        /^#[a-zA-Z0-9_]+$/,
        'Hashtag must start with # and contain alphanumeric characters or underscores',
      ),
    blog_image: z.string().url('Blog image must be a valid URL'),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(5000, 'Description must not exceed 5000 characters'),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(255, 'Title must not exceed 255 characters')
      .optional(),
    hashtag: z
      .string()
      .regex(
        /^#[a-zA-Z0-9_]+$/,
        'Hashtag must start with # and contain alphanumeric characters or underscores',
      )
      .optional(),
    blog_image: z.string().optional(),
    description: z.string().optional(),
  }),
});

const blogValidations = {
  blogValidationSchema,
  updateBlogValidationSchema,
};

export default blogValidations;
