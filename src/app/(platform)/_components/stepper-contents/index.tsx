'use client';
import React from 'react';
import { CardContent, CardFooter } from '../../../../components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Input } from '../../../../components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import MultiSelect from '../multi-select';

type Props = {
  data: any;
  updateData: (type?: string) => void;
  form: UseFormReturn<
    {
      fullName: string;
      companyName: string;
      workspaceName: string;
      inviteMembers:
        | {
            label?: string | null | undefined;
            value?: string | null | undefined;
          }[]
        ;
      avatarUrl?: any;
      productAvatarUrl?: any;
    },
    any,
    undefined
  >;

  activeStep: number;
  lastStep: number;
};

const StepperContent = ({
  data,
  form,
  activeStep,
  updateData,
  lastStep,
}: Props) => {
  
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={data?.step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='w-full'
      >
        <CardContent className='flex justify-center flex-col space-y-5'>
          <h5 className='text-lg font-bold text-center'>{data?.title}</h5>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-5'>
              {data?.step >= 2 ? (
                <>
                  <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Apple' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='workspaceName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Create First Product Space</FormLabel>
                        <FormControl>
                          <Input placeholder='Iphone' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='productAvatarUrl'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Avatar</FormLabel>
                        <FormControl>
                          <Input
                            type='file'
                            onBlur={field.onBlur}
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormDescription>
                          Optionally you can add avatar.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
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
                  />
                </>
              ) : (
                <>
                  {' '}
                  <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder='John Doe' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='avatarUrl'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avatar</FormLabel>
                        <FormControl>
                          <Input
                            type='file'
                            onBlur={field.onBlur}
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormDescription>
                          Optionally you can add avatar.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            size={'lg'}
            disabled={activeStep === 1}
            onClick={() => updateData('decrease')}
            variant='outline'
            type='button'
          >
            Prev
          </Button>
          {activeStep >= lastStep ? (
            <Button size={'lg'} type='submit'>
              Create
            </Button>
          ) : (
            <Button
              size={'lg'}
              onClick={async () => {
                const isValid = await form.trigger(['fullName', 'avatarUrl'], {
                  shouldFocus: true,
                });
                if (isValid && activeStep !== 2) updateData('increase');
              }}
              type='button'
            >
              Next
            </Button>
          )}
        </CardFooter>
      </motion.div>
    </AnimatePresence>
  );
};

export default StepperContent;
