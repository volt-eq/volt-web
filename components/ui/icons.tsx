type Props = { className?: string };

const base = (className = "size-[17px]") => ({
  viewBox: "0 0 20 20",
  fill: "none",
  className,
  "aria-hidden": true as const,
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconRocket({ className }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M10 2.5c2.6 1.7 4 4.4 4 7.4l-4 4-4-4c0-3 1.4-5.7 4-7.4Z" />
      <circle cx="10" cy="8.4" r="1.5" />
      <path d="M6.6 13.4 4.2 15.8m9.2-2.4 2.4 2.4M8.4 16.4 10 18l1.6-1.6" />
    </svg>
  );
}

export function IconStream({ className }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M2.5 7h9m-9 3.5h13m-13 3.5h6" />
      <circle cx="16.2" cy="7" r="1.3" />
    </svg>
  );
}

export function IconMemory({ className }: Props) {
  return (
    <svg {...base(className)}>
      <ellipse cx="10" cy="5.2" rx="6" ry="2.4" />
      <path d="M4 5.2v9.6c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4V5.2" />
      <path d="M4 10c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4" />
    </svg>
  );
}

export function IconHuman({ className }: Props) {
  return (
    <svg {...base(className)}>
      <circle cx="10" cy="6.4" r="2.8" />
      <path d="M4.4 16.6c.5-2.9 2.8-4.6 5.6-4.6s5.1 1.7 5.6 4.6" />
    </svg>
  );
}

export function IconLayers({ className }: Props) {
  return (
    <svg {...base(className)}>
      <path d="m10 2.6 7 3.6-7 3.6-7-3.6 7-3.6Z" />
      <path d="m3 10.4 7 3.6 7-3.6M3 14l7 3.6 7-3.6" />
    </svg>
  );
}

export function IconClock({ className }: Props) {
  return (
    <svg {...base(className)}>
      <circle cx="10" cy="10" r="7.2" />
      <path d="M10 5.8V10l3 2" />
    </svg>
  );
}

export function IconShield({ className }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M10 2.6 16 5v5c0 3.4-2.4 6.4-6 7.4-3.6-1-6-4-6-7.4V5l6-2.4Z" />
      <path d="m7.4 9.8 2 2 3.4-3.6" />
    </svg>
  );
}

export function IconGauge({ className }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M3.4 14.6a7.6 7.6 0 1 1 13.2 0" />
      <path d="M10 10.6 13 8" />
      <circle cx="10" cy="14.6" r="1.2" />
    </svg>
  );
}

export function IconArrow({ className = "size-[15px]" }: Props) {
  return (
    <svg {...base(className)}>
      <path d="M4 10h11m-4.4-4.4L15 10l-4.4 4.4" />
    </svg>
  );
}
