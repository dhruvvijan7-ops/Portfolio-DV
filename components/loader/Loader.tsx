"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/animations";
import { announceIntroDone } from "@/lib/intro";
import { stopSmooth, startSmooth } from "@/lib/smooth";
import { usePrefersReducedMotion } from "@/lib/utils";

const STORAGE_KEY = "dhruv:intro";

export default function Loader() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Play the sequence only on the home page on the first visit of this session.
    if (reduced || pathname !== "/") {
      announceIntroDone();
      setHidden(true);
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        announceIntroDone();
        setHidden(true);
        return;
      }
    } catch {
      /* storage may be unavailable — treat as first visit */
    }

    const root = rootRef.current;
    if (!root) return;

    stopSmooth();
    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    const duration = 500;
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min(t / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      counter.v = Math.round(eased * 100);
      if (numRef.current) {
        numRef.current.textContent = String(counter.v).padStart(3, "0");
      }
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* noop */
      }
      gsap
        .timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            startSmooth();
            announceIntroDone();
            setHidden(true);
          },
        })
        .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduced, pathname]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 md:px-10"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <span className="text-micro text-stone">SYSTEM / INITIALIZING</span>
        <span className="text-micro text-stone">DHRUV / 001</span>
      </div>

      <div className="flex flex-1 items-center">
        <h1 className="text-hero select-none text-paper">DHRUV</h1>
      </div>

      <div className="flex items-end justify-between gap-6">
        <span className="text-eyebrow text-paper">BUILDING INTELLIGENT SYSTEMS</span>
        <span ref={numRef} className="font-mono text-2xl text-paper tabular-nums md:text-4xl">
          000
        </span>
      </div>
      <div className="mt-4 h-px w-full bg-hairline" />
    </div>
  );
}