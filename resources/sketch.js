let img;
let imgTwo;
let isDrawing = false;
let drawingEnable = false;
let brushSelect = 0;
let canvas;
let buttonClicked = false;


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

  brushesHolder.style.transform = switchyElement.checked ? 'translateY(-100px)' : 'translateY(0)';
}

document.addEventListener('DOMContentLoaded', function () {
 

  switchyElement.addEventListener('click', () => (drawingEnable = switchyElement.checked));


  switchyElement.addEventListener('change', () => {
    brushesHolder.style.transform = switchyElement.checked ? 'translateY(-100px)' : 'translateY(0)';
  });
});

function preload() {
  img = loadImage('https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg');
  imgTwo = loadImage('https://m.media-amazon.com/images/I/71LTb+BcX5L._UC256,256_CACC,256,256_.jpg');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  imageElements.forEach((image, i) => {
    image.style.backgroundColor = i === brushSelect ? textColor : backgroundColor;
  });

   // Load the WebM video
   lemon = createVideo(['resources/Images/lemon.webm']);
  
   // Set attributes for autoplay and mute
   lemon.elt.autoplay = true;
   lemon.elt.muted = true;
   
   // Hide the default controls
   lemon.hide();

}

function draw() {
  imageMode(CENTER);

  if (isDrawing && drawingEnable && mouseY < windowHeight - 100 && mouseY > 50) {
    const currentImage = brushSelect % 2 === 0 ? img : imgTwo;
    image(lemon, mouseX, mouseY, 100, 100);
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



