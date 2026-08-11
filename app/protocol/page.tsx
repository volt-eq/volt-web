import type { Metadata } from "next";
import {
  A,
  H2,
  Note,
  P,
  PageShell,
  Prose,
  Status,
  Table,
  UL,
} from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Agent Protocol",
  description:
    "The Agent Protocol v2 surface Volt serves: assistants, threads, runs, store and crons — endpoint by endpoint, including what is not built yet.",
};

export default function ProtocolPage() {
  return (
    <PageShell
      eyebrow="agent protocol"
      title="The protocol is the contract"
      lede="Volt speaks Agent Protocol v2. The acceptance test is not a feature list: an unmodified @langchain/langgraph-sdk client and an unmodified Agent Chat UI, pointed at a Volt URL, hold a streaming conversation with tool calls and a human approval gate."
      meta={["v2", "no client forks", "postgres-backed"]}
    >
      <Prose>
        <H2>Why a protocol instead of an SDK</H2>
        <P>
          Anything Volt-specific in your client code is a migration you will pay
          for later. So there is nothing: assistants, threads, runs and their
          streaming semantics are the protocol the LangGraph SDKs already speak.
          Moving between Volt, a self-hosted Volt and any other conforming
          runtime is a change of base URL.
        </P>

        <H2>Surface</H2>
        <Table
          head={["Resource", "Endpoints", "State"]}
          rows={[
            [
              "Assistants",
              "create, get, list, update, delete, versions",
              <Status state="shipped" />,
            ],
            [
              "Threads",
              "create, get, list, delete, state, history",
              <Status state="shipped" />,
            ],
            [
              "Runs",
              "create, stream (SSE), join, cancel, stateless runs",
              <Status state="shipped" />,
            ],
            [
              "Interrupts",
              "interrupt() pauses a run; resume with a command",
              <Status state="shipped" />,
            ],
            ["Meta", "/info, /health", <Status state="shipped" />],
            [
              "Auth",
              "noop and JWT handlers; every resource scoped to its owner",
              <Status state="building" />,
            ],
            ["Crons", "schedule, list, delete; worker leases", <Status state="building" />],
            ["Store", "key-value plus pgvector semantic search", <Status state="planned" />],
          ]}
        />

        <H2>Streaming</H2>
        <P>
          Runs are owned by the server, not by your socket. A stream is
          server-sent events; disconnecting does not cancel anything, and you can
          rejoin a run that is already in flight.
        </P>
        <UL
          items={[
            <>
              <code className="font-mono text-fg">values</code> — the full state
              after each step.
            </>,
            <>
              <code className="font-mono text-fg">updates</code> — only what each
              node changed.
            </>,
            <>
              <code className="font-mono text-fg">messages</code> — token-level
              deltas for chat UIs.
            </>,
            <>
              <code className="font-mono text-fg">events</code> — the raw graph
              event stream.
            </>,
          ]}
        />

        <H2>State and checkpoints</H2>
        <P>
          Threads, runs and checkpoints are ordinary Postgres rows written by{" "}
          <code className="font-mono text-fg">PostgresSaver</code>. That is a
          deliberate choice: you can query your agents&apos; history with tools
          you already have, back it up like any other database, and fork a thread
          from any checkpoint to debug a bad run. There is no Redis to operate.
        </P>

        <Note>
          Compatibility is verified rather than claimed — the repository ships a
          smoke test that drives a real{" "}
          <code className="font-mono text-fg">@langchain/langgraph-sdk</code>{" "}
          through assistants, threads, runs, streaming and an approval gate on
          every change. See <A href="/status">status</A> for what is still
          landing, or <A href="/docs">the docs</A> to start building.
        </Note>
      </Prose>
    </PageShell>
  );
}
