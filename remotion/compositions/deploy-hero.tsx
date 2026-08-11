import { VoltLogo } from "@/components/brand/logo";
import { DeployLog } from "@/components/motion/deploy-log";
import { RemotionFrame } from "../frame-bridge";

/**
 * The hero's "Live deploy" panel, rendered as video. Same DeployLog component
 * the site uses — only the clock differs.
 */
export function DeployHero() {
  return (
    <RemotionFrame>
      <div className="flex size-full flex-col justify-center bg-ink px-20 font-sans">
        <div aria-hidden className="absolute inset-0 dotgrid opacity-40" />

        <div className="relative flex items-center justify-between">
          <VoltLogo />
          <span className="font-mono text-[0.8rem] uppercase tracking-[0.13em] text-fg-dim">
            deployments for ai agents
          </span>
        </div>

        <h1 className="h-display relative mt-10 max-w-[26ch] text-[4.5rem] text-fg">
          One command,
          <br />
          one endpoint.
        </h1>

        <div className="relative mt-12 rounded-[4px] border border-line bg-panel/80 shadow-panel">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="font-mono text-[1rem] text-fg">Live deploy</span>
            <span className="font-mono text-[0.8rem] uppercase tracking-[0.13em] text-fg-dim">
              iad1
            </span>
          </div>
          <div className="px-6 py-5 text-[1.15rem]">
            <DeployLog />
          </div>
        </div>
      </div>
    </RemotionFrame>
  );
}
