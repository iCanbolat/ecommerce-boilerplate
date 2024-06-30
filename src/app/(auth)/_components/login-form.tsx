'use client';
import React, { useState } from 'react';
import { signinSchema } from '../../../lib/form-validations';
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
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import FormSuccess from './form-success';
import FormError from './form-error';
import { useSearchParams } from 'next/navigation';
import { loginUser } from '../../../server-actions/auth';

const LoginForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const searchparams = useSearchParams();
  const urlError =
    searchparams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  const formLogin = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmitLogin(values: z.infer<typeof signinSchema>) {
    setErrorMessage('');
    setSuccessMessage('');
    const response = await loginUser(values);
    if (response) {
      if (!response.success) {
        setErrorMessage(response.message!);
      } else {
        setSuccessMessage(response.message!);
      }
    }
  }

  return (
    <Form {...formLogin}>
      <form
        onSubmit={formLogin.handleSubmit(onSubmitLogin)}
        className='space-y-3 mt-3'
      >
        <div className='flex flex-col'>
          <FormField
            control={formLogin.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col  '>
          <FormField
            control={formLogin.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormSuccess message={successMessage} />
        <FormError message={errorMessage || urlError} />
        <div>
          <Link href='/reset' className='hover:underline'>
            Forgot your password?
          </Link>
        </div>
        <Button
          type='submit'
          disabled={formLogin.formState.isSubmitting}
          size={'lg'}
          className='rounded-full'
        >
          {formLogin.formState.isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
