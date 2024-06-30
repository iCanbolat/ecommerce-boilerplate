import React from 'react';
import { Button } from '../../../components/ui/button';
import GoogleButton from '../_components/google-button';
import '../login/style.css';
import VerificationForm from '../_components/new-verification-form';
import LoginSVG from '../_assets/svg-deneme';

const VerificationPage = () => {
  return (
    <div className='bg-white rounded-xl min-h-[200px] min-w-[500px] p-5 flex flex-col shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]'>
      <h5 className='font-semibold text-center text-xl'>
        Confirming your verification
      </h5>
      <div className='w-full justify-center gap-5 flex text-center'>
        <LoginSVG />
        <VerificationForm />
      </div>
    </div>
  );
};

export default VerificationPage;
