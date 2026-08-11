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
} from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Status",
  description:
    "What is built, what is being built, and what is still a plan — component by component.",
};

export default function StatusPage() {
  return (
    <PageShell
      eyebrow="status"
      title="What actually works today"
      lede="Volt is in early access, so this page is a capability board rather than an uptime dashboard. When there is a hosted control plane to measure, live incident history will replace it."
      meta={["updated 2026-08-10", "early access", "no uptime claims yet"]}
    >
      <Prose>
        <H2>Runtime</H2>
        <Table
          head={["Component", "State", "Notes"]}
          rows={[
            [
              "Assistants, threads, runs",
              <Status state="shipped" />,
              "Full CRUD, thread state and history, stateless runs.",
            ],
            [
              "SSE streaming",
              <Status state="shipped" />,
              "values, updates, messages, events. Join a run in flight; cancel it.",
            ],
            [
              "Checkpointing",
              <Status state="shipped" />,
              "PostgresSaver. Fork a thread from any checkpoint.",
            ],
            [
              "Human in the loop",
              <Status state="shipped" />,
              "interrupt() and resume, durable across restarts.",
            ],
            [
              "Auth",
              <Status state="building" />,
              "noop and JWT handlers work; OAuth and richer custom handlers are next.",
            ],
            [
              "Crons",
              <Status state="building" />,
              "Scheduler, worker leases and crash recovery in progress.",
            ],
            [
              "Store",
              <Status state="planned" />,
              "Key-value plus pgvector semantic search.",
            ],
            [
              "OpenTelemetry",
              <Status state="planned" />,
              "Traces exportable to your own collector.",
            ],
          ]}
        />

        <H2>Cloud</H2>
        <Table
          head={["Component", "State", "Notes"]}
          rows={[
            [
              "Hosted deploys",
              <Status state="building" />,
              "volt deploy, versioned endpoints, preview URLs and rollbacks.",
            ],
            [
              "Dashboard",
              <Status state="building" />,
              "Runs, threads and logs in a browser.",
            ],
            [
              "Multi-region",
              <Status state="planned" />,
              "Serve a run from the region nearest the request.",
            ],
            [
              "Quotas and metering",
              <Status state="planned" />,
              "Per-run accounting behind the pricing on the home page.",
            ],
          ]}
        />

        <H2>What that means for you</H2>
        <P>
          Everything marked <em>shipped</em> is exercised by 129 tests against a
          real Postgres on every change, plus a smoke test that drives an
          unmodified official SDK end to end. Everything marked{" "}
          <em>building</em> or <em>planned</em> appears on the home page as
          product description, not as a promise about today.
        </P>

        <Note>
          Found something broken? <A href="/support">Tell us</A> — in early
          access, a good bug report is worth more than a feature request. The{" "}
          <A href="/changelog">changelog</A> tracks what moved.
        </Note>
      </Prose>
    </PageShell>
  );
}
