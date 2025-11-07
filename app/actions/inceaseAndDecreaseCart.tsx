"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function incrementQuantity(formData: FormData) {

  const cartItemId = formData.get("cartItemId") as string
  if (!cartItemId) throw new Error("Cart item ID is required")
  
  
await prisma.cart.update({
  where: { id: cartItemId },
  data: {
    quantity: {
      increment: 1
    }
  }
})

  revalidatePath("/cart")
}

export async function decrementQuantity(formData: FormData) {

  
  const cartItemId = formData.get("cartItemId") as string
  const quantity = parseInt(formData.get("quantity") as string,10) 
  if (!cartItemId) throw new Error("Cart item ID is required")
  

  if (quantity === 1) {
    await prisma.cart.delete({
      where: { id: cartItemId }
    })
  } else {
   await prisma.cart.update({
  where: { id: cartItemId },
  data: {
    quantity: {
      decrement: 1
    }
  }
})

  }
  
  revalidatePath("/cart")
}