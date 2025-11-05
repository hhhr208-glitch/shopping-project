import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Edit, Trash2 } from "lucide-react"
import { revalidatePath } from "next/cache"
import Image from 'next/image'
import Link from "next/link"

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

interface AdminCardProps {
  product: Product
  comments?: ProductComment[]
}


async function Deletecard(formdata: FormData) {
  "use server"
  const productId = formdata.get("productId") as string
  if (!productId) {
    throw new Error("Product ID is required")
  }

  try {
    await prisma.product.delete({
      where: { id: productId }
    })
    revalidatePath("/admin")
  } catch (error) {
    throw new Error("Failed to delete product")
  }
}

// ✅ CLEANER component without admin checks
export function AdminCard({ product, comments = [] }: AdminCardProps) {
    return (   
        <Card className="w-80">
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <p className="text-sm text-gray-600">SKU: {product.id}</p>
            </CardHeader>

            <CardContent className="space-y-4">
                {product.image && (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-semibold">${product.price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Stock:</span>
                        <span className="font-semibold">{product.stock} units</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-green-600">
                          {product.featured ? "Featured" : "Published"}
                        </span>
                    </div>
                    {product.category && (
                      <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-semibold">{product.category}</span>
                      </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Link href={`/admin/edit/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>

            
<form action={Deletecard} className="flex-1">
    <input type="text" hidden value={product.id} name="productId" readOnly />
    <Button 
        variant="destructive" 
        className="w-full gap-2" 
        type="submit"
        // Add loading state props here
    >
        <Trash2 className="w-4 h-4" />
        Delete
    </Button>
</form>
            </CardFooter>
        </Card>
    )
}