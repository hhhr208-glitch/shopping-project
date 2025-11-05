// lib/cacheCart.ts
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export const getCachedCartItems = unstable_cache(
  async (userId: string) => {
    console.log('🛒 [CACHE MISS] Fetching fresh cart items...')
    
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            category: true,
            stock: true
          }
        }
      }
    })
    
    return cartItems;
  },
  ['cart-items'],
  { revalidate: 30 } // 30 seconds
)