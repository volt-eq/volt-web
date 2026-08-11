"use client";

import { useEffect, useState } from "react";
import { FrameClock, typed, useFrame } from "../motion/frame";
import { SectionHeading } from "../ui/primitives";

type Turn = { at: number; from: "user" | "agent" | "tool"; text: string };
type Event = { at: number; text: string; meta: string; kind?: "pause" | "ok" };

export type Scenario = {
  id: string;
  tag: string;
  title: string;
  body: string;
  app: string;
  turns: Turn[];
  events: Event[];
  frames: number;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "support",
    tag: "Customer support",
    title: "Resolve, don't route",
    body: "A thread per customer, checkpointed forever. The agent looks up the order, asks a human before moving money, then finishes the job.",
    app: "support-agent",
    turns: [
      { at: 4, from: "user", text: "My order never arrived. I want a refund." },
      { at: 34, from: "tool", text: "lookup_order(4182) → lost_in_transit" },
      { at: 96, from: "agent", text: "Refund approved — $420 is back on your card, and I've filed the carrier claim." },
    ],
    events: [
      { at: 4, text: "thread.created", meta: "thd_9f21" },
      { at: 22, text: "run.started", meta: "support-agent" },
      { at: 34, text: "tool.lookup_order", meta: "180ms", kind: "ok" },
      { at: 58, text: "run.interrupt", meta: "refund > $100", kind: "pause" },
      { at: 88, text: "human.approve", meta: "ana@acme", kind: "ok" },
      { at: 96, text: "run.completed", meta: "4.1s", kind: "ok" },
    ],
    frames: 200,
  },
  {
    id: "research",
    tag: "Research agents",
    title: "Runs that take minutes",
    body: "Long tool loops stream progress instead of timing out. Close the tab, come back, and join the same run mid-flight.",
    app: "research-agent",
    turns: [
      { at: 4, from: "user", text: "Compare the pricing of every agent hosting platform." },
      { at: 30, from: "tool", text: "search(\"agent hosting pricing\") → 12 sources" },
      { at: 74, from: "tool", text: "fetch(6 pages) → 41k tokens" },
      { at: 110, from: "agent", text: "Six platforms compared, sources cited. Volt is the cheapest per run." },
    ],
    events: [
      { at: 4, text: "run.started", meta: "stream=values" },
      { at: 30, text: "tool.search", meta: "1.2s", kind: "ok" },
      { at: 74, text: "tool.fetch", meta: "8.4s", kind: "ok" },
      { at: 92, text: "client.disconnect", meta: "run keeps going" },
      { at: 104, text: "client.join", meta: "resumed stream", kind: "ok" },
      { at: 110, text: "run.completed", meta: "2m 11s", kind: "ok" },
    ],
    frames: 210,
  },
  {
    id: "backoffice",
    tag: "Back office",
    title: "Approval gates and audit trail",
    body: "Every interrupt, decision and state write lands in your Postgres. When finance asks why the agent did that, the answer is a query.",
    app: "invoice-agent",
    turns: [
      { at: 4, from: "user", text: "Process today's invoices." },
      { at: 30, from: "tool", text: "parse_invoice(8 files) → 8 ok" },
      { at: 92, from: "agent", text: "7 posted automatically, 1 held for review above the $5k limit." },
    ],
    events: [
      { at: 4, text: "cron.fired", meta: "0 9 * * 1-5" },
      { at: 30, text: "tool.parse_invoice", meta: "8 docs", kind: "ok" },
      { at: 52, text: "run.interrupt", meta: "amount > 5000", kind: "pause" },
      { at: 84, text: "human.reject", meta: "cfo@acme" },
      { at: 92, text: "checkpoint.written", meta: "cp_11", kind: "ok" },
    ],
    frames: 190,
  },
  {
    id: "scheduled",
    tag: "Scheduled agents",
    title: "Agents that wake up on their own",
    body: "Cron-driven runs with worker leases and crash recovery — the nightly digest still ships if an instance dies halfway through it.",
    app: "digest-agent",
    turns: [
      { at: 4, from: "user", text: "Every morning at 07:00, summarise what changed." },
      { at: 36, from: "tool", text: "diff_since(24h) → 31 events" },
      { at: 88, from: "agent", text: "Digest sent to #product — 31 events, 4 worth reading." },
    ],
    events: [
      { at: 4, text: "cron.registered", meta: "0 7 * * *" },
      { at: 24, text: "worker.lease", meta: "inst_2 · 60s" },
      { at: 36, text: "tool.diff_since", meta: "310ms", kind: "ok" },
      { at: 60, text: "worker.crash", meta: "inst_2 lost" },
      { at: 72, text: "lease.reclaimed", meta: "inst_5", kind: "ok" },
      { at: 88, text: "run.completed", meta: "retry 1", kind: "ok" },
    ],
    frames: 190,
  },
];

