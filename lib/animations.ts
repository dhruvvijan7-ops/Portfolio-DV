import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** registerScrollTrigger once per module — safe to call repeatedly. */
export function initGSAP(): void {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = {
  out: "power4.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export const DUR = {
  fast: 0.5,
  med: 0.8,
  slow: 1.2,
} as const;

/** Default reduced-motion aware guard. */
export function motionOK(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}