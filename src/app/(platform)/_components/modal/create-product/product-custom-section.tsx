import React, { ChangeEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { createProductSchema } from '../../../../../lib/form-validations';
import { z } from 'zod';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { Textarea } from '../../../../../components/ui/textarea';
import { Checkbox } from '../../../../../components/ui/checkbox';
import ProductVariantSection from './variant-section';
import { formatPrice } from '../../../../../lib/utils';

type CustomProductSectionsProps = {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
  type?: 'pricing' | 'name' | 'variant';
};

const CustomProductSections = ({ form, type }: CustomProductSectionsProps) => {
  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: 'discountedPrice' | 'price'
  ): void => {
    const value = event.target.value.replace(/[^0-9]/g, ''); //
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      form.setValue(type, numberValue);
      event.target.value = formatPrice(numberValue);
    }
  };

  return (
    <div className='rounded-xl border bg-gradient-to-b from-gray-100 from-0% to-gray-200 to-100% shadow-lg my-5 p-3 space-y-3'>
      {type === 'name' && (
        <>
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
          <div className='flex justify-between'>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handlePriceChange(e, 'price');
                      }}
                      value={
                        field.value !== undefined
                          ? formatPrice(field.value)
                          : ''
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discountedPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handlePriceChange(e, 'discountedPrice');
                      }}
                      value={
                        field.value !== undefined
                          ? formatPrice(field.value)
                          : ''
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    If you have discounted price
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='isFeatured'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-2 space-y-[1px]'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange(checked)
                        : field.onChange(!field.value);
                    }}
                  />
                </FormControl>
                <FormLabel className='font-normal cursor-pointer'>
                  Feature this product
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {type === 'variant' && <ProductVariantSection form={form} />}
    </div>
  );
};

export default CustomProductSections;
