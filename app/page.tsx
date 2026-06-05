"use client";

import { useState } from "react";
import { colleges } from "@/lib/data";
import CollegeCard from "@/components/CollegeCard";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Star, ArrowUp, ArrowDown, MapPin } from "lucide-react";

const categories = [
  { label: "Engineering", icon: "⚙️", count: "820+ programs" },
  { label: "Business", icon: "💼", count: "1,200+ programs" },
  { label: "Computer Science", icon: "💻", count: "900+ programs" },
  { label: "Medical", icon: "🏥", count: "740+ programs" },
  { label: "Arts & Design", icon: "🎨", count: "650+ programs" },
  { label: "Law", icon: "⚖️", count: "480+ programs" },
  { label: "Social Sciences", icon: "🌍", count: "1,100+ programs" },
  { label: "Natural Sciences", icon: "🔬", count: "680+ programs" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = colleges
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = locationFilter
        ? c.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      return matchesSearch && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "fees_low") return a.fees - b.fees;
      if (sortBy === "fees_high") return b.fees - a.fees;
      return 0;
    });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-[#0f2a3f] text-white py-20 px-6 text-center">
        <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">Your Future Starts Here</p>
        <h1 className="text-5xl font-black mb-4 leading-tight">Find Your Perfect College</h1>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
          Explore top universities, compare programs, and discover where you truly belong.
        </p>
        <div className="flex max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search colleges, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-4 text-gray-800 text-base outline-none bg-white"
          />
          <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-4 transition-colors">
            Search
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["Engineering", "Business", "Medical", "Computer Science", "Law"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearch(tag)}
              className="text-xs border border-white/20 text-white/70 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border-b border-gray-100 py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4 text-center">
          {[
            { value: "8+", label: "Universities" },
            { value: "50+", label: "Programs" },
            { value: "10+", label: "Cities" },
            { value: "4.5★", label: "Avg Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Featured Colleges</h2>
            <p className="text-gray-500 text-sm mt-1">Top picks based on ratings and placements</p>
          </div>
          <div className="flex gap-3">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="">All Locations</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Telangana">Telangana</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="rating">Top Rated</option>
              <option value="fees_low">Fees: Low to High</option>
              <option value="fees_high">Fees: High to Low</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">{filtered.length} colleges found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No colleges found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#0f2a3f] text-white py-20 px-6 text-center">
  <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">Your Future Starts Here</p>
  <h1 className="text-5xl font-black mb-4 leading-tight">Find Your Perfect College</h1>
  <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
    Explore top universities, compare programs, and discover where you truly belong.
  </p>

  {/* Search bar */}
  <div className="flex max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg mb-4">
    <input
      type="text"
      placeholder="Search colleges, locations..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 px-5 py-4 text-gray-800 text-base outline-none bg-white"
    />
    <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-4 transition-colors">
      Search
    </button>
  </div>

  {/* Filters */}
  <div className="flex justify-center gap-3 mb-5">
    <FilterDropdown
      options={[
        { value: "", label: "All Locations", icon: <MapPin size={16} className="text-yellow-400/60" /> },
        { value: "delhi", label: "Delhi", icon: <MapPin size={16} className="text-yellow-400/60" /> },
        { value: "mumbai", label: "Mumbai", icon: <MapPin size={16} className="text-yellow-400/60" /> },
      ]}
      value={locationFilter}
      onChange={setLocationFilter}
    />

    <FilterDropdown
      options={[
        { value: "rating", label: "Top Rated", icon: <Star size={16} className="text-yellow-400/60" /> },
        { value: "fees_low", label: "Fees: Low to High", icon: <ArrowUp size={16} className="text-yellow-400/60" /> },
        { value: "fees_high", label: "Fees: High to Low", icon: <ArrowDown size={16} className="text-yellow-400/60" /> },
      ]}
      value={sortBy}
      onChange={setSortBy}
    />
  </div>

  {/* Quick tags */}
  <div className="flex flex-wrap justify-center gap-2">
    {["Engineering", "Business", "Medical", "Computer Science", "Law"].map((tag) => (
      <button
        key={tag}
        onClick={() => setSearch(tag)}
        className="text-xs border border-white/20 text-white/70 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
      >
        {tag}
      </button>
    ))}
  </div>
</div>

      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        2025 CollegeFind. All rights reserved.
      </footer>
    </main>
  );
}