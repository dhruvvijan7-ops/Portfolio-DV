"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
}

/** Scroll-triggered reveal. Content stays fully visible without JS or reduced motion. */
export default function Reveal({ children, className, y = 28, delay = 0, duration = 0.9 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { autoAlpha: 0, y });
    const tween = gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}