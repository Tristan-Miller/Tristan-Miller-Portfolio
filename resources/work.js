// work.js — home-page interactions. Included only by index.html (the project
// pages no longer load it). Element lookups return null when an expected
// element is missing, and all imperative code is guarded by
// `if (showreelContainer)` / per-element checks, so it degrades safely.

// ------------------------------------------------------- home-only state ----
let workPageVis = false;
let aboutPageVis = false;
let vibesPageVis = false;
let reelVis = true;
let initialReelVis = false;

const prefersReducedMotion = window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const workPages = document.getElementsByClassName('workPage');
const movingWorkOne = document.getElementsByClassName('movingWorkOne')[0];
const aboutButton = document.getElementById('aboutButton');
const workContainer = document.getElementsByClassName('workContainer');
const showreelVis = document.getElementById('showreelVis');
const showreelContainer = document.getElementById('showreelContainer');
const showreel = document.getElementById('showreel');
const workButton = document.getElementById('workButton');
const vibesButton = document.getElementById('vibesButton');
const vibesPage = document.getElementById('vibesPage');
const showReelFooter = document.getElementById('showReelFooter');
const canvasContainer = document.getElementById('canvas-container');
const headshotContainer = document.getElementById('headshotContainer');
const ouchSound = document.getElementById('ouchSound');

// Showreel geometry — computed on the home page inside the guard below.
let finalTranslate = 0;
let hideShowReel = 0;

// Bounces the floating showreel bubble around the viewport until it's hovered
// or a full-screen view (work / about / draw) is open.
function initializeMovingDivs(movingDivClass) {
  const movingDivs = document.getElementsByClassName(movingDivClass);
  if (!movingDivs.length) return; // nothing to animate on this page

  let isHovered = false;

  for (const movingDiv of movingDivs) {
    movingDiv.addEventListener('mouseover', () => { isHovered = true; });
    movingDiv.addEventListener('mouseout', () => { isHovered = false; });
    // Pause the bounce while the bubble has keyboard focus, too.
    movingDiv.addEventListener('focus', () => { isHovered = true; });
    movingDiv.addEventListener('blur', () => { isHovered = false; });

    // Reduced motion: park the bubble at a fixed spot instead of bouncing.
    if (prefersReducedMotion) {
      movingDiv.style.left = Math.max(0, (window.innerWidth - movingDiv.offsetWidth) / 2) + 'px';
      movingDiv.style.top = Math.round(window.innerHeight * 0.6) + 'px';
      continue;
    }

    const speed = 1;
    let x = Math.floor(Math.random() * window.innerWidth / 1.8);
    let y = Math.floor(Math.random() * window.innerHeight / 1.8);
    let speedX = speed * (Math.random() > 0.5 ? 1 : -1);
    let speedY = speed * (Math.random() > 0.5 ? 1 : -1);

    (function update() {
      if (!isHovered && !workPageVis && !drawingEnable && !aboutPageVis) {
        const rect = movingDiv.getBoundingClientRect();
        if (x < 0 || x + rect.width > window.innerWidth) speedX = -speedX;
        if (y < 0 || y + rect.height > window.innerHeight) speedY = -speedY;
        x += speedX;
        y += speedY;
        movingDiv.style.left = x + 'px';
        movingDiv.style.top = y + 'px';
      }
      requestAnimationFrame(update);
    })();
  }
}

// Showreel open/close — called from inline handlers and the toggles below.
function closeShowreel() {
  const video = document.getElementById('showreel');
  if (video) video.pause();
  showReelFooter.style.display = 'initial';
  setTimeout(function () { showReelFooter.style.opacity = 0.5; }, 1);
  showreelVis.style.opacity = 0;
  setTimeout(function () { showreelVis.style.zIndex = 1; }, 1000);
  showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
  setTimeout(function () { showreel.style.filter = 'blur(10px)'; }, 250);
  showreelContainer.style.zIndex = 1000;
  reelVis = false;
}

function showReel() {
  if (reelVis === false) {
    showreelContainer.style.zIndex = 1006;
    showreelContainer.style.transform = 'translateY(-50%)' + 'translateX(-50%)';
    showreelVis.style.zIndex = 1004;
    setTimeout(function () { showreelVis.style.opacity = 0.8; }, 1000);
    showreel.style.filter = 'blur(0px)';
    reelVis = true;
  }
}

// Swaps a project card's static preview for its motion GIF on hover/focus.
function swapProjectPreview(card, key) {
  const img = card.querySelector('img[data-static]');
  if (img && img.dataset[key]) img.src = img.dataset[key];
}

