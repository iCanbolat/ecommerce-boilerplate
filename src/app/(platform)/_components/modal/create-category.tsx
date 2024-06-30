'use client';
import React, { useTransition, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { createCategory } from '../../_server-actions/category';
import Image from 'next/image';
import ImageUploadBox from '../image-upload-box';
import { generateSlug } from '../../../../lib/utils';
import { createCategorySchema } from '../../../../lib/form-validations';
import { Category } from '@prisma/client';
import { OptimisticUpdateTypes } from '../../../../utils/types';

type Props = {
  setOptimisticItem: (action: {
    action: OptimisticUpdateTypes;
    newCategory: Category;
  }) => void;
};

const CreateCategoryModal = ({ setOptimisticItem }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string | null>(null);

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

  async function onSubmit(values: z.infer<typeof createCategorySchema>) {
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

    setOpen(false);
    form.reset();
    setPreview(null);

    startTransition(() => {
      setOptimisticItem({
        action: OptimisticUpdateTypes.ADD,
        newCategory: data,
      });
      toast.success(values.name + ' category added!');

      createCategory(formData).then((res) => {
        if (res?.success && !res.success) {
          toast(res.message);
        }
      });
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='h-64 w-64 bg-slate-300 rounded-md bg-opacity-30 items-center justify-center flex flex-col space-y-3 hover:bg-opacity-55 cursor-pointer'>
          <Button variant='ghost' className='rounded-full' size='icon'>
            <Plus className='h-4 w-4' />
          </Button>
          <h5 className='text-sm'>Add New Category</h5>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='space-y-5'>
          <DialogTitle>Create New Category</DialogTitle>
          {preview && (
            <Image
              src={preview}
              width={180}
              height={0}
              alt='category image'
              className='m-auto'
            />
          )}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6 my-4'
          >
            <FormField
              control={form.control}
              name='image'
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {!preview && <ImageUploadBox field={field} type='single' />}
                  </FormControl>
                  <FormDescription className='text-center'>
                    Optionally you can add category image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='name'
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Trousers' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder='category-slug' {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='justify-center flex w-full'>
              <Button type='submit' disabled={isPending}>
                {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
