"use client";

import { useEffect } from "react";
import { initSmooth, destroySmooth } from "@/lib/smooth";
import { INTRO_DONE } from "@/lib/intro";
import { usePrefersReducedMotion } from "@/lib/utils";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    initSmooth();

    const finish = () => {
      // Body scroll lock is handled by the Loader itself.
    };
    window.addEventListener(INTRO_DONE, finish);
    return () => {
      window.removeEventListener(INTRO_DONE, finish);
      destroySmooth();
    };
  }, [reduced]);

  return <>{children}</>;
}