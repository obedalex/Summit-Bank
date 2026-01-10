
export default function ProfileShimmerCard() {
  return (
    <div className="w-full max-w-sm p-6 rounded-2xl border bg-white shimmer-card flex flex-col items-center gap-4">
      
      {/* Profile Picture */}
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

      {/* Full Name */}
      <div className="w-40 h-5 bg-gray-300 rounded-md"></div>

      {/* Role / Bio */}
      <div className="w-28 h-4 bg-gray-300 rounded-md"></div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 my-2"></div>

      {/* Details */}
      <div className="w-3/4 h-4 bg-gray-300 rounded-md"></div>
      <div className="w-2/4 h-4 bg-gray-300 rounded-md"></div>
      <div className="w-full h-4 bg-gray-300 rounded-md"></div>

      {/* Buttons */}
      <div className="flex gap-4 mt-3 w-full">
        <div className="w-1/2 h-10 bg-gray-300 rounded-lg"></div>
        <div className="w-1/2 h-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
