const canvas = document.getElementById('DrawingCanvas');
export const canvasContext = canvas.getContext('2d');
const cursorImage = '/UI_Icons/Drawing_Cursor.svg';

//Canvas Display, Size and Window Resizing Properties
//--------------------------------
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// NEED TO THINK OF USING A VIEWER TO SCROLL THE CANVAS INSTEAD
/*
SetCanvasToWindowSize();
window.addEventListener('resize', SetCanvasToWindowSize);

function SetCanvasToWindowSize() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');


    const oldWidth = canvas.width;
    const oldHeight = canvas.height;
    tempCanvas.width = oldWidth;
    tempCanvas.height = oldHeight;
    tempCtx.drawImage(canvas, 0, 0);


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    canvasContext.drawImage(tempCanvas, 0, 0, oldWidth, oldHeight, 0, 0, canvas.width, canvas.height);
}
 */

canvasContext.fillStyle = 'white';
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

//Drawing
//-------
let isDrawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvasContext.strokeStyle = 'black';
canvasContext.lineWidth = 5;
canvasContext.lineJoin = 'round';
canvasContext.lineCap = 'round';

//------------------------

let cursorSize = 20;
let strokeWidth = 2;

function UpdateCursor() {
  const cursorHotspot = cursorSize / 2;
  let cursorStroke = `<circle cx="12" cy="12" r="10" stroke="black" stroke-width="${strokeWidth}" fill="transparent" />`;
  let cursor = `<svg xmlns="http://www.w3.org/2000/svg" width="${cursorSize}" height="${cursorSize}" viewBox="0 0 25 25">${cursorStroke}</svg>`;
  const blob = new Blob([cursor], { type: 'image/svg+xml' });
  const cursorURL = URL.createObjectURL(blob);
  canvas.style.cursor = `url(${cursorURL}) ${cursorHotspot} ${cursorHotspot}, auto`;
}

UpdateCursor();

let pencolorname = '#000000';

export function ClearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

export function ChangeToEraser() {
  canvasContext.strokeStyle = '#ffffff';
}

export function ChangeToPen() {
  canvasContext.strokeStyle = pencolorname;
}

export function ChangePenColor(colorname) {
  pencolorname = colorname;
  canvasContext.strokeStyle = colorname;
}

export function IncreaseStroke() {
  canvasContext.lineWidth += 5;
  //strokeWidth += 20
  cursorSize += 10;
  UpdateCursor();
}

export function DecreaseStroke() {
  canvasContext.lineWidth -= 5;
  //strokeWidth -= 20
  cursorSize -= 10;
  UpdateCursor();
}

//------------------------

function startDrawing(event) {
  event.preventDefault();
  isDrawing = true;
  canvasContext.beginPath();
  canvasContext.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
}

function draw(event) {
  if (!isDrawing) return;

  canvasContext.lineTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  canvasContext.stroke();
}

function stopDrawing() {
  isDrawing = false;
  canvasContext.closePath();
}
