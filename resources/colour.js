let backgroundColor, textColor;

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
  
  

function changeColors() {


    // Generate random colors until the contrast ratio is sufficient
    do {
      backgroundColor = getRandomColor();
      textColor = getRandomColor();
    } while (calculateContrast(backgroundColor, textColor) < 4.5);
  
    const themeContainer = document.getElementById('themeContainer');
    themeContainer.style.backgroundColor = backgroundColor;
    themeContainer.style.color = textColor;
  }

  function setInitalColours() {
    backgroundColor = "#000000";
    textColor = "#FFFFFF"
    themeContainer.style.backgroundColor = backgroundColor;
    themeContainer.style.color = textColor;

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
  
  