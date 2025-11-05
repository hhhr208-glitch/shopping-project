
export default function Loading() {
  return (
    <div className="container mx-auto p-6 max-w-md animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
        <div className="h-12 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  )
}