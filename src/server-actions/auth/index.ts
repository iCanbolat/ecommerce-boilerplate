'use server';

import { z } from 'zod';
import { signupSchema } from '@/lib/form-validations';
import { createClient } from '@/utils/supabase/server';
import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginUser({
  email,
  password,
}: z.infer<typeof signupSchema>) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function registerUser({
  email,
  password,
}: z.infer<typeof signupSchema>) {
  const supabase = createClient();
  const user = await getUserAssets(email);

  if (user) return { error: { message: 'User already exists', user } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
      data: {
        companyId: null,
      },
    },
  });
  if (response.error) {
    console.log(response.error);
    return { error: response.error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/starter');
}

export async function googleAuth() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) return error.message;
  return data;
}

export const getUserAssets = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return { error: 'User Yok', success: false };
  return user;
};

//async function createCustomerInStripe(params:type) {

//}
