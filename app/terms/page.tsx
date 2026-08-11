import type { Metadata } from "next";
import {
  A,
  H2,
  Note,
  P,
  PageShell,
  Prose,
  UL,
} from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms of using Volt during early access, in plain language. Draft.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="terms"
      title="Terms of use"
      lede="What you can expect from us and what we expect from you while Volt is in early access. Written to be read, and not yet reviewed by a lawyer."
      meta={["draft", "updated 2026-08-10"]}
    >
      <Prose>
        <Note>
          An early-access draft, not a finished contract. If you need signed
          terms, an SLA or a DPA before you can use the service, write to{" "}
          <A href="mailto:hey@volt.run">hey@volt.run</A>.
        </Note>

        <H2>The service, honestly</H2>
        <UL
          items={[
            "Volt is in early access. There is no uptime commitment and no SLA.",
            "APIs at the protocol layer are stable; anything marked building or planned on the status page can change without notice.",
            "We may need to reset a preview environment or a database during early access. Do not keep the only copy of something important here.",
            "It is not the place for customer-facing production traffic yet. We say so on the home page too.",
          ]}
        />

        <H2>The open-source runtime</H2>
        <P>
          The runtime is licensed under Apache-2.0 and that licence governs it,
          not this page. You can fork it, run it and modify it on your own
          hardware — see <A href="/self-hosting">self-hosting</A>. These terms
          cover the hosted service only.
        </P>

        <H2>Your side</H2>
        <UL
          items={[
            "You own your graphs, your data and your model-provider keys. We claim nothing over them.",
            "You are responsible for what your agents do — the content they generate and the systems they touch.",
            "Do not use Volt for anything illegal, for attacking other systems, or to send bulk unsolicited messages.",
            "Do not attempt to break isolation between accounts. Report it instead: it is worth more to us as a bug than to you as an exploit.",
          ]}
        />

        <H2>Payment</H2>
        <P>
          Paid plans are billed per run on top of the monthly fee shown on the{" "}
          <A href="/#pricing">pricing section</A>. During early access we will tell
          you before anything you are running starts costing money. Cancel any
          time; you keep access until the end of the period you paid for.
        </P>

        <H2>Ending it</H2>
        <P>
          You can delete your account whenever you like — see{" "}
          <A href="/privacy">privacy</A> for what happens to the data. We may
          suspend an account that is breaking the rules above, and we will tell
          you why. Either way, the runtime is open source: your exit is a change
          of base URL, not a migration project.
        </P>

        <H2>Liability</H2>
        <P>
          The service is provided as-is during early access. We are not liable
          for losses arising from your use of it, and any liability is limited to
          what you paid us in the previous month. That is the standard shape of
          this clause; it is also genuinely what an early-access service can
          promise.
        </P>
      </Prose>
    </PageShell>
  );
}
