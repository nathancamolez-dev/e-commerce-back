import { z } from 'zod/v4'
import { createProductService } from '../create-product-service'
import { randomUUID } from 'node:crypto'

const productOutput = z.object({
  id: z.uuid(),
})

describe('Create product', async () => {
  it('should create a product', async () => {
    const result = productOutput.safeParse(
      await createProductService({
        title: randomUUID(),
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
