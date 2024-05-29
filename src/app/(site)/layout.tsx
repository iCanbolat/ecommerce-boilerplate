import { headers } from 'next/headers';
import React from 'react';
import { Button } from '../../components/ui/button';

type Props = {};

const ClientLayout = ({ children }: { children: any }) => {
  return (
    <>
      <div className='flex justify-center  py-1  bg-slate-400'>
        <div className='flex w-[85vh] items-center'>
          <h5 className='grow'>Avon</h5>
          <Button size={'sm'}>Sign Up</Button>
        </div>
      </div>
      {children}
    </>
  );
};

export default ClientLayout;
