import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { signinSchema } from './lib/form-validations';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './utils/user';

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = signinSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
