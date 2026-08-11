import Link from "next/link";
import { VoltLogo } from "../brand/logo";
import { Pill, StatusDot } from "../ui/primitives";

type Column = { title: string; links: [string, string][] };

const COLUMNS: Column[] = [
  {
    title: "Product",
    links: [
      ["Platform", "/#platform"],
      ["Use cases", "/#use-cases"],
      ["Pricing", "/#pricing"],
      ["Changelog", "/changelog"],
    ],
  },
  {
    title: "Developers",
    links: [
      ["Docs", "/docs"],
      ["Agent Protocol", "/protocol"],
      ["Self-hosting", "/self-hosting"],
      ["GitHub", "https://github.com/volt-eq/volt"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["FAQ", "/#faq"],
      ["Compare", "/compare"],
      ["Status", "/status"],
      ["Support", "/support"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Licence", "https://github.com/volt-eq/volt/blob/main/LICENSE"],
      ["Security", "/security"],
    ],
  },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "GitHub",
    href: "https://github.com/volt-eq/volt",
    path: "M8 0a8 8 0 0 0-2.53 15.59c.4.08.55-.17.55-.38v-1.35c-2.23.49-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.47.55.38A8 8 0 0 0 8 0Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M12.6 1.5h2.45l-5.36 6.13L16 14.5h-4.4l-3.45-4.5-3.94 4.5H1.76l5.6-6.4L1.3 1.5h4.5l3.22 4.26L12.6 1.5Zm-.86 11.53h1.36L4.32 2.9H2.86l8.88 10.13Z",
  },
  {
    label: "Discord",
    href: "https://discord.com",
    path: "M13.1 3.2A11 11 0 0 0 10.4 2.4l-.2.4a8.2 8.2 0 0 1 2.4 1.2 11.5 11.5 0 0 0-9.2 0 8.2 8.2 0 0 1 2.4-1.2l-.2-.4a11 11 0 0 0-2.7.8C1.3 6 .8 8.7 1 11.4a11 11 0 0 0 3.3 1.7l.4-.7a7 7 0 0 1-1.2-.6l.3-.2a7.9 7.9 0 0 0 6.8 0l.3.2c-.4.2-.8.4-1.2.6l.4.7a11 11 0 0 0 3.3-1.7c.3-3-.5-5.7-1.3-8.2ZM5.7 9.8c-.6 0-1.1-.6-1.1-1.3s.5-1.3 1.1-1.3 1.1.6 1.1 1.3-.5 1.3-1.1 1.3Zm4.6 0c-.6 0-1.1-.6-1.1-1.3s.5-1.3 1.1-1.3 1.1.6 1.1 1.3-.5 1.3-1.1 1.3Z",
  },
];

export function Footer() {
  return (
    <footer className="relative rule-t">
      <div aria-hidden className="pointer-events-none absolute inset-0 hatch opacity-50" />
      <div className="relative px-4 md:px-8">
        <div className="rails relative mx-auto max-w-[1320px] px-5 py-16 md:px-12">
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />

          <div className="grid gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)] md:gap-16">
            <div>
              <VoltLogo />
              <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-[1.6] text-fg-muted">
                Deployments for LangGraph and LangChain agents. Push TypeScript
                or Python, get a production endpoint.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>
                  <StatusDot />
                  All systems online
                </Pill>
                <Pill>Apache-2.0</Pill>
              </div>

              <div className="mt-6 flex items-center gap-1">
                {SOCIALS.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 text-fg-dim transition-colors hover:text-fg"
                  >
                    <svg viewBox="0 0 16 16" className="size-[17px]" fill="currentColor" aria-hidden>
                      <path d={social.path} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {COLUMNS.map((column) => (
                <div key={column.title}>
                  <p className="label mb-4">{column.title}</p>
                  <ul className="space-y-2.5">
                    {column.links.map(([label, href]) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="text-[0.9rem] text-fg-muted transition-colors hover:text-fg"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-fg-dim md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Volt · Apache-2.0 licensed</p>
            <p>Built for agents that keep running</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
