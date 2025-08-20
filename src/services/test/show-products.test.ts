import { createProductService } from '../create-product-service'
import { showAllProductsService } from '../show-all-products-service'

describe('Show all products', () => {
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

  it('should show all products', async () => {
    const products = await showAllProductsService()
    expect(products).toEqual(
      expect.objectContaining({
        products: expect.arrayContaining([
          expect.objectContaining({
            title: 'test 1',
          }),
          expect.objectContaining({
            title: 'test 2',
          }),
          expect.objectContaining({
            title: 'test 3',
          }),
        ]),
      })
    )
  })
})
