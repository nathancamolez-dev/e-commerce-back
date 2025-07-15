import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { highlightProductService } from '../services/highlight-product-service'

export const highlightProductRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/product/:id/highlight',
    {
      schema: {
        params: z.object({ id: z.string() }),
      },
    },
    async (req, res) => {
      const id = req.params
      await highlightProductService(id).then(() =>
        res.status(200).send('Paused')
      )
    }
  )
}
