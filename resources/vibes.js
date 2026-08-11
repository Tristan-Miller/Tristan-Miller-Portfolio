// Vibes CRT: each launcher button runs its app in a window on the screen
// (an iframe behind a terminal-style title bar).
(function () {
  var win = document.getElementById('crtWindow');
  if (!win) return; // home page only

  var frame = document.getElementById('crtWindowFrame');
  var viewport = document.getElementById('crtWindowViewport');
  var title = document.getElementById('crtWindowTitle');
  var closeBtn = document.getElementById('crtWindowClose');
  var fullBtn = document.getElementById('crtWindowFull');
  var cursor = document.getElementById('custom-cursor');

  // Where #crtWindow normally lives, so fullscreen can put it back exactly
  // where it was.
  var screenParent = win.parentNode;

  // Embedded apps need a real desktop-width viewport, or they render their
  // mobile layout inside the CRT's small box. The iframe is fixed at
  // DESKTOP_WIDTH and scaled down with a transform: that keeps the app's
  // own layout viewport wide (desktop breakpoints kick in) while the
  // rendered output is shrunk to exactly fill the visible area.
  var DESKTOP_WIDTH = 1440;

  function fitFrame() {
    var rect = viewport.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var scale = rect.width / DESKTOP_WIDTH;
    frame.style.width = DESKTOP_WIDTH + 'px';
    frame.style.height = (rect.height / scale) + 'px';
    frame.style.transform = 'scale(' + scale + ')';
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(fitFrame).observe(viewport);
  } else {
    window.addEventListener('resize', fitFrame);
  }

  function setFullscreen(on) {
    win.classList.toggle('fullscreen', on);
    fullBtn.textContent = on ? 'WINDOWED' : 'FULLSCREEN';
    // Move the window itself out of the CRT's nested overflow:hidden/auto
    // ancestors instead of relying on position:fixed to escape them. Safari
    // clips fixed-position descendants of overflow:hidden ancestors (a
    // long-standing WebKit bug that Chrome doesn't have), so fullscreen
    // rendered as a fixed box while still nested inside #crtScreen /
    // #vibesContainer stayed trapped there in Safari. Moving the same DOM
    // node (not recreating it) to <body> and back doesn't reload the iframe.
    if (on) {
      document.body.appendChild(win);
    } else if (win.parentNode !== screenParent) {
      screenParent.appendChild(win);
    }
    fitFrame();
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
      fitFrame();
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
