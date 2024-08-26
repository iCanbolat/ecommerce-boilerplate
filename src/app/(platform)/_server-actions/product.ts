'use server';
import { UploadApiResponse } from 'cloudinary';
import { createProductSchema } from '../../../lib/form-validations';
import { getCurrentUser } from '../../../utils/auth';
import { APIResponseType } from '../../../utils/types';
import { cloudinary } from '../../../lib/cloudinary';
import prisma from '../../../lib/prisma';
import { generateVariantCombinations } from '../../../lib/utils';
import { z } from 'zod';
import { Variant } from '../../../lib/types';

export const createProduct = async (values: FormData) => {
  const session = await getCurrentUser();

  if (!session) return { success: false, message: 'Unauthorized!' };

  const { success, data, error, message } = validateData(values);

  if (!success) return { error, message };

  const {
    category,
    isFeatured,
    name,
    slug,
    status,
    description,
    seoDescription,
    seoTitle,
  } = data!;

  const existingProduct = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true, categories: true },
  });

  let product;

  if (existingProduct) {
    const existingCategoryIds = existingProduct.categories.map((cat) => cat.id);

    const categoriesToConnect = category.filter(
      (id) => !existingCategoryIds.includes(id)
    );
    const categoriesToDisconnect = existingCategoryIds.filter(
      (id) => !category.includes(id)
    );

    try {
      product = await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          name,
          description,
          isFeatured,
          status,
          seoTitle,
          seoDescription,
          categories: {
            connect: categoriesToConnect.map((id) => ({
              id: id,
            })),
            disconnect: categoriesToDisconnect.map((id) => ({
              id: id,
            })),
          },
        },
      });
    } catch (error) {
      console.error('Error updating product categories:', error);
    }
  } else {
    product = await prisma.product.create({
      data: {
        name,
        description,
        slug,
        isFeatured,
        status,
        seoTitle,
        seoDescription,
        categories: {
          connect: category.map((categoryId) => ({
            id: categoryId,
          })),
        },
      },
    });
    z;
  }

  //const variantCombinations = generateVariantCombinations(variants);

  //const includesAll = (arr, values) => values.every((v) => arr.includes(v));

  //if (includesAll(variants, existingProduct?.variants)) {

  //}

  const response = await createOrUpdateProductVariant({
    validatedData: data!,
    productId: existingProduct?.id ?? product!.id,
  });

  //const uploadedImages = await uploadImages(image);

  //console.log(variants);

  //console.log('variantCombinations', variantCombinations);

  //// Prepare data for ProductVariant creation
  //const variantData = variantCombinations.map((combination) => {
  //  const variantName = combination.join(' ');
  //  return {
  //    variantName,
  //    price,
  //    stock,
  //    //image: uploadedImages,
  //    productId: product.id,
  //  };
  //});
  //const defaultVariant = {
  //  variantName: 'default',
  //  price,
  //  stock,
  //  //image: uploadedImages,
  //  productId: product.id,
  //};
  //variantData.push(defaultVariant);
  //console.log('variantData', variantData);

  //// Create the variants
  //const createdVariants = await prisma.productVariant.createManyAndReturn({
  //  data: variantData,
  //});
  //console.log('creatvariants', createdVariants);

  // Step 5: Create the variant options
  //for (let i = 0; i < variantCombinations.length; i++) {
  //  const combination = variantCombinations[i];
  //  const variant = createdVariants[i];

  //  await prisma.variantOption.createMany({
  //    data: combination.map((option, index) => ({
  //      name: variants[index].type,
  //      value: option,
  //      productVariantId: variant.id,
  //    })),
  //  });
  //}
};

const updateVariant = async (targetVariant: string) => {};

