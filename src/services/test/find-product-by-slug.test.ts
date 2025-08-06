import { createProductService } from '../create-product-service'
import { findProductbySlugService } from '../find-product-by-slug-service'

describe('Find product by slug', async () => {
  beforeEach(async () => {
    await createProductService({
      title: 'test1',
      price: 100,
      description: 'test',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })
  })
  it('should find a product by the slug', async () => {
    expect(await findProductbySlugService({ slug: 'test1' })).toHaveProperty(
      'product'
    )
    expect(await findProductbySlugService({ slug: 'test1' })).toEqual(
      expect.objectContaining({
        product: expect.objectContaining({
          title: 'test1',
        }),
      })
    )
  })

  it('should not find the product using the wrong slug', async () => {
    expect(await findProductbySlugService({ slug: 'not-slug' })).toBe('')
  })
})
