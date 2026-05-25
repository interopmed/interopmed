import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

type PrismaClientInstance = InstanceType<typeof PrismaClient>
type PrismaClientOptions = ConstructorParameters<typeof PrismaClient>[0]

const globalForPrisma = global as unknown as { prisma?: PrismaClientInstance }
const connectionString = process.env.DATABASE_URL || ''

const prismaClientOptions: PrismaClientOptions = {
  adapter: new PrismaPg({ connectionString }),
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
}

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaClientOptions)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
