import { prisma } from '../src/lib/prisma'

beforeAll(async () => {
  await cleanDatabase()
})

beforeEach(async () => {
  await cleanDatabase()
})

afterAll(async () => {
  await prisma.$disconnect()
})

async function cleanDatabase() {
  await prisma.productOptions.deleteMany()
  await prisma.product.deleteMany()
}
