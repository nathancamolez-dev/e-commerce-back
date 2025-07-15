import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { deleteImageService } from '../services/delete-image-supabase-service'
import { deleteProductService } from '../services/delete-product-service'
import { findProductbyIdService } from '../services/find-product-by-id-service'

export const deleteProductByIdRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/product/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
      preHandler: app.authenticate,
    },
    async (req, res) => {
      const id = req.params

      const product = await findProductbyIdService(id)
      if (!product) {
        return
      }
      const fileName = product.product.image_url.split('/').pop() ?? ''

      if (!fileName) {
        return
      }

      await deleteImageService(fileName)
      await deleteProductService(id).then(() => res.status(200).send('Deleted'))
    }
  )
}
