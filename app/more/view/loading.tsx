
export default function ViewPageLoading() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
     
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="w-full h-96 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        
        <div className="space-y-6">
          
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
          </div>

        
          <div className="flex items-center gap-6 py-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-32"></div>
          </div>

          <div className="h-8 bg-gray-200 rounded-full animate-pulse w-32"></div>

         
          <div className="pt-6 border-t border-gray-200 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
          </div>
        </div>
      </div>

  
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-6 mx-auto"></div>
          
         
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>
                  <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

    
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
          <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>
    </div>
  );
}