import NextAuth from 'next-auth';

import { PrismaClient, UserRoleStatus } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '../src/auth.config';
import { getUserById } from './utils/user';

const prisma = new PrismaClient();

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if(account?.provider !== 'credentials')return true;
      
      const existingUser = await getUserById(user.id!);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRoleStatus;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  ...authConfig,
});
//import NextAuth from 'next-auth';
//import Google from 'next-auth/providers/google';
//import { PrismaAdapter } from '@auth/prisma-adapter';
//import { PrismaClient } from '@prisma/client';
//import { Adapter } from 'next-auth/adapters';

//const prisma = new PrismaClient();

//export const { handlers, signIn, signOut, auth } = NextAuth({
//  adapter: PrismaAdapter(prisma) as Adapter,
//  providers: [Google],
//  pages: {
//    signIn: '/login',
//  },
//  callbacks: {
//    session({ session, user }) {
//      session.user.role = user.role;
//      return session;
//    },
//  },
//});
