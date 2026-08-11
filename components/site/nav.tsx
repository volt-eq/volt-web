"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VoltLogo } from "../brand/logo";
import { Button } from "../ui/primitives";

type MenuItem = { label: string; href: string; hint: string };

const MENUS: { label: string; items: MenuItem[] }[] = [
  {
    label: "Platform",
    items: [
      { label: "Deployments", href: "/#platform", hint: "Push a graph, get an endpoint" },
      { label: "Runs & streaming", href: "/#platform", hint: "SSE, resume, cancel" },
      { label: "Threads & memory", href: "/#platform", hint: "Postgres checkpoints" },
      { label: "Schedules", href: "/status", hint: "Cron-driven agents" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Support agents", href: "/#use-cases", hint: "Long-lived conversations" },
      { label: "Research agents", href: "/#use-cases", hint: "Tool loops that run for minutes" },
      { label: "Back-office", href: "/#use-cases", hint: "Approval gates, audit trail" },
    ],
  },
];

const LINKS: MenuItem[] = [
  { label: "Pricing", href: "/#pricing", hint: "" },
  { label: "Compare", href: "/compare", hint: "" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "rule-b bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link href="/" aria-label="Volt home">
            <VoltLogo />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {MENUS.map((menu) => (
              <div key={menu.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[0.9rem] text-fg-muted transition-colors group-hover:text-fg"
                >
                  {menu.label}
                  <svg
                    viewBox="0 0 12 12"
                    className="size-3 transition-transform group-hover:rotate-180"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="m2.5 4.5 3.5 3.5 3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full w-[19rem] translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-[3px] border border-line bg-panel/95 p-1.5 shadow-panel backdrop-blur-xl">
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-[2px] px-3 py-2.5 transition-colors hover:bg-panel-2"
                      >
                        <span className="block text-[0.875rem] text-fg">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block font-mono text-[0.6875rem] text-fg-dim">
                          {item.hint}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-3 py-2 text-[0.9rem] text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/volt-eq/volt"
              aria-label="Volt on GitHub"
              className="hidden p-2 text-fg-muted transition-colors hover:text-fg sm:block"
            >
              <svg viewBox="0 0 16 16" className="size-[19px]" fill="currentColor" aria-hidden>
                <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.08.55-.17.55-.38v-1.35c-2.23.49-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.47.55.38A8 8 0 0 0 8 0Z" />
              </svg>
            </Link>
            <Button href="/docs" variant="bracket" className="hidden h-9 px-4 sm:inline-flex">
              Docs
            </Button>
            <Button href="/#start" className="h-9 px-4 text-[0.7rem]">
              Deploy
            </Button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobile((v) => !v)}
              className="p-2 text-fg-muted lg:hidden"
            >
              <svg viewBox="0 0 16 16" className="size-5" fill="none" aria-hidden>
                <path
                  d={mobile ? "m4 4 8 8M12 4l-8 8" : "M2 5h12M2 11h12"}
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {mobile ? (
        <div className="rule-b bg-ink/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          {[...MENUS.flatMap((m) => m.items), ...LINKS].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobile(false)}
              className="block border-b border-line py-3 text-[0.95rem] text-fg-muted last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
