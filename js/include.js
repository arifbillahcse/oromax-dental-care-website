/* ============================================================
   include.js
   Loads shared HTML partials (header / footer) into any page
   that has an element with a [data-include] attribute.

   Usage in a page:
     <div data-include="partials/header.html"></div>
     <div data-include="partials/footer.html"></div>

   NOTE: Because this uses fetch(), pages must be viewed through
   a local/web server (e.g. `python3 -m http.server`), not via
   the file:// protocol.
   ============================================================ */
(function () {
  "use strict";

  async function loadIncludes() {
    const nodes = document.querySelectorAll("[data-include]");

    await Promise.all(
      Array.from(nodes).map(async (el) => {
        const url = el.getAttribute("data-include");
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          el.innerHTML = await res.text();
        } catch (err) {
          console.error(`Failed to load include "${url}":`, err);
        }
      })
    );

    // Tell the rest of the app the partials are in the DOM.
    document.dispatchEvent(new CustomEvent("includes:loaded"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
