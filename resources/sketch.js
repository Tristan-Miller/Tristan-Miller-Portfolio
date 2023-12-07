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


const switchyElement = document.getElementById('mySwitch');
const brushesHolder = document.getElementById('brushes-holder');
const imageElements = Array.from(document.querySelectorAll('[id^="image"]'));

function selectBrush(index) {
  brushSelect = index;
  imageElements.forEach((image, i) => {
    image.style.backgroundColor = i === index ? textColor : backgroundColor;
  });
  buttonClicked = true;
}

imageElements.forEach((image, index) => {
  image.addEventListener('click', () => selectBrush(index));
  image.addEventListener('touchstart', () => selectBrush(index));
});

function handleInteraction(event) {
  const x = event.clientX || (event.touches && event.touches[0].clientX);
  const y = event.clientY || (event.touches && event.touches[0].clientY);

  if (x < 70 && y < 50) {
    switchyElement.checked = !switchyElement.checked;
    drawingEnable = switchyElement.checked;
  }

  brushesHolder.style.transform = switchyElement.checked ? 'translateY(-150px)' : 'translateY(0)';
}

document.addEventListener('DOMContentLoaded', function () {
 

  switchyElement.addEventListener('click', () => (drawingEnable = switchyElement.checked));


  switchyElement.addEventListener('change', () => {
    brushesHolder.style.transform = switchyElement.checked ? 'translateY(-150px)' : 'translateY(0)';
  });
});

function preload() {

  lemon = createImg('resources/Images/lemon.png');
  lemon.position(-10000, -10000);
  pepper = createImg('resources/Images/pepper.png');
  pepper.position(-10000, -10000);
  berry = createImg('resources/Images/berry.png');
  berry.position(-10000, -10000);
  banana = createImg('resources/Images/bananna.png');
  banana.position(-10000, -10000);
  avocado = createImg('resources/Images/avocado.png');
  avocado.position(-10000, -10000);
  apple = createImg('resources/Images/apple.png');
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



