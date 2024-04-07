let workPageVis = false;
const workPages = document.getElementsByClassName('workPage');
const movingWorkOne = document.getElementsByClassName('movingWorkOne')[0];
let aboutPageVis = false;
const aboutButton = document.getElementById('aboutButton');
const workContainer = document.getElementsByClassName('workContainer');
const projectPage = document.getElementsByClassName('projectPage');
const showreelVis = document.getElementById('showreelVis');
const showreelContainer = document.getElementById('showreelContainer');
const showreel = document.getElementById('showreel');
const workButton = document.getElementById('workButton');
const showReelFooter = document.getElementById('showReelFooter');
const workContainerOne = document.getElementById('workContainerOne');
const workContainerTwo = document.getElementById('workContainerTwo');
const workContainerThree = document.getElementById('workContainerThree');
const workContainerFour = document.getElementById('workContainerFour');
const workContainerFive = document.getElementById('workContainerFive');
const workContainerSix = document.getElementById('workContainerSix');
const workContainerSeven = document.getElementById('workContainerSeven');
const workContainerEight = document.getElementById('workContainerEight');
const canvasContainer = document.getElementById('canvas-container');
const Switchy = document.getElementById('Switchy');
const movingWork = document.getElementById('containerDiv');
const currentOpacity = parseFloat(getComputedStyle(workPages[0]).opacity);
const headshotContainer = document.getElementById('headshotContainer');
const ouchSound = document.getElementById('ouchSound');

let reelVis = true;
let initialReelVis = false;
let pagetotal = document.body.scrollHeight; // Total height of the webpage
let containerHeight = showreelContainer.clientHeight; // Height of the showreelContainer
let translateYValue = pagetotal - containerHeight; // Calculate the translateY value
let finalTranslate = translateYValue/2.2 + containerHeight/2.3; 
let hideShowReel = translateYValue/2 + containerHeight/3 + 150; 

//const movingWorkFour = document.getElementsByClassName('movingWorkFour');

function initializeMovingDivs(movingDivClass, tooltipId) {
  const movingDivs = document.getElementsByClassName(movingDivClass);
  let isHovered = false;
  const hoverElement = document.querySelector("." + movingDivClass);
  const tooltipElement = document.getElementById(tooltipId);

  hoverElement.addEventListener("mousemove", function (event) {
    tooltipElement.style.display = "block";
    tooltipElement.style.left = event.clientX + "px";
    tooltipElement.style.top = event.clientY + "px";
  });

  hoverElement.addEventListener("mouseout", function () {
    tooltipElement.style.display = "none";
  });

  for (const movingDiv of movingDivs) {
    movingDiv.addEventListener("mouseover", () => {
      isHovered = true;
    });

    movingDiv.addEventListener("mouseout", () => {
      isHovered = false;
    });

    function moveDiv() {
      const speed = 1;
      let x = Math.floor(Math.random() * window.innerWidth / 1.8);
      let y = Math.floor(Math.random() * window.innerHeight / 1.8);

      function update() {
        if (!isHovered && !workPageVis && !drawingEnable && !aboutPageVis) {
          const rect = movingDiv.getBoundingClientRect();

          if (x < 0 || x + rect.width > window.innerWidth) {
            speedX = -speedX;
          }

          if (y < 0 || y + rect.height > window.innerHeight) {
            speedY = -speedY;
          }

          x += speedX;
          y += speedY;

          movingDiv.style.left = x + "px";
          movingDiv.style.top = y + "px";
        }

        requestAnimationFrame(update);
      }

      let speedX = speed * (Math.random() > 0.5 ? 1 : -1);
      let speedY = speed * (Math.random() > 0.5 ? 1 : -1);

      update();
    }

    moveDiv();
  }
}

initializeMovingDivs("movingWorkOne", "D_AD");


document.addEventListener('DOMContentLoaded', function () {
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
     // movingWorkFour[i].style.zIndex = 0;
      //movingWorkFour[i].style.opacity = 0;
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

  

  //Contact Page

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

  

});

function changeImage(element) {
  document.getElementById('image1').src = 'resources/Images/ProjectPreviews/D_AD_Project_Motion.gif';
}

function resetImage(element) {
  document.getElementById('image1').src = 'resources/Images/ProjectPreviews/D_AD_Project_Static.jpg';
}

function changeImage2(element) {
  document.getElementById('image2').src = 'resources/Images/ProjectPreviews/Rolus_Project_Motion.gif';
}

function resetImage2(element) {
  document.getElementById('image2').src = 'resources/Images/ProjectPreviews/Rolus_Project_Static.jpg';
}

function changeImage3(element) {
  document.getElementById('image3').src = 'resources/Images/ProjectPreviews/SydneyFest_Project_Motion.gif';
}

function resetImage3(element) {
  document.getElementById('image3').src = 'resources/Images/ProjectPreviews/SydneyFest_Project_Static.jpg';
}

