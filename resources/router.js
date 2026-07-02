// Lightweight hash routing for the home page's three views (home / work /
// about). Layered on top of the existing nav-button toggle handlers so the
// transitions are unchanged — this just keeps the URL in sync and makes the
// views deep-linkable with working Back/Forward.
//
//   (no hash)   -> home
//   #work       -> work view
//   #about      -> about view
//
// Because the work grid links are real <a>s, opening Work (#work) then a
// project and pressing Back now returns you to the work view instead of home.

(function () {
  var workBtn = document.getElementById('workButton');
  var aboutBtn = document.getElementById('aboutButton');
  var vibesBtn = document.getElementById('vibesButton');
  if (!workBtn || !aboutBtn || !vibesBtn) return; // home page only

  var syncing = false;   // true while we drive the UI from the URL (not the user)
  var syncTimer = null;

  function currentView() {
    if (typeof aboutPageVis !== 'undefined' && aboutPageVis) return 'about';
    if (typeof workPageVis !== 'undefined' && workPageVis) return 'work';
    if (typeof vibesPageVis !== 'undefined' && vibesPageVis) return 'vibes';
    return 'home';
  }

  function viewFromHash() {
    var h = (location.hash || '').replace(/^#/, '').toLowerCase();
    return (h === 'work' || h === 'about' || h === 'vibes') ? h : 'home';
  }

  // Drive the UI to `target` by reusing the toggle buttons. Each opening button
  // already force-closes the other view, so a single click always suffices.
  function applyView(target) {
    var cur = currentView();
    if (cur === target) return;
    if (target === 'work') workBtn.click();
    else if (target === 'about') aboutBtn.click();
    else if (target === 'vibes') vibesBtn.click();
    else if (cur === 'work') workBtn.click();      // -> home
    else if (cur === 'about') aboutBtn.click();     // -> home
    else if (cur === 'vibes') vibesBtn.click();     // -> home
  }

  // After a real user click, reflect the resulting view in the URL. Delayed so
  // the About-close animation (which flips aboutPageVis after ~100ms) settles.
  function scheduleHashSync() {
    if (syncing) return;
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      var view = currentView();
      if (view !== 'home') {
        var want = '#' + view;
        if (location.hash !== want) history.pushState(null, '', want);
      } else if (location.hash) {
        history.pushState(null, '', location.pathname + location.search);
      }
    }, 260);
  }

  workBtn.addEventListener('click', scheduleHashSync);
  aboutBtn.addEventListener('click', scheduleHashSync);
  vibesBtn.addEventListener('click', scheduleHashSync);

  function route() {
    syncing = true;
    applyView(viewFromHash());
    syncing = false;
  }

  // Back/Forward, and manual edits to the hash in the address bar.
  window.addEventListener('popstate', route);
  window.addEventListener('hashchange', route);

  // Apply any incoming deep link once the base colours/state are initialised
  // (colour.js sets those on DOMContentLoaded, before this listener runs).
  document.addEventListener('DOMContentLoaded', function () {
    if (viewFromHash() !== 'home') route();
  });
})();
