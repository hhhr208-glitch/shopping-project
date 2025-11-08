
export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
   
      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="h-12 bg-gray-700 rounded animate-pulse w-64 mx-auto mb-6"></div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-600 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-600 rounded animate-pulse w-5/6 mx-auto"></div>
            <div className="h-6 bg-gray-600 rounded animate-pulse w-2/3 mx-auto"></div>
          </div>
        </div>
      </section>

   
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
        
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-48"></div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-11/12"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-10/12"></div>
              </div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-4/6"></div>
              </div>
            </div>

         
            <div className="bg-gray-200 p-8 rounded-2xl animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-40 mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-10 bg-gray-700 rounded animate-pulse w-48 mx-auto mb-12"></div>
          
          <div className="bg-gray-800 rounded-xl p-8 text-center max-w-2xl mx-auto">
         
            <div className="w-32 h-32 bg-gray-600 rounded-full mx-auto mb-6 animate-pulse"></div>
            
           
            <div className="h-8 bg-gray-600 rounded animate-pulse w-48 mx-auto mb-3"></div>
            <div className="h-6 bg-gray-600 rounded animate-pulse w-32 mx-auto mb-6"></div>
            
           
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-600 rounded animate-pulse w-11/12 mx-auto"></div>
              <div className="h-4 bg-gray-600 rounded animate-pulse w-10/12 mx-auto"></div>
            </div>
          
            <div className="flex justify-center space-x-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-20 h-6 bg-gray-600 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-80 mx-auto mb-6"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-8"></div>
          
          <div className="flex justify-center space-x-4">
            <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}