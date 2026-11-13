import type Lenis from "lenis";

let instance: Lenis | null = null;
let locks = 0;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
  if (lenis && locks > 0) lenis.stop();
};

export const getLenis = () => instance;

/** Scroll halus ke section berdasarkan id (fallback ke native scroll). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: -72, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Kunci / buka scroll halaman. Memakai counter supaya beberapa overlay
 * (preloader, modal, command palette) tidak saling membuka kunci.
 */
export function lockScroll(lock: boolean) {
  locks = lock ? locks + 1 : Math.max(0, locks - 1);
  if (locks > 0) {
    instance?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    instance?.start();
  }
}
