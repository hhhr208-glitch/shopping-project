import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import { Add } from "./addtocart"

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
interface ProductComment {
  id: string
  rating?: number | null
  productId: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId?: string
}

interface HomeCardProps {
  product: Product
 comments?: ProductComment[];  }

export async function HomeCard({ product , comments=[] }: HomeCardProps) {
  
  const ratings = comments
  .map(commentP => commentP.rating)
  .filter((rate): rate is number => rate != null)
  const total = ratings.reduce((sum, rating) => sum + rating, 0)
  const averageRating = ratings.length > 0 ? total / ratings.length : 0
  
  return (   
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-sm text-gray-600">{product.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Product Image */}
        {product.image && (
          <Image 
            src={product.image} 
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">{product.stock} in stock</span>
        </div>

        {/* Category Badge */}
        {product.category && (
          <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
        )}

         <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-lg flex flex-col items-center justify-center ml-3">
              <span className="text-2xl font-bold text-yellow-600">
               
              </span>
              <div className="flex gap-0.5 mr-2 	">
                
                { (comments.length > 0 ) && [1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl  ${star <= (averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Add to Cart Form */}
        <form action={async () => {
          "use server"  
          await Add(product.id)
        }} className="flex-1">
          <Button className="w-full gap-2" type="submit">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </form>

        {/* More Details Link */}
        <Link href={`/more/view?productId=${product.id}`} className="flex-1">
          <Button className="w-full gap-2" variant="outline">
            <Eye className="w-4 h-4" />
            More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}