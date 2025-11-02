import { AdminCard } from "./adminCard";
import { HomeCard } from "./homeCard";
import { UserCard } from "./userCard";

type CardVariant = "home" | "admin" | "user";

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
}

interface ShowProps {
  variant: CardVariant;
  product: Product; 
  quantity?: number;
  cartId?: string;
  comments?: ProductComment[]; // ✅ CHANGE TO ProductComment[]
}

export function Show({ variant, product, quantity, cartId, comments = [] }: ShowProps) { 
  switch (variant) {
    case "home":
      return <HomeCard product={product} comments={comments} />; 
    case "admin":
      return <AdminCard product={product} comments={comments} />; 
    case "user":
      return <UserCard product={product} quantity={quantity} cartId={cartId} comments={comments} />; 
  }
}