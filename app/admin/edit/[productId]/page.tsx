import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

async function editProduct(formdata: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "admin") {
    throw new Error("oops this is not valid thing to do!")
  } else {
    const name = formdata.get("name") as string
    const description = formdata.get("description") as string
    const price = parseFloat(formdata.get("price") as string)
    const image = formdata.get("image") as string
    const category = formdata.get("category") as string
    const stock = parseInt(formdata.get("stock") as string)
    const productId = (formdata.get("productId") as string)
    const createdById = session.user.id

    await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        description,
        price,
        image,
        category,
        stock,
        createdById,
      }
    })
  }
  redirect("/admin")
}

export default async function AdminEdit({ 
  params 
}: { 
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params  
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })

  return (
    <div className="container mx-auto p-6 max-w-md animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 transition-all hover:scale-105">Edit Product</h1>
      
      <form action={editProduct} className="space-y-4">
        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            defaultValue={product?.name || ""}
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            name="description" 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            defaultValue={product?.description || ""}
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input 
            type="number" 
            step="0.01" 
            name="price" 
            required 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            defaultValue={product?.price || ""}
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input 
            type="text" 
            name="image" 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="/images/products/example.jpg"
            defaultValue={product?.image || ""}
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input 
            type="text" 
            name="category" 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            defaultValue={product?.category || ""}
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input 
            type="number" 
            name="stock" 
            required 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            defaultValue={product?.stock || ""}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg font-semibold"
        >
          Edit Product
        </button>
        <input hidden readOnly value={productId} name="productId" />
      </form>
    </div>
  )
}