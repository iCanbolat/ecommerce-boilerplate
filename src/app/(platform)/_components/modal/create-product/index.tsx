'use client';
import React, { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';

import useCreateOrUpdateProduct from '../../../../../lib/hooks/use-create-product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import CustomProductSections from './product-custom-section';
import ProductCustomAside from './product-custom-aside';
import ImageSection from './image-section';
import { CustomSwitch } from '../../../../../components/ui/switch';
import { Label } from '../../../../../components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParamStore } from '../../../../../store/modal-view-state';

const CreateProductModal = (props: { data: any }) => {
  const { isVariantView, setisVariantView } = useSearchParamStore();

  const { form, onSubmit, preview, setPreview } = useCreateOrUpdateProduct({});

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
          >
            <AnimatePresence mode='wait'>
              {isVariantView && (
                <motion.div
                  key='variants'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  varn
                </motion.div>
              )}
              {!isVariantView && (
                <motion.div
                  key='product'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogHeader className='w-full flex space-x-5 items-center justify-between flex-row'>
                    <FormField
                      control={form.control}
                      name='status'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='flex items-center space-x-2'>
                              <Label htmlFor='product-mode'>Draft</Label>
                              <CustomSwitch
                                checked={field.value === 'ACTIVE'}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange('ACTIVE')
                                    : field.onChange('DRAFT');
                                }}
                                id='product-mode'
                              />
                              <Label htmlFor='product-mode'>Active</Label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='variants'
                      render={({ field }) => (
                        <FormItem className='w-[20rem] flex space-x-5 items-center flex-row'>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue='default'
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='default'>
                                Current variant: Default
                              </SelectItem>
                              {/*{variantCombinations.map((combination, idx) => (
                          <SelectItem
                            key={idx}
                            className='capitalize'
                            value={combination}
                          >
                            {combination}
                          </SelectItem>
                        ))}*/}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='w-36'></div>
                  </DialogHeader>
                  <div className='grid grid-cols-3 gap-4 '>
                    <fieldset className='border-2 border-solid border-gray-300 h-[70vh] overflow-auto p-3 col-span-2 shadow-xl'>
                      <legend className='text-md px-2 font-semibold'>
                        Product Details
                      </legend>

                      <ImageSection
                        form={form}
                        preview={preview}
                        setPreview={setPreview}
                      />

                      <CustomProductSections form={form} type='name' />

                      <CustomProductSections form={form} type='variant' />

                      <div className='justify-center flex w-full'>
                        <Button type='submit' className='w-32'>
                          Create
                        </Button>
                      </div>
                    </fieldset>

                    <aside className='space-y-5'>
                      <ProductCustomAside form={form} type='category' />

                      <ProductCustomAside form={form} type='seo' />

                      <ProductCustomAside form={form} type='stock' />
                    </aside>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
