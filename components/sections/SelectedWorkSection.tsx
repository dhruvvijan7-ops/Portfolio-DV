import Link from "next/link";
import { projects } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import WorkRow from "@/components/projects/WorkRow";

export default function SelectedWorkSection() {
  return (
    <section className="bg-deep text-paper">
      <div className="mx-auto max-w-[1920px] px-6 py-28 md:px-10 md:py-44">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel index="03" label="WORK" />
          <Link
            href="/work"
            data-cursor="arrow"
            className="group hidden items-center gap-3 text-micro text-stone transition-colors hover:text-paper md:inline-flex"
          >
            FULL ARCHIVE
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <div className="mt-14 md:mt-20">
          <h2 className="sr-only">Selected Work</h2>
          {projects.map((p, i) => (
            <WorkRow key={p.slug} project={p} index={i} />
          ))}
          <div className="hairline-b" />
        </div>
      </div>
    </section>
  );
}