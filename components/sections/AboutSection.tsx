import Link from "next/link";
import { about } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export default function AboutSection() {
  return (
    <section className="theme-paper bg-paper text-ink">
      <div className="mx-auto max-w-[1920px] px-6 py-28 md:px-10 md:py-44">
        <SectionLabel index="01" label="ABOUT" />

        <div className="mt-14 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <ul>
                {about.principles.map((p, i) => (
                  <li
                    key={p.label}
                    className="hairline-t flex items-center justify-between py-5"
                  >
                    <span className="text-micro text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-eyebrow  text-[var(--fg)]">{p.label}</span>
                  </li>
                ))}
                <li className="hairline-b" />
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <p className="text-micro text-[var(--muted)]">
                SECURITY IS NOT A FEATURE. IT IS A PROPERTY OF GOOD SYSTEMS.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display-xl">{about.intro}</h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-10 max-w-2xl space-y-6">
              {about.body.map((p, i) => (
                <p key={i} className="text-body  text-[var(--muted)]">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.15} className="mt-12">
              <Magnetic max={4}>
                <Link
                  href="/about"
                  data-cursor="arrow"
                  className="group inline-flex items-center gap-4 border-b border-[var(--fg)] pb-2 text-base font-semibold tracking-[-0.01em]"
                >
                  READ THE FULL THINKING
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}