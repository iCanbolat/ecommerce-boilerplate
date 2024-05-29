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
import { Plus } from 'lucide-react';
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

const CreateWorkspaceModal = () => {
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
        <div className='h-64 w-64 bg-purple-300 rounded-md backdrop-filter backdrop-blur-md bg-opacity-30 items-center justify-center flex flex-col space-y-3 hover:bg-opacity-45 cursor-pointer'>
          <Button variant='ghost' className='rounded-full' size='icon'>
            <Plus className='h-4 w-4' />
          </Button>
          <h5 className='text-sm'>Add New Product</h5>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
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
                  <FormLabel>Product Avatar</FormLabel>
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
