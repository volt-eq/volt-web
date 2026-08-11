import Link from "next/link";
import type { ReactNode } from "react";
import { Frame } from "../ui/primitives";
import { Footer } from "./footer";
import { Nav } from "./nav";

/** The chrome every sub-page shares: frame, rails, eyebrow, title, lede. */
export function PageShell({
  eyebrow,
  title,
  lede,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  /** Small mono facts under the lede, e.g. "updated 2026-08-10". */
  meta?: string[];
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>
        <Frame>
          <div className="rule-t px-4 md:px-8">
            <div className="rails relative mx-auto max-w-[1320px] px-5 py-16 md:px-12 md:py-20">
              <span className="tick -left-[2px] -top-[2px]" />
              <span className="tick -right-[2px] -top-[2px]" />
              <p className="font-mono text-[0.6875rem] text-fg-dim">[ {eyebrow} ]</p>
              <h1 className="h-section mt-6 max-w-[24ch] text-[2.4rem] md:text-[3.4rem]">
                {title}
              </h1>
              <p className="mt-6 max-w-[46rem] text-[1.0625rem] leading-[1.6] text-fg-muted">
                {lede}
              </p>
              {meta?.length ? (
                <p className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.11em] text-fg-dim">
                  {meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rule-t px-4 md:px-8">
            <div className="rails relative mx-auto max-w-[1320px] px-5 py-16 md:px-12 md:py-20">
              <span className="tick -bottom-[2px] -left-[2px]" />
              <span className="tick -bottom-[2px] -right-[2px]" />
              {children}
            </div>
          </div>

          <Footer />
        </Frame>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------- content */

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[46rem] space-y-6">{children}</div>;
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="h-section mt-14 text-[1.6rem] first:mt-0 md:text-[1.9rem]"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-10 text-[1.05rem] font-medium tracking-[-0.01em] text-fg">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1rem] leading-[1.7] text-fg-muted">{children}</p>
  );
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[1rem] leading-[1.65] text-fg-muted">
          <span className="mt-[0.55em] size-[3px] shrink-0 rounded-full bg-fg-dim" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-line px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-dim"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top text-[0.9rem] leading-[1.55] ${
                    j === 0 ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="border border-line bg-panel/50 px-5 py-4">
      <p className="text-[0.9375rem] leading-[1.6] text-fg-muted">{children}</p>
    </div>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-volt"
    >
      {children}
    </Link>
  );
}

export function Status({ state }: { state: "shipped" | "building" | "planned" }) {
  const tone =
    state === "shipped"
      ? "border-volt/40 bg-volt/10 text-volt"
      : state === "building"
        ? "border-line-strong text-fg"
        : "border-line text-fg-dim";
  return (
    <span
      className={`inline-block border px-2 py-0.5 font-mono text-[0.63rem] uppercase tracking-[0.11em] ${tone}`}
    >
      {state}
    </span>
  );
}
