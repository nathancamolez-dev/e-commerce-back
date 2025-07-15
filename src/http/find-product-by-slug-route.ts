import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { findProductbySlugService } from '../services/find-product-by-slug-service'

export const findProductBySlugRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/product/:slug',
    {
      schema: {
        params: z.object({
          slug: z.string(),
        }),
      },
    },
    async (req, res) => {
      const { slug } = req.params

      const { product } = await findProductbySlugService({ slug })

      if (!product) {
        return res.status(200).send('')
      }

      return res.status(200).send(product)
    }
  )
}
