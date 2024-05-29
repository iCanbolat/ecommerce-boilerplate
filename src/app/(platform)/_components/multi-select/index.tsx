'use client';
import React, { KeyboardEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const MultiSelect = ({
  form,
}: {
  form: UseFormReturn<
    {
      fullName: string;
      companyName: string;
      workspaceName: string;
      inviteMembers:
        | {
            label?: string | null | undefined;
            value?: string | null | undefined;
          }[];
      avatarUrl?: any;
      productAvatarUrl?: any;
    },
    any,
    undefined
  >;
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setArrayValue] = React.useState<readonly Option[]>([]);

  console.log('Select Render!');

  const handleKeyDown: KeyboardEventHandler = async (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const members = form.getValues('inviteMembers');
        members.push(createOption(inputValue));
        form.setValue('inviteMembers', members);

        const isValid = await form.trigger('inviteMembers', {
          shouldFocus: true,
        });

        if (!isValid) {
          console.log(form.formState.errors.inviteMembers);

          form.setError('inviteMembers', {
            type: 'validate',
            message:
              form?.formState?.errors?.inviteMembers?.[members.length - 1]
                ?.label?.message,
          });
          members?.pop();
          form.setValue('inviteMembers', members);
          console.log('hata', members);
          setInputValue('');
          event.preventDefault();
          console.log('hata', form.formState.errors);
        } else {
          console.log('başar', members);

          setArrayValue((prev) => [...prev, createOption(inputValue)]);
          setInputValue('');
          event.preventDefault();
        }
    }
  };

  const handleFieldState = (newValue: any) => {
    form.setValue('inviteMembers', newValue);
    setArrayValue(newValue);
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => handleFieldState(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder='example@gmail.com'
      value={value}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          'backgroundColor': '#030712',
          'borderColor': state.isFocused ? '#6d28d9' : '',
          'boxShadow': 'none',
          'borderWidth': 2,
          ':hover': {
            ...baseStyles[':hover'],
            borderColor: '#6d28d9',
          },
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white',
        }),
      }}
    />
  );
};
export default MultiSelect;
