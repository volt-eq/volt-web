import Link from "next/link";
import { StatusDot } from "../ui/primitives";

/**
 * Where we say the honest thing: Volt is early. Deliberately placed before the
 * pricing section, so nobody reads a price before reading this.
 */
export function Notice() {
  return (
    <div className="rule-t px-4 md:px-8">
      <div className="rails relative mx-auto max-w-[1320px] px-5 py-8 md:px-12">
        <div className="flex flex-col gap-4 border border-line bg-panel/50 px-5 py-4 md:flex-row md:items-center md:gap-6 md:px-6">
          <span className="flex shrink-0 items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.13em] text-volt">
            <StatusDot />
            Early access
          </span>
          <p className="text-[0.9375rem] leading-[1.6] text-fg-muted">
            Volt runs prototypes, internal tools and test workloads today — not
            customer-facing production traffic. The protocol surface is stable;
            schedules, quotas and the multi-region control plane are still
            landing. Build on it, tell us what breaks, and follow the{" "}
            <Link
              href="https://github.com/volt-eq/volt#roadmap"
              className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-volt"
            >
              roadmap
            </Link>{" "}
            for the production milestone.
          </p>
        </div>
      </div>
    </div>
  );
}
