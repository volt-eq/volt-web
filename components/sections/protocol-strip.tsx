const NAMES = [
  "LangGraph",
  "LangChain",
  "Agent Chat UI",
  "LangGraph Studio",
  "Postgres",
  "OpenTelemetry",
];

export function ProtocolStrip() {
  return (
    <div className="rule-t px-4 md:px-8">
      <div className="rails relative mx-auto max-w-[1320px] px-5 py-12 md:px-12">
        <p className="text-center text-[0.95rem] text-fg-dim">
          Speaks <span className="font-medium text-fg">Agent Protocol v2</span>,
          so the tools you already use connect unmodified.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {NAMES.map((name) => (
            <span
              key={name}
              className="text-[1.05rem] font-medium tracking-[-0.02em] text-fg-muted/65 transition-colors hover:text-fg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
