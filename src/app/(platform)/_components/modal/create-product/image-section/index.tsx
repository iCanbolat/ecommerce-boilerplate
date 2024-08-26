'use client';
import React, { Dispatch, SetStateAction } from 'react';
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import ImageUploadBox from '../../../image-upload-box';
import GalleryTitle from './gallery-title';
import { createProductSchema } from '../../../../../../lib/form-validations';
import { z } from 'zod';
import { cn } from '../../../../../../lib/utils';
import ImageContainer from './image';

type ImageSectionProps = {
  form: UseFormReturn<z.infer<typeof createProductSchema>, any, undefined>;
  preview: { id: string; src: string }[];
  setPreview: Dispatch<
    SetStateAction<
      {
        id: string;
        src: string;
      }[]
    >
  >;
};

const ImageSection = ({ form, preview, setPreview }: ImageSectionProps) => {
  const [marked, setMarked] = useState<string[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFeatured = (id: string) => {
    setPreview((preview) => {
      const activeFile = preview.find((img) => img.id === id);
      return preview
        .toSpliced(
          preview.findIndex((img) => img.id === id),
          1
        )
        .toSpliced(0, 0, activeFile!);
    });
  };

  const handleMarked = (id: string, bool: boolean) =>
    setMarked(bool ? [...marked, id] : marked.filter((item) => item !== id));

  const handleDelete = () => {
    if (!marked.length) return;
    setPreview(preview?.filter((img) => !marked.includes(img.id)));
    setMarked([]);
  };

  const handleDragEnd = (data: { active: any; over: any }) => {
    const { active, over } = data;
    if (!over) return;
    if (active.id === over.id) return;

    setPreview((preview) => {
      const activeFile = preview.find((img) => img.id === active.id);
      return preview
        .toSpliced(
          preview.findIndex((img) => img.id === active.id),
          1
        )
        .toSpliced(
          preview.findIndex((img) => img.id === over.id),
          0,
          activeFile!
        );
    });
  };

  return (
    <div className='w-full'>
      <div className=' mx-auto max-w-[56rem] rounded-xl border bg-gradient-to-b from-gray-100 from-0% to-gray-200 to-100% shadow-lg'>
        <GalleryTitle marked={marked} handleDelete={handleDelete} />
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <SortableContext items={preview} strategy={rectSortingStrategy}>
            <div
              className={cn(
                'grid grid-cols-2 gap-1 p-4 sm:grid-cols-3 lg:grid-cols-5',
                {
                  'flex justify-center items-center h-full w-full':
                    preview.length < 1,
                }
              )}
            >
              {preview.map((img, i) => (
                <ImageContainer
                  key={img.id}
                  image={img}
                  featured={i === 0}
                  className=' bg-white'
                  isMarked={marked.includes(img.id)}
                  handleMarked={handleMarked}
                  handleFeatured={handleFeatured}
                />
              ))}

              <FormField
                control={form!.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploadBox
                        className={cn('h-full w-full', {
                          'h-32 w-32': preview.length < 2,
                        })}
                        field={field}
                        type='multiple'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ImageSection;
