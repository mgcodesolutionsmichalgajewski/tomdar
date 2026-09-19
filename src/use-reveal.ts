import { useEffect, useRef } from "react";

/** One-time entrance animations matching the portfolio project. */
export function useReveal() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = container.querySelectorAll<HTMLElement>(
      ".hero-copy > *, .hero-visual, .about-picture, .about-copy > *, " +
        ".section > .container > .section-label, .section-heading, " +
        ".service-card, .product-card, .advice-section > div, " +
        ".partners-section > div, .contact-inner > *",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    function revealAll() {
      if (!preference.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.add("is-visible"));
    }

    elements.forEach((element) => {
      element.classList.add("reveal");
      if (preference.matches) element.classList.add("is-visible");
      else observer.observe(element);
    });
    // Keyboard navigation must never land on visually hidden content.
    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest(".reveal");
      if (element) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }
    preference.addEventListener("change", revealAll);
    container.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealAll);
      container.removeEventListener("focusin", revealFocused);
      elements.forEach((element) => element.classList.remove("reveal", "is-visible"));
    };
  }, []);

  return root;
}
