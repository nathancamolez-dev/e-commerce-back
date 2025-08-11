import { prisma } from '../lib/prisma'

interface ProductInput {
  title: string
  price: number
  description: string
  featured: boolean
  image: string
  options: string[]
}

export async function createProductService({
  title,
  price,
  description,
  featured,
  image,
  options,
}: ProductInput) {
  if (title === '' || !price || description === '' || !options.length) {
    throw new Error('error on creating product')
  }

  const { id } = await prisma.product.create({
    data: {
      title,
      slug: title.toLowerCase().split(' ').join('-'),
      price,
      description,
      featured,
      image_url: image,
    },
  })

  await prisma.productOptions.createMany({
    data: options.map(option => ({
      product_id: id,
      option,
    })),
  })

  return { id }
}
