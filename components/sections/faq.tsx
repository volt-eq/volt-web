"use client";

import { useState } from "react";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "What is Volt?",
    a: "A deployment platform for LangGraph and LangChain agents. Push a graph, get an HTTPS endpoint that speaks Agent Protocol v2 — runs, streaming, threads, checkpoints and interrupts, all on Postgres.",
  },
  {
    q: "What is the mission?",
    a: "Make running AI agents as cheap as possible. Billed per run instead of per seat, on a runtime that is Apache-2.0 so you can always take it home.",
  },
  {
    q: "Is Volt ready for production?",
    a: "Not yet. It runs prototypes, internal tools and test workloads today; schedules, quotas and multi-region are still landing.",
  },
  {
    q: "Do I have to rewrite my agent?",
    a: "No. Volt serves the protocol the official SDKs already speak — point your existing client, Agent Chat UI or Studio at a Volt URL.",
  },
  {
    q: "TypeScript or Python?",
    a: "Both, in the same project. Each graph declares its runtime; you get one deploy command, one API and one bill.",
  },
  {
    q: "What happens when my client disconnects?",
    a: "The run keeps going — it belongs to the server, not the socket. Rejoin it mid-flight, cancel it, or read the final state later.",
  },
  {
    q: "Where does state live?",
    a: "In Postgres. Threads, runs and checkpoints are ordinary tables you can query and back up. There is no Redis to operate.",
  },
  {
    q: "Can I self-host?",
    a: "Yes, and it is the same image — not a cut-down edition. Point DATABASE_URL at your own Postgres and run the container.",
  },
  {
    q: "Is my data used for training?",
    a: "No. Prompts, tool calls and thread contents are yours; we never train on them and never share them.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="rule-t">
      <div className="rule-b px-5 py-3 md:px-10">
        <span className="font-mono text-[0.6875rem] text-fg-dim">[ faq ]</span>
      </div>
      <div className="px-4 md:px-8">
        <div className="rails relative mx-auto grid max-w-[1320px] gap-10 px-5 py-20 md:px-12 md:py-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />
          <span className="tick -bottom-[2px] -left-[2px]" />
          <span className="tick -bottom-[2px] -right-[2px]" />

          <h2 className="h-section text-[2.25rem] md:text-[3.25rem]">
            Frequently asked
            <br />
            questions.
          </h2>

          <div className="border-t border-line">
            {ITEMS.map((item, i) => {
              const on = i === open;
              return (
                <div key={item.q} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpen(on ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-6 py-4 text-left transition-colors ${
                      on ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    <span className="text-[1rem] leading-[1.4] tracking-[-0.01em]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 font-mono text-[1.1rem] leading-none ${
                        on ? "text-volt" : "text-fg-dim"
                      }`}
                    >
                      {on ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <p className="pb-5 pr-8 text-[0.9375rem] leading-[1.65] text-fg-dim">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
