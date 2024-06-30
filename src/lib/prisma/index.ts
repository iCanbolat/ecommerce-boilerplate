//import { PrismaClient } from '@prisma/client';
//import { PrismaPg } from '@prisma/adapter-pg';
//import { Pool } from 'pg';

//const connectionString = process.env.DATABASE_URL;

//const prismaClientSingleton = () => {
//  const pool = new Pool({ connectionString });
//  const adapter = new PrismaPg(pool);
//  return new PrismaClient(adapter);
//};

//declare const globalThis: {
//  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
//} & typeof global;

//const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

//export default prisma;

//if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
