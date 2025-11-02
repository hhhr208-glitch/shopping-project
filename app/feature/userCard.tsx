import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { decrementQuantity, incrementQuantity } from "../actions/inceaseAndDecreaseCart"

// Define the Product type
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

interface UserCardProps {
  product: Product
 quantity?: number
 cartId ? :string
 comments : ProductComment []
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


export function UserCard({ product, quantity , cartId }: UserCardProps) {
    return (   
        <Card className="w-80">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-gray-600">{product.description}</p>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Product Image */}
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                {/* Product Details */}
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <div className="flex items-center gap-2">
                    
                        <span className="w-8 text-center font-semibold"> quantity {quantity} </span>
                       
                    </div>
                </div>

                {/* Stock Warning */}
                {product.stock < 10 && (
                  <p className="text-sm text-red-500 text-center">
                    Only {product.stock} left in stock!
                  </p>
                )}
            </CardContent>

           <CardFooter className="flex gap-2">
  {/* Decrement Button */}
  <form action={decrementQuantity} className="flex-1">
    <input type="hidden" name="cartItemId" value={cartId} />
    <Button variant="outline" className="w-full" type="submit">
      -
    </Button>
  </form>
  
  
  
  {/* Increment Button */}
  <form action={incrementQuantity} className="flex-1">
    <input type="hidden" name="cartItemId" value={cartId} />
    <Button className="w-full" type="submit">
      +
    </Button>
  </form>
</CardFooter>
        </Card>
    )
}