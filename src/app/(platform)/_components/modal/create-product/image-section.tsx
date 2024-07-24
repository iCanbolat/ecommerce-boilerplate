'use client';
import React from 'react';
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
//import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import ImageUploadBox from '../../image-upload-box';
import { useState } from 'react';
import Image from './image';
import {
  DndContext,
  DragOverlay,
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
import {
  restrictToWindowEdges,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import AddNewImage from './new';

type ImageSectionProps = {
  form?: UseFormReturn<any>;
  preview?: string[];
};
const generatedImages = [];
for (let i = 1; i < 12; i++) {
  generatedImages.push({
    id: i.toString(),
    src: `./images/image-${i}.${i < 10 ? 'webp' : 'jpeg'}`,
  });
}
const ImageSection = ({ form, preview }: ImageSectionProps) => {
  const [imageFiles, setImageFiles] = useState(generatedImages);
  const [marked, setMarked] = useState([]);

  // for image box
  const [imgBoxElm, setImgBoxElm] = useState(null);
  // handler functions
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

  const handleFeatured = (id) => {
    setImageFiles((imageFiles) => {
      const activeFile = imageFiles.find((img) => img.id === id);
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === id),
          1
        )
        .toSpliced(0, 0, activeFile);
    });
  };

  const handleMarked = (id, bool) =>
    setMarked(bool ? [...marked, id] : marked.filter((item) => item !== id));

  const handleMarkAll = () => setMarked(imageFiles.map((img) => img.id));
  const handleUnmarkAll = () => setMarked([]);

  const handleDelete = () => {
    if (!marked.length) return;
    setImageFiles(imageFiles.filter((img) => !marked.includes(img.id)));
    setMarked([]);
  };

  const handleDragEnd = (data) => {
    const { active, over } = data;
    if (!over) return;
    if (active.id === over.id) return;

    setImageFiles((imageFiles) => {
      const activeFile = imageFiles.find((img) => img.id === active.id);
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === active.id),
          1
        )
        .toSpliced(
          imageFiles.findIndex((img) => img.id === over.id),
          0,
          activeFile
        );
    });
  };

  return (
    //<div className='w-full h-full bg-red-400'>
    //  {preview?.map((src, idx) => (
    //    <Image
    //      key={idx}
    //      src={src}
    //      width={180}
    //      height={0}
    //      alt='Product image preview'
    //      className='m-auto'
    //    />
    //  ))}

    //  <FormField
    //    control={form.control}
    //    name='image'
    //    render={({ field }) => (
    //      <FormItem>
    //        <FormControl>
    //          {preview.length < 1 && (
    //            <ImageUploadBox
    //              className='w-36 h-36'
    //              field={field}
    //              type='multiple'
    //            />
    //          )}
    //        </FormControl>
    //        <FormMessage />
    //      </FormItem>
    //    )}
    //  />
    //</div>
    <div className='w-full'>
      <div className=' mx-auto max-w-[56rem] rounded-xl border bg-gradient-to-b from-gray-100 from-0% to-gray-200 to-100% shadow-lg'>
        {/* body portion */}
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
          <SortableContext items={imageFiles} strategy={rectSortingStrategy}>
            <div
              className={` grid grid-cols-2 gap-1 p-4 sm:grid-cols-3 lg:grid-cols-5 [&>*:not(.aspect-auto)]:aspect-square`}
            >
              {imageFiles.map((img, i) => (
                <Image
                  key={img.id}
                  image={img}
                  featured={i === 0}
                  className=' bg-white'
                  isMarked={marked.includes(img.id)}
                  handleMarked={handleMarked}
                  handleFeatured={handleFeatured}
                  setImgBoxElm={setImgBoxElm}
                />
              ))}

              <AddNewImage
                className={
                  !imageFiles.length ? 'col-span-full mx-auto p-12' : ''
                }
                setImageFiles={setImageFiles}
              />
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ImageSection;
