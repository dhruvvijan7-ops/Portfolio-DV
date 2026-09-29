"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { gsap } from "@/lib/animations";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

interface WorkRowProps {
  project: Project;
  index: number;
}

/** Large editorial archive row with a cursor-following preview (desktop only). */
export default function WorkRow({ project, index }: WorkRowProps) {
  const rowRef = useRef<HTMLLIElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const preview = previewRef.current;
    if (!row || !preview) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    gsap.set(preview, { autoAlpha: 0, scale: 0.92 });
    let shown = false;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });
    const PAD = 56;

    const onMove = (e: PointerEvent) => {
      const rect = row.getBoundingClientRect();
      const offY = preview.clientHeight / 2;
      xTo(e.clientX - rect.left + PAD);
      yTo(e.clientY - rect.top - offY);
    };

    const onEnter = () => {
      shown = true;
      gsap.to(preview, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.45, ease: "power3.out" });
    };
    const onLeave = () => {
      shown = false;
      gsap.to(preview, { autoAlpha: 0, scale: 0.92, duration: 0.35, ease: "power3.out" });
    };

    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("pointermove", onMove);
    row.addEventListener("pointerleave", onLeave);

    return () => {
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("pointermove", onMove);
      row.removeEventListener("pointerleave", onLeave);
      if (shown) gsap.set(preview, { autoAlpha: 0 });
    };
  }, []);

  return (
    <li ref={rowRef} className="group hairline-t relative">
      {project.status === "PLACEHOLDER" ? (
        <div className="relative grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:items-baseline md:gap-6 md:py-14">
          <span className="text-micro text-olive md:col-span-1 md:pl-4">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-display-xl md:col-span-7">
            {project.title}
            <span className="ml-4 align-middle font-mono text-[10px] tracking-[0.2em] text-stone">
              [TBD]
            </span>
          </span>
          <span className="flex items-center justify-between gap-4 md:col-span-4 md:block">
            <span className="font-mono text-xs tracking-[0.18em] text-stone">
              {project.category}
            </span>
            <span className="text-micro text-stone">[{project.status}]</span>
          </span>
        </div>
      ) : (
        <Link
          href={`/work/${project.slug}`}
          data-cursor="view"
          className="relative grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:items-baseline md:gap-6 md:py-14"
        >
          <span className="text-micro text-olive md:col-span-1 md:pl-4">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-display-xl md:col-span-7 md:transition-transform md:duration-500 md:group-hover:translate-x-3">
            {project.title}
          </span>
          <span className="flex items-center justify-between gap-4 md:col-span-4 md:block">
            <span className="font-mono text-xs tracking-[0.18em] text-stone">
              {project.category}
            </span>
            <span className="text-micro text-stone">[{project.status}]</span>
          </span>
        </Link>
      )}

      <div
        ref={previewRef}
        data-qa="preview"
        className="pointer-events-none absolute left-0 top-0 z-20 hidden opacity-0 md:block"
        aria-hidden="true"
      >
        <ProjectPreview project={project} index={index} />
      </div>
    </li>
  );
}