export function ResourceSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#1a1f38] rounded-2xl p-6 border border-[#1f2a50]">
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-[#1f2a50] rounded w-3/4"></div>
          <div className="h-5 bg-[#1f2a50] rounded-full w-20"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-[#1f2a50] rounded w-full"></div>
          <div className="h-4 bg-[#1f2a50] rounded w-2/3"></div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-4 bg-[#1f2a50] rounded w-24"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-[#1f2a50] rounded-lg flex-1"></div>
          <div className="h-10 bg-[#1f2a50] rounded-lg flex-1"></div>
          <div className="h-10 bg-[#1f2a50] rounded-lg flex-1"></div>
        </div>
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-[#1a1f38] rounded-2xl p-6 border border-[#1f2a50]"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="h-4 bg-[#1f2a50] rounded w-20"></div>
            <div className="h-8 w-8 bg-[#1f2a50] rounded-xl"></div>
          </div>
          <div className="h-8 bg-[#1f2a50] rounded w-16 mt-2"></div>
          <div className="h-4 bg-[#1f2a50] rounded w-12 mt-2"></div>
        </div>
      ))}
    </div>
  )
}
