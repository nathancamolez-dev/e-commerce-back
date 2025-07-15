import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { pauseProductService } from '../services/pause-product-service'

export const pauseProductRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/product/:id/pause',
    {
      schema: {
        params: z.object({ id: z.string() }),
      },
      preHandler: app.authenticate,
    },
    async (req, res) => {
      const id = req.params
      await pauseProductService(id).then(() => res.status(200).send('Paused'))
    }
  )
}
