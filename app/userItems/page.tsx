
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { Show } from "../feature/showCard";
import { getCachedCartItems } from '@/lib/cacheCart'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Cart() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Please log in to view your cart items</p>
          <Link href="/auth/register">
            <Button className="bg-black text-white hover:bg-gray-800">
              Sign In to Continue
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  try {
    const cartItems = await getCachedCartItems(session.user.id)
    
  
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)

    if (cartItems.length === 0) {
      return (
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
          <div className="text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 justify-center justify-items-center">
          {cartItems.map((cartItem) => (
            <div 
              key={cartItem.id}
              className="transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <Show
                variant="user"
                product={cartItem.product}
                quantity={cartItem.quantity} 
                cartId={cartItem.id}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center border-t pt-6">
          <div className="flex justify-between items-center max-w-2xl mx-auto mb-6">
            <span className="text-xl font-bold">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
          </div>
          <Button className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 text-lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Cart error:", error)
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-6">We couldn't load your cart. Please try again.</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-black text-white hover:bg-gray-800"
        >
          Try Again
        </Button>
      </div>
    )
  }
}