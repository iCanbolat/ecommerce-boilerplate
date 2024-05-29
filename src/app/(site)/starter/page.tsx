'use client';
import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';

import { cn } from '../../../lib/utils';
import { ClipboardPlus } from 'lucide-react';
import { Form } from '../../../components/ui/form';
import { starterPersonalInfo } from '../../../lib/form-validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StepperContent from '../../(platform)/_components/stepper-contents';

const stepperItems = [
  {
    step: 1,
    title: 'Personal Info',
    icon: (
      <svg
        className='w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-800'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 16'
      >
        <path d='M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z' />
      </svg>
    ),
  },
  {
    step: 2,
    title: 'Company Info',
    icon: <ClipboardPlus className='dark:text-gray-800' />,
  },
];

const Starter = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeStepData, setActiveStepData] = useState<any>(stepperItems[0]);

  const handleStepChange = (values: z.infer<typeof starterPersonalInfo>) => {
    console.log(values);
    //setActiveStep((prev) => prev + 1);
  };
  const updateData = React.useCallback((type?: string) => {
    if (activeStep === 2) return;

    if (type === 'increase') {
      setActiveStep((prev) => prev + 1);
      setActiveStepData(stepperItems.find((f) => f.step === activeStep + 1));
    } else {
      setActiveStep((prev) => prev - 1);
      setActiveStepData(stepperItems.find((f) => f.step === activeStep - 1));
    }
  }, []);

  console.log('parent', activeStep);

  const form = useForm<z.infer<typeof starterPersonalInfo>>({
    resolver: zodResolver(starterPersonalInfo),
    defaultValues: {
      inviteMembers: [],
      avatarUrl: undefined,
      companyName: '',
      fullName: '',
      productAvatarUrl: undefined,
      workspaceName: '',
    },
  });

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className=' w-[40vh]  dark:bg-indigo-950/50'>
        <CardHeader>
          <ol className='flex items-center w-full ml-[18%] overflow-hidden'>
            {stepperItems.map((item, idx, items) => (
              <li
                key={idx}
                className={cn(
                  'flex w-full items-center',
                  idx + 1 < activeStep &&
                    items.length - 1 !== idx &&
                    "after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800"
                )}
              >
                <span
                  className={cn(
                    'flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0',
                    idx + 1 < activeStep
                      ? 'dark:bg-blue-800 bg-blue-100'
                      : 'dark:bg-slate-200',
                    idx + 1 === activeStep && 'dark:border-purple-500 border-4'
                  )}
                >
                  {idx + 1 < activeStep ? (
                    <svg
                      className='w-3.5 h-3.5 lg:w-4 lg:h-4 dark:text-blue-300'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 16 12'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M1 5.917 5.724 10.5 15 1.5'
                      />
                    </svg>
                  ) : (
                    item.icon
                  )}
                </span>
              </li>
            ))}
          </ol>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleStepChange)}>
            <StepperContent
              data={activeStepData}
              updateData={updateData}
              form={form}
              activeStep={activeStep}
              lastStep={stepperItems.length}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Starter;
