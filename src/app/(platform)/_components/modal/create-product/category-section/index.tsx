import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';
import { z } from 'zod';

import CategoryList from './category-list';
import { createProductSchema } from '@/lib/form-validations';
import AnimatedAddInput from '../../../animated-add-input';
import CategoryAddInput from './category-add';

type Props = {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CategorySection = ({ form }: Props) => {
  const { data, error, isLoading } = useSWR('/api/category', fetcher);
  return (
    <>
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {error && <p>Error loading categories: {error}</p>}
      <CategoryList categories={data} form={form} />

      <AnimatedAddInput name='Create new category'>
        <CategoryAddInput />
      </AnimatedAddInput>
    </>
  );
};

export default CategorySection;
