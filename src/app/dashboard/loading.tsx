export default function DashboardLoading() {
  return (
    <div className="p-7 space-y-5">
      <div className="space-y-2">
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-52 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-80 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
