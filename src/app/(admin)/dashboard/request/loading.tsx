export default function Loading() {
  return (
    <>
      <div className="mb-1 h-8 w-64 animate-pulse rounded-md bg-gray-200" />
      <div className="h-4 w-44 animate-pulse rounded-md bg-gray-200" />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-lg border p-4 shadow-sm">
            <div className="mb-1 h-8 w-74 animate-pulse rounded-md bg-gray-200" />
            <div className="h-4 w-54 animate-pulse rounded-md bg-gray-200" />

            <div className="my-3 h-6 w-2/3 animate-pulse rounded-md bg-gray-200" />
            <div className="h-6 w-34 animate-pulse rounded-md bg-gray-200" />
          </div>
        ))}
      </div>
    </>
  );
}
