import { useEffect, useState } from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** True when the OS tells us to reduce motion (checked on the client). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Pointer-fine + no reduced-motion → custom cursor allowed. */
export function useCustomCursorAllowed(): boolean {
  const reduced = usePrefersReducedMotion();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (reduced) return setAllowed(false);
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setAllowed(fine.matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, [reduced]);
  return allowed;
}