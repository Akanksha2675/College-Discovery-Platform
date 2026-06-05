import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-8 sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
        <span className="bg-amber-400 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black">C</span>
        CollegeFind
      </Link>
      <div className="flex items-center gap-6 ml-4">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Explore</Link>
        <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Compare</Link>
        <Link href="/discussions" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Discussions</Link>
      </div>
      <div className="ml-auto">
        <Link href="/discussions" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
          Get Started
        </Link>
      </div>
    </nav>
  );
}