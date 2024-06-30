import prisma from '../../lib/prisma';
import { IUser } from '../types';

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};
