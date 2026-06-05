import Link from "next/link";
import Image from "next/image";
import { College } from "@/types";

export default function CollegeCard({ college }: { college: College }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* College image */}
      <div className="relative h-40 w-full bg-gray-200">
        <Image
          src={college.image}
          alt={college.name}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x300/1a3a52/white?text=" + college.name;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
          {college.courses[0]}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{college.name}</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
          📍 {college.location}
        </p>

        <div className="flex justify-between text-sm mb-4">
          <span className="text-amber-500 font-semibold">⭐ {college.rating}</span>
          <span className="text-gray-500">{college.courses.length} courses</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
          <div className="text-center">
            <p className="font-bold text-gray-900">₹{(college.fees / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-400">Annual Fees</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-900">₹{(college.placements.avgPackage / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-400">Avg Package</p>
          </div>
        </div>

        <Link
          href={`/colleges/${college.id}`}
          className="block text-center bg-gray-900 text-white text-sm py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}