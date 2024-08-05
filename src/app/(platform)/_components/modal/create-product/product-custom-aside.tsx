import React from 'react';
import { createProductSchema } from '../../../../../lib/form-validations';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
 import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { Textarea } from '../../../../../components/ui/textarea';
import CategorySection from './category-section';

type ProductCustomAsideProps = {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>; 
  type?: 'category' | 'seo' | 'stock';
};

const ProductCustomAside = ({ form, type }: ProductCustomAsideProps) => {
  return (
    <>
      {type === 'category' && (
        <fieldset className='border-2 border-solid border-gray-300 p-3 h-44 overflow-y-auto overflow-x-hidden shadow-xl'>
          <legend className='text-md px-2 font-semibold'>Categories</legend>
          <CategorySection form={form} />
        </fieldset>
      )}
      {type === 'seo' && (
        <fieldset className='border-2 border-solid border-gray-300 p-3 overflow-y-auto overflow-x-hidden shadow-xl'>
          <legend className='text-md px-2 font-semibold'>SEO Settings</legend>
          <FormField
            control={form.control}
            name='seoTitle'
            render={({ field }) => (
              <FormItem className='mb-2'>
                <FormLabel>Product Title</FormLabel>
                <FormControl>
                  <Input placeholder='Product web title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='seoDescription'
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Type keywords for better SEO '
                    className='resize-none'
                    {...field}
                  />
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
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
      )}
      {type === 'stock' && (
        <fieldset className='border-2 border-solid border-gray-300 p-3 h-56 overflow-y-auto overflow-x-hidden shadow-xl'>
          <legend className='text-md px-2 font-semibold'>Stocks</legend>
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='mb-2'>
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value && Math.max(0, field.value)}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : e.target.value
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='sku'
            render={({ field }) => (
              <FormItem className='mb-2'>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
      )}
    </>
  );
};

export default ProductCustomAside;
