import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Category } from '@prisma/client';
import { createProductSchema } from '../../../../../../lib/form-validations';

type Props = {
  categories: any;
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
};

const CategoryList = ({ categories, form }: Props) => {
  return (
    <div className='pl-4 space-y-2'>
      {categories?.data?.map((item: Category, idx: number) => (
        <FormField
          key={idx}
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormItem className='flex flex-row items-start space-x-2 space-y-[1px]'>
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.name)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.name])
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== item.name
                            )
                          );
                    }}
                  />
                </FormControl>
                <FormLabel className='font-normal capitalize'>
                  {item.name}
                </FormLabel>
              </FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default CategoryList;
