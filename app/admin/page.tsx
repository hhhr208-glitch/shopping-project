import { redirect } from "next/navigation";
import Check from "../feature/chekAdmin";
import { prisma } from "@/lib/prisma";
import { getServerField } from "next/dist/server/lib/render-server";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Show } from "../feature/showCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Admin(){
  try {
    const usrRole = await Check();
    const session = await getServerSession(authOptions)
    const products = await prisma.product.findMany({
      where: {
        createdById: session.user.id
      }
    })
    
    if (!usrRole){
      return(<h1> please log in first and then we talk </h1>)
    }
    
    if (usrRole !== "admin"){  
      return (<h1>hey you are not admin ask your manager to promote you to admin and then try to come here and do this thing</h1>)
    }
    else {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Admin Products</h1>
            <Link href="/admin/create">
              <Button className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                <span>+</span>
                <span>Add Product</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 justify-center justify-items-center">
            {products.map((product) => (
              <div 
                key={product.id}
                className="transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <Show 
                  variant="admin"
                  product={product}
                />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
  catch {
    return (
      <h1 style={{
        color: '#d32f2f',
        backgroundColor: '#ffebee',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #f44336',
        textAlign: 'center',
        margin: '20px',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        Something went wrong  make sure to log in and also make sure that you  are admin !
      </h1>
    );
  }
}