import React from 'react';
import ResetForm from '../_components/reset-form';
import LoginSVG from '../_assets/svg-deneme';
import ForgotPasswordSVG from '../_assets/svg-forgot-password';

type Props = {};

const ResetPage = (props: Props) => {
  return (
    <div className='bg-white rounded-xl min-h-[200px] min-w-[500px] p-5 flex flex-col shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)]'>
      <h5 className='font-semibold text-center text-xl'>
        Reset your password
      </h5>
      <div className='w-full justify-center items-center gap-5 flex text-center'>
        <ForgotPasswordSVG />
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPage;
