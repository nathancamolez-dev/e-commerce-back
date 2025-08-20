import { prisma } from '../../lib/prisma'
import { createProductService } from '../create-product-service'
import { pauseProductService } from '../pause-product-service'

let productId: string

describe('Mark a product as paused making unavailable', () => {
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
    await pauseProductService({ id: productId })
    const product = await prisma.product.findFirst({ where: { id: productId } })
    expect(product).toHaveProperty('paused', true)
  })

  it('should unmark a product that is already highlighted', async () => {
    await pauseProductService({ id: productId })
    await pauseProductService({ id: productId })
    const product = await prisma.product.findFirst({ where: { id: productId } })
    expect(product).toHaveProperty('paused', false)
  })
})
