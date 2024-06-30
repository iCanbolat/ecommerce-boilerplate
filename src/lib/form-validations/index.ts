import { z } from 'zod';

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(3, 'At least 3 char'),
  fullName: z.string().min(3, 'At least 3 char'),
});

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(3, 'At least 3 char'),
});

export const resetSchema = z.object({
  email: z.string().email('This is not a valid email.'),
});

export const newPasswordSchema = z.object({
  password: z.string().min(3, 'At least 3 char'),
});

export const MAX_FILE_SIZE = 2000000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const createProductSchema = z.object({
  name: z.string({ required_error: 'Provide product name' }),
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  description: z.string().optional(),
  price: z.number(),
  category: z.string(),
});

export const createCategorySchema = z.object({
  name: z.string({ required_error: 'Provide product name' }),
  image: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  slug: z.string(),
});

export const createWorkspaceFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be longer than 2 char.',
  }),
  avatarUrl: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  inviteMembers: z.array(
    z.object({
      label: z.string().email('Invalid Email format').optional().nullable(),
      value: z.string().email('Invalid Email format').optional().nullable(),
    })
  ),
});

export const starterPersonalInfo = z.object({
  fullName: z.string({ required_error: 'Please provide your full name.' }),
  inviteMembers: z.array(
    z.object({
      label: z.string().email('Invalid Email format').optional().nullable(),
      value: z.string().email('Invalid Email format').optional().nullable(),
    })
  ),
  avatarUrl: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  companyName: z.string({
    required_error: 'Please provide your company name.',
  }),
  workspaceName: z.string({ required_error: 'Please a workspace name.' }),
  productAvatarUrl: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});
