let backgroundColor, textColor;
var buttons = document.getElementsByClassName('myButton');
var slideColor = document.getElementsByClassName('slider');
const sliderButton = document.getElementById('slider');
const workPaged = document.getElementById('workPage');
const aboutPage = document.getElementsByClassName('aboutPage');
const aboutPage2 = document.getElementById('aboutPage');
const brushes = document.getElementById('brushes');
const animationContainer = document.getElementById('animation-container');
const smileyAnimationContainer = document.getElementById('smiley-animation-container');
const svgElements = animationContainer.getElementsByTagName('path');
const smileysvgElements = smileyAnimationContainer.getElementsByTagName('path');
const introAnimationContainer = document.getElementById('intro-animation-container');
const introsvgElements = introAnimationContainer.getElementsByTagName('path');

function getRandomColor() {
    // Generate a random color in hexadecimal format
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  
  function calculateContrast(color1, color2) {
    // Calculate the contrast ratio between two colors
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);
  
    const ratio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return ratio;
  }
  
  function calculateLuminance(color) {
    // Calculate the relative luminance of a color
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
  
    const srgb = [r / 255, g / 255, b / 255];
  
    for (let i = 0; i < srgb.length; i++) {
      if (srgb[i] <= 0.03928) {
        srgb[i] /= 12.92;
      } else {
        srgb[i] = Math.pow((srgb[i] + 0.055) / 1.055, 2.4);
      }
    }
  
    const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    return luminance;
  }
  
function brushPanelColor() {
    if(brushSelect == 0){
        imageOne.style.backgroundColor = textColor;
        imageTwo.style.backgroundColor = backgroundColor;
        imageThree.style.backgroundColor = backgroundColor;
        imageFour.style.backgroundColor = backgroundColor;
        imageFive.style.backgroundColor = backgroundColor;
        imageSix.style.backgroundColor = backgroundColor;
        
    } else if(brushSelect == 1 ){
        imageOne.style.backgroundColor = backgroundColor;
        imageTwo.style.backgroundColor = textColor;
        imageThree.style.backgroundColor = backgroundColor;
        imageFour.style.backgroundColor = backgroundColor;
        imageFive.style.backgroundColor = backgroundColor;
        imageSix.style.backgroundColor = backgroundColor;
        
    } else if(brushSelect == 2 ){
        imageOne.style.backgroundColor = backgroundColor;
        imageTwo.style.backgroundColor = backgroundColor;
        imageThree.style.backgroundColor = textColor;
        imageFour.style.backgroundColor = backgroundColor;
        imageFive.style.backgroundColor = backgroundColor;
        imageSix.style.backgroundColor = backgroundColor;
        
    } else if(brushSelect == 3 ){
        imageOne.style.backgroundColor = backgroundColor;
        imageTwo.style.backgroundColor = backgroundColor;
        imageThree.style.backgroundColor = backgroundColor;
        imageFour.style.backgroundColor = textColor;
        imageFive.style.backgroundColor = backgroundColor;
        imageSix.style.backgroundColor = backgroundColor;
       
    } else if(brushSelect == 4 ){
        imageOne.style.backgroundColor = backgroundColor;
        imageTwo.style.backgroundColor = backgroundColor;
        imageThree.style.backgroundColor = backgroundColor;
        imageFour.style.backgroundColor = backgroundColor;
        imageFive.style.backgroundColor = textColor;
        imageSix.style.backgroundColor = backgroundColor;
        
    } else if(brushSelect == 5 ){
        imageOne.style.backgroundColor = backgroundColor;
        imageTwo.style.backgroundColor = backgroundColor;
        imageThree.style.backgroundColor = backgroundColor;
        imageFour.style.backgroundColor = backgroundColor;
        imageFive.style.backgroundColor = backgroundColor;
        imageSix.style.backgroundColor = textColor;
       
    } else if(brushSelect == 6 ){
        imageOne.style.backgroundColor = backgroundColor;
        imageTwo.style.backgroundColor = backgroundColor;
        imageThree.style.backgroundColor = backgroundColor;
        imageFour.style.backgroundColor = backgroundColor;
        imageFive.style.backgroundColor = backgroundColor;
        imageSix.style.backgroundColor = backgroundColor;
        
    }
}

