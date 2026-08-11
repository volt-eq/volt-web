type MarkProps = { className?: string; title?: string };

/**
 * The Volt mark: two round-capped strokes forming a V whose right arm stops
 * short, so the join reads as a fold. Redrawn as vector so it stays crisp at
 * favicon size and inside Remotion renders.
 */
export function VoltMark({ className = "h-6 w-6", title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="volt-arm-l" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f2f2f4" />
        </linearGradient>
        <linearGradient id="volt-arm-r" x1="0.2" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="1" stopColor="#b9b9c0" />
        </linearGradient>
      </defs>
      <path
        d="M32 32 L98 167"
        fill="none"
        stroke="url(#volt-arm-l)"
        strokeWidth="60"
        strokeLinecap="round"
      />
      <path
        d="M168 32 L131 100"
        fill="none"
        stroke="url(#volt-arm-r)"
        strokeWidth="60"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VoltLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <VoltMark className="h-[1.15rem] w-[1.15rem]" title="Volt" />
      <span className="text-[1.28rem] font-semibold tracking-[-0.045em] text-fg">
        Volt
      </span>
    </span>
  );
}
