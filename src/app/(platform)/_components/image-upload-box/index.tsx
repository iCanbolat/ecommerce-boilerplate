'use client';
import { ImagePlus } from 'lucide-react';
import React from 'react';
import { Input } from '../../../../components/ui/input';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  type: 'multiple' | 'single';
};

const ImageUploadBox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  type,
}: Props<TFieldValues, TName>) => {
  return (
    <div className='m-auto w-52 h-52 border-2 border-dotted border-slate-400 rounded-lg bg-slate-300 hover:bg-slate-300/70 relative'>
      <ImagePlus size={36} color='#ffffff' className='m-auto h-full' />
      <Input
        id='image'
        onBlur={field.onBlur}
        name={field.name}
        className='inset-0 absolute opacity-0 h-full cursor-pointer'
        onChange={(e) => {
          field.onChange(
            type === 'single' ? e.target.files?.[0] : e.target.files
          );
        }}
        type='file'
      />
    </div>
  );
};

export default ImageUploadBox;