function changeColors() {
  if(!workPageVis && !aboutPageVis) {
    // Generate random colors until the contrast ratio is sufficient
    do {
      backgroundColor = getRandomColor();
      textColor = getRandomColor();
    } while (calculateContrast(backgroundColor, textColor) < 4.5);
  
    const themeContainer = document.getElementById('themeContainer');
    themeContainer.style.backgroundColor = backgroundColor;
    themeContainer.style.color = textColor;
    aboutButton.style.backgroundColor = backgroundColor;
    aboutButton.style.color = textColor;
     // Change the fill color of each SVG element
     for (let i = 0; i < svgElements.length; i++) {
      svgElements[i].style.fill = textColor;
     }
     for (let i = 0; i < introsvgElements.length; i++) {
      introsvgElements[i].style.fill = textColor;
     }
    workPaged.style.backgroundColor = backgroundColor;
    aboutPage2.style.backgroundColor = backgroundColor;
    workButton.style.borderColor = textColor;
    aboutButton.style.borderColor = textColor;
    funButton.style.borderColor = textColor;
    brushes.style.color = textColor;
    if (workPageVis == true) {
      workButton.style.color = backgroundColor;
      workButton.style.borderColor = textColor;
      workButton.style.backgroundColor = textColor;
    } else {
      workButton.style.backgroundColor = backgroundColor;
      workButton.style.borderColor = textColor;
      workButton.style.color = textColor;
    }
    if (aboutPageVis == true) {
      aboutButton.style.color = backgroundColor;
      aboutButton.style.borderColor = textColor;
      aboutButton.style.backgroundColor = textColor;
      
    } else {
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.borderColor = textColor;
      aboutButton.style.color = textColor;
    }

    if (drawingEnable == true) {
      for (let i = 0; i < smileysvgElements.length; i++) {
        smileysvgElements[i].style.fill = backgroundColor;
      }
      funButton.style.backgroundColor = textColor;
      funButton.style.color = backgroundColor;
    } else {
       for (let i = 0; i < smileysvgElements.length; i++) {
      smileysvgElements[i].style.fill = textColor;
     }
      funButton.style.color = textColor;
      funButton.style.backgroundColor = backgroundColor;
    }
    brushPanelColor();
  }else{
    backgroundColor = "#ffffff";
    textColor = "#000000"
    workPages[0].style.opacity = 0;
    funButton.style.visibility = "visible";
    workButton.style.backgroundColor = backgroundColor;
    workButton.style.color = textColor;
    workPages[0].style.zIndex = 1;
    canvasContainer.style.zIndex = 2;
    brushesHolder.style.zIndex = 3;
    workPageVis = false;
    drawingEnable = false;
    movingWorkOne.style.transform = 'scale(1)';
    showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
    for (let j = 0; j < workContainer.length; j++) {
      workContainer[j].style.top = '50px';
    }
    aboutPageVis = false;
    drawingEnable = false;
    aboutButton.style.backgroundColor = backgroundColor;
    aboutButton.style.color = textColor;
    funButton.style.backgroundColor = backgroundColor;
    funButton.style.color = textColor;
    themeContainer.style.backgroundColor = backgroundColor;
    themeContainer.style.color = textColor;
    aboutPage[0].style.backgroundColor = backgroundColor;
    aboutPage[0].style.opacity = 0;
    aboutButton.style.backgroundColor = backgroundColor;
    aboutButton.style.color = textColor;
    aboutPage[0].style.zIndex = 1;

  }
  }

  
  function setInitalColours() {
    backgroundColor = "#ffffff";
    textColor = "#000000"
    if (workPageVis == true) {
      workButton.style.color = backgroundColor;
      workButton.style.backgroundColor = textColor;
      workButton.style.borderColor = textColor;
    } else {
      workButton.style.backgroundColor = backgroundColor;
      workButton.style.color = textColor;
      workButton.style.borderColor = textColor;
    } 
    if (aboutPageVis == true) {
      aboutButton.style.color = backgroundColor;
      aboutButton.style.backgroundColor = textColor;
      aboutButton.style.borderColor = textColor;
      
    } else {
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.color = textColor;
      aboutButton.style.borderColor = textColor;
    } 
    themeContainer.style.backgroundColor = backgroundColor;
    themeContainer.style.color = textColor;
    aboutButton.style.backgroundColor = backgroundColor;
    funButton.style.backgroundColor = backgroundColor;
    imageOne.style.backgroundColor = textColor;
    imageTwo.style.backgroundColor = backgroundColor;
    imageThree.style.backgroundColor = backgroundColor;
    imageFour.style.backgroundColor = backgroundColor;
    imageFive.style.backgroundColor = backgroundColor;
    imageSix.style.backgroundColor = backgroundColor;
    workPaged.style.backgroundColor = backgroundColor;
    aboutPage2.style.backgroundColor = backgroundColor;
    workButton.style.borderColor = textColor;
    aboutButton.style.borderColor = textColor;
    funButton.style.borderColor = textColor;
  }

  document.addEventListener("DOMContentLoaded", function() {
    var themeContainer = document.getElementById('themeContainer');
    
    // Change colors every 3 seconds
    //setInterval(changeColors, 3000);
  
    // Initial color change
   // changeColors();
   setInitalColours();
 
   
  //document.querySelector('.switch input').addEventListener('change', changeColors);
  });
 
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', function() {
        this.style.backgroundColor = textColor;
        this.style.color = backgroundColor;
        this.style.borderColor = textColor;
        
    });

    buttons[i].addEventListener('mouseout', function() {
        // Reset to the original background color or any other desired color
        if (workPageVis == true) {
          workButton.style.color = backgroundColor;
          workButton.style.backgroundColor = textColor;
          workButton.style.borderColor = textColor;
          aboutButton.style.backgroundColor = backgroundColor;
          aboutButton.style.color = textColor;
          aboutButton.style.borderColor = textColor;
        } else if (aboutPageVis == true) {
          workButton.style.color = textColor;
          workButton.style.backgroundColor = backgroundColor;
          workButton.style.borderColor = textColor;
          aboutButton.style.backgroundColor = textColor;
          aboutButton.style.color = backgroundColor;
          aboutButton.style.borderColor = textColor;
        } else if(drawingEnable == true) {
          funButton.style.backgroundColor = textColor;
          funButton.style.color = backgroundColor;
          funButton.style.borderColor = textColor;
          workButton.style.color = textColor;
          workButton.style.backgroundColor = backgroundColor;
          workButton.style.borderColor = textColor;
          aboutButton.style.backgroundColor = backgroundColor;
          aboutButton.style.color = textColor;
          aboutButton.style.borderColor = textColor;
          for (let i = 0; i < smileysvgElements.length; i++) {
          smileysvgElements[i].style.fill = backgroundColor;
        }
        } else {
        this.style.backgroundColor = backgroundColor;
        this.style.color = textColor;
        this.style.borderColor = textColor;
        funButton.style.backgroundColor = backgroundColor;
        funButton.style.color = textColor;
        funButton.borderColor = textColor;
        for (let i = 0; i < smileysvgElements.length; i++) {
          smileysvgElements[i].style.fill = textColor;
        }
        }
    });

   
  }


    funButton.addEventListener("mouseover", () => {
      funButton.style.backgroundColor = textColor;
      funButton.style.color = backgroundColor;
      funButton.borderColor = textColor;
      for (let i = 0; i < smileysvgElements.length; i++) {
        smileysvgElements[i].style.fill = backgroundColor;
      }
    });
