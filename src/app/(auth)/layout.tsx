import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className='w-full h-screen flex items-center justify-center'>
      {children}
    </main>
  );
};

export default AuthLayout;
