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

  // ---- Video playback management --------------------------------------------
  // Project case-study videos are autoplay+loop by default.
  var autoVideos = document.querySelectorAll('video[autoplay]');
  if (autoVideos.length) {
    if (reduce) {
      // Reduced motion: pause, drop the loop, expose controls so each video
      // rests on its first frame and only plays on demand.
      autoVideos.forEach(function (v) {
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
    } else if ('IntersectionObserver' in window) {
      // Only play auto-playing videos while they're on screen, so several large
      // project videos don't all decode at once off-screen.
      autoVideos.forEach(function (v) { v.removeAttribute('autoplay'); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var p = e.target.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            e.target.pause();
          }
        });
      }, { threshold: 0.2 });
      autoVideos.forEach(function (v) { io.observe(v); });
    }
  }
})();
