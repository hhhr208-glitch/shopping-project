
export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 justify-center justify-items-center">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item}
            className="transition-transform duration-300 hover:scale-105 cursor-pointer w-full max-w-xs"
          >
          
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              
           
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
              
             
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                
            
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
                
               
                <div className="flex gap-2 mt-3">
                  <div className="h-9 bg-gray-200 rounded animate-pulse flex-1"></div>
                  <div className="h-9 bg-gray-200 rounded animate-pulse flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg max-w-md mx-auto">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mx-auto mb-3"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-40 mx-auto"></div>
      </div>

    
      <div className="text-center py-12">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto"></div>
      </div>
    </div>
  );
}