'use client';
import React, { useState } from 'react';
import { resetSchema, signinSchema } from '../../../lib/form-validations';
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
import { reset } from '../../../server-actions/auth';

const ResetForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const formReset = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmitReset(values: z.infer<typeof resetSchema>) {
    setIsPending((prev) => !prev);
    setErrorMessage('');
    setSuccessMessage('');
    reset(values)
      .then((res) =>
        res.success
          ? setSuccessMessage(res.message)
          : setErrorMessage(res.message)
      )
      .finally(() => setIsPending((prev) => !prev));
  }

  return (
    <Form {...formReset}>
      <form
        onSubmit={formReset.handleSubmit(onSubmitReset)}
        className='space-y-3 mt-3'
      >
        <div className='flex flex-col'>
          <FormField
            control={formReset.control}
            name='email'
            disabled={isPending}
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
        <FormSuccess message={successMessage} />
        <FormError message={errorMessage} />
        <Button
          type='submit'
          disabled={isPending}
          size={'lg'}
          className='rounded-full'
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Send reset email
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
