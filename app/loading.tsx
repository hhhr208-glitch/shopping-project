
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
     
      <div className="mb-8">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}