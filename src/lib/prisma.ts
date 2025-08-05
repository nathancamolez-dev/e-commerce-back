import { env } from '../env'
import { PrismaClient } from '../generated/prisma'

const isTest = env.NODE_ENV === 'test'

export const prisma = new PrismaClient({
  datasourceUrl: isTest ? env.DATABASE_URL_TEST : env.DATABASE_URL,
})
