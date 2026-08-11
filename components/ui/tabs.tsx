"use client";

import { useState } from "react";
import { Code, type Lang } from "./code";

export type Snippet = { id: string; label: string; lang: Lang; code: string };

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy code"
      onClick={() => {
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}
      className="rounded-[2px] p-1.5 text-fg-dim transition-colors hover:bg-panel-2 hover:text-fg"
    >
      {copied ? (
        <svg viewBox="0 0 16 16" className="size-[15px]" fill="none" aria-hidden>
          <path
            d="M3.5 8.5 6.5 11.5 12.5 5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="size-[15px]" fill="none" aria-hidden>
          <rect
            x="5.4"
            y="5.4"
            width="8.2"
            height="8.2"
            rx="1.6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M10.6 5.4V4a1.6 1.6 0 0 0-1.6-1.6H4A1.6 1.6 0 0 0 2.4 4v5a1.6 1.6 0 0 0 1.6 1.6h1.4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

export function CodeTabs({
  snippets,
  className = "",
  minHeight = "min-h-[236px]",
  meta,
}: {
  snippets: Snippet[];
  className?: string;
  minHeight?: string;
  /** Small mono label shown next to the copy button. */
  meta?: string;
}) {
  const [active, setActive] = useState(snippets[0]!.id);
  const current = snippets.find((s) => s.id === active) ?? snippets[0]!;

  return (
    <div
      className={`rounded-[3px] border border-line bg-panel/80 shadow-panel backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between border-b border-line pr-2">
        <div role="tablist" className="flex items-center">
          {snippets.map((s) => {
            const on = s.id === current.id;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(s.id)}
                className={`relative px-4 py-3 font-mono text-[0.78rem] transition-colors ${
                  on ? "text-fg" : "text-fg-dim hover:text-fg-muted"
                }`}
              >
                {s.label}
                <span
                  className={`absolute inset-x-3 -bottom-px h-px transition-colors ${
                    on ? "bg-volt" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 pl-3">
          {meta ? (
            <span className="hidden whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.11em] text-fg-dim sm:block">
              {meta}
            </span>
          ) : null}
          <CopyButton value={current.code} />
        </div>
      </div>
      <div className={`px-5 py-5 ${minHeight}`}>
        <Code key={current.id} code={current.code} lang={current.lang} />
      </div>
    </div>
  );
}
