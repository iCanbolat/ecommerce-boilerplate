import React from 'react';
import CreateCategoryModal from '../../_components/modal/create-category';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../../../../components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { getAllCategory } from '../../_server-actions/category';
import CldImage from '../../_components/image-wrapper';
import CategoryList from './_components/category-list';

type Props = {};

const CategoryPage = async (props: Props) => {
  const { success, data } = await getAllCategory();

  if (!success) return null;

  return (
    <div className='flex flex-col w-full space-y-5 h-[80vh]'>
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
          {/*<div className='flex flex-row'>Breadcrumb</div>*/}
        </CardHeader>
        <CardContent className='flex space-x-3'>
          <CategoryList data={data!}/>
          {/*<CreateCategoryModal />*/}
          {/*{data?.map((item, idx) => (
            <div
              key={idx}
              className='h-64 w-64 relative bg-slate-500 rounded-md items-center justify-center flex flex-col cursor-pointer transform transition-transform duration-400 ease-in-out scale-0 animate-scale-up'
            >
              <div className='absolute inset-0 bg-black rounded-md opacity-55 hover:opacity-45 z-10'></div>
              <div className='absolute flex m-auto z-20  right-2 top-2'>
                <Button
                  size={'icon'}
                  className='hover:bg-white/40 rounded-full w-7 h-7'
                  variant={'ghost'}
                >
                  <DotsHorizontalIcon color='#FFF' className='w-6 h-6' />
                </Button>
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
            </div>
          ))}*/}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPage;
