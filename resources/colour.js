let backgroundColor, textColor;
var buttons = document.getElementsByClassName('myButton');
var slideColor = document.getElementsByClassName('slider');
const sliderButton = document.getElementById('slider');
const workPaged = document.getElementById('workPage');
const aboutPage = document.getElementsByClassName('aboutPage');
const aboutPage2 = document.getElementById('aboutPage');
const brushes = document.getElementById('brushes');
const colourButton = document.getElementById('animation-container');
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
    colourButton.style.backgroundColor = backgroundColor;
    funButton.style.backgroundColor = backgroundColor;
    workPaged.style.backgroundColor = backgroundColor;
    aboutPage2.style.backgroundColor = backgroundColor;
    brushes.style.color = textColor;
    if (workPageVis == true) {
      workButton.style.color = backgroundColor;
      workButton.style.backgroundColor = textColor;
    } else {
      workButton.style.backgroundColor = backgroundColor;
      workButton.style.color = textColor;
    }
    if (aboutPageVis == true) {
      aboutButton.style.color = backgroundColor;
      aboutButton.style.backgroundColor = textColor;
    } else {
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.color = textColor;
    }
    brushPanelColor();

  }

  
  function setInitalColours() {
    backgroundColor = "#ffffff";
    textColor = "#000000"
    if (workPageVis == true) {
      workButton.style.color = backgroundColor;
      workButton.style.backgroundColor = textColor;
    } else {
      workButton.style.backgroundColor = backgroundColor;
      workButton.style.color = textColor;
    } 
    if (aboutPageVis == true) {
      aboutButton.style.color = backgroundColor;
      aboutButton.style.backgroundColor = textColor;
    } else {
      aboutButton.style.backgroundColor = backgroundColor;
      aboutButton.style.color = textColor;
    } 
    themeContainer.style.backgroundColor = backgroundColor;
    themeContainer.style.color = textColor;
    aboutButton.style.backgroundColor = backgroundColor;
    funButton.style.backgroundColor = backgroundColor;
    colourButton.style.backgroundColor = textColor;
    imageOne.style.backgroundColor = textColor;
    imageTwo.style.backgroundColor = backgroundColor;
    imageThree.style.backgroundColor = backgroundColor;
    imageFour.style.backgroundColor = backgroundColor;
    imageFive.style.backgroundColor = backgroundColor;
    imageSix.style.backgroundColor = backgroundColor;
    workPaged.style.backgroundColor = backgroundColor;
    aboutPage2.style.backgroundColor = backgroundColor;
    
  }

  document.addEventListener("DOMContentLoaded", function() {
    var themeContainer = document.getElementById('themeContainer');
    
    // Change colors every 3 seconds
    //setInterval(changeColors, 3000);
  
    // Initial color change
   // changeColors();
   setInitalColours();
   colourButton.addEventListener('touchstart', function () {
    // Iterate through all elements with the class 'workPage'
    changeColors()
   });
   
  //document.querySelector('.switch input').addEventListener('change', changeColors);
  });
 
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', function() {
        this.style.backgroundColor = textColor;
        this.style.color = backgroundColor;
        
    });

    buttons[i].addEventListener('mouseout', function() {
        // Reset to the original background color or any other desired color
        if (workPageVis == true) {
          workButton.style.color = backgroundColor;
          workButton.style.backgroundColor = textColor;
          aboutButton.style.backgroundColor = backgroundColor;
          aboutButton.style.color = textColor;
        } else if (aboutPageVis == true) {
          workButton.style.color = textColor;
          workButton.style.backgroundColor = backgroundColor;
          aboutButton.style.backgroundColor = textColor;
          aboutButton.style.color = backgroundColor;
        } else if(drawingEnable == true) {
          funButton.style.backgroundColor = textColor;
          funButton.style.color = backgroundColor;
          workButton.style.color = textColor;
          workButton.style.backgroundColor = backgroundColor;
          aboutButton.style.backgroundColor = backgroundColor;
          aboutButton.style.color = textColor;
        } else {
        this.style.backgroundColor = backgroundColor;
        this.style.color = textColor;
        funButton.style.backgroundColor = backgroundColor;
        funButton.style.color = textColor;
        }
    });
  }

 