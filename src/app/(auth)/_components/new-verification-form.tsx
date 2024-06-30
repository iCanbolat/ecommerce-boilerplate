'use client';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import FormSuccess from './form-success';
import FormError from './form-error';
import Link from 'next/link';
import { newVerification } from '../../../server-actions/auth';

type Props = {};

const VerificationForm = (props: Props) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token!');
      return;
    }
    newVerification(token)
      .then((response) => {
        response.success
          ? setSuccess(response.message)
          : setError(response.message);
      })
      .catch(() => setError('Something went wrong!'));
  }, [token, error, success]);

  React.useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className='flex text-center space-y-5 m-auto justify-center flex-col'>
      {!success && !error && <BeatLoader />}
      <FormSuccess message={success} />
      <FormError message={error} />
      <Link href={'/login'} className='hover:underline '>
        Back to login
      </Link>
    </div>
  );
};

export default VerificationForm;
