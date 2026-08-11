import type { ReactNode } from "react";
import { FlickeringGrid } from "../ui/flickering-grid";
import { NumberTicker } from "../ui/number-ticker";
import { Section } from "../ui/primitives";
import WorldMap from "../ui/world-map";

/** Traffic arcs between the regions an agent is served from. */
const ROUTES = [
  {
    start: { lat: 39.0, lng: -77.5, label: "iad1" },
    end: { lat: 50.1, lng: 8.7, label: "fra1" },
  },
  {
    start: { lat: 50.1, lng: 8.7, label: "fra1" },
    end: { lat: 1.35, lng: 103.8, label: "sin1" },
  },
  {
    start: { lat: 39.0, lng: -77.5, label: "iad1" },
    end: { lat: -23.5, lng: -46.6, label: "gru1" },
  },
];

function RegionMap() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 top-8 overflow-hidden opacity-55 [mask-image:linear-gradient(to_top,#000_45%,transparent_95%)]"
    >
      {/* Muted arc colour: the map is context, not the headline. */}
      <WorldMap dots={ROUTES} lineColor="#7f8f46" />
    </div>
  );
}

function Stat({
  value,
  label,
  body,
  className = "",
  map = false,
  dots = false,
}: {
  value: ReactNode;
  label: string;
  body: string;
  className?: string;
  map?: boolean;
  dots?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden border-line p-6 md:p-8 ${className}`}>
      {map ? <RegionMap /> : null}
      {dots ? (
        <FlickeringGrid
          className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_90%_85%_at_60%_55%,#000_20%,transparent_95%)]"
          squareSize={2}
          gridGap={10}
          flickerChance={0.09}
          color="#ffffff"
          maxOpacity={0.22}
        />
      ) : null}
      <div className="relative">
        <p className="font-mono text-[2rem] font-medium tracking-[-0.03em] text-fg md:text-[2.5rem]">
          {value}
        </p>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.13em] text-fg-muted">
          {label}
        </p>
        <p className="mt-4 max-w-[26rem] text-[0.9rem] leading-[1.6] text-fg-dim">{body}</p>
      </div>
    </div>
  );
}

export function Numbers() {
  return (
    <Section eyebrow="by the numbers">
      <h2 className="h-section text-center text-[2.25rem] md:text-[3.25rem] lg:text-[3.75rem]">
        Cheap, and yours.
      </h2>

      <div className="mt-14 border border-line">
        <div className="grid md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <Stat
            map
            value="4 regions"
            label="runs close to your users"
            body="Deploy an agent once and serve it from the region nearest the request. Postgres stays the single source of truth."
            className="min-h-[19rem] border-b md:border-b-0 md:border-r"
          />
          <Stat
            value={
              <>
                <NumberTicker value={2} className="text-fg" /> runtimes
              </>
            }
            label="typescript + python"
            body="The same deploy command, API surface and dashboard for both. No second platform, no second invoice."
          />
        </div>
        <div className="grid border-t border-line md:grid-cols-2">
          <Stat
            value="Protocol v2"
            label="agent protocol, unmodified"
            body="The official LangGraph SDKs, Agent Chat UI and Studio point at your Volt URL and just work — nothing forked, nothing patched."
            className="border-b md:border-b-0 md:border-r"
          />
          <Stat
            dots
            value="Apache-2.0"
            label="zero lock-in"
            body="The runtime is open source. Outgrow the cloud, take your Postgres and run the identical image yourself."
          />
        </div>
      </div>
    </Section>
  );
}
