'use client';
import React, { useState } from 'react';
import { newPasswordSchema, signinSchema } from '../../../lib/form-validations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import FormSuccess from './form-success';
import FormError from './form-error';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '../../../server-actions/auth';

const NewPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const formNewPassword = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmitLogin(values: z.infer<typeof newPasswordSchema>) {
    setErrorMessage('');
    setSuccessMessage('');
    setIsPending((prev) => !prev);
    newPassword(values, token!)
      .then((res) =>
        res.success
          ? setSuccessMessage(res.message)
          : setErrorMessage(res.message)
      )
      .catch((err) => console.log(err))
      .finally(() => setIsPending((prev) => !prev));
  }

  return (
    <Form {...formNewPassword}>
      <form
        onSubmit={formNewPassword.handleSubmit(onSubmitLogin)}
        className='space-y-3 mt-3'
      >
        <div className='flex flex-col'>
          <FormField
            control={formNewPassword.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='password'
                    disabled={isPending}
                    placeholder='New Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormSuccess message={successMessage} />
        <FormError message={errorMessage} />
        <Button
          type='submit'
          disabled={isPending}
          size={'lg'}
          className='rounded-full'
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Reset password
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
