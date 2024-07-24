import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus } from 'lucide-react';
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
import Image from 'next/image';
import ImageUploadBox from '../image-upload-box';
import { Category } from '@prisma/client';
import { OptimisticUpdateTypes } from '../../../../utils/types';
import useCreateCategory from '../../../../lib/hooks/use-create-category';

type Props = {
  setOptimisticItem: (action: {
    action: OptimisticUpdateTypes;
    newCategory: Category;
  }) => void;
};

const CreateCategoryModal = ({ setOptimisticItem }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { form, onSubmit, isPending, preview } = useCreateCategory({
    setOptimisticItem,
    whileSubmit: () => setOpen(false),
  });
  
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
