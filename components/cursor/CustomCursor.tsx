"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations";
import { useCustomCursorAllowed } from "@/lib/utils";

type Mode = "default" | "link" | "view" | "arrow";

const LABELS: Record<Mode, string> = {
  default: "",
  link: "",
  view: "VIEW",
  arrow: "→",
};

const SCALE: Record<Mode, number> = {
  default: 1,
  link: 1.35,
  view: 2.7,
  arrow: 1.5,
};

export default function CustomCursor() {
  const allowed = useCustomCursorAllowed();
  const dotMoveRef = useRef<HTMLDivElement>(null);
  const ringMoveRef = useRef<HTMLDivElement>(null);
  const ringScaleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    if (!allowed) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotMoveRef.current;
    const ring = ringMoveRef.current;
    const ringScale = ringScaleRef.current;
    if (!dot || !ring || !ringScale) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const setRingScale = (scale: number) => {
      gsap.to(ringScale, {
        scale,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
    };

    const onOver = (e: PointerEvent) => {
      const targetEl = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      const next: Mode =
        (targetEl?.getAttribute("data-cursor") as Mode | null) ?? "default";
      setMode(next);
      setRingScale(next === "default" ? 1 : SCALE[next]);
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [allowed]);

  useEffect(() => {
    if (labelRef.current) labelRef.current.textContent = LABELS[mode];
  }, [mode]);

  if (!allowed) return null;

  return (
    <>
      {/* Dot — motion on the outer layer, centering on the inner. */}
      <div ref={dotMoveRef} data-qa="dot" aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[99] opacity-0 mix-blend-difference">
        <div className="h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper" />
      </div>
      {/* Ring — three layers so GSAP transforms never fight Tailwind's translate utilities. */}
      <div ref={ringMoveRef} data-qa="ring" aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[99] opacity-0">
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div
            ref={ringScaleRef}
            data-qa="ring-scale"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/40 bg-ink/40 backdrop-blur-[2px]"
          >
            <span
              ref={labelRef}
              data-qa="label"
              className="font-mono text-[9px] font-medium tracking-[0.24em] text-paper"
            />
          </div>
        </div>
      </div>
    </>
  );
}