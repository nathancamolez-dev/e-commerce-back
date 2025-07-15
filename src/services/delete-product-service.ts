import { prisma } from '../lib/prisma'

interface DeleteProductServiceProps {
  id: string
}

export async function deleteProductService({ id }: DeleteProductServiceProps) {
  await prisma.product.delete({ where: { id } })
}
