

export default function StatShimmerCard() {
  return (
    <div className="w-full  p-4 rounded-xl border-none bg-white shimmer-card">
      {/* Title Bar */}
      <div className="w-28 h-4 bg-gray-300 rounded-md mb-3"></div>

      {/* Big Number */}
      <div className="w-40 h-10 bg-gray-300 rounded-md mb-4"></div>

      {/* Small Texts */}
      <div className="w-full h-3 bg-gray-300 rounded-md mb-2"></div>
      <div className="w-2/5 h-3 bg-gray-300 rounded-md"></div>
    </div>
  );
}
