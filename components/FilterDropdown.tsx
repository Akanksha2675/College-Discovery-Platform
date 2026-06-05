// components/FilterDropdown.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string; icon?: React.ReactNode };

export function FilterDropdown({ options, value, onChange }: {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(p => !p)}
        className={`flex items-center gap-2 justify-between min-w-[160px]
          bg-[#1e2d40] text-white px-4 py-2.5 rounded-[10px] text-sm font-medium
          border transition-all duration-200
          ${open
            ? "border-yellow-400 bg-[#253547]"
            : "border-white/10 hover:border-yellow-400/50 hover:bg-[#253547]"
          }`}
      >
        <span>{selected?.label}</span>
        <ChevronDown
          size={16}
          className={`text-yellow-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 min-w-full
          bg-[#162130] border border-white/10 rounded-xl p-1.5 z-50
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg
                text-sm text-left transition-all duration-150
                ${value === opt.value
                  ? "text-yellow-400 font-medium"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}