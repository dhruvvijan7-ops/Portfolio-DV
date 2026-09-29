import Link from "next/link";
import { projects } from "@/data/projects";
import WorkRow from "@/components/projects/WorkRow";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Work — Dhruv",
  description: "Selected projects by Dhruv — AI, cybersecurity, and software systems.",
};

export default function WorkPage() {
  return (
    <>
      <section className="theme-moss bg-deep-moss text-paper">
        <div className="mx-auto max-w-[1920px] px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44">
          <SectionLabel index="03" label="WORK" />
          <Reveal className="mt-12 md:mt-20">
            <h1 className="text-hero text-paper">
              THE
              <br />
              ARCHIVE.
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex items-center justify-between">
            <p className="text-body max-w-md text-stone">
              Everything public I&apos;ve built or am building — as case
              studies, not cards. [Content expands as projects land.]
            </p>
            <span className="hidden text-micro text-stone md:block">
              {projects.length} ENTRIES INDEXED
            </span>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1920px] px-6 pb-28 md:px-10 md:pb-44">
          <ul className="mt-4 md:mt-6">
            {projects.map((p, i) => (
              <WorkRow key={p.slug} project={p} index={i} />
            ))}
            <div className="hairline-b" />
          </ul>

          <Reveal className="mt-24 text-center">
            <Link
              href="/contact"
              data-cursor="view"
              className="group inline-flex items-center gap-4 border-b border-paper/60 pb-2 text-base font-semibold tracking-[-0.01em]"
            >
              HAVE A PROBLEM WORTH SOLVING?
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}