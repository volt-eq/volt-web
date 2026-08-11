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
  title: "Support",
  description:
    "How to get help with Volt: GitHub issues, email, and what to put in a bug report.",
};

const DIAGNOSTICS = `volt graphs                 # what this project declares
curl localhost:2026/info    # runtime version and capabilities
curl localhost:2026/health  # database reachable?

# Include the run and thread ids if a run misbehaved:
#   thread_id, run_id, stream mode, and the last event you saw`;

export default function SupportPage() {
  return (
    <PageShell
      eyebrow="support"
      title="Getting help"
      lede="Volt is early access and support is best-effort — but it is real, and it comes from the people writing the runtime. Bug reports get read."
      meta={["best-effort", "no sla yet"]}
    >
      <Prose>
        <H2>Where to go</H2>
        <Table
          head={["Channel", "Best for", "Expect"]}
          rows={[
            [
              <A href="https://github.com/volt-eq/volt/issues">GitHub issues</A>,
              "Bugs, protocol gaps, feature requests",
              "A reply within a few working days",
            ],
            [
              <A href="mailto:hey@volt.run">hey@volt.run</A>,
              "Anything you would rather not post in public",
              "A reply within a few working days",
            ],
            [
              <A href="mailto:security@volt.run">security@volt.run</A>,
              "Vulnerabilities — see the security page",
              "Acknowledged within 72 hours",
            ],
          ]}
        />

        <H2>What makes a report actionable</H2>
        <UL
          items={[
            "What you expected, what happened, and the smallest graph that shows it.",
            "The client you used — SDK and version, Agent Chat UI, Studio or raw HTTP.",
            "Whether you are on the cloud or self-hosted, and the Postgres version if self-hosted.",
            "Run and thread ids, plus the stream mode, if a run behaved badly.",
          ]}
        />
        <Code code={DIAGNOSTICS} lang="bash" className="border border-line p-4" />

        <H2>Paid support</H2>
        <P>
          If you are self-hosting and want a contract — a named contact, a
          response window, help with an upgrade — write to{" "}
          <A href="mailto:hey@volt.run">hey@volt.run</A>. There is no enterprise
          tier to buy yet; there are people who will help.
        </P>

        <Note>
          Before reporting, it is worth checking <A href="/status">status</A> —
          the thing you hit may be a component we have already flagged as
          building rather than a bug.
        </Note>
      </Prose>
    </PageShell>
  );
}
