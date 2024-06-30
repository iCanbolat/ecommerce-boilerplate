'use client';
import React, { useState } from 'react';
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

import { signupSchema } from '../../../lib/form-validations';
import FormSuccess from './form-success';
import FormError from './form-error';
import { registerUser } from '../../../server-actions/auth';

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formRegister = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  async function onSubmitRegister(values: z.infer<typeof signupSchema>) {
    console.log('up', values);
    setErrorMessage('');
    setSuccessMessage('');
    const { success, message } = await registerUser(values);
    if (!success) {
      setErrorMessage(message!);
    } else {
      setSuccessMessage(message!);
    }
  }
  return (
    <Form {...formRegister}>
      <form
        onSubmit={formRegister.handleSubmit(onSubmitRegister)}
        className='space-y-3 mt-3'
      >
        <div className='flex flex-col space-y-1.5'>
          <FormField
            control={formRegister.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={formRegister.formState.isSubmitting}
                    placeholder='Full name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col'>
          <FormField
            control={formRegister.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={formRegister.formState.isSubmitting}
                    placeholder='Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col  '>
          <FormField
            control={formRegister.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={formRegister.formState.isSubmitting}
                    type='password'
                    placeholder='Password'
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
          disabled={formRegister.formState.isSubmitting}
          size={'lg'}
          className='rounded-full'
        >
          {formRegister.formState.isSubmitting && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
