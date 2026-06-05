"use client";

import { useSearchParams } from "next/navigation";
import { colleges } from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") ?? [];
  const selected = colleges.filter((c) => ids.includes(c.id));

  return (
    <main className="min-h-screen bg-[#0f1a24]">
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link href="/" className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
          ← Back to listings
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-1">Compare Colleges</h1>
        <p className="text-white/40 mb-8">Viewing {selected.length} college(s)</p>

        {selected.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-xl">No colleges selected</p>
            <p className="text-sm mt-1">Go to a college detail page and click "Add to Compare"</p>
            <Link href="/" className="mt-4 inline-block text-yellow-400 hover:text-yellow-300 text-sm">
              Browse colleges
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-[#162130]">
                  <td className="p-5 text-sm font-semibold text-white/40 w-40">Feature</td>
                  {selected.map((c) => (
                    <td key={c.id} className="p-5 text-center">
                      <p className="font-bold text-white text-lg">{c.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{c.location}</p>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Rating",
                    render: (c: typeof colleges[0]) => (
                      <span className="text-yellow-400 font-semibold">⭐ {c.rating}</span>
                    ),
                  },
                  {
                    label: "Annual Fees",
                    render: (c: typeof colleges[0]) => (
                      <span className="text-white/80">₹{(c.fees / 100000).toFixed(1)}L</span>
                    ),
                  },
                  {
                    label: "Avg Package",
                    render: (c: typeof colleges[0]) => (
                      <span className="text-yellow-400 font-semibold">
                        ₹{(c.placements.avgPackage / 100000).toFixed(1)}L
                      </span>
                    ),
                  },
                  {
                    label: "Top Recruiter",
                    render: (c: typeof colleges[0]) => (
                      <span className="text-white/80">{c.placements.topRecruiter}</span>
                    ),
                  },
                  {
                    label: "Courses",
                    render: (c: typeof colleges[0]) => (
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {c.courses.map((course) => (
                          <span
                            key={course}
                            className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2.5 py-0.5 rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    ),
                  },
                  {
                    label: "Location",
                    render: (c: typeof colleges[0]) => (
                      <span className="text-white/60 text-sm">{c.location}</span>
                    ),
                  },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                      i % 2 === 0 ? "bg-[#162130]/50" : "bg-transparent"
                    }`}
                  >
                    <td className="p-5 text-sm text-white/40 font-medium">{row.label}</td>
                    {selected.map((c) => (
                      <td key={c.id} className="p-5 text-center">
                        {row.render(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected.length < 3 && selected.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-white/40 mb-3">Add another college to compare:</p>
            <div className="flex flex-wrap gap-2">
              {colleges
                .filter((c) => !ids.includes(c.id))
                .map((c) => (
                  <Link
                    key={c.id}
                    href={`/compare?ids=${[...ids, c.id].join(",")}`}
                    className="text-sm border border-yellow-400/30 text-yellow-400 px-3 py-1.5 rounded-lg hover:bg-yellow-400/10 transition-colors"
                  >
                    + {c.name}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-white/30">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}