export function Console({ scenario }: { scenario: Scenario }) {
  const frame = useFrame();

  return (
    <div className="grid min-h-[26rem] gap-0 border border-line bg-ink-2/60 md:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="min-w-0">
        <div className="flex items-center gap-0 border-b border-line">
          {["Chat", "Runs"].map((tab, i) => (
            <span
              key={tab}
              className={`relative px-4 py-3 font-mono text-[0.75rem] ${
                i === 0 ? "text-fg" : "text-fg-dim"
              }`}
            >
              {tab}
              {i === 0 ? (
                <span className="absolute inset-x-3 -bottom-px h-px bg-volt" />
              ) : null}
            </span>
          ))}
          <span className="ml-auto pr-4 font-mono text-[0.7rem] text-fg-dim">
            {scenario.app}
          </span>
        </div>

        <div className="min-h-[20rem] space-y-3 p-5">
          {scenario.turns.map((turn, i) => {
            if (frame < turn.at) return null;
            const text = typed(turn.text, frame - turn.at, 58);

            if (turn.from === "tool") {
              return (
                <div
                  key={i}
                  className="flex items-start gap-2 border border-line bg-panel/60 px-3 py-2 font-mono text-[0.72rem] text-fg-muted"
                >
                  <span className="text-volt">⚙</span>
                  <span className="min-w-0 break-words">{text}</span>
                </div>
              );
            }

            const mine = turn.from === "user";
            return (
              <div key={i} className={mine ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={`max-w-[85%] rounded-[3px] border px-3.5 py-2.5 text-[0.875rem] leading-[1.55] ${
                    mine
                      ? "border-line bg-panel-2/70 text-fg-muted"
                      : "border-line bg-panel/90 text-fg"
                  }`}
                >
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-line p-5 md:border-l md:border-t-0">
        <p className="label mb-4">run events</p>
        <ul className="space-y-2.5">
          {scenario.events.map((event, i) => {
            const on = frame >= event.at;
            return (
              <li
                key={i}
                className={`font-mono text-[0.7rem] transition-opacity duration-300 ${
                  on ? "opacity-100" : "opacity-20"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={
                      !on
                        ? "text-fg-dim"
                        : event.kind === "pause"
                          ? "text-fg"
                          : event.kind === "ok"
                            ? "text-volt"
                            : "text-fg-dim"
                    }
                  >
                    {event.kind === "pause" ? "⏸" : on ? "•" : "·"}
                  </span>
                  <span className="text-fg-muted">{event.text}</span>
                </span>
                <span className="ml-[1.1rem] block text-fg-dim">{event.meta}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function UseCases() {
  const [active, setActive] = useState(SCENARIOS[0]!.id);
  const [auto, setAuto] = useState(true);
  const current = SCENARIOS.find((s) => s.id === active)!;

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setActive((id) => {
        const i = SCENARIOS.findIndex((s) => s.id === id);
        return SCENARIOS[(i + 1) % SCENARIOS.length]!.id;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [auto]);

  return (
    <section id="use-cases" className="rule-t">
      <div className="rule-b px-5 py-3 md:px-10">
        <span className="font-mono text-[0.6875rem] text-fg-dim">[ use cases ]</span>
      </div>
      <div className="px-4 md:px-8">
        <div className="rails relative mx-auto max-w-[1320px] px-5 py-20 md:px-12 md:py-28">
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />
          <span className="tick -bottom-[2px] -left-[2px]" />
          <span className="tick -bottom-[2px] -right-[2px]" />

          <div className="text-center">
            <SectionHeading>Built for agents that keep going.</SectionHeading>
            <p className="mx-auto mt-5 max-w-[38rem] text-[1.0625rem] leading-[1.6] text-fg-muted">
              Support, research, back office, schedules — anything that runs
              longer than a request/response and has to remember what happened.
            </p>
          </div>

          <div
            className="mt-14 grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8"
            onMouseEnter={() => setAuto(false)}
          >
            <div role="tablist" className="divide-y divide-line border-y border-line">
              {SCENARIOS.map((s) => {
                const on = s.id === active;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setAuto(false);
                      setActive(s.id);
                    }}
                    className={`w-full px-4 py-4 text-left transition-colors ${
                      on ? "bg-panel/80" : "hover:bg-panel/40"
                    }`}
                  >
                    <span
                      className={`block font-mono text-[0.68rem] uppercase tracking-[0.11em] ${
                        on ? "text-volt" : "text-fg-dim"
                      }`}
                    >
                      {s.tag}
                    </span>
                    <span
                      className={`mt-1.5 block text-[0.98rem] tracking-[-0.01em] ${
                        on ? "text-fg" : "text-fg-muted"
                      }`}
                    >
                      {s.title}
                    </span>
                    {on ? (
                      <span className="mt-2 block text-[0.85rem] leading-[1.55] text-fg-dim">
                        {s.body}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <FrameClock
              key={current.id}
              durationInFrames={current.frames}
              autoStart
              loop={false}
              className="min-w-0"
            >
              <Console scenario={current} />
            </FrameClock>
          </div>
        </div>
      </div>
    </section>
  );
}
