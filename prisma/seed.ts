import fs from 'node:fs'
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  const data = JSON.parse(fs.readFileSync('./prisma/data.json', 'utf-8'))
  const products = data.products.slice(1)

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        title: product.title,
        slug: product.slug,
        description: product.description,
        featured: product.featured,
        price: product.price,
        image_url: product.image,
      },
    })

    if (product.options) {
      for (const option of product.options) {
        await prisma.productOptions.create({
          data: {
            option: option,
            product_id: createdProduct.id,
          },
        })
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
