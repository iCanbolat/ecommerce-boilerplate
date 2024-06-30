'use server';

import bcrypt from 'bcryptjs';
import { ZodType, z } from 'zod';
import {
  createCategorySchema,
  newPasswordSchema,
  resetSchema,
  signinSchema,
  signupSchema,
} from '@/lib/form-validations';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth';
import { APIResponseType, IUser } from '@/utils/types';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/utils/user';
import {
  generatePasswordResetToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getVerificationTokenByToken,
} from '@/utils/token';
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from '@/utils/mail';


export async function loginUser(values: z.infer<typeof signinSchema>) {
  const validatedFields = signinSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: 'Invalid Fields!' };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: false, message: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: true, message: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', validatedFields.data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Invalid Credentials!' };
        default:
          return { success: false, message: 'Something Went Wrong!' };
      }
    }
    throw error;
  }
}

export async function registerUser(
  values: z.infer<typeof signupSchema>
): Promise<APIResponseType<null>> {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: 'Invalid Fields!' };

  const { email, fullName, password } = validatedFields.data;

  const userExists = await getUserByEmail(email);

  if (userExists) return { success: false, message: 'Email already in use!' };

  const hashedPass = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name: fullName,
      password: hashedPass,
    },
  });
  //revalidatePath('/');
  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: true, message: 'Email verify mail sent!' };
}

export const googleAuth = async () => {
  const res = await signIn('google');
  console.log('goggle', res);
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { success: false, message: 'Token does not exist!' };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { success: false, message: 'Token has expired!' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser)
    return { success: false, message: 'Email does not exist!' };

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: true, message: 'Email Verified!' };
};

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success)
    return { success: false, message: 'Invalid email!' };

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { success: false, message: 'Email not found!' };

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: true, message: 'Reset email sent!' };
};

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  if (!token) return { success: false, message: 'Missing token!' };

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: false, message: 'Invalid fields' };

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) return { success: false, message: 'Invalid Token!' };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { success: false, message: 'Token has expired!' };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { success: false, message: 'User not found!' };

  const hashedPass = await bcrypt.hash(validatedFields.data.password, 10);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPass,
    },
  });
  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: true, message: 'Password Updated!' };
};

//export async function validateSchemas<T extends ZodType<any, any, any>>(
//  schema: T,
//  values: z.infer<T>
//): Promise<APIResponseType<z.infer<T>>> {
//  const validatedFields = schema.safeParse(values);

//  if (!validatedFields.success) {
//    return { success: false, message: 'Invalid fields!' };
//  }

//  return { success: true, data: validatedFields.data };
//}
