'use client';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createProductSchema } from '@/lib/form-validations';
import { Product, ProductVariant } from '@prisma/client';
import { OptimisticUpdateTypes } from '@/utils/types';
import { toast } from 'sonner';
import { generateRandomId, generateSlug } from '../utils';
import { createProduct } from '../../app/(platform)/_server-actions/product';
import useSWR from 'swr';

type useCreateOrUpdateProductProps = {
  setOptimisticItem?: (action: {
    action: OptimisticUpdateTypes;
    newProduct: Product & { variants?: ProductVariant[] };
  }) => void;
  currentProduct?: any;
};

const useCreateOrUpdateProduct = ({
  setOptimisticItem,
  currentProduct,
}: useCreateOrUpdateProductProps) => {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<{ id: string; src: string }[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  //const fetcher = (url: string) => fetch(url).then((res) => res.json());
  //const { data, error, isLoading } = useSWR('/api/category', fetcher);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: 'test',
      images: [],
      price: 20,
      description: undefined,
      discountedPrice: undefined,
      isFeatured: false,
      category: [],
      seoDescription: undefined,
      seoTitle: undefined,
      status: 'ACTIVE',
      sku: undefined,
      stock: 20,
      slug: 'test',
      currentVariant: undefined,
      variants: [
        //{ type: 'default', options: [] },
        { type: 'color', options: ['red', 'black'] },
        { type: 'size', options: ['m', 'l'] },
      ],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'images' && Array.isArray(value.images)) {
        const previews = value.images.map((file) => {
          return { id: generateRandomId(10), src: URL.createObjectURL(file!) };
        });
        setPreview((prev) => [...prev, ...previews]);
      }
      if (name === 'name' && value.name) {
        form.setValue('slug', generateSlug(value.name));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  //const generateVariantCombinations = (
  //  variants: { type: string; options: string[] }[]
  //) => {
  //  const combinations: string[] = [];

  //  const backtrack = (path: string[], index: number) => {
  //    if (index === variants.length) {
  //      combinations.push(path.join('-'));
  //      return;
  //    }

  //    for (const option of variants[index].options) {
  //      path.push(option);
  //      backtrack(path, index + 1);
  //      path.pop();
  //    }
  //  };

  //  backtrack([], 0);
  //  return combinations;
  //};

  //const variantCombinations = generateVariantCombinations(
  //  form.getValues().variants!
  //);

  //const handleVariantChange = async (variant: string) => {
  //  setSelectedVariant(variant);

  //  // Fetch the variant data from your backend
  //  const response = await fetch(`/api/variant/${variant}`);
  //  const data = await response.json();

  //  // Update form values based on selected variant
  //  form.setValue('price', data.price);
  //  form.setValue('description', data.description);
  //  form.setValue('image', data.image);
  //  // Add more fields as necessary
  //};

  const onSubmit = async (data: z.infer<typeof createProductSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price!.toString());
        formData.append('status', data.status);
        formData.append('stock', data.stock!.toString());

        if (data.description) {
          formData.append('description', data.description);
        }
        if (data.currentVariant) {
          formData.append('currentVariant', data.currentVariant);
        }
        if (data.discountedPrice !== undefined) {
          formData.append('discountedPrice', data.discountedPrice.toString());
        }
        formData.append('isFeatured', data.isFeatured.toString());
        if (data.seoDescription) {
          formData.append('seoDescription', data.seoDescription);
        }
        if (data.seoTitle) {
          formData.append('seoTitle', data.seoTitle);
        }
        if (data.slug) {
          formData.append('slug', data.slug);
        }

        data.images?.forEach((file: string | Blob) => {
          formData.append('images', file);
        });

        if (data.variants) {
          formData.append('variants', JSON.stringify(data.variants));
        }

        formData.append('category', JSON.stringify(data.category));

        const response = await createProduct(formData);
        console.log(formData.getAll('images'));

        console.log(response);

        //if (setOptimisticItem) {
        //  setOptimisticItem({
        //    action: OptimisticUpdateTypes.ADD,
        //    newProduct: result,
        //  });
        //}

        //toast.success('Product created successfully!');
      } catch (error) {
        console.error(error);
        //toast.error('Failed to create product');
      }
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    preview,
    setPreview,
    //variantCombinations,
    selectedVariant,
    //handleVariantChange,
  };
};

export default useCreateOrUpdateProduct;
