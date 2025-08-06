import { createProductService } from '../create-product-service'
import { deleteProductService } from '../delete-product-service'

describe('Delete product', async () => {
  it('should delete a product', async () => {
    const { id } = await createProductService({
      title: 'test1',
      price: 100,
      description: 'test',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })

    expect(await deleteProductService({ id })).toBe('Sucess')
  })

  it('should failed to delete a product', async () => {
    const { id } = await createProductService({
      title: 'test1',
      price: 100,
      description: 'test',
      featured: false,
      image: 'stringtest',
      options: ['test1', 'test2'],
    })

    await expect(deleteProductService({ id: id + 1 })).rejects.toThrowError()
  })
})
