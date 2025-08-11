import { prisma } from '../../lib/prisma'
import { createProductService } from '../create-product-service'
import { highlightProductService } from '../highlight-product-service'

let productId: string

describe('Mark product as a highlighted product', async () => {
  beforeEach(async () => {
    const { id } = await createProductService({
      title: 'test1',
      price: 100,
      description: 'test',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })
    productId = id
  })

  it('should mark a product as a highlighted product', async () => {
    await highlightProductService({ id: productId })
    const product = await prisma.product.findFirst({ where: { id: productId } })
    expect(product).toHaveProperty('featured', true)
  })

  it('should unmark a product that is already highlighted', async () => {
    await highlightProductService({ id: productId })
    await highlightProductService({ id: productId })
    const product = await prisma.product.findFirst({ where: { id: productId } })
    expect(product).toHaveProperty('featured', false)
  })
})
