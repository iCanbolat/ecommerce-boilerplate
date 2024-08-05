import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createProductSchema } from '@/lib/form-validations';
import { Product, ProductVariant } from '@prisma/client';
import { OptimisticUpdateTypes } from '@/utils/types';
import { toast } from 'sonner';
import { generateRandomId, generateSlug } from '../utils';

type UseCreateProductProps = {
  setOptimisticItem?: (action: {
    action: OptimisticUpdateTypes;
    newProduct: Product & { variants?: ProductVariant[] };
  }) => void;
  onSuccess?: () => void;
};

const useCreateProduct = ({
  setOptimisticItem,
  onSuccess,
}: UseCreateProductProps) => {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<{ id: string; src: string }[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      category: ['all'],
      image: [],
      description: '',
      slug: '',
      sku: '',
      price: 0,
      stock: 0,
      discountedPrice: 0,
      isFeatured: false,
      seoDescription: '',
      seoTitle: '',
      status: 'ACTIVE',
      variants: [
        { type: 'color', options: ['Red', 'Black'] },
        { type: 'size', options: ['S', 'M', 'L'] },
      ],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'image' && Array.isArray(value.image)) {
        const previews = value.image.map((file) => {
          return { id: generateRandomId(10), src: URL.createObjectURL(file) };
        });
        setPreview((prev) => [...prev, ...previews]);
      }
      if (name === 'name' && value.name) {
        form.setValue('slug', generateSlug(value.name));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const generateVariantCombinations = (
    variants: { type: string; options: string[] }[]
  ) => {
    const combinations: string[] = [];

    const backtrack = (path: string[], index: number) => {
      if (index === variants.length) {
        combinations.push(path.join('-'));
        return;
      }

      for (const option of variants[index].options) {
        path.push(option);
        backtrack(path, index + 1);
        path.pop();
      }
    };

    backtrack([], 0);
    return combinations;
  };

  const variantCombinations = generateVariantCombinations(
    form.getValues().variants!
  );

  const handleVariantChange = async (variant: string) => {
    setSelectedVariant(variant);

    // Fetch the variant data from your backend
    const response = await fetch(`/api/variant/${variant}`);
    const data = await response.json();

    // Update form values based on selected variant
    form.setValue('price', data.price);
    form.setValue('description', data.description);
    form.setValue('image', data.image);
    // Add more fields as necessary
  };

  const onSubmit = async (data: z.infer<typeof createProductSchema>) => {
    console.log(data);
    //const formData = new FormData();
    //formData.append('name', data.name);
    //formData.append('price', data.price!.toString());
    //formData.append('status', data.status);
    //formData.append('stock', data.stock!.toString());
    //console.log(data.image);

    //data.image?.forEach((file: string | Blob) =>
    //  formData.append('image', file)
    //);
    //if (data.variants) {
    //  formData.append('variants', JSON.stringify(data.variants));
    //}
    //if (data.description) {
    //  formData.append('description', data.description);
    //}
    //console.log(formData.getAll('image'));
  };

  return {
    form,
    onSubmit,
    isPending,
    preview,
    setPreview,
    variantCombinations,
    selectedVariant,
    handleVariantChange,
  };
};

export default useCreateProduct;
