import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { showFeaturedProductService } from '../services/show-featured-product-service'

export const showFeaturedProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/products/featured', {}, async (_, res) => {
    const { products } = await showFeaturedProductService()
    return res.status(200).send(products)
  })
}
