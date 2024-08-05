'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import useCreateCategory from '../../../../../../lib/hooks/use-create-category';

type CategoryAddInputProps = {
  setIsClicked?: (value: boolean) => void;
};

const CategoryAddInput = ({ setIsClicked }: CategoryAddInputProps) => {
  const { form, onSubmit } = useCreateCategory({
    whileSubmit: () => setIsClicked && setIsClicked(false),
  });
  return (
    <Form {...form}>
      <form className='mt-4 flex items-center space-x-2'>
        <FormField
          control={form.control}
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
          control={form.control}
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
        <Button type='button' onClick={form.handleSubmit(onSubmit)}>
          <Check size={16} />
        </Button>
        <Button
          type='button'
          onClick={() => setIsClicked && setIsClicked(false)}
          variant='secondary'
        >
          <X size={16} />
        </Button>
      </form>
    </Form>
  );
};

export default CategoryAddInput;
