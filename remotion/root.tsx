import { Composition } from "remotion";
import { FPS } from "@/components/motion/frame";
import { DEPLOY_DURATION } from "@/components/motion/deploy-log";
import { RunConsole, RUN_CONSOLE_DURATION } from "./compositions/run-console";
import { DeployHero } from "./compositions/deploy-hero";
import "../app/globals.css";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="DeployHero"
        component={DeployHero}
        durationInFrames={DEPLOY_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="RunConsole"
        component={RunConsole}
        durationInFrames={RUN_CONSOLE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
}
