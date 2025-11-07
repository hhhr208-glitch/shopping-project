
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { DeacreaseButton } from "@/components/decreaseButton" 
import { IncrementButton } from "@/components/increaseButton"

interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  image?: string | null
  category?: string | null
  stock: number
  featured?: boolean
}

interface ProductComment {
  id: string
  rating?: number | null
  productId: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId?: string
}

interface UserCardProps {
  product: Product
  quantity?: number
  cartId?: string
  comments: ProductComment[]
}

export function UserCard({ product, quantity = 1, cartId }: UserCardProps) {
  const totalPrice = (product.price * quantity).toFixed(2)
  
  return (   
    <Card className="w-80 max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {product.image ? (
          <div className="relative w-full h-48">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              sizes="(max-width: 320px) 100vw, 320px"
              className="object-cover rounded-lg"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <div className="text-sm text-gray-600 mt-1">Total: ${totalPrice}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">Qty: {quantity}</div>
            <div className="text-xs text-gray-500">Stock: {product.stock}</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        
        {cartId && (
          <>
            <DeacreaseButton cartId={cartId} quantity={quantity} product={product} />
            <IncrementButton cartId={cartId} quantity={quantity} product={product} />
          </>
        )}
      </CardFooter>
    </Card>
  )
}