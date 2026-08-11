import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Notice } from "@/components/sections/notice";
import { Numbers } from "@/components/sections/numbers";
import { Platform } from "@/components/sections/platform";
import { Pricing } from "@/components/sections/pricing";
import { ProtocolStrip } from "@/components/sections/protocol-strip";
import { UseCases } from "@/components/sections/use-cases";
import { Banner } from "@/components/site/banner";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Frame } from "@/components/ui/primitives";

export default function Home() {
  return (
    <>
      <Banner />
      <Nav />
      <main>
        <Frame>
          <Hero />
          <ProtocolStrip />
          <Platform />
          <Numbers />
          <UseCases />
          <Notice />
          <Pricing />
          <Faq />
          <Cta />
          <Footer />
        </Frame>
      </main>
    </>
  );
}
