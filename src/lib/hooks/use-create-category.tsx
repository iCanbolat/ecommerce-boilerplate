import { useState, useEffect, useTransition, useOptimistic } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { generateSlug } from '@/lib/utils';
import { createCategorySchema } from '@/lib/form-validations';
import { OptimisticUpdateTypes } from '@/utils/types';
import { createCategory } from '../../app/(platform)/_server-actions/category';
import { Category } from '@prisma/client';
import { useSWRConfig } from 'swr';
 
type UseCreateCategoryProps = {
  setOptimisticItem?: (action: {
    action: OptimisticUpdateTypes;
    newCategory: Category;
  }) => void;

  whileSubmit?: () => void;
  revalidateCache?: () => void; 
};

const useCreateCategory = ({
  setOptimisticItem,
  whileSubmit,
  revalidateCache,
}: UseCreateCategoryProps) => {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate } = useSWRConfig()

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      image: undefined,
      slug: '',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'image' && value.image instanceof File) {
        setPreview(URL.createObjectURL(value.image));
      }
      if (name === 'name' && value.name) {
        form.setValue('slug', generateSlug(value.name));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof createCategorySchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('slug', values.slug);

    if (values.image) {
      formData.append('image', values.image);
    }
    let data = {
      ...values,
      image: preview,
      id: Math.floor(Math.random() * 10).toString(),
    };

    if (whileSubmit) whileSubmit();
    form.reset();
    setPreview(null);

    startTransition(async () => {
      if (setOptimisticItem) {
        setOptimisticItem({
          action: OptimisticUpdateTypes.ADD,
          newCategory: data,
        });
        const res = await createCategory(formData);
        if (res?.success && !res.success) {
          toast(res.message);
        } else {
          mutate('/api/category')
          if (revalidateCache) revalidateCache();
          toast.success(values.name + ' category added!');
        }
      }
    });
  };

  return { form, onSubmit, isPending, preview };
};

export default useCreateCategory;
