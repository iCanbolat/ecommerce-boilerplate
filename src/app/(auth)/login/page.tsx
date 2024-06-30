'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import GoogleButton from '../_components/google-button';
import './style.css';
import RegisterForm from '../_components/register-form';
import LoginForm from '../_components/login-form';

const Login = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const handleClick = (title: string) => {
    const element = container.current;
    if (element && title === 'signup') {
      element.classList.add('right-panel-active');
    }
    if (element && title === 'signin') {
      element.classList.remove('right-panel-active');
    }
  };

  return (
    <main className='w-full h-screen flex items-center justify-center'>
      <div className='container' ref={container} id='container'>
        <div className='form-container sign-up-container'>
          <div className='bg-white flex items-center justify-center h-full flex-col text-center px-12'>
            <h1 className='text-3xl font-bold'>Create Account</h1>
            <div className='social-container'>
              <GoogleButton />
            </div>
            <span>or use your email for registration</span>
            <RegisterForm />
          </div>
        </div>
        <div className='form-container sign-in-container '>
          <div className='bg-white flex items-center justify-center h-full flex-col text-center px-12'>
            <h1 className='text-3xl font-bold'>Sign in</h1>
            <div className='social-container'>
              <GoogleButton />
            </div>
            <span>or use your account</span>
            <LoginForm />
          </div>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left space-y-5'>
              <h1 className='text-3xl font-bold'>Welcome Back!</h1>
              <p className='text-sm'>
                To keep connected with us please login with your personal info
              </p>
              <Button
                onClick={() => handleClick('signin')}
                variant='outline'
                className='text-black'
                id='signIn'
              >
                Sign In
              </Button>
            </div>
            <div className='overlay-panel overlay-right space-y-5'>
              <h1 className='text-3xl font-bold'>Hello, Friend!</h1>
              <p className='text-sm '>
                Enter your personal details and start journey with us
              </p>
              <Button
                onClick={() => handleClick('signup')}
                variant='outline'
                className='text-black'
                id='signUp'
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
