import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/utils/auth';
import prisma from '@/lib/prisma';

export const GET = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const session = await getCurrentUser();

  if (!session)
    return NextResponse.json({ success: false, message: 'Unauthorized!' });

  try {
    const productWithVariants = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        variants: {
          include: {
            variantValues: true,
          },
        },
        categories: true,
      },
    });

    return NextResponse.json({ success: true, data: productWithVariants });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
};
