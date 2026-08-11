import { FlickeringGrid } from "../ui/flickering-grid";
import { Button } from "../ui/primitives";
import { CodeTabs, type Snippet } from "../ui/tabs";

const INSTALL: Snippet[] = [
  { id: "npm", label: "npm", lang: "bash", code: "npm i -g @volt/cli && volt deploy" },
  { id: "pnpm", label: "pnpm", lang: "bash", code: "pnpm add -g @volt/cli && volt deploy" },
  { id: "pip", label: "pip", lang: "bash", code: "pip install volt-cli && volt deploy" },
  { id: "brew", label: "brew", lang: "bash", code: "brew install volt && volt deploy" },
];

export function Cta() {
  return (
    <section id="start" className="relative overflow-hidden rule-t">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <FlickeringGrid
          className="absolute inset-0 size-full"
          squareSize={2}
          gridGap={10}
          flickerChance={0.12}
          color="#d8ff3e"
          maxOpacity={0.34}
        />
        {/* Keep the headline legible without hiding the grid around it. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_38%_34%_at_50%_42%,#050505_35%,transparent_100%)]" />
      </div>

      <div className="relative px-4 md:px-8">
        <div className="rails relative mx-auto max-w-[1320px] px-5 py-24 text-center md:px-12 md:py-32">
          <span className="tick -left-[2px] -top-[2px]" />
          <span className="tick -right-[2px] -top-[2px]" />
          <span className="tick -bottom-[2px] -left-[2px]" />
          <span className="tick -bottom-[2px] -right-[2px]" />

          <h2 className="h-display text-[2.6rem] md:text-[3.75rem]">
            Deploy your first agent
            <br />
            in under a minute.
          </h2>
          <p className="mx-auto mt-5 max-w-[30rem] text-[1.0625rem] text-fg-muted">
            Install the CLI, point it at a graph, and Volt does the rest.
          </p>

          <div className="mt-9 flex justify-center">
            <Button href="#start">Deploy free</Button>
          </div>

          <CodeTabs
            snippets={INSTALL}
            minHeight="min-h-[3.5rem]"
            className="mx-auto mt-10 max-w-[38rem] text-left"
          />
        </div>
      </div>
    </section>
  );
}
