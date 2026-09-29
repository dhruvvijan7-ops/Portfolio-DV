"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/** Editorial section metadata row: [INDEX] LABEL ─────────── */
export default function SectionLabel({ index, label, className }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4${className ? ` ${className}` : ""}`}
    >
      <span className="text-micro text-[var(--accent)]">{index}</span>
      <span className="text-eyebrow  text-[var(--fg)]">{label}</span>
      <span className="hairline-t h-px flex-1" aria-hidden="true" />
    </div>
  );
}