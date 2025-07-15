import { prisma } from '../lib/prisma'

interface HighLightProductProps {
  id: string
}
export async function highlightProductService({ id }: HighLightProductProps) {
  const product = await prisma.product.findFirst({ where: { id } })
  if (product) {
    if (product.featured === true) {
      await prisma.product.update({ where: { id }, data: { featured: false } })
    } else {
      await prisma.product.update({ where: { id }, data: { featured: true } })
    }
  }
}
