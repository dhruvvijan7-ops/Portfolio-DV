export const INTRO_DONE = "dhruv:intro-done";

/** Dispatched by the Loader once the entry sequence has finished. */
export function announceIntroDone(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(INTRO_DONE));
}

export interface IntroListener {
  (): void;
}

/** Subscribe to intro completion. Returns an unsubscribe function. */
export function onIntroDone(fn: IntroListener): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(INTRO_DONE, fn as EventListener);
  return () => window.removeEventListener(INTRO_DONE, fn as EventListener);
}