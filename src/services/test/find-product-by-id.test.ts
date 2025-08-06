import { createProductService } from '../create-product-service'
import { findProductbyIdService } from '../find-product-by-id-service'

describe('Find product by id', async () => {
  it('should find a product by id', async () => {
    const { id } = await createProductService({
      title: 'test1',
      price: 100,
      description: 'test',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })

    expect(await findProductbyIdService({ id })).toHaveProperty('product')
    expect(await findProductbyIdService({ id })).toEqual(
      expect.objectContaining({
        product: expect.objectContaining({
          title: 'test1',
        }),
      })
    )
  })

  it('should not find the product using wrong id', async () => {
    const { id } = await createProductService({
      title: 'test1',
      price: 100,
      description: 'test',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })

    expect(await findProductbyIdService({ id: id + 1 })).toBe('')
  })
})
