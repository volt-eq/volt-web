"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FrameClock } from "../motion/frame";
import {
  IconClock,
  IconHuman,
  IconLayers,
  IconMemory,
  IconRocket,
  IconShield,
  IconStream,
} from "../ui/icons";
import { SectionHeading } from "../ui/primitives";
import {
  ApprovalVisual,
  MemoryVisual,
  PipelineVisual,
  RuntimeVisual,
  StreamVisual,
} from "./platform-visuals";

type Feature = {
  id: string;
  title: string;
  body: string;
  icon: (p: { className?: string }) => ReactNode;
  visual: () => ReactNode;
  frames: number;
};

const FEATURES: Feature[] = [
  {
    id: "deploy",
    title: "One command deploys",
    body: "`volt deploy` builds your graph, runs the migrations and rolls out a versioned endpoint. Every push gets a preview URL; promote or roll back in one click.",
    icon: IconRocket,
    visual: PipelineVisual,
    frames: 190,
  },
  {
    id: "runtimes",
    title: "TypeScript and Python",
    body: "Two runtimes, one platform. Mix languages inside a single project and they still share the same API, the same dashboard and the same billing line.",
    icon: IconLayers,
    visual: RuntimeVisual,
    frames: 130,
  },
  {
    id: "stream",
    title: "Streaming runs",
    body: "Server-sent events for tokens, values and updates. Reconnect and join a run already in flight, or cancel it — the stream survives your client.",
    icon: IconStream,
    visual: StreamVisual,
    frames: 130,
  },
  {
    id: "memory",
    title: "Threads that remember",
    body: "Conversations are checkpointed in Postgres, so state, history and time travel come for free. Fork a thread from any checkpoint to debug a bad run.",
    icon: IconMemory,
    visual: MemoryVisual,
    frames: 170,
  },
  {
    id: "hitl",
    title: "Human in the loop",
    body: "An `interrupt()` pauses the run and waits — for a day if it has to. Approve, edit or reject from your own UI, then resume exactly where it stopped.",
    icon: IconHuman,
    visual: ApprovalVisual,
    frames: 170,
  },
  {
    id: "cron",
    title: "Scheduled agents",
    body: "Cron-driven runs with leases and crash recovery, so a nightly digest keeps firing even when an instance dies mid-run.",
    icon: IconClock,
    visual: PipelineVisual,
    frames: 190,
  },
  {
    id: "auth",
    title: "Auth and isolation",
    body: "Pluggable identity — JWT, OAuth or your own handler — with every thread, run and store key scoped to the user that owns it.",
    icon: IconShield,
    visual: MemoryVisual,
    frames: 170,
  },
];

const AUTO_MS = 9000;

export function Platform() {
  const [active, setActive] = useState(FEATURES[0]!.id);
  const [auto, setAuto] = useState(true);
  const current = FEATURES.find((f) => f.id === active)!;

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setActive((id) => {
        const i = FEATURES.findIndex((f) => f.id === id);
        return FEATURES[(i + 1) % FEATURES.length]!.id;
      });
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [auto]);

  const Visual = current.visual;

  return (
    <section id="platform" className="rule-t">
      <div className="rule-b px-5 py-3 md:px-10">
        <span className="font-mono text-[0.6875rem] text-fg-dim">
          [ what we run ]
        </span>
      </div>
      <div className="px-4 md:px-8">
        <div className="rails relative mx-auto max-w-[1320px] px-5 py-20 md:px-12 md:py-28">
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />
          <span className="tick -bottom-[2px] -left-[2px]" />
          <span className="tick -bottom-[2px] -right-[2px]" />

          <SectionHeading className="text-center">
            You write the graph.
            <br />
            Volt runs everything else.
          </SectionHeading>

          <div className="mt-14 grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-10">
            <div
              role="tablist"
              aria-label="Platform capabilities"
              className="divide-y divide-line border-y border-line"
              onMouseEnter={() => setAuto(false)}
            >
              {FEATURES.map((f) => {
                const on = f.id === active;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setAuto(false);
                      setActive(f.id);
                    }}
                    className={`w-full px-4 py-4 text-left transition-colors duration-200 ${
                      on ? "bg-panel/80" : "hover:bg-panel/40"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={on ? "size-[17px] text-volt" : "size-[17px] text-fg-dim"} />
                      <span
                        className={`text-[1.02rem] tracking-[-0.01em] ${
                          on ? "text-fg" : "text-fg-muted"
                        }`}
                      >
                        {f.title}
                      </span>
                    </span>
                    {on ? (
                      <span className="mt-2 block text-[0.875rem] leading-[1.55] text-fg-dim">
                        {f.body.replace(/`/g, "")}
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
              <Visual />
            </FrameClock>
          </div>
        </div>
      </div>
    </section>
  );
}
