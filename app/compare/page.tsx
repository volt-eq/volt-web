import type { Metadata } from "next";
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
  title: "Compare",
  description:
    "Volt against a managed agent platform and against running the server yourself: licence, pricing model, runtimes, data location and maturity.",
};

export default function ComparePage() {
  return (
    <PageShell
      eyebrow="compare"
      title="Volt, managed, or roll your own"
      lede="Three honest options for hosting a LangGraph agent. Volt is the cheap middle: the protocol of a managed platform, the licence and exit of self-hosting."
      meta={["updated 2026-08-10", "no vendor benchmarks"]}
    >
      <Prose>
        <H2>Side by side</H2>
        <Table
          head={["", "Volt", "Managed platform", "Build it yourself"]}
          rows={[
            ["Runtime licence", "Apache-2.0", "Proprietary or source-available", "Yours"],
            ["Pricing shape", "Per run", "Typically per seat and per run", "Infra + your time"],
            ["Client changes", "None — official SDKs", "None — official SDKs", "You define the API"],
            ["Languages", "TypeScript and Python", "TypeScript and Python", "Whatever you write"],
            ["State", "Your Postgres tables", "Vendor-managed", "Yours to design"],
            ["Infra to operate", "One process + Postgres", "None", "All of it"],
            ["Exit cost", "Change the base URL", "Migration project", "n/a"],
            ["Maturity", "Early access", "Production", "However long you have"],
          ]}
        />

        <H2>When a managed platform wins</H2>
        <P>
          If you need customer-facing production traffic today, with an SLA and a
          support contract, take the managed option. Volt is not there yet and we
          would rather you hear that here.
        </P>

        <H2>When Volt wins</H2>
        <UL
          items={[
            "The bill is the problem. Per-run pricing with no seat minimums is the whole point — the mission is to make running agents as cheap as possible.",
            "You want the exit to be free. The runtime is Apache-2.0: outgrow the cloud, take your Postgres, run the identical image.",
            "Your team is mixed. TypeScript and Python graphs live in one project, behind one API and one bill.",
            "You want your data in tables you can query, not behind a vendor dashboard.",
          ]}
        />

        <H2>When building it yourself wins</H2>
        <P>
          If your requirements are genuinely unusual — a custom protocol, an
          exotic store, execution semantics no one else wants — writing the server
          is a legitimate answer. Volt exists because most teams reach for that
          option and then spend a quarter rebuilding runs, streaming and
          checkpoints.
        </P>

        <Note>
          No competitor prices or benchmark numbers on this page on purpose:
          they go stale and we cannot verify them for you. Compare the models,
          then check <A href="/#pricing">our pricing</A> and{" "}
          <A href="/status">what actually ships today</A>.
        </Note>
      </Prose>
    </PageShell>
  );
}
