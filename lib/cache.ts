
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export const getCachedProducts = unstable_cache(
  async (userId: string) => {
    console.log('🔄 Fetching fresh products from database...')
    return await prisma.product.findMany({
      where: { createdById: userId },
      select: {
        id: true,
        name: true, 
        price: true,
        image: true,
        stock: true,
        featured: true,
        category: true
      },
      orderBy: { id: 'desc' }
    })
  },
  ['admin-products'], 
  { 
    tags: ['admin-products'] // Use specific tag
  }
)