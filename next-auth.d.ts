import { UserRoleStatus } from '@prisma/client';
import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRoleStatus;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
