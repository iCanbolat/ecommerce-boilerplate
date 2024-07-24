import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createProductSchema } from '@/lib/form-validations';
import { Product, ProductVariant } from '@prisma/client';
import { OptimisticUpdateTypes } from '@/utils/types';
import { toast } from 'sonner';

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
  const [preview, setPreview] = useState<string[]>([]);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      category: ['all'],
      image: [],
      description: '',
      price: 0,
      status: 'ACTIVE',
      stock: 0,
      variants: [{ type: 'color', options: ['Red', 'Black'] }],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'image' && Array.isArray(value.image)) {
        const previews = value.image.map((file) => URL.createObjectURL(file));
        setPreview(previews);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: z.infer<typeof createProductSchema>) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price!.toString());
    formData.append('status', data.status);
    formData.append('stock', data.stock!.toString());
    console.log(data.image);

    data.image?.forEach((file: string | Blob) =>
      formData.append('image', file)
    );
    if (data.variants) {
      formData.append('variants', JSON.stringify(data.variants));
    }
    if (data.description) {
      formData.append('description', data.description);
    }
    console.log(formData.getAll('image'));
  };

  return { form, onSubmit, isPending, preview };
};

export default useCreateProduct;
