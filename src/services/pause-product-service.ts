import { prisma } from '../lib/prisma'

interface UpdateProductProps {
  id: string
}

export async function pauseProductService({ id }: UpdateProductProps) {
  const product = await prisma.product.findFirst({ where: { id } })
  if (product) {
    if (product.paused === true) {
      await prisma.product.update({ where: { id }, data: { paused: false } })
    } else {
      await prisma.product.update({ where: { id }, data: { paused: true } })
      await prisma.product.update({ where: { id }, data: { featured: false } })
    }
  }
}