// ============================================================ home only ====
if (showreelContainer) {
  const pagetotal = document.body.scrollHeight;      // Total page height
  const containerHeight = showreelContainer.clientHeight;
  const translateYValue = pagetotal - containerHeight;
  finalTranslate = translateYValue / 2.2 + containerHeight / 2.3;
  hideShowReel = translateYValue / 2 + containerHeight / 3 + 150;

  initializeMovingDivs('movingWorkOne');

  // ---- Work view toggle ----
  workButton.addEventListener('click', function () {
    fruitSalad.pause();
    // Change the fill color of each SVG element
    for (let i = 0; i < svgElements.length; i++) {
      svgElements[i].style.fill = textColor;
     }
     for (let i = 0; i < smileysvgElements.length; i++) {
      smileysvgElements[i].style.fill = textColor;
    }
    for (let i = 0; i < introsvgElements.length; i++) {
      introsvgElements[i].style.fill = textColor;
     }
    for (let i = 0; i < aboutPage.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(aboutPage[i]).opacity);
      backgroundColor = "#ffffff";
      textColor = "#000000"
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.color = textColor;
      aboutButton.style.borderColor = textColor;
      funButton.style.backgroundColor = backgroundColor;
      funButton.style.color = textColor;
      funButton.style.borderColor = backgroundColor;
      workButton.style.backgroundColor = backgroundColor;
      workButton.style.color = textColor;
      workButton.style.borderColor = textColor;
      themeContainer.style.backgroundColor = backgroundColor;
      themeContainer.style.color = textColor;
      aboutPageVis = false;
      // Change the fill color of each SVG element
      for (let i = 0; i < svgElements.length; i++) {
        svgElements[i].style.fill = textColor;
      }
      aboutPage[i].style.opacity = 0;
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.color = textColor;
      funButton.style.visibility = "hidden";
      drawingEnable = false;
      brushesHolder.style.transform = 'translateY(0px)';
      aboutPage[i].style.zIndex = 1;
    }
    // Close the Vibes view (theme is already reset to white above).
    vibesPage.style.opacity = 0;
    vibesPage.style.zIndex = 1;
    vibesPageVis = false;
    vibesButton.style.backgroundColor = backgroundColor;
    vibesButton.style.color = textColor;
    vibesButton.style.borderColor = textColor;
    for (let i = 0; i < workPages.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(workPages[i]).opacity);
      if (currentOpacity === 0) {
        workPages[i].style.opacity = 1;
        workButton.style.backgroundColor = textColor;
        workButton.style.color = backgroundColor;
        workPages[i].style.backgroundColor = backgroundColor;
        workPages[i].style.zIndex = 4;
        canvasContainer.style.zIndex = 5;
        brushesHolder.style.zIndex = 6;
        workPageVis = true;
        movingWorkOne.style.transform = 'scale(0)';
        if (typeof armWorkReveal === 'function') armWorkReveal();
        if (initialReelVis == true){
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
        }
        for (let j = 0; j < workContainer.length; j++) {
          workContainer[j].style.top = '0px';
        }
      } else {
        workPages[i].style.opacity = 0;
        funButton.style.visibility = "visible";
        workButton.style.backgroundColor = backgroundColor;
        workButton.style.color = textColor;
        workPages[i].style.zIndex = 1;
        canvasContainer.style.zIndex = 2;
        brushesHolder.style.zIndex = 3;
        brushPanelColor();
        brushes.style.color = textColor;
        funButton.style.borderColor = textColor;
        workPageVis = false;
        movingWorkOne.style.transform = 'scale(1)';
        if (initialReelVis == true){
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
        }
        for (let j = 0; j < workContainer.length; j++) {
          workContainer[j].style.top = '50px';
        }
      }
    }
  });

  // ---- Vibes view toggle (vibe-coded experiments) ----
  vibesButton.addEventListener('click', function () {
    fruitSalad.pause();
    for (let i = 0; i < svgElements.length; i++) {
      svgElements[i].style.fill = textColor;
    }
    for (let i = 0; i < introsvgElements.length; i++) {
      introsvgElements[i].style.fill = textColor;
    }
    // Close About and reset the theme to white (same as the Work toggle).
    for (let i = 0; i < aboutPage.length; i++) {
      backgroundColor = "#ffffff";
      textColor = "#000000";
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.color = textColor;
      aboutButton.style.borderColor = textColor;
      funButton.style.backgroundColor = backgroundColor;
      funButton.style.color = textColor;
      funButton.style.borderColor = backgroundColor;
      themeContainer.style.backgroundColor = backgroundColor;
      themeContainer.style.color = textColor;
      aboutPageVis = false;
      for (let j = 0; j < svgElements.length; j++) {
        svgElements[j].style.fill = textColor;
      }
      for (let j = 0; j < smileysvgElements.length; j++) {
        smileysvgElements[j].style.fill = textColor;
      }
      aboutPage[i].style.opacity = 0;
      aboutPage[i].style.zIndex = 1;
      funButton.style.visibility = "hidden";
      drawingEnable = false;
      brushesHolder.style.transform = 'translateY(0px)';
    }
    // Close the Work view.
    for (let i = 0; i < workPages.length; i++) {
      workPages[i].style.opacity = 0;
      workPages[i].style.zIndex = 1;
    }
    workPageVis = false;
    workButton.style.backgroundColor = backgroundColor;
    workButton.style.color = textColor;
    workButton.style.borderColor = textColor;
    // Toggle Vibes.
    if (!vibesPageVis) {
      vibesPageVis = true;
      vibesPage.style.opacity = 1;
      vibesPage.style.backgroundColor = backgroundColor;
      vibesPage.style.zIndex = 4;
      // Keep the p5 canvas below the Vibes view — there's no drawing mode
      // here, and at z-index 5 it would swallow clicks meant for the CRT.
      canvasContainer.style.zIndex = 0;
      brushesHolder.style.zIndex = 3;
      vibesButton.style.backgroundColor = textColor;
      vibesButton.style.color = backgroundColor;
      vibesButton.style.borderColor = textColor;
      movingWorkOne.style.transform = 'scale(0)';
      if (typeof armVibesReveal === 'function') armVibesReveal();
      if (initialReelVis == true) {
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
      }
    } else {
      vibesPageVis = false;
      vibesPage.style.opacity = 0;
      vibesPage.style.zIndex = 1;
      canvasContainer.style.zIndex = 2;
      brushesHolder.style.zIndex = 3;
      brushPanelColor();
      brushes.style.color = textColor;
      vibesButton.style.backgroundColor = backgroundColor;
      vibesButton.style.color = textColor;
      vibesButton.style.borderColor = textColor;
      funButton.style.visibility = "visible";
      funButton.style.borderColor = textColor;
      movingWorkOne.style.transform = 'scale(1)';
      if (initialReelVis == true) {
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
      }
    }
  });

  // ---- About view toggle ----
  aboutButton.addEventListener('click', function () {
    fruitSalad.pause();
    // Change the fill color of each SVG element
    for (let i = 0; i < svgElements.length; i++) {
      svgElements[i].style.fill = textColor;
     }
     for (let i = 0; i < introsvgElements.length; i++) {
      introsvgElements[i].style.fill = textColor;
     }
    for (let i = 0; i < workPages.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(workPages[i]).opacity);

    workPageVis = false;
    funButton.style.visibility = "hidden";
    drawingEnable = false;
    brushesHolder.style.transform = 'translateY(0px)';
    workPages[i].style.opacity = 0;
    workButton.style.backgroundColor = backgroundColor;
    workButton.style.color = textColor;

    workPages[i].style.zIndex = 1;
    }
    // Close the Vibes view too (its button is repainted with the new theme
    // colours inside the open/close branches below).
    vibesPage.style.opacity = 0;
    vibesPage.style.zIndex = 1;
    vibesPageVis = false;
    for (let i = 0; i < aboutPage.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(aboutPage[i]).opacity);

      if (currentOpacity === 0) {
        aboutPageVis = true;
        aboutPage[i].style.zIndex = 999;
        movingWorkOne.style.transform = 'scale(0)';
        aboutPage[i].style.opacity = 1;
        if (typeof armAboutReveal === 'function') armAboutReveal();
        backgroundColor = "#000000";
        textColor = "#ffffff"
        aboutButton.style.backgroundColor = textColor;
        aboutButton.style.color = backgroundColor;
        aboutButton.style.borderColor = textColor;
        workButton.style.backgroundColor = backgroundColor;
        workButton.style.color = textColor;
        workButton.style.borderColor = textColor;
        vibesButton.style.backgroundColor = backgroundColor;
        vibesButton.style.color = textColor;
        vibesButton.style.borderColor = textColor;
        funButton.style.backgroundColor = backgroundColor;
        funButton.style.color = textColor;
        funButton.style.borderColor = backgroundColor;
        themeContainer.style.backgroundColor = backgroundColor;
        themeContainer.style.color = textColor;
        aboutPage[i].style.backgroundColor = backgroundColor;
        // Change the fill color of each SVG element
        for (let i = 0; i < svgElements.length; i++) {
          svgElements[i].style.fill = textColor;
        }
        for (let i = 0; i < smileysvgElements.length; i++) {
          smileysvgElements[i].style.fill = backgroundColor;
        }
        canvasContainer.style.zIndex = 5;
        brushesHolder.style.zIndex = 7;
        if(initialReelVis == true){
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
        }
        setTimeout(function () {
          headshotContainer.style.opacity = 1;
        }, 200);
      } else {
        headshotContainer.style.opacity = 0;
        setTimeout(function () {
        aboutPageVis = false;
        backgroundColor = "#ffffff";
        textColor = "#000000"
        brushPanelColor();
        brushes.style.color = textColor;
        aboutButton.style.backgroundColor = backgroundColor;
        aboutButton.style.color = textColor;
        aboutButton.style.borderColor = textColor;
        funButton.style.backgroundColor = backgroundColor;
        funButton.style.color = textColor;
        funButton.style.borderColor = textColor;
        workButton.style.backgroundColor = backgroundColor;
        workButton.style.color = textColor;
        workButton.style.borderColor = textColor;
        vibesButton.style.backgroundColor = backgroundColor;
        vibesButton.style.color = textColor;
        vibesButton.style.borderColor = textColor;
        themeContainer.style.backgroundColor = backgroundColor;
        themeContainer.style.color = textColor;
        aboutPage[i].style.backgroundColor = backgroundColor;
        // Change the fill color of each SVG element
        for (let i = 0; i < svgElements.length; i++) {
          svgElements[i].style.fill = textColor;
        }
        for (let i = 0; i < introsvgElements.length; i++) {
          introsvgElements[i].style.fill = textColor;
         }
        movingWorkOne.style.transform = 'scale(1)';
        aboutPage[i].style.opacity = 0;
        aboutButton.style.backgroundColor = backgroundColor;
        aboutButton.style.color = textColor;
        aboutPage[i].style.zIndex = 1;
        canvasContainer.style.zIndex = 2;
        funButton.style.visibility = "visible";
        brushesHolder.style.zIndex = 3;
        if(initialReelVis == true){
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
        }
      }, 100);
      }
    }
  });

  // ---- Project grid: static preview ⇄ motion GIF on hover and keyboard focus.
  // Cards are real <a> links, so navigation is handled by the browser.
  const grid = document.getElementById('allWorkContainer');
  if (grid) {
    grid.querySelectorAll('.projectContainer').forEach(function (card) {
      card.addEventListener('mouseenter', () => swapProjectPreview(card, 'motion'));
      card.addEventListener('mouseleave', () => swapProjectPreview(card, 'static'));
      card.addEventListener('focus', () => swapProjectPreview(card, 'motion'));
      card.addEventListener('blur', () => swapProjectPreview(card, 'static'));
    });
  }

  // ---- Showreel bubble → open the reel ----
  movingWorkOne.addEventListener('click', function () {
    showreelContainer.style.display = 'flex';
    setTimeout(function() {
      showreel.style.filter = 'blur(0px)';
      reelVis = true;
      movingWorkOne.style.transform = 'scale(0)';
      showReelFooter.style.opacity = 0;
      initialReelVis = true;
      showreelContainer.style.zIndex = 1006;
      showreelVis.style.zIndex = 1004;
    }, 10);

    setTimeout(function() {
      showreelContainer.style.transform = 'translateY(-50%)' + 'translateX(-50%)';
    }, 500);

    setTimeout(function() {
      showreelVis.style.opacity = 0.8;
      movingWorkOne.style.display = 'none';
    }, 1000);
  });

  showreelContainer.addEventListener('mouseenter', function() {
    if (reelVis == false){
      showreel.style.filter = 'blur(0px)';
    showreelContainer.style.transform = 'translateY(' + (finalTranslate - 50) + 'px) translateX(-50%)';
    showReelFooter.style.opacity = 0;
    setTimeout(function() {
      showReelFooter.style.display = 'none';
    }, 300);
  }
  });

  showreelContainer.addEventListener('mouseleave', function() {
    if (reelVis == false){
      showreel.style.filter = 'blur(10px)';
        showReelFooter.style.display = 'initial';
        setTimeout(function() {
          showReelFooter.style.opacity = .5;
       }, 1);
    showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
    }
  });

  // Reopen the minimised reel by clicking the video; close it via the backdrop
  // or the Escape key. Escape also closes the Work/About views (reusing the
  // toggle buttons, so the router keeps the URL in sync).
  showreel.addEventListener('click', showReel);
  showreelVis.addEventListener('click', closeShowreel);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (initialReelVis && reelVis) { closeShowreel(); return; }
    if (workPageVis) { workButton.click(); return; }
    if (vibesPageVis) { vibesButton.click(); return; }
    if (aboutPageVis) { aboutButton.click(); }
  });

  window.addEventListener('orientationchange', function() {
    initializeMovingDivs('movingWorkOne');
  });

  // ---- About page: headshot easter egg ----
  // (Social links are now real <a> elements, so they need no JS.)
  if (headshotContainer) {
    headshotContainer.addEventListener('click', function() {
      ouchSound.play();
    });
  }
}
