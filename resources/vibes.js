// Vibes CRT: each launcher button runs its app in a window on the screen
// (an iframe behind a terminal-style title bar).
(function () {
  var win = document.getElementById('crtWindow');
  if (!win) return; // home page only

  var frame = document.getElementById('crtWindowFrame');
  var title = document.getElementById('crtWindowTitle');
  var closeBtn = document.getElementById('crtWindowClose');
  var fullBtn = document.getElementById('crtWindowFull');
  var cursor = document.getElementById('custom-cursor');

  var vibesPage = document.getElementById('vibesPage');

  function setFullscreen(on) {
    win.classList.toggle('fullscreen', on);
    fullBtn.textContent = on ? 'WINDOWED' : 'FULLSCREEN';
    // The window can't escape the Vibes layer's stacking context, so lift
    // the whole layer above the site header (z 1000) while fullscreen.
    vibesPage.style.zIndex = on ? 9000 : 4;
  }

  document.querySelectorAll('.crtAppButton').forEach(function (btn) {
    if (!btn.dataset.appSrc) {
      // No live URL yet — the launcher stays dimmed and inert.
      var run = btn.querySelector('.crtAppRun');
      if (run) run.textContent = 'COMING SOON';
      return;
    }
    btn.addEventListener('click', function () {
      title.textContent = btn.dataset.appTitle || 'APP.EXE';
      frame.src = btn.dataset.appSrc;
      win.hidden = false;
      closeBtn.focus();
    });
  });

  function closeWindow() {
    win.hidden = true;
    frame.src = 'about:blank'; // stop the app when the window closes
    setFullscreen(false);
  }

  closeBtn.addEventListener('click', closeWindow);
  fullBtn.addEventListener('click', function () {
    setFullscreen(!win.classList.contains('fullscreen'));
  });
  // Escape steps down: fullscreen -> windowed -> closed.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || win.hidden) return;
    if (win.classList.contains('fullscreen')) setFullscreen(false);
    else closeWindow();
  });

  // The site's custom cursor can't track inside the iframe (mouse events stay
  // in the app), so hide it there and let the app's native cursor take over.
  frame.addEventListener('mouseenter', function () {
    cursor.classList.add('cursor-hidden');
  });
  frame.addEventListener('mouseleave', function () {
    cursor.classList.remove('cursor-hidden');
  });
})();
