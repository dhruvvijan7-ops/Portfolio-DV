"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { sentinelPipeline } from "@/data/projects";

/**
 * Scroll-pinned "system understood" sequence for the Sentinel case study.
 * A vertical pipeline builds itself as the user scrolls.
 */
export default function SentinelScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    const list = listRef.current;
    const summary = summaryRef.current;
    if (!section || !line || !dot || !list || !summary) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(stageRefs.current, { autoAlpha: 1, color: "rgba(167,168,156,1)" });
      gsap.set(line, { scaleY: 1 });
      gsap.set(summary, { autoAlpha: 1 });
      return () => {};
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 8, ease: "none" }, 0)
          .to(dot, { y: () => list.offsetHeight - dot.offsetHeight, duration: 8, ease: "none" }, 0)
          .to(summary, { autoAlpha: 1, duration: 1 }, 7.2);

        stageRefs.current.forEach((stage, i) => {
          if (!stage) return;
          const label = stage.querySelector("[data-stage-label]");
          const num = stage.querySelector("[data-stage-num]");
          const t = 0.25 + i * 1.25;
          tl.to(stage, { autoAlpha: 1, duration: 0.4, ease: "power2.in" }, t)
            .fromTo(label, { y: 26 }, { y: 0, duration: 0.5, ease: "power3.out" }, t)
            .fromTo(num, { color: "rgba(111,124,92,0.25)" }, { color: "rgba(111,124,92,1)", duration: 0.3 }, t);
        });

        gsap.set(stageRefs.current, { autoAlpha: 0 });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[360vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="text-micro text-stone md:col-span-2">
            SYSTEM / SCHEMATIC
            <br />
            CONCEPTUAL — NOT LIVE DATA
          </div>

          <div className="relative md:col-span-6">
            <div
              ref={lineRef}
              className="absolute left-[7px] top-0 h-full w-px origin-top bg-hairline"
              aria-hidden="true"
            />
            <div
              ref={dotRef}
              className="absolute left-0 top-0 h-[15px] w-[15px] origin-top scale-75 rounded-full border border-olive bg-olive/40"
              aria-hidden="true"
            />
            <ol ref={listRef} className="relative flex flex-col justify-between" style={{ height: "72vh" }}>
              {sentinelPipeline.map((step, i) => (
                <li
                  key={step.id}
                  data-scroll-stage
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  className="flex items-baseline gap-6"
                >
                  <span data-stage-num className="text-micro w-6 text-olive/25">
                    {step.id}
                  </span>
                  <span data-stage-label className="text-display block">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-end md:col-span-4">
            <p
              ref={summaryRef}
              className="text-body max-w-sm text-stone opacity-0"
            >
              The entire security loop, compressible into a single sentence:
              <em className="text-paper not-italic"> look, listen, and explain what moved.</em>{" "}
              Each stage is one responsibility. One input. One output.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}