let brushType = 1;
let drawShapes = true;
let shapes = []; // Array to store shape information

let movingObject;
let isHovering = false;
let img;
function preload() {
  // Load your image here
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ButtonReset();
  ButtonBrushOne();
  ButtonBrushTwo();
  ButtonBrushThree();
  ButtonBrushFour();
  ButtonRandomColour();
  
  let canvasControls = select("#canvasControls");
  canvasControls.mousePressed(canvasControlsClicked);

}

function draw() {
    background(backgroundColor);
    console.log(isHovering)

  if (!isHovering) {

    
    // Update and draw each shape in the array
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].x += shapes[i].xSpeed;
      shapes[i].y += shapes[i].ySpeed;

      // Bounce off the edges
      if (shapes[i].x < 0 || shapes[i].x > width) {
        shapes[i].xSpeed *= -1;
      }

      if (shapes[i].y < 0 || shapes[i].y > height) {
        shapes[i].ySpeed *= -1;
      }

      // Draw based on the shape type
      if (shapes[i].type == 1) {
        ellipse(shapes[i].x, shapes[i].y, width / 5, width / 5);
        fill(255);
      } else if (shapes[i].type == 2) {
        rect(
          shapes[i].x - (width / 5) / 2,
          shapes[i].y - (width / 5) / 2,
          width / 5,
          width / 5
        );
        fill(255);
      } else if (shapes[i].type == 3) {
        let triangleSize = 20; // Adjust the size of the triangle
        triangle(
          shapes[i].x,
          shapes[i].y,
          shapes[i].x + triangleSize,
          shapes[i].y,
          shapes[i].x,
          shapes[i].y - triangleSize
        );
        fill(255);
      } else if (shapes[i].type == 4) {
        ellipse(shapes[i].x, shapes[i].y, width / 5, width / 5);
        fill(255);
      }
    }
  }
}

function mousePressed() {
  // Add a new shape to the array when the mouse is pressed
  let newShape = {
    x: mouseX,
    y: mouseY,
    type: brushType,
    xSpeed: random(-5, 5),
    ySpeed: random(-5, 5),
  };
  shapes.push(newShape);
}




function resetCanvas() {
  shapes = []; // Clear the array of shapes
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
//  background(255);
}

function canvasControlsClicked() {
  // Toggle the drawShapes flag when canvasControls is clicked
  drawShapes = drawShapes;


}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
 // background(255);

}



function ButtonReset() {
   // Create a button
   resetButton = createSpan('refresh');
   resetButton.mousePressed(resetCanvas)
   resetButton.style('font-family', 'Material Symbols Outlined');
   resetButton.style('font-size', '24px'); // Adjust font size as needed
   resetButton.id("resetbutton"); 
   resetButton.style('user-select', 'none');
   resetButton.parent("canvasControls");
   
}

function ButtonBrushOne() {
   BrushOne = createSpan('Circle');
   BrushOne.mousePressed(BrushTypeOne);
   BrushOne.style('font-family', 'Material Symbols Outlined');
   BrushOne.style('font-size', '24px'); // Adjust font size as needed
  // BrushOne.id("resetbutton"); 
   BrushOne.style('user-select', 'none');
   BrushOne.parent("canvasControls");
}

function ButtonBrushTwo() {
  BrushOne = createSpan('Circle');
  BrushOne.mousePressed(BrushTypeTwo);
  BrushOne.style('font-family', 'Material Symbols Outlined');
  BrushOne.style('font-size', '24px'); // Adjust font size as needed
  //BrushOne.id("resetbutton"); 
  BrushOne.style('user-select', 'none');
  BrushOne.parent("canvasControls");
}

function ButtonBrushThree() {
  BrushOne = createSpan('Change_History');
  BrushOne.mousePressed(BrushTypeThree);
  BrushOne.style('font-family', 'Material Symbols Outlined');
  BrushOne.style('font-size', '24px'); // Adjust font size as needed
 // BrushOne.id("resetbutton"); 
  BrushOne.style('user-select', 'none');
  BrushOne.parent("canvasControls");
}

function ButtonBrushFour() {
  BrushOne = createSpan('Hexagon');
  BrushOne.mousePressed(BrushTypeFour);
  BrushOne.style('font-family', 'Material Symbols Outlined');
  BrushOne.style('font-size', '24px'); // Adjust font size as needed
  //BrushOne.id("resetbutton"); 
  BrushOne.style('user-select', 'none');
  BrushOne.parent("canvasControls");
}

function ButtonRandomColour() {
  // Create a button
  colorButton = createSpan('palette');
  colorButton.mousePressed(changeColors);
  colorButton.style('font-family', 'Material Symbols Outlined');
  colorButton.style('font-size', '24px'); // Adjust font size as needed
  colorButton.id("Palette-Button"); 
  colorButton.style('user-select', 'none');
  colorButton.parent("header-holder");
}

function BrushTypeOne() {
  brushType = 1;
  console.log(brushType);
}

function BrushTypeTwo() {
  brushType = 2;
  console.log(brushType);
}

function BrushTypeThree() {
  brushType = 3;
  console.log(brushType);
}

function BrushTypeFour() {
  brushType = 4;
  console.log(brushType);
}
