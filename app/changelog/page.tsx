import type { Metadata } from "next";
import { A, PageShell, Status } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What shipped in Volt, newest first.",
};

type Entry = {
  date: string;
  version: string;
  title: string;
  items: string[];
  state?: "shipped" | "building";
};

const ENTRIES: Entry[] = [
  {
    date: "2026-08-10",
    version: "0.1.4",
    title: "Landing page and public docs",
    items: [
      "This site: platform overview, use cases, pricing and the pages you are reading.",
      "Docs, protocol reference and self-hosting guide written against the runtime that exists today.",
      "Said the honest thing out loud — Volt is early access, not production infrastructure yet.",
    ],
  },
  {
    date: "2026-08-07",
    version: "0.1.3",
    title: "The volt CLI",
    items: [
      "volt dev — preflight, Postgres, migrations, then the runtime with reload on change.",
      "volt chat <graph> — an interactive session against a running runtime, over the real SDK.",
      "volt graphs, volt serve, volt up / down.",
      "Works from any project with a volt.json, not just a clone of this repository.",
    ],
  },
  {
    date: "2026-08-06",
    version: "0.1.2",
    title: "Human in the loop",
    items: [
      "interrupt() pauses a run and persists the checkpoint; resume with a command.",
      "Interrupted runs survive a restart — the decision can arrive a day later.",
    ],
  },
  {
    date: "2026-08-06",
    version: "0.1.1",
    title: "Real test suite",
    items: [
      "129 tests against real Postgres rather than mocks: jsonb containment, the conditional-update claim, cascade deletes, the checkpointer.",
      "Found and fixed an interrupt bug in the process.",
      "A smoke test that drives an unmodified @langchain/langgraph-sdk end to end.",
    ],
  },
  {
    date: "2026-08-06",
    version: "0.1.0",
    title: "Agent Protocol runtime",
    items: [
      "Assistants, threads and runs over Postgres, with server-sent-event streaming, join and cancel.",
      "Hono + Drizzle + PostgresSaver. No Redis: the queue and fan-out ride on Postgres.",
      "Pluggable auth with every resource scoped to its owner.",
    ],
  },
];

const NEXT = [
  "Cron scheduler with worker leases and crash recovery",
  "Store: key-value plus pgvector semantic search",
  "Hosted builds, preview URLs and rollbacks",
  "Quotas, usage metering and the billing surface",
];

export default function ChangelogPage() {
  return (
    <PageShell
      eyebrow="changelog"
      title="What shipped"
      lede="Newest first. Versions below 0.2 are early access: the protocol surface is stable enough to build against, the operational layer around it is still being written."
      meta={["updated 2026-08-10", "apache-2.0"]}
    >
      <div className="space-y-0">
        {ENTRIES.map((entry) => (
          <article
            key={entry.version}
            className="grid gap-6 border-t border-line py-10 first:border-0 first:pt-0 md:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-fg-dim">
                {entry.date}
              </p>
              <p className="mt-2 font-mono text-[0.95rem] text-fg">
                v{entry.version}
              </p>
            </div>
            <div>
              <h2 className="text-[1.25rem] font-medium tracking-[-0.02em] text-fg">
                {entry.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.9375rem] leading-[1.65] text-fg-muted"
                  >
                    <span className="mt-[0.6em] size-[3px] shrink-0 rounded-full bg-fg-dim" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <article className="grid gap-6 border-t border-line py-10 md:grid-cols-[12rem_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-fg-dim">
              next
            </p>
            <p className="mt-2">
              <Status state="building" />
            </p>
          </div>
          <div>
            <h2 className="text-[1.25rem] font-medium tracking-[-0.02em] text-fg">
              On the way to production
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NEXT.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.9375rem] leading-[1.65] text-fg-muted"
                >
                  <span className="mt-[0.6em] size-[3px] shrink-0 rounded-full bg-fg-dim" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.9375rem] text-fg-dim">
              Tracked in the open — see <A href="/status">status</A> or the{" "}
              <A href="https://github.com/volt-eq/volt">repository</A>.
            </p>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
