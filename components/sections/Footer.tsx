import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1920px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-display tracking-[-0.04em] text-paper">{site.name}</p>
            <p className="text-micro mt-3 text-stone">{site.identity}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/about" data-cursor="link" className="link-fade font-mono text-xs tracking-[0.18em]">
              ABOUT
            </Link>
            <Link href="/work" data-cursor="link" className="link-fade font-mono text-xs tracking-[0.18em]">
              WORK
            </Link>
            <Link href="/contact" data-cursor="link" className="link-fade font-mono text-xs tracking-[0.18em]">
              CONTACT
            </Link>
          </div>
        </div>

        <div className="hairline-t mt-12 flex flex-col gap-4 pt-6 text-micro text-stone md:flex-row md:items-center md:justify-between">
          <span>© {year} DHRUV</span>
          <span className="hidden md:block">SYSTEM / CONNECT</span>
          <span className="font-mono text-[10px]">
            {site.builtWith.join(" · ")}
          </span>
        </div>
      </div>
    </footer>
  );
}