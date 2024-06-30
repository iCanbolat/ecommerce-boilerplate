import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
import { getCurrentUser } from '../../../utils/auth';
import { createCategorySchema } from '../../../lib/form-validations';
import prisma from '../../../lib/prisma';

export const POST = async (req: NextRequest) => {
  const session = await getCurrentUser();

  if (!session)
    return NextResponse.json({ success: false, message: 'Unauthorized!' });

  const formData = await req.formData();
  const data = Object.fromEntries(formData);

  const validatedValues = createCategorySchema.safeParse(data);
  if (!validatedValues.success) {
    console.log(validatedValues.error.issues);
    return NextResponse.json({ success: false, message: 'Validation failed!' });
  }

  const image = validatedValues.data.image as File;

  if (!image) {
    await prisma.category.create({
      data: {
        name: validatedValues.data.name,
      },
    });
    return NextResponse.json({ success: true, message: 'Category created!' });
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = image.name.replaceAll(' ', '_');

  try {
    await writeFile(path.join(process.cwd(), 'public/' + filename), buffer);
    return NextResponse.json({
      success: true,
      message: 'Category created with image!',
    });
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ success: false, message: error });
  }
};
