import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import SentinelScroll from "@/components/sentinel/SentinelScroll";
import Reveal from "@/components/ui/Reveal";
import Footer from "@/components/sections/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) return { title: "Not found — Dhruv" };
  return {
    title: `${project.title} — Dhruv`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className="theme-moss bg-deep-moss text-paper">
        <div className="mx-auto max-w-[1920px] px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44">
          <div className="flex items-center justify-between">
            <Link href="/work" data-cursor="link" className="text-micro text-stone transition-colors hover:text-paper">
              ← WORK / INDEX
            </Link>
            <span className="text-micro text-stone">{project.status}</span>
          </div>

          <Reveal className="mt-14">
            <h1 className="text-hero text-paper">
              {project.title}
              {project.alias && (
                <span className="mt-6 block font-mono text-sm tracking-[0.2em] text-stone md:text-base">
                  {project.alias}
                </span>
              )}
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="text-micro text-olive">{project.category}</span>
            <span className="text-micro text-stone">{project.year}</span>
            <span className="text-micro text-stone">STATUS: [{project.status}]</span>
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <p className="text-micro max-w-xl leading-relaxed text-stone">{project.statusNote}</p>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36">
          <Reveal className="md:col-span-8">
            <p className="text-body max-w-3xl text-stone">{project.description}</p>
          </Reveal>
          <div className="md:col-span-4">
            <Reveal delay={0.06}>
              <dl>
                <div className="hairline-b py-4">
                  <dt className="text-micro text-olive">ROLE</dt>
                  <dd className="font-mono mt-2 text-xs tracking-[0.14em] text-stone">{project.role}</dd>
                </div>
                <div className="hairline-b py-4">
                  <dt className="text-micro text-olive">STACK</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="border border-hairline px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-stone">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-micro text-olive">LINKS</dt>
                  <dd className="mt-2 flex flex-col gap-2">
                    {project.links?.map((l) => (
                      <Link
                        key={l.label}
                        href={l.href}
                        data-cursor="arrow"
                        className="link-fade font-mono text-xs tracking-[0.14em] text-stone"
                      >
                        {l.label} →
                      </Link>
                    )) ?? <span className="font-mono text-xs text-stone">—</span>}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Signature scroll architecture (flagship only) */}
      {project.slug === "sentinel" && <SentinelScroll />}

      {/* Case study */}
      {project.caseStudy && (
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-[1920px] px-6 py-24 md:px-10 md:py-32">
            <div className="max-w-3xl">
              {project.caseStudy.map((s, i) => (
                <div key={s.heading} className="hairline-t py-12 first:border-t-0 md:py-16">
                  <Reveal>
                    <span className="text-micro text-olive">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-display mt-3 text-paper">{s.heading}</h2>
                  </Reveal>
                  <Reveal delay={0.05} className="mt-6 space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className={`text-body text-stone ${p.startsWith("[") ? "italic opacity-70" : ""}`}>
                        {p}
                      </p>
                    ))}
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1920px] px-6 pb-28 md:px-10 md:pb-44">
          <Link
            href={`/work/${next.slug}`}
            data-cursor="view"
            className="group hairline-t flex flex-col items-start justify-between gap-4 pt-10 md:flex-row md:items-center md:gap-6"
          >
            <span className="text-micro text-stone">NEXT PROJECT</span>
            <span className="text-display-xl order-first break-words text-paper transition-transform duration-500 md:order-none md:translate-x-0 md:group-hover:translate-x-3">
              {next.title}
            </span>
            <span className="text-2xl text-stone transition-transform duration-300 group-hover:translate-x-3">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}