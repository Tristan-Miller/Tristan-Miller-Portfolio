let img;
let imgTwo;
let isDrawing = false;
let drawingEnable = false;
let brushSelect = 0;
let canvas;
let buttonClicked = false;
let lemon;
let banana;
let berry;
let avocado;
let apple;
let pepper;
let funButtonPressed = false;


const funButton = document.getElementById('funButton');
const brushesHolder = document.getElementById('brushes-holder');
const imageElements = Array.from(document.querySelectorAll('[id^="image"]'));
const fruitSalad = document.getElementById('fruitSalad');

function selectBrush(index) {
  brushSelect = index;
  imageElements.forEach((image, i) => {
    image.style.backgroundColor = i === index ? textColor : backgroundColor;
  });
  buttonClicked = true;
}

document.addEventListener('DOMContentLoaded', function () {
  funButton.addEventListener('click', function () {
    var pagetotal = document.body.scrollHeight; // Total height of the webpage
    var containerHeight = showreelContainer.clientHeight; // Height of the showreelContainer
    var translateYValue = pagetotal - containerHeight; // Calculate the translateY value
    var finalTranslate = translateYValue/2 + containerHeight/3 + 150; 
    fruitSalad.play();
    if(!funButtonPressed){ // Use !funButtonPressed instead of funButtonPressed == false
      brushesHolder.style.transform = 'translateY(-150px)'; // Corrected syntax for setting transform property
      funButton.style.backgroundColor = textColor;
      funButton.style.color = backgroundColor;
      for (let i = 0; i < smileysvgElements.length; i++) {
        smileysvgElements[i].style.fill = backgroundColor;
      }
      //movingWorkOne.style.transform = 'scale(0)';
      //movingWorkTwo.style.transform = 'scale(0)';
      //movingWorkThree.style.transform = 'scale(0)';
      drawingEnable = true; // Corrected assignment operator from == to =
      funButtonPressed = true; // Corrected assignment operator from == to =
      console.log(funButtonPressed);
      showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
    } else { // Removed unnecessary condition since if funButtonPressed is not false, it must be true
      funButton.style.backgroundColor = backgroundColor;
      funButton.style.color = textColor;
      fruitSalad.pause();
      for (let i = 0; i < smileysvgElements.length; i++) {
        smileysvgElements[i].style.fill = textColor;
      }
      funButtonPressed = false; // Corrected assignment operator from == to =
     // movingWorkOne.style.transform = 'scale(1)';
       // movingWorkTwo.style.transform = 'scale(1)';
       // movingWorkThree.style.transform = 'scale(1)';
      drawingEnable = false; // Corrected assignment operator from == to =
      brushesHolder.style.transform = 'translateY(0px)'; // Corrected syntax for setting transform property
      var pagetotal = document.body.scrollHeight; // Total height of the webpage
      var containerHeight = showreelContainer.clientHeight; // Height of the showreelContainer
      var translateYValue = pagetotal - containerHeight; // Calculate the translateY value
      var finalTranslate = translateYValue/2 + containerHeight/3; 
      showreelContainer.style.transform = 'translateY(' + finalTranslate + 'px)' + 'translateX(-50%)';
    }
  });
   
   funButton.addEventListener('touchstart', function () {

  });
});

imageElements.forEach((image, index) => {
  image.addEventListener('click', () => selectBrush(index));
  image.addEventListener('touchstart', () => selectBrush(index));
});



function preload() {

  lemon = createImg('resources/Images/Fruit/lemon.png');
  lemon.position(-10000, -10000);
  pepper = createImg('resources/Images/Fruit/pepper.png');
  pepper.position(-10000, -10000);
  berry = createImg('resources/Images/Fruit/berry.png');
  berry.position(-10000, -10000);
  banana = createImg('resources/Images/Fruit/bananna.png');
  banana.position(-10000, -10000);
  avocado = createImg('resources/Images/Fruit/avocado.png');
  avocado.position(-10000, -10000);
  apple = createImg('resources/Images/Fruit/apple.png');
  apple.position(-10000, -10000);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  imageElements.forEach((image, i) => {
    image.style.backgroundColor = i === brushSelect ? textColor : backgroundColor;
  });
  


}

function draw() {
  imageMode(CENTER);
console.log(drawingEnable);
  if (isDrawing && drawingEnable && mouseY < windowHeight - 100 && mouseY > 50) {
    const currentImage = brushSelect % 6 === 0 ? lemon : (brushSelect % 6 === 1 ? pepper : (brushSelect % 6 === 2 ? berry : (brushSelect % 6 === 3 ? banana : (brushSelect % 6 === 4 ? avocado : (brushSelect % 6 === 5 ? apple : apple)))));
    image(currentImage, mouseX, mouseY, 100, 100);
  } else if (!isDrawing && !drawingEnable) {
    clear();
  }
  

  if (workPageVis == true & drawingEnable == false) {
    canvasContainer.style.zIndex = 0;
  } else if (workPageVis == true & drawingEnable == true) {
    canvasContainer.style.zIndex = 5;
  }
}

function touchStarted() {
  isDrawing = true;
  // Uncomment the next line if you want to prevent default behavior
  //return false;
}

function touchMoved() {
  // Uncomment the next line if you want to prevent default behavior
   //return false;
}

function touchEnded() {
  isDrawing = false;
  // Uncomment the next line if you want to prevent default behavior
  // return false;
}


function mouseClicked() {
  // Your mouseClicked() function goes here
}



