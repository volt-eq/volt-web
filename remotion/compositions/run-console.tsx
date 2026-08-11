import { Console, SCENARIOS } from "@/components/sections/use-cases";
import { VoltLogo } from "@/components/brand/logo";
import { RemotionFrame } from "../frame-bridge";

const SCENARIO = SCENARIOS[0]!;

export const RUN_CONSOLE_DURATION = SCENARIO.frames;

/** The use-case console from the landing page, as a shareable clip. */
export function RunConsole() {
  return (
    <RemotionFrame>
      <div className="flex size-full flex-col justify-center bg-ink px-24 font-sans">
        <div aria-hidden className="absolute inset-0 hatch opacity-60" />

        <div className="relative flex items-end justify-between">
          <div>
            <p className="font-mono text-[0.9rem] uppercase tracking-[0.13em] text-volt">
              {SCENARIO.tag}
            </p>
            <h1 className="h-section mt-3 text-[3.4rem] text-fg">
              {SCENARIO.title}
            </h1>
          </div>
          <VoltLogo />
        </div>

        <div className="relative mt-12 text-[1.35rem]">
          <Console scenario={SCENARIO} />
        </div>
      </div>
    </RemotionFrame>
  );
}
