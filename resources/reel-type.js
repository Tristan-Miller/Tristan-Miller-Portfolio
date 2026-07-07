// SHOWREEL callout on the floating bubble: types the word on letter by
// letter, holds, then retypes every few seconds. Also flips the tag to the
// other side of the bubble when it drifts near a viewport edge.
(function () {
  var bubble = document.getElementById('movingWork');
  var callout = bubble && bubble.querySelector('.reel-callout');
  var textEl = bubble && bubble.querySelector('.reel-callout-text');
  if (!bubble || !callout || !textEl) return; // home page only

  var WORD = 'SHOWREEL';
  var TYPE_SPEED = 90;   // ms per letter
  var HOLD = 3800;       // ms the full word stays before retyping

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textEl.textContent = WORD;
  } else {
    var i = 0;
    (function type() {
      textEl.textContent = WORD.slice(0, i);
      if (i < WORD.length) {
        i++;
        setTimeout(type, TYPE_SPEED);
      } else {
        i = 0;
        setTimeout(type, HOLD);
      }
    })();
  }

  // Keep the tag on-screen: flip it when the bubble nears an edge. The label
  // extends ~120px sideways and ~40px up from the bubble's corner.
  setInterval(function () {
    var r = bubble.getBoundingClientRect();
    callout.classList.toggle('flip-x', r.right + 130 > window.innerWidth);
    callout.classList.toggle('flip-y', r.top < 50);
  }, 300);
})();
