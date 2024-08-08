'use client';
import React, { useState, KeyboardEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { z } from 'zod';
import { createProductSchema } from '@/lib/form-validations';
import { Trash, X } from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import { Input } from '../../../../../../components/ui/input';

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const ProductVariantDetail = ({
  form,
  isCreate,
  setIsClicked,
  variantItem,
}: {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
  isCreate?: boolean;
  setIsClicked?: (value: boolean) => void;
  variantItem?: {
    options: string[];
    type: string;
  };
}) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setArrayValue] = useState<readonly Option[]>(
    variantItem?.options.map((i) => createOption(i)) ?? []
  );
  const [variantType, setVariantType] = useState<string>(
    variantItem?.type ?? ''
  );

  const handleKeyDown: KeyboardEventHandler = async (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const newOption = createOption(inputValue);

        const variants = form.getValues('variants') || [];
        const existingVariantIndex = variants.findIndex(
          (variant) => variant.type === variantType
        );

        if (existingVariantIndex >= 0) {
          variants[existingVariantIndex].options.push(newOption.value);
        } else {
          variants.push({ type: variantType, options: [newOption.value] });
        }

        form.setValue('variants', variants);
        setArrayValue((prev) => [...prev, newOption]);
        setInputValue('');
        event.preventDefault();
    }
  };

  const handleFieldState = (newValue: any) => {
    const newVariants = newValue.map((val: Option) => val.value);
    const variants = form.getValues('variants') || [];
    const existingVariantIndex = variants.findIndex(
      (variant) => variant.type === variantType
    );

    if (existingVariantIndex >= 0) {
      variants[existingVariantIndex].options = newVariants;
    } else {
      variants.push({ type: variantType, options: newVariants });
    }

    form.setValue('variants', variants);
    setArrayValue(newValue);
  };

  return (
    <div className='w-full flex flex-col space-y-3 p-1'>
      <div className='flex'>
        <Input
          type='text'
          placeholder='Variant Type'
          value={variantType}
          onChange={(e) => setVariantType(e.target.value.toLocaleLowerCase())}
          className='w-32'
        />
        <div className='ml-auto'>
          {isCreate ? (
            <Button
              onClick={() => setIsClicked && setIsClicked(false)}
              variant='outline'
              type='button'
              size={'icon'}
              className='rounded-full'
            >
              <X className=' h-4 w-4' strokeWidth={3} />
            </Button>
          ) : (
            <Button
              variant='destructive'
              size={'icon'}
              type='button'
              className='rounded-full'
            >
              <Trash className=' h-4 w-4' strokeWidth={3} />
            </Button>
          )}
        </div>
      </div>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => handleFieldState(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder='Enter variant options'
        value={value}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            'borderColor': state.isFocused ? '#6d28d9' : '',
            'boxShadow': 'none',
            'borderWidth': 2,
            ':hover': {
              ...baseStyles[':hover'],
              borderColor: '#6d28d9',
            },
          }),
        }}
      />
    </div>
  );
};

export default ProductVariantDetail;
