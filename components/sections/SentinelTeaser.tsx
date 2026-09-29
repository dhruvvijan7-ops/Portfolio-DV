import Link from "next/link";
import { sentinelPipeline } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

export default function SentinelTeaser() {
  return (
    <section className="theme-moss bg-deep-moss text-paper">
      <div className="mx-auto max-w-[1920px] px-6 py-28 md:px-10 md:py-44">
        <SectionLabel index="04" label="SENTINEL" />

        <div className="mt-14 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display-xl">
                SYSTEM
                <br />
                UNDER
                <br />
                OBSERVATION.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 max-w-xl space-y-6">
              <p className="text-body text-stone">
                Sentinel is a lightweight host-security platform: it observes a
                machine, normalizes its behaviour, and explains what it finds —
                quiet by design, with the pipeline every security system needs
                and most never have.
              </p>
              <p className="text-micro text-stone">
                STATUS: [RESEARCH / EARLY IMPL] — NO PRODUCTION CLAIMS.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-12">
              <Link
                href="/work/sentinel"
                data-cursor="view"
                className="group inline-flex items-center gap-4 border-b border-paper/60 pb-2 text-base font-semibold tracking-[-0.01em]"
              >
                CASE STUDY — OBSERVE TO EXPLAIN
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <ol className="relative flex h-full flex-col justify-between gap-4 border-l border-hairline/60 pl-6">
                {sentinelPipeline.map((step) => (
                  <li key={step.id} className="relative">
                    <span
                      className="absolute -left-[25px] top-[0.4em] h-1.5 w-1.5 rounded-full bg-olive"
                      aria-hidden="true"
                    />
                    <span className="text-micro mr-3 text-olive">{step.id}</span>
                    <span className="text-display text-paper">{step.label}</span>
                  </li>
                ))}
                <li className="relative">
                  <span
                    className="absolute -left-[27px] top-[0.4em] h-1.5 w-1.5 rounded-full bg-paper"
                    aria-hidden="true"
                  />
                  <span className="text-display text-stone opacity-60">[&rarr; ACT]</span>
                </li>
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}