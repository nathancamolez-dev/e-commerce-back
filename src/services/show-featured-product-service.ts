import { prisma } from '../lib/prisma'

export async function showFeaturedProductService() {
  const products = await prisma.product.findMany({ where: { featured: true } })

  return {
    products,
  }
}
