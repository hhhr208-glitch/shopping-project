
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'
 export const getCachedProduct = unstable_cache(
  async (productId: string) => {
    return await prisma.product.findUnique({
      where: { id: productId },
      include: {
        comments: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  },
  ['product-detail'],
  { revalidate: 60 } // 1 minute cache
);