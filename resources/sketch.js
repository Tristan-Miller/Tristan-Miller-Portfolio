let img;
let isDrawing = false;
let drawingEnable = false;
let drawingDisabled = false;
let brushSelect = 0;
let buttonClicked = false;
let canvas; // Define the canvas variable
const imageOne = document.getElementById('imageOne');
const imageTwo = document.getElementById('imageTwo');
const imageThree = document.getElementById('imageThree');
const imageFour = document.getElementById('imageFour');
const imageFive = document.getElementById('imageFive');
const imageSix = document.getElementById('imageSix');
const imageSeven = document.getElementById('imageSeven');


document.getElementById('imageOne').addEventListener('click', function() {
  brushSelect = 0 // Toggle the variable
  imageOne.style.backgroundColor = textColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = backgroundColor;
  buttonClicked = true;
});


document.getElementById('imageTwo').addEventListener('click', function() {
  brushSelect = 1 // Toggle the variable
  imageOne.style.backgroundColor = backgroundColor;
  imageTwo.style.backgroundColor = textColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = backgroundColor;
  buttonClicked = true;
});

document.getElementById('imageThree').addEventListener('click', function() {
  brushSelect = 2 // Toggle the variable
  imageOne.style.backgroundColor = backgroundColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = textColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = backgroundColor;
  buttonClicked = true;
});

document.getElementById('imageFour').addEventListener('click', function() {
  brushSelect = 3 // Toggle the variable
  imageOne.style.backgroundColor = backgroundColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = textColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = backgroundColor;
  buttonClicked = true;
});

document.getElementById('imageFive').addEventListener('click', function() {
  brushSelect = 4 // Toggle the variable
  imageOne.style.backgroundColor = backgroundColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = textColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = backgroundColor;
  buttonClicked = true;
});

document.getElementById('imageSix').addEventListener('click', function() {
  brushSelect = 5 // Toggle the variable
  imageOne.style.backgroundColor = backgroundColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = textColor;
  imageSeven.style.backgroundColor = backgroundColor;
  buttonClicked = true;
});

document.getElementById('imageSeven').addEventListener('click', function() {
  brushSelect = 6 // Toggle the variable
  imageOne.style.backgroundColor = backgroundColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = textColor;
  buttonClicked = true;
});

document.addEventListener('DOMContentLoaded', function () {
  // Get the switch and brushes holder elements
  var switchElement = document.getElementById('mySwitch');
  var brushesHolder = document.getElementById('brushes-holder');

  // Add an event listener to the switch
  switchElement.addEventListener('change', function () {
    // Check if the switch is on
    if (switchElement.checked) {
      drawingEnable = true;
    } else {
      drawingEnable = false;
    }
  });

  switchElement.addEventListener('change', function () {
    // Check if the switch is on
    if (switchElement.unchecked) {
      drawingDisabled = true;
    } else {
      drawingDisabled = false;
    }
  });
});

function preload() {
  // Load your image here
  img = loadImage('https://png.pngtree.com/png-vector/20191126/ourmid/pngtree-image-of-cute-radish-vector-or-color-illustration-png-image_2040180.jpg');
  imgTwo = loadImage('https://m.media-amazon.com/images/I/71LTb+BcX5L._UC256,256_CACC,256,256_.jpg');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container'); // Set the parent container
  imageOne.style.backgroundColor = textColor;
  imageTwo.style.backgroundColor = backgroundColor;
  imageThree.style.backgroundColor = backgroundColor;
  imageFour.style.backgroundColor = backgroundColor;
  imageFive.style.backgroundColor = backgroundColor;
  imageSix.style.backgroundColor = backgroundColor;
  imageSeven.style.backgroundColor = backgroundColor;
}

function draw() {
  imageMode(CENTER);

  if (isDrawing & drawingEnable == true) {
    // Draw the image at the mouse/finger position
    if (brushSelect == 0) {
    image(img, mouseX, mouseY, 100, 100);
    } else if (brushSelect == 1){
      image(imgTwo, mouseX, mouseY, 100, 100);
    }  else if (brushSelect == 2){
      image(img, mouseX, mouseY, 100, 100);
    }  else if (brushSelect == 3){
      image(imgTwo, mouseX, mouseY, 100, 100);
    } else if (brushSelect == 4){
      image(img, mouseX, mouseY, 100, 100);
    } else if (brushSelect == 5){
      image(imgTwo, mouseX, mouseY, 100, 100);
    } else if (brushSelect == 6){
      image(img, mouseX, mouseY, 100, 100);
    }
  } else if (isDrawing == false & drawingEnable == false) {
    clear();
  } 
  console.log(buttonClicked)
}

function touchStarted() {
  // For mobile devices, touchStarted() is called when the screen is touched
  isDrawing = true;
  return false; // prevent default
}

function touchMoved() {
  // For mobile devices, touchMoved() is called when the finger is dragged
  return false; // prevent default
}

function touchEnded() {
  // For mobile devices, touchEnded() is called when the finger is lifted
  isDrawing = false;
  return false; // prevent default
}

function mouseClicked() {
  // Your mouseClicked() function goes here
}

console.log(brushSelect);