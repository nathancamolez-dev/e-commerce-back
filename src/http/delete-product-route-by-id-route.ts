import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { deleteProductService } from '../services/delete-product-service'

export const deleteProductByIdRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/product/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (req, res) => {
      const id = req.params

      await deleteProductService(id).then(() => res.status(200).send('Deleted'))
    }
  )
}
