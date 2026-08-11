import { Button, Section } from "../ui/primitives";

type Tier = {
  name: string;
  price: string;
  unit: string;
  body: string;
  cta: string;
  href: string;
  features: string[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Hobby",
    price: "$0",
    unit: "forever",
    body: "For side projects and the first version of the thing you're not sure about yet.",
    cta: "Start free",
    href: "#start",
    features: [
      "1 project · 3 deployed agents",
      "10k runs / month",
      "7-day thread retention",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$20",
    unit: "per month + usage",
    body: "For products in production. Usage-based, per run — never per seat, never per developer.",
    cta: "Deploy now",
    href: "#start",
    featured: true,
    features: [
      "Unlimited agents and projects",
      "Pay per run after the included tier",
      "Unlimited thread retention",
      "Preview deploys and rollbacks",
      "Traces and OpenTelemetry export",
    ],
  },
  {
    name: "Self-hosted",
    price: "Free",
    unit: "apache-2.0",
    body: "The same runtime, on your own Postgres and your own hardware. No license to negotiate.",
    cta: "Read the docs",
    href: "/self-hosting",
    features: [
      "Identical container image",
      "Bring your own Postgres",
      "Your data never leaves your VPC",
      "Paid support available",
    ],
  },
];

export function Pricing() {
  return (
    <Section id="pricing" eyebrow="pricing">
      <div className="text-center">
        <h2 className="h-section text-[2.25rem] md:text-[3.25rem] lg:text-[3.75rem]">
          Priced per run,
          <br />
          not per developer.
        </h2>
        <p className="mx-auto mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-fg-muted">
          Managed agent platforms bill like enterprise software. Volt bills like
          infrastructure — and you can always take it home.
        </p>
      </div>

      <div className="mt-14 grid border border-line md:grid-cols-3">
        {TIERS.map((tier, i) => (
          <div
            key={tier.name}
            className={`relative flex flex-col overflow-hidden p-6 md:p-7 ${
              i < TIERS.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""
            } ${tier.featured ? "bg-panel/60" : ""}`}
          >
            {tier.featured ? (
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-volt" />
            ) : null}
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-fg-muted">
              {tier.name}
            </p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-mono text-[2.4rem] font-medium tracking-[-0.03em] text-fg">
                {tier.price}
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.11em] text-fg-dim">
                {tier.unit}
              </span>
            </p>
            <p className="mt-4 text-[0.9rem] leading-[1.6] text-fg-dim">{tier.body}</p>

            <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-[0.875rem]">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-fg-muted">
                  <span className={tier.featured ? "text-volt" : "text-fg-dim"}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Button
              href={tier.href}
              variant={tier.featured ? "solid" : "ghost"}
              className="mt-8 w-full"
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center font-mono text-[0.7rem] uppercase tracking-[0.11em] text-fg-dim">
        Volumes above 1M runs / month → talk to us
      </p>
    </Section>
  );
}
