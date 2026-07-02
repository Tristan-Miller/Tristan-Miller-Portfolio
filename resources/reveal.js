// Scroll/entrance reveal animations. Dependency-free and gated behind
// prefers-reduced-motion — if the user prefers reduced motion, nothing is
// hidden or animated. Included on the home page (for the work grid) and on
// project pages (for the scrolling case-study blocks).

(function () {
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Re-triggerable staggered entrances — called by work.js each time the
  // Work / About view opens. No-op under reduced motion. Removing and
  // re-adding the class (with a reflow between) restarts the animation.
  function arm(el, className) {
    if (!el || reduce) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }

  window.armWorkReveal = function () {
    arm(document.getElementById('allWorkContainer'), 'work-reveal');
  };

  window.armAboutReveal = function () {
    arm(document.getElementById('aboutPageContainer'), 'about-reveal');
  };

  window.armVibesReveal = function () {
    arm(document.getElementById('vibesContainer'), 'vibes-reveal');
  };

  if (reduce || !('IntersectionObserver' in window)) return;

  // ---- Project pages: reveal case-study blocks as they scroll into view ----
  var projectRoot = document.getElementById('fullProjectContainer');
  if (!projectRoot) return;

  var blocks = projectRoot.querySelectorAll('.projectText, .workContainer');
  if (!blocks.length) return;

  // The project page scrolls inside its own container (.projectPage /
  // #project, overflow:auto) rather than the window, so the observer must be
  // rooted there to detect blocks entering the visible area. The prev/next
  // pager sits outside #fullProjectContainer, so it's picked up separately.
  var scrollRoot = projectRoot.closest('.projectPage');
  var pager = scrollRoot ? scrollRoot.querySelector('.projectPager') : null;
  blocks = Array.prototype.slice.call(blocks);
  if (pager) blocks.push(pager);

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
