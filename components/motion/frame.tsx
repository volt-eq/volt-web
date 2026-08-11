"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const FPS = 30;

const FrameContext = createContext<number>(0);

/**
 * Frame-driven animation, shared by the site and the Remotion compositions.
 *
 * Every animated component reads `useFrame()` and derives its state from that
 * number alone — no timers, no transitions. In the browser `FrameClock` feeds
 * it from requestAnimationFrame; in Remotion `remotion/frame-bridge.tsx` feeds
 * it from `useCurrentFrame()`. Same components, same motion, two renderers.
 */
export function FrameProvider({
  frame,
  children,
}: {
  frame: number;
  children: ReactNode;
}) {
  return <FrameContext.Provider value={frame}>{children}</FrameContext.Provider>;
}

export function useFrame(): number {
  return useContext(FrameContext);
}

export function FrameClock({
  children,
  durationInFrames,
  loop = true,
  fps = FPS,
  autoStart = false,
  className,
}: {
  children: ReactNode;
  durationInFrames: number;
  loop?: boolean;
  fps?: number;
  /** Start immediately instead of waiting for the element to be on screen. */
  autoStart?: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(autoStart);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (autoStart || !host.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setRunning(true);
      },
      { rootMargin: "-10% 0px" },
    );
    io.observe(host.current);
    return () => io.disconnect();
  }, [autoStart]);

  useEffect(() => {
    if (!running) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setFrame(durationInFrames - 1);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      start ??= now;
      const elapsed = ((now - start) / 1000) * fps;
      setFrame(
        loop
          ? elapsed % durationInFrames
          : Math.min(elapsed, durationInFrames - 1),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, durationInFrames, loop, fps]);

  return (
    <div ref={host} className={className}>
      <FrameProvider frame={frame}>{children}</FrameProvider>
    </div>
  );
}

/* ------------------------------------------------------------------ easings */

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Remotion's `interpolate`, reimplemented so the web bundle stays dependency-free. */
export function interpolate(
  input: number,
  [inMin, inMax]: [number, number],
  [outMin, outMax]: [number, number],
  ease: (t: number) => number = (t) => t,
): number {
  if (inMax === inMin) return outMin;
  const t = Math.min(1, Math.max(0, (input - inMin) / (inMax - inMin)));
  return outMin + (outMax - outMin) * ease(t);
}

/** Characters of `text` revealed at `cps` characters per second. */
export function typed(text: string, frame: number, cps = 26, fps = FPS): string {
  const shown = Math.floor(Math.max(0, frame) * (cps / fps));
  return text.slice(0, shown);
}
