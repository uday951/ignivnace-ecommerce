const SkeletonLoader = ({ type = "card", count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4">
          {type === "card" && (
            <div className="bg-white rounded-lg p-4 w-full h-[350px] flex flex-col gap-4 border border-gray-100">
              <div className="flex-1 bg-gray-200 rounded-md w-full h-40"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="mt-auto h-10 bg-gray-200 rounded-full w-full"></div>
            </div>
          )}
          {type === "text" && (
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
