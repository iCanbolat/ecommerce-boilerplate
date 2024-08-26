import React, { useCallback, useOptimistic } from 'react';
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
import { Variant } from '../../../../../../lib/types';
import { Button } from '../../../../../../components/ui/button';
import { Edit } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchParamStore } from '../../../../../../store/modal-view-state';

type Props = {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
  //createQueryString?: (name: string, value: string) => string;
};

const ProductVariantSection = ({ form }: Props) => {
  const [variants, setVariants] = React.useState(
    form.getValues('variants').filter((variant) => variant.type !== 'default')
  );
  //const router = useRouter();
  //const pathname = usePathname();
  const { toggleisVariantView } = useSearchParamStore();

  return (
    <>
      <h2 className='font-semibold'>Product Options</h2>
      <p className='text-muted-foreground text-sm'>
        Manage the variant of product
      </p>
      <Accordion type='single' collapsible>
        {variants?.map((item, idx) => (
          <AccordionItem key={idx} value={item.type}>
            <AccordionTrigger className='bg-white text-sm p-2'>
              <p>{item.type}</p>
              <div className='flex'>{item.options.join()}</div>
              <div></div>
            </AccordionTrigger>
            <AccordionContent>
              <ProductVariantDetail
                form={form}
                variants={variants}
                variantItem={item}
                setVariants={setVariants}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className='flex justify-between w-full'>
        <AnimatedAddInput name='Create new variant'>
          <ProductVariantDetail
            isCreate
            variants={variants}
            setVariants={setVariants}
            form={form}
          />
        </AnimatedAddInput>
        <Button type='button' variant={'link'} onClick={toggleisVariantView}>
          <Edit size={14} className='mr-1' /> Edit Variants
        </Button>
      </div>
    </>
  );
};

export default ProductVariantSection;
