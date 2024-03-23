let workPageVis = false;
const workPages = document.getElementsByClassName('workPage');
let aboutPageVis = false;
const aboutButton = document.getElementById('aboutButton');
const workContainer = document.getElementsByClassName('workContainer');
const projectPage = document.getElementsByClassName('projectPage');
const projectOne = document.getElementById('projectOne');
const showreelVis = document.getElementById('showreelVis');
const showreelContainer = document.getElementById('showreelContainer');
const workButton = document.getElementById('workButton');
const workContainerOne = document.getElementById('workContainerOne');
const canvasContainer = document.getElementById('canvas-container');
const Switchy = document.getElementById('Switchy');
const fadeToBlack = document.getElementById('fadeToBlack');
const movingWork = document.getElementById('containerDiv');
let reelVis = true;
let pagetotal = document.body.scrollHeight; // Total height of the webpage
let containerHeight = showreelContainer.clientHeight; // Height of the showreelContainer
let translateYValue = pagetotal - containerHeight; // Calculate the translateY value
let finalTranslate = translateYValue/2 + containerHeight/2.8; 
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
      const speed = 1.5;
      let x = Math.floor(Math.random() * window.innerWidth / 1.8);
      let y = Math.floor(Math.random() * window.innerHeight / 1.8);

      function update() {
        if (!isHovered) {
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

initializeMovingDivs("movingWorkOne", "sydneyFestival");
initializeMovingDivs("movingWorkTwo", "weel");
initializeMovingDivs("movingWorkThree", "rolus");
////initializeMovingDivs("movingWorkFour", "youi");
//initializeMovingDivs("movingWorkFive", "personal");
//initializeMovingDivs("movingWorkSix", "dAndAD");

document.addEventListener('DOMContentLoaded', function () {
  workButton.addEventListener('click', function () {
    for (let i = 0; i < aboutPage.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(aboutPage[i]).opacity);
      aboutPageVis = false;
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
        movingWork.style.display = 'none';
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
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
        workPageVis = false;
        movingWork.style.display = 'initial';
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
        for (let j = 0; j < workContainer.length; j++) {
          workContainer[j].style.top = '50px';
        }
      }
    }
  });

  workButton.addEventListener('touchstart', function () {
    for (let i = 0; i < aboutPage.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(aboutPage[i]).opacity);
      funButton.style.visibility = "hidden";
      drawingEnable = false;
      brushesHolder.style.transform = 'translateY(0px)'; 
    aboutPageVis = false;
    aboutPage[i].style.opacity = 0;
    aboutButton.style.backgroundColor = backgroundColor;
    aboutButton.style.color = textColor;
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
        movingWork.style.display = 'none';
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
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
        workPageVis = false;
        movingWork.style.display = 'initial';
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
        for (let j = 0; j < workContainer.length; j++) {
          workContainer[j].style.top = '50px';
        }
      }
    }
  });

  //Contact Page

  aboutButton.addEventListener('click', function () {
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
        aboutPage[i].style.opacity = 1;
        aboutButton.style.backgroundColor = textColor;
        aboutButton.style.color = backgroundColor;
        aboutPage[i].style.backgroundColor = backgroundColor;
        aboutPage[i].style.zIndex = 4;
        canvasContainer.style.zIndex = 5;
        //for (let i = 0; i < movingWorkFour.length; i++) {
        //  movingWorkFour[i].style.zIndex = 6;
         // movingWorkFour[i].style.opacity = 1;
       // }
        brushesHolder.style.zIndex = 7;
        aboutPageVis = true;
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
      } else {
        aboutPage[i].style.opacity = 0;
        aboutButton.style.backgroundColor = backgroundColor;
        aboutButton.style.color = textColor;
        aboutPage[i].style.zIndex = 1;
        canvasContainer.style.zIndex = 2;
        funButton.style.visibility = "visible";
        //for (let i = 0; i < movingWorkFour.length; i++) {
       // movingWorkFour[i].style.zIndex = 0;
       //movingWorkFour[i].style.opacity = 0;
        //}
        brushesHolder.style.zIndex = 3;
        aboutPageVis = false;
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
      }
    }
  });

  aboutButton.addEventListener('touchstart', function () {
    for (let i = 0; i < workPages.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(workPages[i]).opacity);

    workPageVis = false;
    workPages[i].style.opacity = 0;
    workButton.style.backgroundColor = backgroundColor;
    workButton.style.color = textColor;
    workPages[i].style.zIndex = 1;
    funButton.style.visibility = "hidden";
    drawingEnable = false;
    brushesHolder.style.transform = 'translateY(0px)';
    }
    for (let i = 0; i < aboutPage.length; i++) {
      const currentOpacity = parseFloat(getComputedStyle(aboutPage[i]).opacity);

      if (currentOpacity === 0) {
        aboutPage[i].style.opacity = 1;
        aboutButton.style.backgroundColor = textColor;
        aboutButton.style.color = backgroundColor;
        aboutPage[i].style.backgroundColor = backgroundColor;
        aboutPage[i].style.zIndex = 4;
        canvasContainer.style.zIndex = 5;
        //for (let i = 0; i < movingWorkFour.length; i++) {
         // movingWorkFour[i].style.zIndex = 6;
         // movingWorkFour[i].style.opacity = 1;
       // }
        brushesHolder.style.zIndex = 7;
        aboutPageVis = true;
        showreelContainer.style.transform = 'translateY(' + hideShowReel + 'px)' + 'translateX(-50%)';
      } else {
        aboutPage[i].style.opacity = 0;
        aboutButton.style.backgroundColor = backgroundColor;
        aboutButton.style.color = textColor;
        aboutPage[i].style.zIndex = 1;
        canvasContainer.style.zIndex = 2;
        //for (let i = 0; i < movingWorkFour.length; i++) {
        //  movingWorkFour[i].style.zIndex = 0;
        //  movingWorkFour[i].style.opacity = 0;
       // }
        brushesHolder.style.zIndex = 3;
        aboutPageVis = false;
        showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
      }
    }
  });

});
if (window.innerWidth > 600) {
function changeImage(element) {
  document.getElementById('image1').src = 'resources/Images/peanuts.png';
}

function resetImage(element) {
  document.getElementById('image1').src = 'resources/Images/sydneyFestival.png';
}

function changeImage2(element) {
  document.getElementById('image2').src = 'resources/Images/peanuts.png';
}

function resetImage2(element) {
  document.getElementById('image2').src = 'resources/Images/sydneyFestival.png';
}

function changeImage3(element) {
  document.getElementById('image3').src = 'resources/Images/peanuts.png';
}

function resetImage3(element) {
  document.getElementById('image3').src = 'resources/Images/sydneyFestival.png';
}

function changeImage4(element) {
  document.getElementById('image4').src = 'resources/Images/peanuts.png';
}

function resetImage4(element) {
  document.getElementById('image4').src = 'resources/Images/sydneyFestival.png';
}

function changeImage5(element) {
  document.getElementById('image5').src = 'resources/Images/peanuts.png';
}

function resetImage5(element) {
  document.getElementById('image5').src = 'resources/Images/sydneyFestival.png';
}

function changeImage6(element) {
  document.getElementById('image6').src = 'resources/Images/peanuts.png';
}

function resetImage6(element) {
  document.getElementById('image6').src = 'resources/Images/sydneyFestival.png';
}
}
workContainerOne.addEventListener('click', function () {
  fadeToBlack.style.visibility = 'visible';
  fadeToBlack.style.opacity = 1;
  setTimeout(function () {
    window.location.href = 'projectOne.html';
  }, 300);
});


