// QuantityController.tsx
'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { incrementQuantity, decrementQuantity } from "./actions/inceaseAndDecreaseCart"

interface QuantityControllerProps {
  cartId?: string
  initialQuantity: number
}

export function QuantityController({ cartId, initialQuantity }: QuantityControllerProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isPending, startTransition] = useTransition()

  const handleIncrement = () => {
    setQuantity(q => q + 1) // ⚡ instant local update
    const formData = new FormData()
    formData.append("cartItemId", cartId || "")
    startTransition(() => incrementQuantity(formData)) // 🧠 runs on server
  }

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(q => q - 1)
    const formData = new FormData()
    formData.append("cartItemId", cartId || "")
    startTransition(() => decrementQuantity(formData))
  }

  return (
    <div className="flex gap-2 w-full items-center justify-center">
      <Button variant="outline" onClick={handleDecrement} disabled={isPending}>-</Button>
      <span className="w-8 text-center font-semibold">{quantity}</span>
      <Button onClick={handleIncrement} disabled={isPending}>+</Button>
    </div>
  )
}
