import Link from "next/link";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const channels = [
  { label: "EMAIL", value: site.contact.email, href: site.contact.emailHref },
  { label: "GITHUB", value: site.contact.github, href: site.contact.githubHref },
  { label: "LINKEDIN", value: site.contact.linkedin, href: site.contact.linkedinHref },
] as const;

export default function ContactSection() {
  return (
    <section className="theme-paper bg-paper text-ink">
      <div className="mx-auto max-w-[1920px] px-6 py-28 md:px-10 md:py-48">
        <SectionLabel index="05" label="CONTACT" />

        <Reveal className="mt-14 md:mt-24">
          <h2 className="text-hero text-[var(--fg)]">
            LET&apos;S
            <br />
            BUILD SOMETHING
            <br />
            USEFUL.
          </h2>
        </Reveal>

        <div className="mt-20 md:mt-28">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={0.04 * i}>
              <Magnetic max={4} className="w-full">
                <Link
                  href={c.href}
                  data-cursor="view"
                  className="group hairline-t flex w-full items-center justify-between gap-6 py-7 md:py-9"
                >
                  <span className="text-micro text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-display flex-1 text-[var(--fg)] md:pl-8">
                    {c.label}
                  </span>
                  <span className="hidden font-mono text-xs tracking-[0.18em] text-[var(--muted)] transition-opacity duration-300 group-hover:opacity-100 md:block md:opacity-0">
                    {c.value}
                  </span>
                  <span className="text-2xl transition-transform duration-300 group-hover:translate-x-3 group-hover:-translate-y-1">
                    ↗
                  </span>
                </Link>
              </Magnetic>
            </Reveal>
          ))}
          <div className="hairline-b" />
        </div>

        <Reveal delay={0.1} className="mt-14 flex items-center justify-between">
          <span className="text-micro text-[var(--muted)]">SYSTEM / CONNECT</span>
          <span className="text-micro hidden text-[var(--muted)] sm:block">
            RESPONSE TIME: [TBA]
          </span>
        </Reveal>
      </div>
    </section>
  );
}