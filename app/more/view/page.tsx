// app/more/view/page.tsx
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import Image from 'next/image';
import { redirect } from "next/navigation";
import { useState } from "react";
import sanitizeHtml from "sanitize-html"

interface ViewPageProps {
  searchParams: Promise<{
    productId?: string;
  }>;
}

 async function handleSubmit(formdata: FormData) {
  "use server"
  
  try {
    const session = await getServerSession(authOptions);
    if (!session) { 
      throw new Error("You have to log in first");
    }
    
    const userId = session.user.id;
    const productId = formdata.get("productId") as string;
    const comment = formdata.get("comment") as string;
   const rating = parseInt(formdata.get("rating") as string )
    // Validate inputs
    if (!productId) {
      throw new Error("Product ID is required");
    }
    
    if (!comment?.trim()) {
      throw new Error("Comment cannot be empty");
    }
     const cleanComment = sanitizeHtml(comment.trim(), {
      allowedTags: [],          // no HTML tags allowed
      allowedAttributes: {},    // no attributes allowed
    });
    await prisma.comment.create({
      data: {
        userId: userId,
        productId: productId,
        content: comment.trim(),
        rating : rating,
      }
    });

    // No return value - this satisfies React's form action requirement
    // The page will refresh and show the new comment
    revalidatePath('/more/view') // Refreshes data without navigation
  } catch (error: any) {
    console.error("Error creating comment:", error);
    
    // More specific error handling
    if (error.code === 'P2002') {
      throw new Error("You can only comment on each product once");
    }
    
    // Re-throw the original error if it's already our custom error
    if (error.message.includes("log in") || error.message.includes("required") || error.message.includes("empty")) {
      throw error;
    }
    
    // Generic error for other cases
    throw new Error("Failed to post comment. Please try again.");
  }
}
export default async function ViewPage({ searchParams }: ViewPageProps) {
  
  const params = await searchParams;
  const productId = params.productId;



  if (!productId) {
    return <div>No product selected</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  // Fetch comments with user data
  const comments = await prisma.comment.findMany({
    where: {
      productId: productId
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Image Section */}
        <div className="flex justify-center">
          {product.image && (
            <div className="relative group">
              <Image 
                src={product.image} 
                alt={product.name}
                width={600}
                height={500}
                className="w-full max-w-lg h-auto object-cover rounded-xl shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl"
              />
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 transition-all hover:text-gray-700">
              {product.name}
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed transition-all hover:text-gray-800">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-6 py-4">
            <span className="text-3xl font-bold text-green-600 transition-transform hover:scale-105">
              ${product.price}
            </span>
            
            <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              product.stock > 10 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : product.stock > 0
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {product.category && (
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-blue-200 hover:scale-105">
              🏷️ {product.category}
            </span>
          )}

          {/* Features */}
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 transition-all hover:text-gray-800">
                <span>📦</span>
                <span>Free shipping available</span>
              </div>
              <div className="flex items-center gap-2 transition-all hover:text-gray-800">
                <span>🔄</span>
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="mt-16 max-w-4xl mx-auto">
        {/* Comments Display */}
       <div className="mb-8">
  <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2 text-center">
    Customer Reviews ({comments.length})
  </h3>
  
  <div className="space-y-4">
    {comments.map((comment) => (
      <div key={comment.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-4">
        
          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                {comment.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {comment.user?.name || 'Anonymous User'}
                </h4>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {comment.content}
            </p>
          </div>
            {/* Rating on Left Side */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-lg flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-yellow-600">
               
              </span>
              <div className="flex gap-0.5 mr-2 	">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl  ${star <= (comment.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    ))}
    
    {comments.length === 0 && (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-4">💬</div>
        <h4 className="text-xl font-semibold text-gray-600 mb-2">No comments yet</h4>
        <p className="text-gray-500">Be the first to share your thoughts about this product!</p>
      </div>
    )}
  </div>
</div>

        {/* Comment Form */}
        <div className=" p-8 rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Share Your Thoughts</h3>
          
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment
              </label>
              <textarea 
                id="comment"
                name="comment" 
                placeholder="What do you think about this product? Share your experience..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows={5}
              />
            
            </div>
  {/* Rating Section */}
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <StarRating />
      </div>     <input hidden readOnly value={productId} name="productId" />
            
            <Button 
              type="submit" 
              className="w-full  hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              📝 Post Comment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}