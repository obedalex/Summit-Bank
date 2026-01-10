

export default function KycShimmerCard() {
  return (
    <div className="w-full max-w-3xl p-6 rounded-2xl  bg-white shimmer-card flex flex-col gap-4">
      
      {/* Avatar Placeholder */}
      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>

      {/* Name */}
      <div className="w-40 h-5 bg-gray-300 rounded-md mx-auto"></div>

      {/* Info fields */}
      <div className="flex gap-4 mt-4">
        <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
      </div>

      <div className="flex gap-4">
        <div className="w-full h-4 bg-gray-300 rounded-md"></div>
      </div>

      <div className="flex gap-4">
        <div className="w-full h-4 bg-gray-300 rounded-md"></div>
      </div>

      {/* Button style */}
      <div className="w-full h-10 bg-gray-300 rounded-lg mt-3"></div>
    </div>
  );
}
