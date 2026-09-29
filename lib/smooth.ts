import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations";

let lenis: Lenis | null = null;

/** Create the smooth-scroll instance and wire it to GSAP ScrollTrigger. */
export function initSmooth(): void {
  destroySmooth();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function tick(time: number): void {
  lenis?.raf(time * 1000);
}

export function stopSmooth(): void {
  lenis?.stop();
}

export function startSmooth(): void {
  lenis?.start();
}

export function scrollToSmooth(target: string | number, offset = 0): void {
  if (lenis) {
    lenis.scrollTo(target as never, { offset });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : null;
  if (el) el.scrollIntoView({ behavior: "auto" });
  else window.scrollTo({ top: 0 });
}

export function destroySmooth(): void {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
}

export function hasSmooth(): boolean {
  return lenis !== null;
}