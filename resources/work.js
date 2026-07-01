// work.js — home-page interactions. Included only by index.html (the project
// pages no longer load it). Element lookups return null when an expected
// element is missing, and all imperative code is guarded by
// `if (showreelContainer)` / per-element checks, so it degrades safely.

// ------------------------------------------------------- home-only state ----
let workPageVis = false;
let aboutPageVis = false;
let reelVis = true;
let initialReelVis = false;

const workPages = document.getElementsByClassName('workPage');
const movingWorkOne = document.getElementsByClassName('movingWorkOne')[0];
const aboutButton = document.getElementById('aboutButton');
const workContainer = document.getElementsByClassName('workContainer');
const showreelVis = document.getElementById('showreelVis');
const showreelContainer = document.getElementById('showreelContainer');
const showreel = document.getElementById('showreel');
const workButton = document.getElementById('workButton');
const showReelFooter = document.getElementById('showReelFooter');
const canvasContainer = document.getElementById('canvas-container');
const headshotContainer = document.getElementById('headshotContainer');
const ouchSound = document.getElementById('ouchSound');

// Showreel geometry — computed on the home page inside the guard below.
let finalTranslate = 0;
let hideShowReel = 0;

// Bounces the floating showreel bubble around the viewport until it's hovered
// or a full-screen view (work / about / draw) is open.
function initializeMovingDivs(movingDivClass, tooltipId) {
  const movingDivs = document.getElementsByClassName(movingDivClass);
  const hoverElement = document.querySelector('.' + movingDivClass);
  const tooltipElement = document.getElementById(tooltipId);
  if (!hoverElement) return; // nothing to animate on this page

  let isHovered = false;

  hoverElement.addEventListener('mousemove', function (event) {
    if (!tooltipElement) return;
    tooltipElement.style.display = 'block';
    tooltipElement.style.left = event.clientX + 'px';
    tooltipElement.style.top = event.clientY + 'px';
  });

  hoverElement.addEventListener('mouseout', function () {
    if (tooltipElement) tooltipElement.style.display = 'none';
  });

  for (const movingDiv of movingDivs) {
    movingDiv.addEventListener('mouseover', () => { isHovered = true; });
    movingDiv.addEventListener('mouseout', () => { isHovered = false; });
    // Pause the bounce while the bubble has keyboard focus, too.
    movingDiv.addEventListener('focus', () => { isHovered = true; });
    movingDiv.addEventListener('blur', () => { isHovered = false; });

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

  initializeMovingDivs('movingWorkOne', 'D_AD');

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
    for (let i = 0; i < aboutPage.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(aboutPage[i]).opacity);

      if (currentOpacity === 0) {
        aboutPageVis = true;
        aboutPage[i].style.zIndex = 999;
        movingWorkOne.style.transform = 'scale(0)';
        aboutPage[i].style.opacity = 1;
        backgroundColor = "#000000";
        textColor = "#ffffff"
        aboutButton.style.backgroundColor = textColor;
        aboutButton.style.color = backgroundColor;
        aboutButton.style.borderColor = textColor;
        workButton.style.backgroundColor = backgroundColor;
        workButton.style.color = textColor;
        workButton.style.borderColor = textColor;
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
  // or the Escape key (keyboard-accessible equivalent of clicking the backdrop).
  showreel.addEventListener('click', showReel);
  showreelVis.addEventListener('click', closeShowreel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && initialReelVis && reelVis) closeShowreel();
  });

  window.addEventListener('orientationchange', function() {
    initializeMovingDivs('movingWorkOne', 'D_AD');
  });

  // ---- About page: headshot easter egg ----
  // (Social links are now real <a> elements, so they need no JS.)
  if (headshotContainer) {
    headshotContainer.addEventListener('click', function() {
      ouchSound.play();
    });
  }
}
