import type { Metadata } from "next";
import { Code } from "@/components/ui/code";
import {
  A,
  H2,
  Note,
  P,
  PageShell,
  Prose,
  Table,
  UL,
} from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Self-hosting",
  description:
    "Run the Volt runtime on your own Postgres and your own hardware. Apache-2.0, the same image the cloud runs, no Redis.",
};

const RUN = `git clone https://github.com/volt-eq/volt.git
cd volt

pnpm install
cp .env.example .env      # point DATABASE_URL at your Postgres
pnpm volt dev`;

const COMPOSE = `# Postgres with pgvector, then the runtime
volt up                   # docker compose up -d postgres
volt serve                # the runtime, no watcher

volt down --volumes       # careful: erases the database`;

export default function SelfHostingPage() {
  return (
    <PageShell
      eyebrow="self-hosting"
      title="Your Postgres, your hardware"
      lede="The runtime is Apache-2.0 and self-hosting is a first-class path, not a downgrade. It is the same code the cloud runs: one Node process, one Postgres database, no Redis and no license to negotiate."
      meta={["apache-2.0", "postgres only", "node ≥ 20"]}
    >
      <Prose>
        <H2>Requirements</H2>
        <Table
          head={["Piece", "Version", "Notes"]}
          rows={[
            ["Node", "≥ 20", "The runtime is TypeScript on Node."],
            ["Postgres", "≥ 14", "pgvector needed only for the semantic store."],
            ["Python", "3.11+", "Only if you deploy Python graphs."],
            ["Redis", "not used", "Queueing and fan-out are done in Postgres."],
          ]}
        />

        <H2>Run it</H2>
        <Code code={RUN} lang="bash" className="border border-line p-4" />
        <P>
          Migrations are applied on boot. If you prefer to run them yourself,{" "}
          <code className="font-mono text-fg">pnpm db:migrate</code> does exactly
          that and nothing else.
        </P>
        <Code code={COMPOSE} lang="bash" className="border border-line p-4" />

        <H2>Scaling</H2>
        <UL
          items={[
            "Run as many instances as you like against one database — runs are claimed with a conditional update, so two workers never take the same one.",
            "Cross-instance streaming fan-out rides on Postgres LISTEN/NOTIFY: a client can join a run that started on another instance.",
            "Scale the database before the app. Checkpoint writes are the hot path.",
            "Back up Postgres and you have backed up every thread, run and checkpoint. There is no second store to reconcile.",
          ]}
        />

        <H2>Authentication</H2>
        <P>
          Identity is pluggable. <code className="font-mono text-fg">noop</code>{" "}
          is for local work only — it treats every caller as the same user.{" "}
          <code className="font-mono text-fg">jwt</code> verifies a bearer token
          with your secret, and a module path lets you write your own handler.
          Whatever you choose, every thread, run and store key is scoped to the
          identity that owns it.
        </P>

        <Note>
          Self-hosting gives you the runtime, not the control plane — the
          dashboard, hosted builds and multi-region routing described on the home
          page are the cloud product. See <A href="/status">status</A> for what
          exists today, or <A href="/compare">compare</A> the options.
        </Note>
      </Prose>
    </PageShell>
  );
}
