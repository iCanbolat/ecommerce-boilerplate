import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UseFormReturn } from 'react-hook-form';
import { createProductSchema } from '../../../../../../lib/form-validations';
import { z } from 'zod';
import ProductVariantDetail from './product-variant-detail';
import AnimatedAddInput from '../../../animated-add-input';

type Props = {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
};

const ProductVariantSection = ({ form }: Props) => {
  return (
    <div className=''>
      <h2 className='font-semibold'>Product Options</h2>
      <p className='text-muted-foreground text-sm'>
        Manage the variant of product
      </p>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='bg-white text-sm p-2'>
            <p>Color</p>
            <div className='flex'>
              <p>Red, </p>
              <p>Black</p>
            </div>
            <div></div>
          </AccordionTrigger>
          <AccordionContent>
            <ProductVariantDetail form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <AnimatedAddInput name='Create new variant'>
        <ProductVariantDetail isCreate form={form} />
      </AnimatedAddInput>
    </div>
  );
};

export default ProductVariantSection;
