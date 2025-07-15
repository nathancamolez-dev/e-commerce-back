import { prisma } from '../lib/prisma'

export async function showAllProductsService() {
  const products = await prisma.product.findMany({
    include: {
      ProductOptions: true,
    },
  })

  const formattedProducts = products.map(product => {
    return {
      ...product,
      options: product.ProductOptions.map(option => option.option),
      ProductOptions: undefined,
    }
  })

  return {
    products: formattedProducts,
  }
}
