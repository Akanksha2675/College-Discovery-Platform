"use client";

import { useState } from "react";
import { colleges, questions as initialQuestions } from "@/lib/data";
import { Question, Answer } from "@/types";
import Link from "next/link";

export default function DiscussionsPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>(initialQuestions);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});

  const filtered = selectedCollege
    ? allQuestions.filter((q) => q.collegeId === selectedCollege)
    : allQuestions;

  const handleAddQuestion = () => {
    if (!newQuestion.trim() || !selectedCollege) return;
    const q: Question = {
      id: `q${Date.now()}`,
      collegeId: selectedCollege,
      question: newQuestion.trim(),
      author: newAuthor.trim() || "Anonymous",
      answers: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAllQuestions([q, ...allQuestions]);
    setNewQuestion("");
    setNewAuthor("");
  };

  const handleAddAnswer = (questionId: string) => {
    const text = answerText[questionId];
    if (!text?.trim()) return;
    const answer: Answer = {
      id: `a${Date.now()}`,
      text: text.trim(),
      author: "You",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAllQuestions(allQuestions.map((q) =>
      q.id === questionId ? { ...q, answers: [...q.answers, answer] } : q
    ));
    setAnswerText({ ...answerText, [questionId]: "" });
  };

  const getCollegeName = (id: string) =>
    colleges.find((c) => c.id === id)?.name ?? "Unknown";

  return (
    <main className="min-h-screen bg-[#0f1a24]">
      {/* Header */}
      <div className="bg-[#0f2a3f] border-b border-white/10 py-12 px-6 text-center">
        <p className="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-2">Community</p>
        <h1 className="text-3xl font-bold text-white mb-2">Q&A Discussions</h1>
        <p className="text-white/40 text-sm">Ask questions, share experiences</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Ask a question */}
        <section className="bg-[#162130] border border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-4">Ask a Question</h2>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full bg-[#1e2d40] border border-white/10 text-white/80 rounded-xl px-4 py-2.5 text-sm mb-3 outline-none focus:border-yellow-400/50 transition-colors"
          >
            <option value="" className="bg-[#1e2d40]">Select a college...</option>
            {colleges.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#1e2d40]">{c.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="w-full bg-[#1e2d40] border border-white/10 text-white/80 placeholder-white/30 rounded-xl px-4 py-2.5 text-sm mb-3 outline-none focus:border-yellow-400/50 transition-colors"
          />
          <textarea
            placeholder="Type your question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={3}
            className="w-full bg-[#1e2d40] border border-white/10 text-white/80 placeholder-white/30 rounded-xl px-4 py-2.5 text-sm mb-4 resize-none outline-none focus:border-yellow-400/50 transition-colors"
          />
          <button
            onClick={handleAddQuestion}
            disabled={!newQuestion.trim() || !selectedCollege}
            className="bg-yellow-400 text-[#0f1a24] font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Post Question
          </button>
        </section>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40">Filter:</span>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="bg-[#162130] border border-white/10 text-white/70 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-yellow-400/50 transition-colors"
          >
            <option value="" className="bg-[#162130]">All Colleges</option>
            {colleges.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#162130]">{c.name}</option>
            ))}
          </select>
          <span className="text-sm text-white/30 ml-auto">{filtered.length} question(s)</span>
        </div>

        {/* Questions list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <p>No questions yet. Be the first to ask!</p>
          </div>
        ) : (
          filtered.map((q) => (
            <div key={q.id} className="bg-[#162130] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2.5 py-0.5 rounded-full">
                  {getCollegeName(q.collegeId)}
                </span>
                <span className="text-xs text-white/30">{q.createdAt}</span>
              </div>
              <p className="font-semibold text-white mt-3 mb-1">{q.question}</p>
              <p className="text-xs text-white/30 mb-4">Asked by {q.author}</p>

              {/* Answers */}
              {q.answers.length > 0 && (
                <div className="space-y-3 mb-4 pl-4 border-l-2 border-yellow-400/20">
                  {q.answers.map((a) => (
                    <div key={a.id}>
                      <p className="text-sm text-white/70">{a.text}</p>
                      <p className="text-xs text-white/30 mt-0.5">{a.author} · {a.createdAt}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add answer */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Write an answer..."
                  value={answerText[q.id] ?? ""}
                  onChange={(e) => setAnswerText({ ...answerText, [q.id]: e.target.value })}
                  className="flex-1 bg-[#1e2d40] border border-white/10 text-white/80 placeholder-white/30 rounded-xl px-4 py-2 text-sm outline-none focus:border-yellow-400/50 transition-colors"
                />
                <button
                  onClick={() => handleAddAnswer(q.id)}
                  className="bg-yellow-400 text-[#0f1a24] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        )}

        <div className="text-center pt-4 pb-8">
          <Link href="/" className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
            ← Back to listings
          </Link>
        </div>
      </div>
    </main>
  );
}