function changeImage4(element) {
  document.getElementById('image4').src = 'resources/Images/ProjectPreviews/Youi_Project_Motion.gif';
}

function resetImage4(element) {
  document.getElementById('image4').src = 'resources/Images/ProjectPreviews/Youi_Project_Static.jpg';
}

function changeImage5(element) {
  document.getElementById('image5').src = 'resources/Images/ProjectPreviews/DemoFest_Project_Motion.gif';
}

function resetImage5(element) {
  document.getElementById('image5').src = 'resources/Images/ProjectPreviews/DemoFest_Project_Static.jpg';
}

function changeImage6(element) {
  document.getElementById('image6').src = 'resources/Images/ProjectPreviews/Peanuts_Project_Motion.gif';
}

function resetImage6(element) {
  document.getElementById('image6').src = 'resources/Images/ProjectPreviews/Peanuts_Project_Static.jpg';
}
function changeImage7(element) {
  document.getElementById('image7').src = 'resources/Images/ProjectPreviews/Values_Project_Motion.gif';
}

function resetImage7(element) {
  document.getElementById('image7').src = 'resources/Images/ProjectPreviews/Values_Project_Static.jpg';
}
function changeImage8(element) {
  document.getElementById('image8').src = 'resources/Images/ProjectPreviews/Weel_Project_Motion.gif';
}

function resetImage8(element) {
  document.getElementById('image8').src = 'resources/Images/ProjectPreviews/Weel_Project_Static.jpg';
}

workContainerOne.addEventListener('click', function () {
    window.location.href = 'projectOne.html';
});


workContainerTwo.addEventListener('click', function () {
    window.location.href = 'projectTwo.html';
});

workContainerThree.addEventListener('click', function () {
    window.location.href = 'projectThree.html';
});

workContainerThree.addEventListener('click', function () {
    window.location.href = 'projectThree.html';
});

workContainerFour.addEventListener('click', function () {
    window.location.href = 'projectFour.html';
});

workContainerFive.addEventListener('click', function () {
    window.location.href = 'projectFive.html';
});

workContainerSix.addEventListener('click', function () {
    window.location.href = 'projectSix.html';
});

workContainerSeven.addEventListener('click', function () {
    window.location.href = 'projectSeven.html';
});

workContainerEight.addEventListener('click', function () {
    window.location.href = 'projectEight.html';
});


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
  }, 10); // 1000 milliseconds = 1 second

  setTimeout(function() {
    showreelContainer.style.transform = 'translateY(-50%)' + 'translateX(-50%)';
  }, 500);
  
  setTimeout(function() {
    showreelVis.style.opacity = 0.8;
    movingWorkOne.style.display = 'none';
    
  }, 1000); // 1000 milliseconds = 1 second
    
});



function closeShowreel() {
  // Pause the video
  var video = document.getElementById('showreel');
  if (video) {
    video.pause();
  }
  showReelFooter.style.display = 'initial';
  setTimeout(function() {
    showReelFooter.style.opacity = .5;
 }, 1);
  showreelVis.style.opacity = 0;
  setTimeout(function() {
    showreelVis.style.zIndex = 1;
  }, 1000); // 1000 milliseconds = 1 second
  showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
  setTimeout(function() {
    showreel.style.filter = 'blur(10px)';
  }, 250); 
  showreelContainer.style.zIndex = 1000;
  reelVis = false;
 
}


function showReel(){
  if (reelVis == false) {
    showreelContainer.style.zIndex = 1006;
    showreelContainer.style.transform = 'translateY(-50%)' + 'translateX(-50%)';
    showreelVis.style.zIndex = 1004;
    setTimeout(function() {
      showreelVis.style.opacity = 0.8;
    }, 1000); // 1000 milliseconds = 1 second
    showreel.style.filter = 'blur(0px)';
    reelVis = true;
    
  }
}

showreelContainer.addEventListener('mouseenter', function() {
  if (reelVis == false){
    showreel.style.filter = 'blur(0px)';
  showreelContainer.style.transform = 'translateY(' + (finalTranslate - 50) + 'px) translateX(-50%)';
  showReelFooter.style.opacity = 0;
  setTimeout(function() {
    showReelFooter.style.display = 'none';
  }, 300); // 1000 milliseconds = 1 second
  
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





window.addEventListener("orientationchange", function() {
 initializeMovingDivs("movingWorkOne", "D_AD");
});


function goBack() {
    window.location.href = 'index.html';
}

headshotContainer.addEventListener("click", function() {
  ouchSound.play();
});

document.getElementById("Instagram").addEventListener("click", function() {
  window.open("https://www.instagram.com/tristan_miller/", "_blank");
});

document.getElementById("Email").addEventListener("click", function() {
  window.location.href = "mailto:tristanmiller.design@gmail.com";
});

document.getElementById("LinkedIn").addEventListener("click", function() {
  window.open("https://www.linkedin.com/in/tristan-m-4ab648142/", "_blank");
});


