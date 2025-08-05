import { z } from 'zod/v4'
import { createProductService } from '../create-product-service'

const productOutput = z.object({
  id: z.uuid(),
})

describe('Create product', async () => {
  beforeAll(async () => {})
  afterAll(async () => {})
  it('should create a product', async () => {
    const result = productOutput.safeParse(
      await createProductService({
        title: 'test1',
        price: 100,
        description: 'test',
        featured: false,
        image: 'stringtest',
        options: ['test1', 'test2'],
      })
    )
    expect(result.success).toBe(true)
  })

  it('should not create a product with empty title', async () => {
    await expect(
      createProductService({
        title: '',
        price: 100,
        description: 'test',
        featured: false,
        image: 'stringtest',
        options: ['test1', 'test2'],
      })
    ).rejects.toThrowError()
  })
})
