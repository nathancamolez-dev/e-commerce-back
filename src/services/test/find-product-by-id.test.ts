import { createProductService } from '../create-product-service'
import { findProductbyIdService } from '../find-product-by-id-service'

let productId: string

describe('Find product by id', async () => {
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
  it('should find a product by id', async () => {
    expect(await findProductbyIdService({ id: productId })).toHaveProperty(
      'product'
    )
    expect(await findProductbyIdService({ id: productId })).toEqual(
      expect.objectContaining({
        product: expect.objectContaining({
          title: 'test1',
        }),
      })
    )
  })

  it('should not find the product using wrong id', async () => {
    expect(await findProductbyIdService({ id: 'wrongId' })).toBe('')
  })
})
