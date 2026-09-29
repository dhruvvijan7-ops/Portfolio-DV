"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { stopSmooth, startSmooth } from "@/lib/smooth";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      stopSmooth();
      document.body.style.overflow = "hidden";
    } else {
      startSmooth();
      document.body.style.overflow = "";
    }
    return () => {
      startSmooth();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[border-color] duration-500 ${
          scrolled && !open ? "border-b border-white/10" : "border-b border-transparent"
        }`}
      >
        <nav
          className="flex h-16 items-center justify-between px-6 md:h-20 md:px-10"
          aria-label="Primary"
        >
          <Link
            href="/"
            data-cursor="link"
            className="text-base font-semibold tracking-[-0.02em] text-paper mix-blend-difference md:text-lg"
          >
            DHRUV
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cursor="link"
                  className={`text-micro mix-blend-difference transition-opacity duration-300 ${
                    active
                      ? "text-paper opacity-100"
                      : "text-paper opacity-60 hover:opacity-100"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-cursor="arrow"
            className="flex h-10 w-10 flex-col items-end justify-center gap-[6px] mix-blend-difference md:hidden"
          >
            <span className="h-px w-6 bg-paper" />
            <span className="h-px w-4 bg-paper" />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-ink transition-opacity duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-micro text-stone">MENU / INDEX</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            data-cursor="arrow"
            className="flex h-10 w-10 items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 3l16 16M19 3L3 19" stroke="#E8E6DA" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2 px-6 pb-8">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor="view"
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 overflow-hidden py-1 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              } transition-all duration-500`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <span className="text-micro text-olive">0{i + 1}</span>
              <span className="text-display text-paper">{l.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 pb-6">
          <span className="text-micro text-stone">{site.identity}</span>
          <span className="text-micro text-stone">SYSTEM / CONNECT</span>
        </div>
      </div>
    </>
  );
}