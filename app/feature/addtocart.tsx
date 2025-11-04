 "use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

export async function Add(productId: string) {
   
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error("Please log in first!");
  }

  const userId = session.user.id;

  try {
    // Check if product already exists in user's cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: userId,
        productId: productId
      }
    });

    if (!existingCartItem) {
      // Create new cart item
      await prisma.cart.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: 1,
        }
      });
    } else {
      // Update quantity of existing item
      const newQuantity = existingCartItem.quantity + 1;
      await prisma.cart.update({
        where: {
          id: existingCartItem.id  // Use cart item ID, not user ID
        },
        data: {
          quantity: newQuantity
        }
      });
    }

    return { success: true, message: "Product added to cart" };
    
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add product to cart");
  }
}