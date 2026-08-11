# @volt/web

The Volt landing page. Next.js App Router, Tailwind v4, dark-only.

```bash
pnpm --filter @volt/web dev        # http://localhost:3100
pnpm --filter @volt/web build
pnpm --filter @volt/web remotion   # Remotion studio for the video clips
```

## The positioning it sells

Volt is a **deployment platform for AI agents** — push a LangGraph graph in
**TypeScript or Python** and get a versioned endpoint that speaks Agent Protocol
v2. The two runtimes are presented as one product: one `volt deploy`, one API,
one dashboard, one invoice. Nothing on the page names the runtimes as separate
projects.

## Design system

The layout language is a bordered page frame, dashed rails around every content
column, crosshair ticks at the rail corners, `[ eyebrow ]` labels in mono above
each band, and a monochrome palette with a single volt-lime accent.

| Token | Value | Used for |
|---|---|---|
| `--color-ink` | `#050505` | page |
| `--color-panel` | `#0e0e10` | cards, code panels |
| `--color-line` | `#ffffff14` | hairlines and rails |
| `--color-volt` | `#d8ff3e` | accent — one per screen, never decorative |
| `--font-sans` / `--font-mono` | Geist / Geist Mono | display copy / labels, code, numbers |

Structural primitives live in `components/ui/primitives.tsx` (`Frame`,
`Section`, `Panel`, `Pill`, `Button`, `Brackets`).

## One animation clock, two renderers

`components/motion/frame.tsx` exposes `useFrame()`. Animated components derive
everything from that frame number — no timers, no CSS transitions:

- **On the site**: `<FrameClock>` drives it from `requestAnimationFrame`, gated
  on an `IntersectionObserver` so nothing animates off screen.
- **In video**: `remotion/frame-bridge.tsx` feeds the same context from
  Remotion's `useCurrentFrame()`.

So `DeployLog` (hero) and `Console` (use cases) are literally the same
components in the page and in `remotion/compositions/*`. Render one:

```bash
pnpm --filter @volt/web exec remotion render remotion/index.ts DeployHero out/deploy-hero.mp4
```

## Registry components

`components.json` registers three registries, so more can be pulled in with
`pnpm dlx shadcn@latest add @magicui/<name>` (or `@aceternity/<name>`).

Currently vendored into `components/ui/`:

| Component | Source | Where |
|---|---|---|
| `flickering-grid` | MagicUI | hero, final CTA, the Apache-2.0 stat card |
| `animated-shiny-text` | MagicUI | top banner |
| `number-ticker` | MagicUI | "2 runtimes" stat |
| `blur-fade` | MagicUI | section reveals below the fold |
| `world-map` | Aceternity | region card (retinted, muted arcs; `next-themes` removed) |

Deliberately not used: gradient/neon/confetti/meteor effects, 3D globes,
rainbow buttons, marquees and travelling border beams — they fight a monochrome
engineering aesthetic. The footer follows the Aceternity "four grids" block
layout, rebuilt in our primitives (their block source is paywalled).

Above-the-fold content never depends on a JS animation to become visible: the
hero uses the CSS `.rise` reveal, `BlurFade` is only used further down.

## Copy that is still placeholder

- Pricing numbers (`$0` / `$20` / usage tiers) — illustrative.
- `volt logs --follow`, preview deploys, multi-region and the `volt.run`
  hostnames describe the intended platform, not what ships today.
