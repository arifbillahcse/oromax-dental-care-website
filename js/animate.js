/* ============================================================
   animate.js
   Scroll-triggered animations using IntersectionObserver.
   Works automatically on every page — no per-page setup needed.

   Elements get .animate (single) or .animate-stagger (grid/list)
   added on DOMContentLoaded. Once they scroll into view the class
   .is-visible is added, triggering the CSS transition.
   ============================================================ */
(function () {
  "use strict";

  // Elements whose parent containers should stagger-animate children.
  var STAGGER_SELECTORS = [
    ".feature-grid",
    ".service-grid",
    ".service-list",
    ".team-grid",
    ".gallery-grid",
    ".mv-grid",
  ].join(", ");

  // Elements that slide in individually.
  var SINGLE_SELECTORS = [
    ".hero-content",
    ".hero-stats",
    ".section-head",
    ".split-body",
    ".split-media",
    ".form-info",
    ".form-card",
    ".map-embed",
    ".page-banner h1",
    ".page-banner p",
  ].join(", ");

  function setup() {
    // Skip on browsers without IntersectionObserver (very old).
    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Stagger grids
    document.querySelectorAll(STAGGER_SELECTORS).forEach(function (el) {
      el.classList.add("animate-stagger");
      observer.observe(el);
    });

    // Single elements (split-body slides from left, split-media from right)
    document.querySelectorAll(SINGLE_SELECTORS).forEach(function (el) {
      el.classList.add("animate");
      if (el.classList.contains("split-body")) el.classList.add("from-left");
      if (el.classList.contains("split-media")) el.classList.add("from-right");
      observer.observe(el);
    });
  }

  // Run after partials are injected so the header/footer elements are present.
  document.addEventListener("includes:loaded", setup);
  // Also run immediately for elements already in the static markup.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
