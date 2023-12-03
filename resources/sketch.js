let img;
let isDrawing = false;
let drawingEnable = false;
let drawingDisabled = false;
let canvas; // Define the canvas variable

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
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container'); // Set the parent container
}

function draw() {
  imageMode(CENTER);

  if (isDrawing & drawingEnable == true) {
    // Draw the image at the mouse/finger position
    image(img, mouseX, mouseY, 100, 100);
  }

  if (drawingEnable == false) {
    clear();
  }
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