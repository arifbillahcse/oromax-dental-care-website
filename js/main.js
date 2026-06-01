/* ============================================================
   main.js
   Site-wide interactivity. Runs AFTER the header/footer partials
   are injected (see include.js -> "includes:loaded" event).
   ============================================================ */
(function () {
  "use strict";

  function init() {
    setupMobileNav();
    setupFaq();
    highlightActiveLink();
    setFooterYear();
    setupHeaderScroll();
  }

  /* Mobile hamburger menu */
  function setupMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is clicked (mobile)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Highlight the nav link for the current page */
  function highlightActiveLink() {
    const page = document.body.getAttribute("data-page");
    if (!page) return;
    const link = document.querySelector(`[data-nav="${page}"]`);
    if (link) link.classList.add("is-active");
  }

  /* Auto-update the year in the footer */
  function setFooterYear() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = new Date().getFullYear().toLocaleString("bn-BD", { useGrouping: false });
  }

  /* Add a shadow/solid background to the header on scroll */
  function setupHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* FAQ accordion */
  function setupFaq() {
    document.querySelectorAll(".faq-question").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.contains("is-open");
        // Close all open items first
        document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
          open.classList.remove("is-open");
          open.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // Wait for partials to be loaded before wiring up the UI.
  document.addEventListener("includes:loaded", init);
})();
