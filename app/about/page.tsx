import Link from "next/link";
import { about } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/sections/Footer";

const experience = [
  { role: "[ROLE]", org: "[ORGANIZATION]", year: "[YEAR]", note: "[Editable placeholder — describe what you did and why it mattered.]" },
];

const education = [
  { deg: "[DEGREE / PROGRAM]", org: "[INSTITUTION]", year: "[YEAR]", note: "[Editable placeholder.]" },
];

export const metadata = {
  title: "About — Dhruv",
  description: "How Dhruv thinks about AI, cybersecurity, and building intelligent systems.",
};

export default function AboutPage() {
  return (
    <>
      <section className="theme-paper bg-paper text-ink">
        <div className="mx-auto max-w-[1920px] px-6 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
          <div className="flex items-center justify-between">
            <Link href="/" data-cursor="link" className="text-micro text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
              ← HOME
            </Link>
            <span className="text-micro text-[var(--muted)]">DHRUV / 001</span>
          </div>

          <div className="mt-16 md:mt-24">
            <SectionLabel index="01" label="ABOUT" />
            <Reveal className="mt-12">
              <h1 className="text-hero text-[var(--fg)]">{about.intro}</h1>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-16 md:mt-28 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal className="space-y-8">
                {about.body.map((p, i) => (
                  <p key={i} className="text-body max-w-2xl text-[var(--muted)]">
                    {p}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.08} className="mt-12">
                <p className="text-micro max-w-xl leading-relaxed text-[var(--muted)]">
                  [FULL BIO GOES HERE — what shaped you, what you are studying
                  or have studied, who you have worked with. Nothing fabricated.]
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.05}>
                <h2 className="text-eyebrow text-[var(--accent)]">EXPERIENCE</h2>
                <div className="hairline-t mt-6">
                  {experience.map((e) => (
                    <div key={e.role} className="hairline-b py-6">
                      <p className="text-base font-semibold tracking-[-0.01em]">{e.role}</p>
                      <p className="font-mono mt-2 text-xs tracking-[0.16em] text-[var(--muted)]">
                        {e.org} · {e.year}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{e.note}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-14">
                <h2 className="text-eyebrow text-[var(--accent)]">EDUCATION</h2>
                <div className="hairline-t mt-6">
                  {education.map((e) => (
                    <div key={e.deg} className="hairline-b py-6">
                      <p className="text-base font-semibold tracking-[-0.01em]">{e.deg}</p>
                      <p className="font-mono mt-2 text-xs tracking-[0.16em] text-[var(--muted)]">
                        {e.org} · {e.year}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{e.note}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-24 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--rule)] pt-10">
            <Link href="/work" data-cursor="arrow" className="group flex items-center gap-3 text-base font-semibold">
              SEE THE WORK
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
            <Link href="/contact" data-cursor="arrow" className="group flex items-center gap-3 text-base font-semibold">
              START A CONVERSATION
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}