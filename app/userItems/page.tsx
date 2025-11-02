import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Show } from "../feature/showCard";
import { prisma } from "@/lib/prisma";

export default  async function Cart(){


    const session = await getServerSession(authOptions)
    if (!session) return <h1>there is no thing to show man ! first chooes something</h1>
   const cartItems = await prisma.cart.findMany({
  where: {
    userId: session.user.id
  },
  include: {
    product: true  // ← This brings the product details!
  }
})
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
         

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 justify-center justify-items-center">
            {cartItems.map((cartitem) => (
              <div 
                key={cartitem.product.id}
                className="transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <Show
                  variant="user"
                  product={cartitem.product}
                   quantity={cartitem.quantity} 
                   cartId={cartitem.id}
                />
              </div>
            ))}
          </div>
        </div>
  );


    
}