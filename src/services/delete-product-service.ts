import { prisma } from '../lib/prisma'

interface DeleteProductServiceProps {
  id: string
}

export async function deleteProductService({ id }: DeleteProductServiceProps) {
  try {
    await prisma.product.delete({ where: { id } })

    return 'Sucess'
  } catch (err) {
    throw new Error('Failed to delete the product')
  }
}
