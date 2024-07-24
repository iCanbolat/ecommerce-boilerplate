'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { createProductSchema } from '../../../../../lib/form-validations';
import MultiSelect from '../../multi-select';
import ImageSection from './image-section';
import CategorySection from './category-section';
import { ProductStatus } from '@prisma/client';
import useCreateProduct from '../../../../../lib/hooks/use-create-product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import { Textarea } from '../../../../../components/ui/textarea';

const CreateProductModal = () => {
  const { form, onSubmit, preview } = useCreateProduct({});

  const getCurrentVariantString = (value: {
    options: string[];
    type: string;
  }): string => {
    return '';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap capitalize'>
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
            id='form1'
          >
            <DialogHeader className='w-full flex space-x-5 items-center flex-row'>
              <DialogTitle>Create New Product</DialogTitle>
              <FormField
                control={form.control}
                name='variants'
                render={({ field }) => (
                  <FormItem className='w-[20rem] flex space-x-5 items-center flex-row'>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Current variant: None' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent></SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogHeader>
            <div className='grid grid-cols-3 gap-4 '>
              <fieldset className='border-2 border-solid border-gray-300 h-full overflow-auto p-3 col-span-2 shadow-xl'>
                <legend className='text-md px-2 font-semibold'>
                  Product Details
                </legend>

                {/* Product Images */}
                <ImageSection form={form} preview={preview} />

                {/* Product Basic info */}
                <div className='rounded-xl border bg-gradient-to-b from-gray-100 from-0% to-gray-200 to-100% shadow-lg my-5 p-3 space-y-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Product Name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Tell us a little bit about product'
                            className='resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='justify-center flex w-full'>
                  <Button type='submit' form='form1'>
                    Create
                  </Button>
                </div>
              </fieldset>
              <aside className='space-y-5'>
                <fieldset className='border-2 border-solid border-gray-300 p-3 h-36 overflow-y-auto overflow-x-hidden shadow-xl'>
                  <legend className='text-md px-2 font-semibold'>
                    Categories
                  </legend>
                  <CategorySection form={form} />
                </fieldset>
                <fieldset className='border-2 border-solid border-gray-300 p-3 h-36 overflow-y-auto overflow-x-hidden shadow-xl'>
                  <legend className='text-md px-2 font-semibold'>
                    Categories
                  </legend>
                  <CategorySection form={form} />
                </fieldset>
              </aside>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
