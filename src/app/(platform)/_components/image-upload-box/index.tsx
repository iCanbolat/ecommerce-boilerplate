'use client';
import { ImagePlus } from 'lucide-react';
import React from 'react';
import { Input } from '../../../../components/ui/input';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../../../../lib/utils';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  type: 'multiple' | 'single';
  className?: string;
  customFn?: any;
};

const ImageUploadBox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  field,
  type,
  className,
  customFn,
}: Props<TFieldValues, TName>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    field.onChange(type === 'single' ? files[0] : files);
    //customFn((prev) => [...prev, files]);
  };

  return (
    <div
      className={cn(
        'm-auto border-2 border-dotted border-slate-400 rounded-lg bg-slate-300 hover:bg-slate-300/70 relative',
        className
      )}
    >
      <ImagePlus size={36} color='#ffffff' className='m-auto h-full' />
      <Input
        id='image'
        onBlur={field.onBlur}
        name={field.name}
        className='inset-0 absolute opacity-0 h-full cursor-pointer'
        multiple={type === 'multiple'}
        onChange={handleChange}
        type='file'
      />
    </div>
  );
};

export default ImageUploadBox;
