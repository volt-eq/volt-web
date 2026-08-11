import { FlickeringGrid } from "../ui/flickering-grid";
import { DeployLog, DEPLOY_DURATION } from "../motion/deploy-log";
import { FrameClock } from "../motion/frame";
import { Button, Pill, StatusDot } from "../ui/primitives";
import { CodeTabs, type Snippet } from "../ui/tabs";

const SNIPPETS: Snippet[] = [
  {
    id: "py",
    label: "Python",
    lang: "py",
    code: `from langgraph_sdk import get_client

volt = get_client(url=VOLT_URL)
thread = await volt.threads.create()
msg = {"role": "user", "content": "hi"}

async for chunk in volt.runs.stream(
    thread["thread_id"],
    "agent",
    input={"messages": [msg]},
    stream_mode="messages",
):
    print(chunk.data, end="")`,
  },
  {
    id: "ts",
    label: "TypeScript",
    lang: "ts",
    code: `import { Client } from "@langchain/langgraph-sdk";

const volt = new Client({ apiUrl: VOLT_URL });
const { thread_id } = await volt.threads.create();

const run = volt.runs.stream(thread_id, "agent", {
  input: { messages: [{ role: "user", content: "hi" }] },
  streamMode: "messages",
});

for await (const chunk of run) {
  process.stdout.write(chunk.data);
}`,
  },
  {
    id: "cli",
    label: "CLI",
    lang: "bash",
    code: `volt deploy            # ship graphs from volt.json
volt logs --follow     # stream production runs
volt chat agent        # talk to it locally

# One command, TypeScript or Python.`,
  },
  {
    id: "curl",
    label: "cURL",
    lang: "bash",
    code: `curl $VOLT_URL/threads/$ID/runs/stream \\
  -H "authorization: Bearer $VOLT_KEY" \\
  -H "content-type: application/json" \\
  -d '{
    "assistant_id": "agent",
    "stream_mode": "messages",
    "input": { "messages": [
      { "role": "user", "content": "hi" }
    ] }
  }'`,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rule-t">
      <div aria-hidden className="fade-in pointer-events-none absolute inset-0">
        <FlickeringGrid
          className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_72%_62%_at_40%_42%,#000_0%,transparent_72%)]"
          squareSize={2}
          gridGap={11}
          flickerChance={0.13}
          color="#ffffff"
          maxOpacity={0.15}
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative px-4 md:px-8">
        <div className="rails relative mx-auto grid max-w-[1320px] gap-14 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-14">
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />
          <span className="tick -bottom-[2px] -left-[2px]" />
          <span className="tick -bottom-[2px] -right-[2px]" />

          <div className="rise">
            <Pill>
              <StatusDot />
              LangGraph · LangChain · Apache-2.0
            </Pill>

            <h1 className="h-display mt-7 text-[2.6rem] sm:text-[3.2rem] lg:text-[4rem]">
              Deployments for
              <br />
              <span className="whitespace-nowrap">LangGraph Agents</span>
            </h1>

            <p className="mt-6 max-w-[33rem] text-[1.0625rem] leading-[1.6] text-fg-muted">
              Push a <span className="text-fg">LangGraph</span> or{" "}
              <span className="text-fg">LangChain</span> agent, in TypeScript or
              Python. Streaming, memory and human approvals — at a fraction of
              the managed price.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#start">Deploy free</Button>
              <Button href="/docs" variant="bracket" className="px-5">
                Docs
              </Button>
            </div>

            <p className="mt-7 font-mono text-[0.75rem] text-fg-dim">
              No credit card required · deploy in under a minute
            </p>
          </div>

          <div className="rise flex flex-col gap-4" style={{ animationDelay: "120ms" }}>
            <CodeTabs
              snippets={SNIPPETS}
              minHeight="min-h-[19rem]"
              meta="langgraph"
            />

            <div className="relative overflow-hidden rounded-[3px] border border-line bg-panel/80 shadow-panel backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono text-[0.78rem] text-fg">
                  Live deploy
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.11em] text-fg-dim">
                  langgraph · iad1
                </span>
              </div>
              <div className="px-5 py-4">
                <FrameClock durationInFrames={DEPLOY_DURATION}>
                  <DeployLog />
                </FrameClock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
