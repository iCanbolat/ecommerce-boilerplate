import { headers } from 'next/headers';
import React from 'react';
import { Button } from '../../components/ui/button';
import { auth, signIn, signOut } from '../../auth';

type Props = {};

const ClientLayout = async ({ children }: { children: any }) => {
  const session = await auth();
  return (
    <>
      <div className='flex justify-center  py-1  bg-slate-400'>
        <div className='flex w-[85vh] items-center'>
          <h5 className='grow'>Avon</h5>
          {session?.user ? (
            <>
              <p>{session.user.name}</p>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <Button> Sign Out</Button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn();
              }}
            >
              <Button> Sign in</Button>
            </form>
          )}
        </div>
      </div>
      {children}
    </>
  );
};

export default ClientLayout;
