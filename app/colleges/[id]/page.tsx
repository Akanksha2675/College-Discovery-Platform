import { colleges, questions } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const college = colleges.find((c) => c.id === id);

  if (!college) return notFound();

  const collegeQuestions = questions.filter((q) => q.collegeId === id);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link href="/" className="text-amber-500 text-sm hover:underline">← Back to listings</Link>
      </div>

      <div className="bg-[#0f2a3f] text-white py-10 px-6 mt-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">{college.name}</h1>
          <p className="text-gray-300">{college.location}</p>
          <div className="flex gap-6 mt-4 text-sm">
            <span className="text-amber-400">⭐ {college.rating} Rating</span>
            <span>💰 ₹{(college.fees / 100000).toFixed(1)}L/yr</span>
            <span>🏢 Avg: ₹{(college.placements.avgPackage / 100000).toFixed(1)}L</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Overview</h2>
          <p className="text-gray-600">{college.overview}</p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Courses Offered</h2>
          <div className="flex flex-wrap gap-2">
            {college.courses.map((course) => (
              <span key={course} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                {course}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Placements</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">
                ₹{(college.placements.avgPackage / 100000).toFixed(1)}L
              </p>
              <p className="text-sm text-gray-500 mt-1">Average Package</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{college.placements.topRecruiter}</p>
              <p className="text-sm text-gray-500 mt-1">Top Recruiter</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Q&A ({collegeQuestions.length})</h2>
          {collegeQuestions.length === 0 ? (
            <p className="text-gray-400 text-sm">No questions yet for this college.</p>
          ) : (
            <div className="space-y-3">
              {collegeQuestions.map((q) => (
                <div key={q.id} className="border border-gray-100 rounded-lg p-4">
                  <p className="font-medium text-gray-800">{q.question}</p>
                  <p className="text-xs text-gray-400 mt-1">Asked by {q.author} · {q.answers.length} answer(s)</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="text-center">
          <Link
            href={`/compare?ids=${college.id}`}
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            + Add to Compare
          </Link>
        </div>
      </div>
    </main>
  );
}