import { prisma } from '../lib/prisma'

interface ProductInput {
  slug: string
}

export async function findProductbySlugService({ slug }: ProductInput) {
  const product = await prisma.product.findFirst({
    where: { slug },
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
