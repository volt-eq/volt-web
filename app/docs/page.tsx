import type { Metadata } from "next";
import { Code } from "@/components/ui/code";
import {
  A,
  H2,
  H3,
  Note,
  P,
  PageShell,
  Prose,
  Table,
  UL,
} from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Deploy a LangGraph agent on Volt: install the CLI, declare your graphs in volt.json, run locally, then ship.",
};

const MANIFEST = `{
  "graphs": {
    "agent": "./src/agent.ts:graph",
    "digest": "./src/digest.py:graph"
  },
  "env": ".env"
}`;

const LOCAL = `pnpm add -g @volt/cli

volt dev            # Postgres + migrations + reload on change
volt graphs         # what this project declares
volt chat agent     # talk to it from the terminal`;

const CLIENT_TS = `import { Client } from "@langchain/langgraph-sdk";

const volt = new Client({ apiUrl: process.env.VOLT_URL });

const assistant = await volt.assistants.create({
  graphId: "agent",
  name: "support",
});

const { thread_id } = await volt.threads.create();

for await (const chunk of volt.runs.stream(thread_id, assistant.assistant_id, {
  input: { messages: [{ role: "user", content: "where is my order?" }] },
  streamMode: "messages",
})) {
  process.stdout.write(chunk.data);
}`;

const CLIENT_PY = `from langgraph_sdk import get_client

volt = get_client(url=os.environ["VOLT_URL"])

assistant = await volt.assistants.create(graph_id="agent", name="support")
thread = await volt.threads.create()

async for chunk in volt.runs.stream(
    thread["thread_id"],
    assistant["assistant_id"],
    input={"messages": [{"role": "user", "content": "where is my order?"}]},
    stream_mode="messages",
):
    print(chunk.data, end="")`;

const RESUME = `# A graph that calls interrupt() pauses the run and waits.
run = await volt.runs.get(thread_id, run_id)
run["status"]      # "interrupted"

await volt.runs.resume(thread_id, run_id, command={"resume": "approve"})`;

export default function DocsPage() {
  return (
    <PageShell
      eyebrow="docs"
      title="Deploy your first agent"
      lede="Volt serves Agent Protocol v2 over Postgres, so the official LangGraph SDKs talk to it unmodified. A project is any directory with a volt.json — declare your graphs, run it locally, then deploy."
      meta={["early access", "agent protocol v2", "typescript + python"]}
    >
      <Prose>
        <H2 id="quickstart">Quickstart</H2>
        <P>
          A Volt project needs two things: the graph dependencies and a manifest
          that maps a protocol <code className="font-mono text-fg">graph_id</code>{" "}
          to a module export.
        </P>
        <Code code={MANIFEST} lang="json" className="border border-line p-4" />
        <P>
          The export may be a compiled graph or a factory returning one. Prefer
          the factory — it keeps provider credentials out of module import time,
          and a missing key then fails when the assistant is created rather than
          on the first run.
        </P>

        <H3>Run it locally</H3>
        <Code code={LOCAL} lang="bash" className="border border-line p-4" />
        <P>
          <code className="font-mono text-fg">volt dev</code> starts Postgres if
          it is not already running, applies migrations, then boots the runtime
          with reload on change. If your project ships no{" "}
          <code className="font-mono text-fg">docker-compose.yml</code>, point{" "}
          <code className="font-mono text-fg">DATABASE_URL</code> at a Postgres
          you already have.
        </P>

        <H2 id="clients">Talk to it</H2>
        <P>
          Nothing about your client code is Volt-specific — it is the official
          SDK pointed at a Volt URL.
        </P>
        <Code code={CLIENT_TS} lang="ts" className="border border-line p-4" />
        <Code code={CLIENT_PY} lang="py" className="border border-line p-4" />

        <H2 id="hitl">Human in the loop</H2>
        <P>
          An <code className="font-mono text-fg">interrupt()</code> inside your
          graph pauses the run and persists the checkpoint. The run stays
          interrupted until something resumes it — a minute or a week later.
        </P>
        <Code code={RESUME} lang="py" className="border border-line p-4" />

        <H2 id="env">Environment</H2>
        <Table
          head={["Variable", "Default", "What it does"]}
          rows={[
            ["DATABASE_URL", "—", "Postgres connection string. Required."],
            ["PORT", "2026", "Port the runtime binds."],
            ["VOLT_AUTH", "noop", "Identity handler: noop, jwt or a module path."],
            ["VOLT_JWT_SECRET", "—", "Required when VOLT_AUTH=jwt."],
          ]}
        />

        <H2 id="next">Where to go next</H2>
        <UL
          items={[
            <>
              <A href="/protocol">Agent Protocol surface</A> — endpoint by
              endpoint, including what is not built yet.
            </>,
            <>
              <A href="/self-hosting">Self-hosting</A> — run the same image on
              your own Postgres.
            </>,
            <>
              <A href="https://github.com/volt-eq/volt">Source on GitHub</A> —
              Apache-2.0, issues welcome.
            </>,
          ]}
        />

        <Note>
          These docs cover the runtime that exists today. Hosted deploys,
          preview URLs and multi-region are described on the home page as the
          product they are becoming — see <A href="/status">status</A> for the
          honest split.
        </Note>
      </Prose>
    </PageShell>
  );
}
