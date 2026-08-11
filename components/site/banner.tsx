"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatedShinyText } from "../ui/animated-shiny-text";

export function Banner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative border-b border-line bg-ink-2">
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-3 px-12 py-2.5 text-center text-[0.8125rem]">
        <AnimatedShinyText className="mx-0 max-w-none text-fg-muted">
          Volt is open source under Apache-2.0.
        </AnimatedShinyText>
        <Link
          href="https://github.com/volt-eq/volt"
          className="inline-flex items-center gap-1 font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-volt"
        >
          Star the repo <span aria-hidden>→</span>
        </Link>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-fg-dim transition-colors hover:text-fg"
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <path
            d="m4 4 8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
