'use server';

import { createCategorySchema } from '@/lib/form-validations';
import { getCurrentUser } from '@/utils/auth';
import prisma from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';
import { APIResponseType } from '@/utils/types';
import { Category } from '@prisma/client';
import { UploadApiResponse } from 'cloudinary';
import { revalidatePath } from 'next/cache';

export const getAllCategory = async (): Promise<
  APIResponseType<Category[]>
> => {
  const session = await getCurrentUser();

  if (!session) return { success: false, message: 'Unauthorized!' };

  const data = await prisma.category.findMany();

  return { success: true, data };
};

export const deleteCategory = async (
  id: string
): Promise<APIResponseType<null> | void> => {
  const session = await getCurrentUser();

  if (!session) return { success: false, message: 'Unauthorized!' };

  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
  }
  revalidatePath('/dashboard/category');
};

export const createCategory = async (
  values: FormData
): Promise<APIResponseType<null> | void> => {
  const session = await getCurrentUser();

  if (!session) return { success: false, message: 'Unauthorized!' };

  const data = Object.fromEntries(values);

  const validatedValues = createCategorySchema.safeParse(data);
  if (!validatedValues.success)
    return { success: false, message: 'Validation failed!' };

  const { name, slug } = validatedValues.data;
  const image = validatedValues.data.image as File;

  if (!image) {
    await prisma.category.create({
      data: {
        name,
        slug,
      },
    });
    revalidatePath('/dashboard/category');
    return { success: true, message: 'Category created!' };
  }

  const buffer = new Uint8Array(await image.arrayBuffer());
  const filename = image.name.replaceAll(' ', '_').split('.')[0];

  try {
    const uploadResult: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset: 'assets',
              public_id: filename,
            },
            (error, uploadResult) => {
              if (error) {
                reject(error);
                return {
                  success: false,
                  message: error.message,
                };
              }
              return resolve(uploadResult);
            }
          )
          .end(buffer);
      }
    );

    console.log(uploadResult);

    await prisma.category.create({
      data: {
        name,
        slug,
        image: uploadResult?.secure_url,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Category creation', error);
      return { success: false, message: error.message };
    }
  }
  revalidatePath('/dashboard/category');
};
