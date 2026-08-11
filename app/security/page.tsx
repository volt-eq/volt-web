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
  title: "Security",
  description:
    "How to report a vulnerability in Volt, and how the runtime isolates one tenant's agents from another's.",
};

export default function SecurityPage() {
  return (
    <PageShell
      eyebrow="security"
      title="Reporting and isolation"
      lede="Volt runs other people's agents against a shared database, so isolation is the part we care about most. If you find a hole in it, we want to hear from you before anyone else does."
      meta={["security@volt.run", "72h acknowledgement", "no bounty yet"]}
    >
      <Prose>
        <H2>Reporting a vulnerability</H2>
        <P>
          Email <A href="mailto:security@volt.run">security@volt.run</A> with
          enough detail to reproduce it. Please do not open a public issue for
          anything exploitable, and please do not test against other people&apos;s
          data — if you need an account to probe, ask and we will give you one.
        </P>
        <Table
          head={["Step", "Timing"]}
          rows={[
            ["We acknowledge your report", "Within 72 hours"],
            ["We confirm or dispute the finding", "Within 7 days"],
            ["Fix released, or a plan with dates", "Within 30 days for anything exploitable"],
            ["Public disclosure, credited if you want", "After the fix ships"],
          ]}
        />
        <P>
          There is no paid bounty programme yet — we are too early to run one
          honestly. We will credit you, and we will tell you exactly what your
          report changed.
        </P>

        <H2>How isolation works</H2>
        <UL
          items={[
            "Every request carries an identity, resolved by a pluggable auth handler — JWT today, custom handlers supported.",
            "Every assistant, thread, run and store key is scoped to the identity that owns it. Reads and writes are filtered by owner at the query layer, not in application branches you can forget.",
            "Cascade deletes mean removing a thread removes its runs and checkpoints; nothing is orphaned into another scope.",
            "The noop auth handler treats every caller as the same user. It exists for local development — never point it at the internet.",
          ]}
        />

        <H2>What is not hardened yet</H2>
        <UL
          items={[
            "Per-tenant rate limits and quotas are still being written; a hostile tenant can currently make life slow for others on shared infrastructure.",
            "Sandboxing of graph code is your responsibility today: a graph runs with the privileges of the runtime process.",
            "No SOC 2, no penetration-test report. If you need either before you can adopt Volt, self-host — see below.",
          ]}
        />

        <H2>The self-hosted answer</H2>
        <P>
          Because the runtime is Apache-2.0, the strongest isolation available is
          the one you own: run it inside your own VPC against your own Postgres,
          and no thread contents ever reach us. See{" "}
          <A href="/self-hosting">self-hosting</A>.
        </P>

        <Note>
          Non-security bugs go to <A href="/support">support</A>. Current
          capability status lives on <A href="/status">status</A>.
        </Note>
      </Prose>
    </PageShell>
  );
}
