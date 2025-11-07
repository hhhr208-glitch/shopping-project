"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { incrementQuantity, decrementQuantity } from "@/app/actions/inceaseAndDecreaseCart";

interface IncrementButtonProps {
  cartId: string;
  quantity: number;
  product: {
    stock: number;
  };
}

export function IncrementButton({ cartId, quantity, product }: IncrementButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      incrementQuantity(formData);
    });
  };

  return (
    <form action={handleSubmit} className="flex-1">
      <input type="hidden" name="cartItemId" value={cartId} />
      <Button 
        className="w-full h-10"
        type="submit"
        disabled={isPending || !cartId || quantity >= product.stock}
      >
        {isPending ? "..." : "+"}
      </Button>
    </form>
  );
}