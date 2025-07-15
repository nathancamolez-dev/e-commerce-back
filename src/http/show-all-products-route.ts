import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { showAllProductsService } from '../services/show-all-products-service'

export const showAllProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/products', {}, async (_, res) => {
    const { products } = await showAllProductsService()
    return res.status(200).send(products)
  })
}
