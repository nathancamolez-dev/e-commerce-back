import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { createProductService } from '../services/create-product-service'

export const createProductRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/product',
    {
      schema: {
        body: z.object({
          title: z.string(),
          price: z.number(),
          description: z.string(),
          featured: z.boolean(),
          options: z.string().array(),
        }),
      },
      preHandler: app.authenticate,
    },
    async (req, res) => {
      const { title, price, description, featured, options } = req.body
      const id = await createProductService({
        title,
        price,
        description,
        featured,
        image: '',
        options,
      })
      return res.status(201).send(id)
    }
  )
}
