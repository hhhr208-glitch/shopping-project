import { Card } from "@/components/ui/card";
import { Show } from "./feature/showCard";
import { prisma } from "@/lib/prisma";
import { SearchBox } from "@/components/SearchBox";

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

async function getProducts(search?: string, category?: string) {
  try {
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search } },      
          { description: { contains: search } } 
        ]
      }),
      ...(category && { category: category })
    };

    const products = await prisma.product.findMany({
      where,
      include: {
        comments: true  
      }
    });
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const products = await getProducts(params.search, params.category);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <SearchBox initialSearch={params.search} />
      </div>

      {params.search && (
        <div className="mb-4">
          <p className="text-gray-600">
            Showing results for: <span className="font-semibold">"{params.search}"</span>
            {products.length > 0 && ` (${products.length} products found)`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 justify-center justify-items-center">
        {products.map((product) => (
          <div key={product.id} className="transition-transform duration-300 hover:scale-105 cursor-pointer">
            <Show 
              variant="home"
              product={product}
              comments={product.comments} 
            />
          </div>
        ))}
      </div>

      {products.length === 0 && params.search && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found for "{params.search}"</p>
          <p className="text-gray-400">Try a different search term</p>
        </div>
      )}
    </div>
  );
}