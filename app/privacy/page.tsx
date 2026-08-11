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
  title: "Privacy",
  description:
    "What Volt stores, why, and what we never do with it. Early-access draft.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="privacy"
      title="Privacy"
      lede="Plain language, because the only reason this page exists is so you can decide whether to trust us with an agent's state. Written for the early-access product and not yet reviewed by a lawyer."
      meta={["draft", "updated 2026-08-10"]}
    >
      <Prose>
        <Note>
          This is a working draft for early access, not a finished legal
          agreement. If your organisation needs a reviewed policy or a DPA before
          it can use Volt, write to <A href="mailto:hey@volt.run">hey@volt.run</A>{" "}
          and self-host in the meantime — then none of your data reaches us at
          all.
        </Note>

        <H2>What we store</H2>
        <Table
          head={["Data", "Why", "Where"]}
          rows={[
            [
              "Thread and run records",
              "So an agent can resume, and so you can inspect what it did",
              "Postgres",
            ],
            [
              "Checkpoints",
              "The graph state an interrupted or resumed run needs",
              "Postgres",
            ],
            [
              "Account details",
              "Authentication and billing",
              "Postgres",
            ],
            [
              "Operational logs",
              "Debugging failures and abuse",
              "Short-lived, on our infrastructure",
            ],
          ]}
        />
        <P>
          Checkpoints and thread records contain whatever your agent puts in
          them — messages, tool arguments, retrieved documents. Treat them as you
          would any other production database holding user content.
        </P>

        <H2>What we never do</H2>
        <UL
          items={[
            "Train models on your prompts, completions, tool calls or thread contents.",
            "Sell or share your data with third parties for their own purposes.",
            "Read your thread contents, except when you ask us to help debug something specific.",
          ]}
        />

        <H2>Model providers</H2>
        <P>
          Volt runs your graph; your graph calls whichever model provider you
          configured with your own keys. Those calls leave our infrastructure and
          are governed by that provider&apos;s terms. We do not add a provider of
          our own in the middle.
        </P>

        <H2>Retention and deletion</H2>
        <UL
          items={[
            "Delete a thread and its runs and checkpoints go with it — cascade deletes, not soft flags.",
            "Delete your account and we remove your data within 30 days, backups included.",
            "Self-hosting means retention is entirely your policy; we hold nothing.",
          ]}
        />

        <H2>Contact</H2>
        <P>
          Questions, access requests or deletion requests:{" "}
          <A href="mailto:hey@volt.run">hey@volt.run</A>. Security issues go to{" "}
          <A href="/security">security</A> instead.
        </P>
      </Prose>
    </PageShell>
  );
}
