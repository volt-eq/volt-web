import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { FrameProvider } from "@/components/motion/frame";

/**
 * The only piece of glue between the site and the video: in the browser
 * `FrameClock` drives `useFrame()` from requestAnimationFrame, and here the same
 * context is fed by Remotion's frame. Every animated component below this point
 * is the exact component the landing page renders.
 */
export function RemotionFrame({ children }: { children: ReactNode }) {
  return <FrameProvider frame={useCurrentFrame()}>{children}</FrameProvider>;
}
