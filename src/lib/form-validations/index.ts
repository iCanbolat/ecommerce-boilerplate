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

const ProductVariantSchema = z.object({
  type: z.string({ required_error: 'Variant type is required' }),
  options: z.array(z.string({ required_error: 'Variant type is required' })),
});

export const createProductSchema = z.object({
  name: z.string({ required_error: 'Product name is required' }),
  image: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
          message: 'Max image size is 5MB.',
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
        })
    )
    .min(1, { message: 'At least one image is required.' }),
  price: z.number(),
  discountedPrice: z
    .preprocess(
      (a) => Number(z.string().parse(a)).toFixed(2),
      z.number().positive().min(1)
    )
    .optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(false),
  category: z.array(z.string()),
  seoTitle: z
    .string()
    .max(50, { message: 'Maximum character limit is 50' })
    .optional(),
  seoDescription: z
    .string()
    .max(280, { message: 'Maximum character limit is 280' })
    .optional(),
  status: z.enum(['DRAFT', 'ACTIVE']),
  variants: z.array(ProductVariantSchema).optional(),
  slug: z.string(),
  stock: z.number().optional(),
  sku: z.string().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Provide product name'),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  slug: z.string(),
});
