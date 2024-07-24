import React, { useOptimistic, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../../../components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Check, X } from 'lucide-react';
import useCreateCategory from '@/lib/hooks/use-create-category';
import CategoryList from './category-list';
import { Category } from '@prisma/client';
import { OptimisticUpdateTypes } from '../../../../../utils/types';
import useFetch from '../../../../../lib/hooks/use-fetch';
import useSWR from 'swr';

type Props = {
  form: UseFormReturn<
    {
      category: string[];
      name: string;
      status: 'DRAFT' | 'ACTIVE';
      image?: any;
      description?: string | undefined;
      price?: number | undefined;
      stock?: number | undefined;
      variants?:
        | {
            options: string[];
            type: string;
          }[]
        | undefined;
    },
    any,
    undefined
  >;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CategorySection = ({ form }: Props) => {
  //const { data, error, loading, revalidate } =
  //  useFetch<Category[]>('/api/category');

  const { data, error } = useSWR('/api/category', fetcher);

  const [optimisticItems, setOptimisticItem] = useOptimistic<
    any,
    { action: OptimisticUpdateTypes; newCategory: Category }
  >(data || [], (state, { action, newCategory }) => {
    switch (action) {
      case OptimisticUpdateTypes.DELETE:
        return state.filter(
          (item: { id: string }) => item.id !== newCategory.id
        );
      case OptimisticUpdateTypes.ADD:
        return { ...state, data: [...state.data, newCategory] };
      default:
        return state;
    }
  });

  const [isClicked, setIsClicked] = useState(false);

  const { form: createCategoryForm, onSubmit } = useCreateCategory({
    whileSubmit: () => setIsClicked(false),
    setOptimisticItem,
  });

  const handleCancel = () => {
    setIsClicked(false);
  };

  return (
    <>
      {/*{loading && <p>Loading...</p>}*/}
      {error && <p>Error loading categories: {error}</p>}
      <CategoryList categories={optimisticItems} form={form} />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          layout
         >
          {!isClicked && (
            <Button
              type='button'
              onClick={() => setIsClicked(true)}
              variant={'link'}
            >
              <Plus size={14} className='mr-1' /> Create New Category
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            layout
           >
            <Form {...createCategoryForm}>
              <form className='mt-4 flex items-center space-x-2' id='form2'>
                <FormField
                  control={createCategoryForm.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='Category Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={createCategoryForm.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='category-slug'
                          className='hidden opacity-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='button'
                  onClick={createCategoryForm.handleSubmit(onSubmit)}
                  form='form2'
                >
                  <Check size={16} />
                </Button>
                <Button
                  type='button'
                  onClick={handleCancel}
                  variant='secondary'
                >
                  <X size={16} />
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategorySection;
