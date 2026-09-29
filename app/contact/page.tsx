import Link from "next/link";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import Footer from "@/components/sections/Footer";

const channels = [
  { label: "EMAIL", value: site.contact.email, href: site.contact.emailHref },
  { label: "GITHUB", value: site.contact.github, href: site.contact.githubHref },
  { label: "LINKEDIN", value: site.contact.linkedin, href: site.contact.linkedinHref },
] as const;

export const metadata = {
  title: "Contact — Dhruv",
  description: "Let's build something useful. Reach Dhruv for AI, security, and software work.",
};

export default function ContactPage() {
  return (
    <>
      <section className="theme-paper bg-paper text-ink">
        <div className="mx-auto max-w-[1920px] px-6 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
          <div className="flex items-center justify-between">
            <Link href="/" data-cursor="link" className="text-micro text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
              ← HOME
            </Link>
            <span className="text-micro text-[var(--muted)]">SYSTEM / CONNECT</span>
          </div>

          <div className="mt-16 md:mt-24">
            <SectionLabel index="05" label="CONTACT" />
            <Reveal className="mt-12">
              <h1 className="text-hero text-[var(--fg)]">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                USEFUL.
              </h1>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 max-w-xl">
              <p className="text-body text-[var(--muted)]">
                A problem worth automating, a system worth securing, an idea
                that needs an engineer who thinks in systems. {site.name} is
                open to both — reach out.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 md:mt-28">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={0.05 * i}>
                <Magnetic max={4} className="w-full">
                  <Link
                    href={c.href}
                    data-cursor="view"
                    className="group hairline-t flex w-full items-center justify-between gap-6 py-7 md:py-9"
                  >
                    <span className="text-micro text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-display flex-1 text-[var(--fg)] md:pl-8">{c.label}</span>
                    <span className="hidden font-mono text-xs tracking-[0.18em] text-[var(--muted)] md:block md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                      {c.value}
                    </span>
                    <span className="text-2xl transition-transform duration-300 group-hover:translate-x-3 group-hover:-translate-y-1">↗</span>
                  </Link>
                </Magnetic>
              </Reveal>
            ))}
            <div className="hairline-b" />
          </div>

          <Reveal delay={0.1} className="mt-14 flex items-center justify-between">
            <span className="text-micro text-[var(--muted)]">REPLY WITHIN: [TBA]</span>
            <span className="text-micro hidden text-[var(--muted)] sm:block">DO NOT SEND: SPONSOR DMS, NFT PITCHES</span>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}