const createOrUpdateProductVariant = async ({
  validatedData,
  productId,
}: {
  validatedData: z.infer<typeof createProductSchema>;
  productId: string;
}) => {
  const {
    images,
    variants,
    stock,
    sku,
    discountedPrice,
    price,
    currentVariant,
  } = validatedData;
  const variantCombinations = generateVariantCombinations(variants);

  console.log(variants);

  const existingVariant = await prisma.productVariant.findUnique({
    where: { id: 'clzyaq73d000r130xuu58e678' },
    include: {
      variantValues: true,
    },
  });

  if (existingVariant) {
    const uploadedImages = await uploadImages(images);
    const variantCombinations = generateVariantCombinations(variants);
    const updatedVariant = await prisma.productVariant.update({
      where: { id: 'clzyaq73d000r130xuu58e678' },
      data: {
        price,
        stock,
        sku,
        discountedPrice,
        images: {
          deleteMany: {},
          create: uploadedImages.map((url) => ({ url })),
        },
      },
    });
    //await prisma.variantOption.updateMany({
    //  where: {
    //    productVariantId: updatedVariant.id,
    //  },
    //  data: variants.map((variant) => ({
    //    name: variant.type,
    //    value: variant.options,
    //  })),
    //});
    return;
  }

  console.log('variantCombinations', variantCombinations);
  const variantData = variantCombinations.map((combination) => {
    const variantName = combination.join(' ');
    return {
      variantName,
      price,
      sku,
      stock,
      productId,
    };
  });

  variantData.push({
    variantName: 'default',
    price,
    sku,
    stock,
    productId,
  });

  console.log('variantData', variantData);

  const upsertedVariants = await Promise.all(
    variantData.map(async (data) => {
      const { variantName, ...rest } = data;

      return await prisma.productVariant.upsert({
        where: {
          productId_variantName: {
            productId,
            variantName,
          },
        },
        update: rest,
        create: { variantName, ...rest },
      });
    })
  );

  console.log('Upserted variants', upsertedVariants);

  // Upsert the variant options
  for (let i = 0; i < variantCombinations.length; i++) {
    const combination = variantCombinations[i];
    const variant = upsertedVariants[i];

    for (let j = 0; j < combination.length; j++) {
      const option = combination[j];

      await prisma.variantOption.upsert({
        where: {
          productVariantId_name: {
            productVariantId: variant.id,
            name: variants[j].type,
          },
        },
        update: { value: option },
        create: {
          name: variants[j].type,
          value: option,
          productVariantId: variant.id,
        },
      });
    }
  }

  //for await (const data of variantData) {
  //  const { variantName, ...rest } = data;

  //  await prisma.productVariant.upsert({
  //    where: {
  //      productId_variantName: {
  //        productId,
  //        variantName,
  //      },
  //    },
  //    update: rest,
  //    create: {
  //      variantName,
  //      ...rest,
  //    },
  //  });
  //}

  //const createdVariantsList = await prisma.productVariant.findMany();

  //console.log('creatvariants', createdVariantsList);

  //for (let i = 0; i < variantCombinations.length; i++) {
  //  const combination = variantCombinations[i];
  //  const variant = createdVariantsList[i];

  //  await prisma.variantOption.createMany({
  //    data: combination.map((option, index) => ({
  //      name: variants[index].type,
  //      value: option,
  //      productVariantId: variant.id,
  //    })),
  //  });
  //}
};

const uploadImages = async (images: File[]) => {
  let uploadedImages: string[] = [];

  for (const item of images) {
    const buffer = new Uint8Array(await item.arrayBuffer());
    const filename = item.name.replaceAll(' ', '_').split('.')[0];
    const uploadResult: UploadApiResponse = await new Promise(
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
              return resolve(uploadResult as UploadApiResponse);
            }
          )
          .end(buffer);
      }
    );
    uploadedImages.push(uploadResult.secure_url);
  }
  return uploadedImages;
};

const validateData = (
  values: FormData
): {
  success: boolean;
  data?: z.infer<typeof createProductSchema>;
  message?: string;
  error?: z.ZodIssue[];
} => {
  let rawData = Object.fromEntries(values);

  let data = {
    ...rawData,
    images: values.getAll('images') as File[],
    price: parseFloat(rawData.price as string),
    stock: parseInt(rawData.stock as string),
    discountedPrice: rawData.discountedPrice
      ? parseFloat(rawData.discountedPrice as string)
      : undefined,
    isFeatured: Boolean(rawData.isFeatured),
    variants: JSON.parse(rawData.variants as string),
    category: JSON.parse(rawData.category as string),
  };

  const validatedValues = createProductSchema.safeParse(data);
  if (!validatedValues.success)
    return {
      success: false,
      message: 'Validation failed!',
      error: validatedValues.error.issues,
    };
  return { success: true, data: validatedValues.data };
};
