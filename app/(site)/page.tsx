import { Hero }         from "@/components/home/hero";
import { Stats }        from "@/components/home/stats";
import { Services }     from "@/components/home/services";
import { Projects }     from "@/components/home/projects";
import { TechStack }    from "@/components/home/techstack";
import { Testimonials } from "@/components/home/testimonials";
import { CTA }          from "@/components/home/cta";
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Projects />
      <TechStack />
      <Testimonials />
      <CTA />
    </>
  );
}
