"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/animations";
import { onIntroDone } from "@/lib/intro";
import SystemNetwork from "@/components/hero/SystemNetwork";

const BLOCK_A = ["BUILDING", "INTELLIGENT", "SYSTEMS."];
const BLOCK_B = ["AI", "SECURITY", "SOFTWARE."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockARef = useRef<HTMLDivElement>(null);
  const blockBRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaTopRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const blockA = blockARef.current;
    const blockB = blockBRef.current;
    const network = networkRef.current;
    const content = contentRef.current;
    const metaTop = metaTopRef.current;
    const bottom = bottomRef.current;
    const cue = cueRef.current;
    if (!section || !blockA || !blockB) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Show only the primary statement; the alternate phase never appears.
      gsap.set(blockA, { autoAlpha: 1, y: 0 });
      gsap.set(blockB, { display: "none" });
      gsap.set([metaTop, bottom, cue], { autoAlpha: 1, y: 0 });
      return () => {};
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const words = blockA.querySelectorAll<HTMLElement>("[data-word]");
        const wordsB = blockB.querySelectorAll<HTMLElement>("[data-word]");

        gsap.set(wordsB, { autoAlpha: 0, y: 70 });

        const intro = gsap
          .timeline({ paused: true })
          .from(words, {
            yPercent: 118,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.1,
          })
          .from(metaTop, { autoAlpha: 0, y: 14, duration: 0.7 }, 0.25)
          .from(bottom, { autoAlpha: 0, y: 22, duration: 0.9 }, 0.55)
          .from(cue, { autoAlpha: 0, duration: 0.5 }, 0.8);

        const remove = onIntroDone(() => intro.play());
        const safety = window.setTimeout(() => {
          remove();
          intro.play();
        }, 2600);

        const scrub = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        scrub
          .to(cue, { autoAlpha: 0, duration: 0.5 }, 0.4)
          .to(blockA, { autoAlpha: 0, y: -70, duration: 1.1, ease: "power2.inOut" }, 1.4)
          .fromTo(
            blockB,
            { autoAlpha: 0, y: 70 },
            { autoAlpha: 1, y: 0, duration: 1.1, ease: "power2.inOut" },
            1.4
          )
          .to(content, { yPercent: -8, duration: 4.5, ease: "power1.inOut" }, 0)
          .to(network, { scale: 1.1, autoAlpha: 0.75, duration: 4.5 }, 0);

        return () => {
          remove();
          window.clearTimeout(safety);
        };
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div ref={networkRef} className="absolute inset-0">
          <SystemNetwork />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, transparent 30%, rgba(23,25,20,0.55) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        <div
          ref={contentRef}
          className="relative mx-auto flex h-full max-w-[1920px] flex-col justify-between px-6 pt-24 pb-8 md:px-10 md:pb-10"
        >
          <div ref={metaTopRef} className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-olive" />
              </span>
              <span className="text-micro text-stone">SYSTEM / ONLINE</span>
            </div>
            <span className="text-micro hidden text-stone sm:block">
              AI × CYBERSECURITY × SOFTWARE
            </span>
          </div>

          <div className="relative">
            <h1
              className="text-hero select-none text-paper"
              aria-label="BUILDING INTELLIGENT SYSTEMS"
            >
              <span ref={blockARef} data-qa="blockA" className="block">
                {BLOCK_A.map((w) => (
                  <span key={w} className="block overflow-hidden pb-[0.06em]">
                    <span data-word className="block will-change-transform">
                      {w}
                    </span>
                  </span>
                ))}
              </span>
              <span ref={blockBRef} data-qa="blockB" className="absolute inset-0 block" aria-hidden="true">
                {BLOCK_B.map((w) => (
                  <span key={w} className="block overflow-hidden pb-[0.06em]">
                    <span data-word className="block will-change-transform">
                      {w}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div ref={bottomRef} className="flex items-end justify-between gap-8">
            <p className="text-body max-w-md text-stone">
              I build intelligent digital systems — software engineered with
              security in mind, and systems that reason over data to detect,
              explain, and act.
            </p>

            <div className="hidden flex-col items-end gap-3 md:flex">
              <span className="text-micro text-stone">SCROLL</span>
              <span
                ref={cueRef}
                className="block h-14 w-px origin-top animate-pulse bg-olive/70"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}