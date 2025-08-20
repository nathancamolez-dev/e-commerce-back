import { createProductService } from '../create-product-service'
import { showFeaturedProductService } from '../show-featured-product-service'

describe('Show all featured products', () => {
  beforeEach(async () => {
    await createProductService({
      title: 'test 1',
      price: 100,
      description: 'test',
      featured: true,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })

    await createProductService({
      title: 'test 2',
      price: 100,
      description: 'test 2',
      featured: true,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })

    await createProductService({
      title: 'test 3',
      price: 100,
      description: 'test 3',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })
  })

  it('should show all featured products', async () => {
    const products = await showFeaturedProductService()
    console.log(products)
    expect(products).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            title: 'test 1',
          }),
        ]),
      })
    )

    expect(products).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            title: 'test 2',
          }),
        ]),
      })
    )
  })

  it('should not show the test 3 product', async () => {
    const products = await showFeaturedProductService()

    expect(products).toEqual(
      expect.not.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            title: 'test 3',
          }),
        ]),
      })
    )
  })
})
