'use client';

import { Category } from '@prisma/client';
import React, { useOptimistic } from 'react';
import { CldImage } from 'next-cloudinary';
import { useCategoryModalStore } from '@/store/modal-state';
import { motion, AnimatePresence } from 'framer-motion';

import CreateCategoryModal from '../../../_components/modal/create-category';
import ViewCategory from '../../../_components/modal/view-category';
import CategoryDropdown from './category-dropdown';
import { OptimisticUpdateTypes } from '../../../../../utils/types';

type Props = {
  data: Category[];
};

const CategoryList = ({ data }: Props) => {
  const [optimisticItems, setOptimisticItem] = useOptimistic<
    Category[],
    { action: OptimisticUpdateTypes; newCategory: Category }
  >(data, (state, { action, newCategory }) => {
    switch (action) {
      case OptimisticUpdateTypes.DELETE:
        return state.filter((item) => item.id !== newCategory.id);
      case OptimisticUpdateTypes.ADD:
        return [...state, newCategory];
      default:
        return state;
    }
  });

  const openModal = useCategoryModalStore((state) => state.openModal);

  const itemVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <>
      <CreateCategoryModal setOptimisticItem={setOptimisticItem} />
      <AnimatePresence>
        {optimisticItems?.map((item, idx) => (
          <motion.div
            key={idx}
            initial='initial'
            animate='enter'
            exit='exit'
            variants={itemVariants}
            className='h-64 w-64 relative bg-slate-500 rounded-md items-center justify-center flex flex-col cursor-pointer  '
            onClick={() => openModal(item)}
          >
            <div className='absolute inset-0 bg-black rounded-md opacity-55 hover:opacity-45 z-10'></div>
            <div className='absolute flex m-auto z-20 right-2 top-2'>
              <CategoryDropdown
                setOptimisticItem={setOptimisticItem}
                category={item}
              />
            </div>
            <h1 className='text-white text-xl font-bold absolute flex items-center justify-center z-20'>
              {item.name}
            </h1>
            {item.image && (
              <CldImage
                src={item.image}
                fill
                className='rounded-md absolute inset-0 z-0 object-cover'
                sizes='100vw'
                alt='Description of my image'
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <ViewCategory setOptimisticItem={setOptimisticItem} />
    </>
  );
};

export default CategoryList;
