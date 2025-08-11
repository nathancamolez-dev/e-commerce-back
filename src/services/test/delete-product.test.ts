import { createProductService } from '../create-product-service'
import { deleteProductService } from '../delete-product-service'

let productId: string

describe('Delete product', async () => {
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

  it('should delete a product', async () => {
    expect(await deleteProductService({ id: productId })).toBe('Sucess')
  })

  it('should failed to delete a product', async () => {
    await expect(deleteProductService({ id: 'wrongId' })).rejects.toThrowError()
  })
})
