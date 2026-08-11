// Image Templates page. Renders the template library from templates.json
// (curated order baked in), shows each template's reference images in a row
// pinned to the cursor on hover, opens a lightbox (full preview + references
// + prompt) on click, and cycles the hero strip through the whole library.
(function () {
  var grid = document.getElementById('templateGrid');
  if (!grid) return; // Image Templates page only

  var BASE = 'resources/Images/ImageTemplates/grid/';
  var hoverable = window.matchMedia('(hover: hover)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // One shared cursor-follower, appended to <body> so no ancestor's
  // overflow clipping can trap it inside a tile.
  var follower = document.createElement('div');
  follower.className = 'tRefFollower';
  follower.setAttribute('aria-hidden', 'true');
  document.body.appendChild(follower);

  function positionFollower(e) {
    var w = follower.offsetWidth, h = follower.offsetHeight;
    var x = e.clientX + 18, y = e.clientY - h - 14;
    // Keep the row on screen: flip below the cursor near the top edge,
    // pull left near the right edge.
    if (x + w > window.innerWidth - 8) x = window.innerWidth - w - 8;
    if (y < 8) y = e.clientY + 22;
    follower.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  }

  function showRefs(t, e) {
    follower.innerHTML = t.refs.map(function (r) {
      return '<img src="' + BASE + t.dir + '/ref_' + r.file + '.jpg" alt="">';
    }).join('');
    positionFollower(e);
    // Two frames so the entrance transition plays after layout.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { follower.classList.add('show'); });
    });
  }

  function hideRefs() {
    follower.classList.remove('show');
  }

  // ---- Lightbox ----
  var lightbox = null;

  function closeLightbox() {
    if (lightbox) { lightbox.remove(); lightbox = null; }
  }

  function openLightbox(t) {
    closeLightbox();
    hideRefs();
    lightbox = document.createElement('div');
    lightbox.className = 'tLightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', t.name + ' template');
    var refsHtml = t.refs.map(function (r) {
      return '<figure><img src="' + BASE + t.dir + '/ref_' + r.file + '.jpg" alt="' +
        r.label + ' reference"><figcaption>' + r.label + '</figcaption></figure>';
    }).join('');
    lightbox.innerHTML =
      '<button class="tLbClose" type="button" aria-label="Close template view">✕ Exit</button>' +
      '<div class="tLbInner">' +
      '  <img class="tLbPreview" src="' + BASE + t.dir + '/preview.jpg" alt="' + t.name + ' generated image">' +
      '  <div class="tLbSide">' +
      '    <p class="tLbName">' + t.name + '</p>' +
      '    <p class="tLbMeta">' + t.refs.length + (t.refs.length === 1 ? ' reference · ' : ' references · ') + t.engine + '</p>' +
      '    <div class="tLbRefs">' + refsHtml + '</div>' +
      '    <p class="tLbPrompt">' + t.prompt + '</p>' +
      '  </div>' +
      '</div>';
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('tLbClose')) closeLightbox();
    });
    document.body.appendChild(lightbox);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---- Scroll-in animation: tiles fade up as they enter the viewport, with
  // a small organic stagger. Skipped under reduced motion. ----
  var tileObserver = null;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    tileObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('tIn');
          tileObserver.unobserve(e.target);
          // Drop the stagger delay once revealed so later interactions
          // respond instantly.
          setTimeout(function () { e.target.style.transitionDelay = ''; }, 900);
        }
      });
    }, { root: document.querySelector('.projectPage'), rootMargin: '0px 0px -5% 0px' });
  }

  // ---- Hero strip: each of the four frames cycles through the whole
  // library, one slot at a time, with a soft crossfade. ----
  function startHeroCycle(templates) {
    var slots = document.querySelectorAll('.templateHeroStrip img');
    if (reduceMotion || !slots.length || templates.length <= slots.length) return;
    var next = slots.length; // the strip starts on templates 0-3
    var slot = 0;
    setInterval(function () {
      var img = slots[slot];
      var t = templates[next % templates.length];
      next++;
      slot = (slot + 1) % slots.length;
      var pre = new Image();
      pre.onload = function () {
        img.style.opacity = '0';
        setTimeout(function () {
          img.src = pre.src;
          img.style.opacity = '1';
        }, 450);
      };
      pre.src = BASE + t.dir + '/preview.jpg';
    }, 2800);
  }

  // ---- Grid ----
  fetch('resources/Images/ImageTemplates/templates.json')
    .then(function (r) { return r.json(); })
    .then(function (templates) {
      var frag = document.createDocumentFragment();
      templates.forEach(function (t, i) {
        var tile = document.createElement('div');
        tile.className = 'tGridItem';
        tile.setAttribute('role', 'button');
        tile.setAttribute('tabindex', '0');
        tile.setAttribute('aria-label', 'Open ' + t.name + ' template');
        if (tileObserver) {
          tile.classList.add('tAnim');
          tile.style.transitionDelay = (i * 37) % 130 + 'ms';
          tileObserver.observe(tile);
        }
        var img = document.createElement('img');
        img.className = 'tGridPreview';
        img.loading = 'lazy';
        img.src = BASE + t.dir + '/preview.jpg';
        img.alt = t.name + ' template preview';
        img.draggable = false;
        tile.appendChild(img);
        if (hoverable) {
          tile.addEventListener('pointerenter', function (e) { showRefs(t, e); });
          tile.addEventListener('pointermove', positionFollower);
          tile.addEventListener('pointerleave', hideRefs);
        }
        tile.addEventListener('click', function () { openLightbox(t); });
        tile.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(t); }
        });
        frag.appendChild(tile);
      });
      grid.appendChild(frag);
      startHeroCycle(templates);
    });
})();
