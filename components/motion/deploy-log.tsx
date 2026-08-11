"use client";

import { interpolate, typed, useFrame, FPS } from "./frame";

export const DEPLOY_DURATION = 260;

type Line = { at: number; kind: "cmd" | "ok" | "ready"; text: string; meta?: string };

const LINES: Line[] = [
  { at: 0, kind: "cmd", text: "volt deploy" },
  { at: 30, kind: "ok", text: "runtime detected", meta: "typescript · python" },
  { at: 62, kind: "ok", text: "graph compiled", meta: "support-agent" },
  { at: 94, kind: "ok", text: "checkpointer migrated", meta: "postgres" },
  { at: 126, kind: "ok", text: "protocol served", meta: "agent-protocol v2" },
  { at: 158, kind: "ready", text: "https://support-agent.volt.run", meta: "412ms" },
];

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function DeployLog() {
  const frame = useFrame();
  const done = frame >= LINES.at(-1)!.at + 24;

  return (
    <div className="font-mono text-[0.78rem] leading-[1.85]">
      <div className="mb-3 h-px w-full bg-line">
        <div
          className="h-px bg-volt"
          style={{
            width: `${interpolate(frame, [0, LINES.at(-1)!.at + 20], [4, 100])}%`,
            transition: "none",
          }}
        />
      </div>

      {LINES.map((line, i) => {
        if (frame < line.at) return <div key={i} className="h-[1.85em]" />;
        const local = frame - line.at;
        const text = typed(line.text, local, 52);
        const complete = text.length === line.text.length;

        if (line.kind === "cmd") {
          return (
            <div key={i} className="flex items-center gap-2 text-fg">
              <span className="text-volt">$</span>
              <span>{text}</span>
              {!complete ? <Caret /> : null}
            </div>
          );
        }

        if (line.kind === "ready") {
          return (
            <div key={i} className="mt-2 flex flex-wrap items-center gap-2">
              <span className="border border-volt/40 bg-volt/10 px-1.5 text-[0.68rem] uppercase tracking-[0.1em] text-volt">
                ready
              </span>
              <span className="text-fg">{text}</span>
              {complete && line.meta ? (
                <span className="text-fg-dim">{line.meta}</span>
              ) : null}
            </div>
          );
        }

        return (
          <div key={i} className="flex items-center gap-2 text-fg-muted">
            <span className={complete ? "text-volt" : "text-fg-dim"}>
              {complete ? "✓" : SPINNER[Math.floor(frame / 3) % SPINNER.length]}
            </span>
            <span>{text}</span>
            {complete && line.meta ? (
              <>
                <span className="text-fg-dim">·</span>
                <span className="text-fg-dim">{line.meta}</span>
              </>
            ) : null}
          </div>
        );
      })}

      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[0.7rem] uppercase tracking-[0.11em] text-fg-dim">
        <span
          className="inline-block size-[6px] rounded-full"
          style={{ background: done ? "var(--color-volt)" : "#6e6e76" }}
        />
        {done ? `deployed in ${(LINES.at(-1)!.at / FPS).toFixed(1)}s` : "deploying"}
      </div>
    </div>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="inline-block h-[1em] w-[0.5em] translate-y-[0.1em] bg-fg"
      style={{ animation: "caret 1s steps(1) infinite" }}
    />
  );
}
