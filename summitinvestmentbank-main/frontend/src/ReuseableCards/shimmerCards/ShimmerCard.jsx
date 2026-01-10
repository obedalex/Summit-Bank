// ShimmerCreditCard.jsx

export default function ShimmerCreditCard() {
  return (
    <div className="w-full max-w-sm aspect-[16/9] rounded-2xl bg-gray-400 shimmer-card p-4 space-y-4">
      {/* Top Section */}
      <div className="w-24 h-6 bg-gray-300 rounded-md"></div>

      {/* Middle Numbers */}
      <div className="w-full h-8 bg-gray-300 rounded-md"></div>

      {/* Bottom 2 Rows */}
      <div className="flex justify-between">
        <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-5 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}
