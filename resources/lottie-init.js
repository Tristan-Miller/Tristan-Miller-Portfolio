// Page load init: Lottie (bodymovin) animations + a "reduced motion" pass over
// looping media. Safe to include on every page — each piece only acts on
// elements that exist, and it no-ops if bodymovin is unavailable.

(function () {
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Lottie animations ----------------------------------------------------
  // With reduced motion we don't autoplay or loop; instead we jump to the final
  // frame so the composed logo/graphic still shows, just without the animation.
  if (typeof bodymovin !== 'undefined') {
    function load(id, path) {
      var container = document.getElementById(id);
      if (!container) return;
      var anim = bodymovin.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: !reduce,
        autoplay: !reduce,
        path: path
      });
      if (reduce) {
        anim.addEventListener('DOMLoaded', function () {
          anim.goToAndStop(Math.max(0, anim.totalFrames - 1), true);
        });
      }
      return anim;
    }

    // Header logo — home uses #animation-container, project pages use
    // #animation-container-project. Only the one that exists is loaded.
    load('animation-container', 'TM_Logo_Animation.json');
    load('animation-container-project', 'TM_Logo_Animation.json');

    // Smiley inside the Fun button (home only).
    load('smiley-animation-container', 'Smiley_Animation.json');

    // Intro / welcome animation (home only). Slightly delayed so it doesn't
    // compete with first paint; skipped entirely under reduced motion.
    if (!reduce && document.getElementById('intro-animation-container')) {
      window.setTimeout(function () {
        load('intro-animation-container', 'TM_Intro_Animation.json');
      }, 2000);
    } else {
      load('intro-animation-container', 'TM_Intro_Animation.json');
    }
  }

  // ---- Reduced motion: calm the looping/auto-playing videos ------------------
  // Project case-study videos are autoplay+loop by default. When the user asks
  // for reduced motion, pause them and drop the loop so they sit on the first
  // frame with controls available to play on demand.
  if (reduce) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.loop = false;
      v.autoplay = false;
      if (!v.hasAttribute('controls')) v.setAttribute('controls', '');
      var stop = function () { v.pause(); v.currentTime = 0; };
      stop();
      // Some browsers begin playback before JS runs; catch that too.
      v.addEventListener('play', function once() {
        stop();
        v.removeEventListener('play', once);
      });
    });
  }
})();
