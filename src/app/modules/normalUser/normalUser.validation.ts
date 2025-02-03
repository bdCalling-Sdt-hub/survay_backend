import { z } from 'zod';

export const createNormalUserSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 character' }),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(6, { message: 'Password must be 6 character' }),
    userData: z.object({
      name: z.string().nonempty('Name is required'),
      email: z.string().email('Invalid email format'),
      phone: z.string({ required_error: 'Phone number is required' }),
    }),
  }),
});
export const updateNormalUserData = z.object({
  body: z.object({
    name: z.string().optional(),
    profession: z.string().optional(),
    dateOfBirth: z.string().optional(),
    education: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    profile_image: z.string().optional(),
  }),
});

const normalUserValidations = {
  createNormalUserSchema,
  updateNormalUserData,
};

export default normalUserValidations;
