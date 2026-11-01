// Small progressive enhancements. The page is complete without JS.
(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Illustrative 15x15 indicator image (deterministic pseudo-data, not real results).
  var matrix = document.getElementById("indicator-matrix");
  if (matrix) {
    var seed = 7;
    var rand = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    var frag = document.createDocumentFragment();
    for (var r = 0; r < 15; r++) {
      var phase = rand() * Math.PI * 2;
      for (var c = 0; c < 15; c++) {
        // smooth across look-back periods, varied across indicators
        var v = 0.5 + 0.38 * Math.sin(phase + c * (0.25 + r * 0.02)) + (rand() - 0.5) * 0.18;
        v = Math.max(0.04, Math.min(1, v));
        var cell = document.createElement("i");
        cell.style.background = "color-mix(in oklab, var(--accent) " + Math.round(v * 100) + "%, var(--surface))";
        frag.appendChild(cell);
      }
    }
    matrix.appendChild(frag);
    matrix.classList.add("filled");
  }

  // Copy email button (only shown when the Clipboard API exists)
  var btn = document.querySelector(".copy-btn");
  var status = document.querySelector(".copy-status");
  if (btn && navigator.clipboard && window.isSecureContext) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
        status.textContent = "Copied";
        setTimeout(function () { status.textContent = ""; }, 2000);
      }, function () {
        status.textContent = "Copy failed. Select the address instead.";
      });
    });
  }

  // Mark the nav link for the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id === "credentials" ? "skills" : e.target.id;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        if (byId[id]) byId[id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
