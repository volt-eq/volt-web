"use client";

import { interpolate, easeOut, typed, useFrame } from "../motion/frame";

/** Every capability visual sits in the same instrument-panel shell. */
function Shell({
  label,
  meta,
  texture = "hatch",
  children,
}: {
  label: string;
  meta: string;
  texture?: "hatch" | "dotgrid";
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-[3px] border border-line bg-ink-2/60">
      <div
        aria-hidden
        className={`absolute inset-0 ${texture} ${texture === "hatch" ? "opacity-60" : "opacity-30"}`}
      />
      <div className="relative flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[0.72rem] text-fg-muted">{label}</span>
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.11em] text-fg-dim">
          {meta}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col justify-center px-5 py-7 md:px-7">
        {children}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- one command ships */

const STAGES = ["push", "build", "migrate", "rollout", "live"] as const;

export function PipelineVisual() {
  const frame = useFrame();
  const active = Math.min(STAGES.length - 1, Math.floor(frame / 34));

  return (
    <Shell label="volt deploy" meta="preview → production">
      <div>
        <div className="flex items-center">
          {STAGES.map((stage, i) => {
            const on = i <= active;
            return (
              <div key={stage} className="flex min-w-0 flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`grid size-9 place-items-center rounded-full border font-mono text-[0.7rem] transition-colors duration-300 ${
                      on
                        ? "border-volt/50 bg-volt/10 text-volt"
                        : "border-line text-fg-dim"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`font-mono text-[0.65rem] uppercase tracking-[0.1em] ${
                      on ? "text-fg" : "text-fg-dim"
                    }`}
                  >
                    {stage}
                  </span>
                </div>
                {i < STAGES.length - 1 ? (
                  <div className="mx-1 h-px flex-1 bg-line">
                    <div
                      className="h-px bg-volt/70"
                      style={{
                        width: `${interpolate(frame - i * 34, [10, 34], [0, 100], easeOut)}%`,
                      }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-9 rounded-[3px] border border-line bg-panel/80 p-4 font-mono text-[0.76rem] leading-[1.9]">
          <p className="text-fg">
            <span className="text-volt">$</span> {typed("volt deploy", frame, 30)}
          </p>
          {active >= 1 ? (
            <p className="text-fg-muted">
              graph <span className="text-fg">support-agent</span> · 2 nodes · 1 tool
            </p>
          ) : null}
          {active >= 2 ? (
            <p className="text-fg-muted">checkpointer schema up to date</p>
          ) : null}
          {active >= 4 ? (
            <p className="text-volt">↑ https://support.volt.run — 412ms</p>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------ streaming runs */

const TOKENS = "Your order #4182 shipped this morning and arrives Thursday.".split(" ");
const EVENTS = ["metadata", "messages/partial", "values", "messages/complete", "end"];

export function StreamVisual() {
  const frame = useFrame();
  const shown = Math.min(TOKENS.length, Math.floor(frame / 5));

  return (
    <Shell label="runs.stream()" meta="server-sent events" texture="dotgrid">
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_11rem]">
        <div className="space-y-3">
          <div className="ml-auto max-w-[16rem] rounded-[3px] border border-line bg-panel-2/80 px-3.5 py-2.5 text-[0.85rem] text-fg-muted">
            where is my order?
          </div>
          <div className="max-w-[20rem] rounded-[3px] border border-line bg-panel/90 px-3.5 py-2.5 text-[0.85rem] leading-[1.6] text-fg">
            {TOKENS.slice(0, shown).join(" ")}
            {shown < TOKENS.length ? (
              <span
                className="ml-0.5 inline-block h-[0.95em] w-[0.45em] translate-y-[0.1em] bg-volt"
                style={{ animation: "caret 0.9s steps(1) infinite" }}
              />
            ) : null}
          </div>
        </div>

        <div className="border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <p className="label mb-3">sse</p>
          <ul className="space-y-2 font-mono text-[0.7rem]">
            {EVENTS.map((event, i) => {
              const on = frame > i * 14 + 6;
              return (
                <li
                  key={event}
                  className={`flex items-center gap-2 transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-25"
                  }`}
                >
                  <span className={on ? "text-volt" : "text-fg-dim"}>▸</span>
                  <span className={on ? "text-fg-muted" : "text-fg-dim"}>{event}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Shell>
  );
}

/* --------------------------------------------------------- threads & memory */

const CHECKPOINTS = ["cp_01", "cp_02", "cp_03", "cp_04", "cp_05"];

export function MemoryVisual() {
  const frame = useFrame();
  const head = interpolate(frame, [0, 150], [0, CHECKPOINTS.length - 1], easeOut);

  return (
    <Shell label="thd_9f21" meta="postgres checkpoints">
      <div>
        <div className="relative">
          <div className="absolute left-0 right-0 top-[9px] h-px bg-line" />
          <div
            className="absolute left-0 top-[9px] h-px bg-volt/70"
            style={{ width: `${(head / (CHECKPOINTS.length - 1)) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {CHECKPOINTS.map((cp, i) => {
              const on = i <= head + 0.15;
              return (
                <div key={cp} className="flex flex-col items-center gap-3">
                  <span
                    className={`size-[19px] rotate-45 border transition-colors duration-300 ${
                      on ? "border-volt bg-volt/20" : "border-line bg-ink"
                    }`}
                  />
                  <span
                    className={`font-mono text-[0.65rem] ${on ? "text-fg-muted" : "text-fg-dim"}`}
                  >
                    {cp}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-9 grid gap-3 font-mono text-[0.72rem] sm:grid-cols-2">
          {[
            ["state", "messages · 14"],
            ["writes", "postgres · jsonb"],
            ["resume from", "cp_03"],
            ["fork", "thd_9f21.b"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between border border-line bg-panel/70 px-3 py-2"
            >
              <span className="text-fg-dim">{k}</span>
              <span className="text-fg-muted">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------- human in the loop */

export function ApprovalVisual() {
  const frame = useFrame();
  const approved = frame > 92;
  const resumed = frame > 128;

  return (
    <Shell label="interrupt()" meta="waiting on a human" texture="dotgrid">
      <div className="mx-auto w-full max-w-[22rem]">
        <div className="rounded-[3px] border border-line bg-panel/90 p-5 shadow-panel">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-[0.11em] ${
                approved ? "text-volt" : "text-fg-dim"
              }`}
            >
              {approved ? "resolved" : "interrupted"}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <p className="mt-4 text-[0.95rem] leading-[1.5] text-fg">
            Approve refund of <span className="text-volt">$420.00</span> to
            order #4182?
          </p>

          <div className="mt-5 flex gap-2">
            <span
              className={`flex-1 border px-3 py-2 text-center font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-300 ${
                approved
                  ? "border-volt/50 bg-volt/15 text-volt"
                  : "border-line text-fg-muted"
              }`}
            >
              approve
            </span>
            <span className="flex-1 border border-line px-3 py-2 text-center font-mono text-[0.7rem] uppercase tracking-[0.1em] text-fg-dim">
              reject
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2 font-mono text-[0.72rem]">
          <Row on={frame > 12} label="run paused" meta="interrupt()" />
          <Row on={approved} label="human decision" meta="approve" />
          <Row on={resumed} label="run resumed" meta="from cp_04" />
        </div>
      </div>
    </Shell>
  );
}

function Row({ on, label, meta }: { on: boolean; label: string; meta: string }) {
  return (
    <div
      className={`flex items-center justify-between border border-line bg-ink/60 px-3 py-2 transition-opacity duration-300 ${
        on ? "opacity-100" : "opacity-25"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={on ? "text-volt" : "text-fg-dim"}>{on ? "✓" : "·"}</span>
        <span className="text-fg-muted">{label}</span>
      </span>
      <span className="text-fg-dim">{meta}</span>
    </div>
  );
}

/* ------------------------------------------------------------- two runtimes */

export function RuntimeVisual() {
  const frame = useFrame();
  const merge = interpolate(frame, [20, 90], [0, 1], easeOut);

  return (
    <Shell label="volt.json" meta="one project, two runtimes">
      <div>
        <div className="flex items-start justify-between gap-4">
          <FileChip name="agent.ts" tag="typescript" />
          <FileChip name="agent.py" tag="python" />
        </div>

        <svg viewBox="0 0 320 90" className="mt-2 h-[90px] w-full" aria-hidden>
          <path
            d="M42 4 C42 50, 160 40, 160 86"
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <path
            d="M278 4 C278 50, 160 40, 160 86"
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <circle
            cx={interpolate(merge, [0, 1], [42, 160])}
            cy={interpolate(merge, [0, 1], [6, 84])}
            r="3"
            fill="var(--color-volt)"
          />
          <circle
            cx={interpolate(merge, [0, 1], [278, 160])}
            cy={interpolate(merge, [0, 1], [6, 84])}
            r="3"
            fill="var(--color-volt)"
          />
        </svg>

        <div className="mx-auto w-fit rounded-[3px] border border-volt/40 bg-volt/[0.07] px-4 py-2.5 text-center glow-volt">
          <p className="font-mono text-[0.78rem] text-fg">volt deploy</p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.11em] text-volt">
            one api · one dashboard
          </p>
        </div>
      </div>
    </Shell>
  );
}

function FileChip({ name, tag }: { name: string; tag: string }) {
  return (
    <div className="rounded-[3px] border border-line bg-panel/80 px-4 py-3">
      <p className="font-mono text-[0.8rem] text-fg">{name}</p>
      <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-dim">
        {tag}
      </p>
    </div>
  );
}
