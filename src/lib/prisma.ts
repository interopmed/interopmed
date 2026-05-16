import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: InstanceType<typeof PrismaClient> }

const connectionString = process.env.DATABASE_URL

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: connectionString || '' }),
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