function closeProject() {
  projectOne.style.opacity = 0;
  projectOne.style.zIndex = 0;
}

function initiateReel(){
  showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
  showreelVis.style.zIndex = 1;
  showreelVis.style.opacity = 0;
  reelVis = false;
}

function closeShowreel() {
  // Pause the video
  var video = document.getElementById('showreel');
  if (video) {
    video.pause();
  }

  showreelVis.style.opacity = 0;
  setTimeout(function() {
    showreelVis.style.zIndex = 1;
  }, 1000); // 1000 milliseconds = 1 second
  showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
  setTimeout(function() {
    showreelContainer.style.filter = 'blur(10px)';
  }, 250); 
  showreelContainer.style.zIndex = 1000;
  reelVis = false;
  console.log('vis ' + reelVis);
}


function showReel(){
  if (reelVis == false) {
    showreelContainer.style.zIndex = 1006;
    showreelContainer.style.transform = 'translateY(-50%)' + 'translateX(-50%)';
    showreelVis.style.zIndex = 1004;
    setTimeout(function() {
      showreelVis.style.opacity = 0.8;
    }, 1000); // 1000 milliseconds = 1 second
    showreelContainer.style.filter = 'blur(0px)';
    reelVis = true;
    console.log('vis ' + reelVis);
  } else if (reelVis == true) {
    console.log('vis ' + reelVis);
  }
}

showreelContainer.addEventListener('mouseenter', function() {
  if (reelVis == false){
  showreelContainer.style.filter = 'blur(0px)';
  showreelContainer.style.transform = 'translateY(' + (finalTranslate - 50) + 'px) translateX(-50%)';
}
});

showreelContainer.addEventListener('mouseleave', function() {
  if (reelVis == false){
  showreelContainer.style.filter = 'blur(10px)';
  showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
  }
});

function intialReelLoad(){
  reelVis = true;
    showreelContainer.style.zIndex = 1006;
    showreelContainer.style.transform = 'translateY(-50%)' + 'translateX(-50%)';
    showreelVis.style.zIndex = 1004;
    setTimeout(function() {
      showreelVis.style.opacity = 0.8;
    }, 1000); // 1000 milliseconds = 1 second
    showreelContainer.style.filter = 'blur(0px)';
    console.log('vis ' + reelVis);
}

// Function to create and append a mute button
function createMuteButton() {
  var video = document.getElementById('showreel');
  if (video) {
    // Create mute button
    var muteButton = document.createElement('button');
    muteButton.innerHTML = '<i class="material-icons">volume_off</i>';
    muteButton.classList.add('mute-button');

    // Add event listener to toggle mute/unmute
    muteButton.addEventListener('click', function() {
      if (video.muted) {
        video.muted = false;
        muteButton.innerHTML = '<i class="material-icons">volume_up</i>';
      } else {
        video.muted = true;
        muteButton.innerHTML = '<i class="material-icons">volume_off</i>';
      }
    });

    // Append the mute button to the video container
    video.parentNode.insertBefore(muteButton, video.nextSibling);
  }
}

// Call the function when the video is loaded
document.getElementById('showreel').addEventListener('loadedmetadata', function() {
  createMuteButton();
});



window.addEventListener("orientationchange", function() {
  location.reload();
});


window.onload = intialReelLoad;
