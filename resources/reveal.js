// Scroll/entrance reveal animations. Dependency-free and gated behind
// prefers-reduced-motion — if the user prefers reduced motion, nothing is
// hidden or animated. Included on the home page (for the work grid) and on
// project pages (for the scrolling case-study blocks).

(function () {
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Re-triggerable staggered entrance for the work grid — called by work.js
  // each time the Work view opens. No-op under reduced motion.
  window.armWorkReveal = function () {
    var grid = document.getElementById('allWorkContainer');
    if (!grid || reduce) return;
    grid.classList.remove('work-reveal');
    void grid.offsetWidth; // force reflow so the animation restarts
    grid.classList.add('work-reveal');
  };

  if (reduce || !('IntersectionObserver' in window)) return;

  // ---- Project pages: reveal case-study blocks as they scroll into view ----
  var projectRoot = document.getElementById('fullProjectContainer');
  if (!projectRoot) return;

  var blocks = projectRoot.querySelectorAll('.projectText, .workContainer');
  if (!blocks.length) return;

  // The project page scrolls inside its own container (.projectPage /
  // #project, overflow:scroll) rather than the window, so the observer must be
  // rooted there to detect blocks entering the visible area.
  var scrollRoot = projectRoot.closest('.projectPage');

  blocks.forEach(function (el) { el.classList.add('reveal'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('reveal--in');
        io.unobserve(e.target);
      }
    });
  }, { root: scrollRoot, threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  blocks.forEach(function (el) { io.observe(el); });
})();
