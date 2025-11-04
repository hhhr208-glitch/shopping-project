import { authOptions } from "@/lib/auth"
import Check from "@/app/feature/chekAdmin";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function createProduct(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions) 
  if (!session || session.user.role !== "admin") {
    return 
  }
  else {

const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const image = formData.get("image") as string
  const category = formData.get("category") as string
  const stock = parseInt(formData.get("stock") as string)
  const  createdById = session.user.id
  await prisma.product.create({
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

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto p-6 max-w-md animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 transition-all hover:scale-105">Create Product</h1>
      
      <form action={createProduct} className="space-y-4">
        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input 
            type="text" 
            name="name" 
            required 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            name="description" 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
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
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input 
            type="text" 
            name="image" 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="/images/products/example.jpg"
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input 
            type="text" 
            name="category" 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div className="transition-all hover:scale-[1.02]">
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input 
            type="number" 
            name="stock" 
            required 
            className="w-full p-2 border rounded transition-all focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg font-semibold"
        >
          Create Product
        </button>
      </form>
    </div>
  )
}