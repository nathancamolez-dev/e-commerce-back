import { prisma } from '../lib/prisma'

interface ProductInput {
  id: string
}

export async function findProductbyIdService({ id }: ProductInput) {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      ProductOptions: true,
    },
  })

  if (!product) {
    return ''
  }

  const formattedProduct = {
    ...product,
    options: product.ProductOptions.map(option => option.option),
    ProductOptions: undefined,
  }

  return {
    product: formattedProduct,
  }
}
