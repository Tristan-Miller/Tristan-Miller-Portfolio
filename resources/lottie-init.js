// Initialises the Lottie (bodymovin) animations for whichever page loaded this
// script. Safe to include on every page: each animation only loads if its
// container is present, and the whole thing no-ops if the bodymovin library
// failed to load. This replaces the per-page inline <script> blocks.

(function () {
  if (typeof bodymovin === 'undefined') return;

  function load(id, path) {
    var container = document.getElementById(id);
    if (!container) return;
    bodymovin.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: path
    });
  }

  // Header logo — home uses #animation-container, project pages use
  // #animation-container-project. Only the one that exists is loaded.
  load('animation-container', 'TM_Logo_Animation.json');
  load('animation-container-project', 'TM_Logo_Animation.json');

  // Smiley inside the Fun button (home only).
  load('smiley-animation-container', 'Smiley_Animation.json');

  // Intro / welcome animation (home only). Slightly delayed so it doesn't
  // compete with first paint.
  if (document.getElementById('intro-animation-container')) {
    window.setTimeout(function () {
      load('intro-animation-container', 'TM_Intro_Animation.json');
    }, 2000);
  }
})();
