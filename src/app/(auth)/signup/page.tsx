'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signupSchema } from '../../../lib/form-validations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GoogleButton from '../_components/google-button';
import { RotateCw } from 'lucide-react';
import { registerUser } from '../../../server-actions/auth';

const Register = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      //role: 'ADMIN',
    },
  });
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    //const { error } = await registerUser({ email, password });
    //if (error) {
    //  setSubmitError(error.message);
    //  form.reset();
    //  return;
    //}
    //setConfirmation(true);
  }

  return (
    <main className='w-full h-screen flex items-center justify-center'>
      {isClient && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Card className='w-[350px]'>
              <CardHeader>
                <CardTitle className='m-auto'>
                  <Image
                    src={'/logo.png'}
                    alt='logo'
                    width={150}
                    height={150}
                  />
                </CardTitle>
                <CardDescription className='text-center'>
                  Bridge between happy clients and products
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className='grid w-full items-center gap-4'>
                  <GoogleButton />
                  <div className='flex flex-col space-y-1.5'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='foo@gmail.com' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex flex-col space-y-1.5'>
                    <FormField
                      control={form.control}
                      name='confirmPassword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Button
                  variant={'outline'}
                  disabled={isLoading}
                  className='shadow-[0_1px_20px_rgba(103,_58,_183,_1)] hover:bg-primary-foreground hover:text-primary'
                >
                  {isLoading && (
                    <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Sign up
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}
    </main>
  );
};

export default Register;
