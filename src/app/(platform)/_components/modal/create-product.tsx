'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, PlusCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { createWorkspaceFormSchema } from '../../../../lib/form-validations';
import MultiSelect from '../multi-select';

const CreateProductModal = () => {
  const form = useForm<z.infer<typeof createWorkspaceFormSchema>>({
    resolver: zodResolver(createWorkspaceFormSchema),
    defaultValues: {
      name: '',
      inviteMembers: [],
      avatarUrl: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof createWorkspaceFormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='h-8 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap capitalize'>
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:w-[90vh] lg:max-w-[100vh] '>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <fieldset className='border border-solid border-gray-300 p-3'>
          <legend className='text-sm'>Specify products</legend>

           <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Facebook' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*<FormField
              control={form.control}
              name='inviteMembers'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invite Your Teammates</FormLabel>
                  <FormControl>
                    <MultiSelect form={form} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />*/}

              <FormField
                control={form.control}
                name='avatarUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <Input
                        id='avatarUrl'
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                        type='file'
                      />
                    </FormControl>
                    <FormDescription className='text-center'>
                      Optionally you can add product avatar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='justify-center flex w-full'>
                <Button type='submit'>Create</Button>
              </div>
            </form>
          </Form>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
