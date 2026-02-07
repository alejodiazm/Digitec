import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";

import { TracingBeam } from "@/components/effects/TracingBeam";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1121] selection:bg-primary/20 selection:text-primary-light">
      <ScrollProgress />
      <TracingBeam>
        <Hero />
        <About className="bg-[#0F172A] theme-dark relative z-10" />
        <Services />
        <Pricing className="bg-[#0F172A] theme-dark relative z-10" />
        <Testimonials />
        <Contact />
      </TracingBeam>
    </main>
  );
}
