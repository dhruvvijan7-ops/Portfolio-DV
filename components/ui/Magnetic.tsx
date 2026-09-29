"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
}

/** Subtle physical pull toward the cursor (disabled on touch / reduced motion). */
export default function Magnetic({ children, className, max = 5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist > 140) {
        xTo(0);
        yTo(0);
        return;
      }
      const pull = 1 - dist / 140;
      xTo(dx * pull * 0.22);
      yTo(dy * pull * 0.22);
    };

    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointerenter", () => window.addEventListener("pointermove", onMove));
    el.addEventListener("pointerleave", () => {
      window.removeEventListener("pointermove", onMove);
      leave();
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, [max]);

  return (
    <div ref={ref} className={`inline-block will-change-transform${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}