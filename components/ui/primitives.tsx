import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ layout */

/** The bordered page frame: everything on the site lives inside these edges. */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1600px] border-x border-line">
      {children}
    </div>
  );
}

/**
 * A section band: a hairline divider, an optional `[ eyebrow ]` strip, then the
 * content column flanked by dashed rails with crosshair ticks at the corners.
 */
export function Section({
  id,
  eyebrow,
  children,
  className = "",
  pad = "py-20 md:py-28",
}: {
  id?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  pad?: string;
}) {
  return (
    <section id={id} className={`rule-t ${className}`}>
      {eyebrow ? (
        <div className="rule-b px-5 py-3 md:px-10">
          <span className="font-mono text-[0.6875rem] tracking-[0.02em] text-fg-dim">
            [ {eyebrow} ]
          </span>
        </div>
      ) : null}
      <div className="px-4 md:px-8">
        <div className={`rails relative mx-auto max-w-[1320px] px-5 md:px-12 ${pad}`}>
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />
          <span className="tick -bottom-[2px] -left-[2px]" />
          <span className="tick -bottom-[2px] -right-[2px]" />
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- pieces */

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[3px] border border-line bg-panel/70 shadow-panel backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-line bg-panel/60 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.11em] text-fg-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block size-[6px] rounded-full bg-volt ${className}`}
      style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
    />
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "solid" | "ghost" | "bracket";
};

export function Button({
  variant = "solid",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const base =
    "group relative inline-flex h-11 items-center justify-center gap-2 px-6 font-mono text-[0.75rem] uppercase tracking-[0.13em] transition-colors duration-200";
  const skin =
    variant === "solid"
      ? "bg-fg text-ink hover:bg-volt"
      : variant === "ghost"
        ? "border border-line text-fg-muted hover:border-line-strong hover:text-fg"
        : "text-fg-muted hover:text-fg";

  return (
    <Link className={`${base} ${skin} ${className}`} {...rest}>
      {variant === "bracket" ? <Brackets /> : null}
      {children}
    </Link>
  );
}

/** The four corner ticks AgentMail puts around its secondary nav actions. */
export function Brackets() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {(
        [
          "left-0 top-0 border-l border-t",
          "right-0 top-0 border-r border-t",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ] as const
      ).map((pos) => (
        <span
          key={pos}
          className={`absolute size-[7px] border-line-strong transition-colors group-hover:border-volt ${pos}`}
        />
      ))}
    </span>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`h-section text-[2.25rem] md:text-[3.25rem] lg:text-[3.75rem] ${className}`}
    >
      {children}
    </h2>
  );
}
