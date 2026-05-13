const canvas = document.getElementById('fog-canvas');
const ctx = canvas.getContext('2d');

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let appState = 'START'; // Can be 'START', 'BOOTING', 'TRACKING', or 'ERROR'
let currentError = '';

// 1. Setup the Fog Canvas
function resize() {
  // Cache the revealed portions of the screen before the browser clears the canvas
  let savedCanvas;
  if (appState === 'TRACKING' && canvas.width > 0 && canvas.height > 0) {
    savedCanvas = document.createElement('canvas');
    savedCanvas.width = canvas.width;
    savedCanvas.height = canvas.height;
    savedCanvas.getContext('2d').drawImage(canvas, 0, 0);
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  fillFog();

  if (appState === 'START') drawStartText();
  else if (appState === 'BOOTING') drawLoadingText();
  else if (appState === 'ERROR') drawErrorText();
  else if (appState === 'TRACKING' && savedCanvas) {
    // Restore the previously revealed holes on the newly resized canvas
    ctx.clearRect(0, 0, savedCanvas.width, savedCanvas.height);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(savedCanvas, 0, 0);
  }
}

function fillFog() {
  ctx.globalCompositeOperation = 'source-over'; // Ensure new drawing is on top
  ctx.fillStyle = 'rgba(17, 17, 17, 0.9)'; // Semi-transparent dark fog
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStartText() {
  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Click anywhere to start the Eye Tracker", window.innerWidth / 2, window.innerHeight / 2);
}

function drawLoadingText() {
  ctx.fillStyle = 'white';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("Starting camera up... Please allow permissions.", window.innerWidth / 2, window.innerHeight / 2);
}

function drawErrorText() {
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Wipe background

  ctx.fillStyle = '#ff6b6b';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("WebGazer failed to load or camera access was denied.", window.innerWidth / 2, window.innerHeight / 2 - 20);
  if (currentError) {
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '16px monospace';
    ctx.fillText(`Reason: ${currentError}`, window.innerWidth / 2, window.innerHeight / 2 + 20);
  }
}

window.addEventListener('resize', resize);
resize(); // Draw the initial black screen and text

// 2. The Liquid Brush Loop
function drawBrush() {
  if (appState !== 'TRACKING') return; // Don't draw the blob until the camera is live

  currentX += (targetX - currentX) * 0.08; // Slower brush movement
  currentY += (targetY - currentY) * 0.08; // Slower brush movement

  ctx.globalCompositeOperation = 'destination-out'; 
  
  // Create a soft radial gradient for a smooth fog-reveal effect
  const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 80);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(currentX, currentY, 80, 0, Math.PI * 2); 
  ctx.fill();

  requestAnimationFrame(drawBrush);
}

// 3. Initialize WebGazer on Click (Bypasses Browser Security)
window.addEventListener('click', async () => {
  // If it's already running or attempting to load, ignore further clicks
  if (appState !== 'START' && appState !== 'ERROR') return;

  if (typeof window.webgazer === 'undefined') {
    currentError = "window.webgazer is undefined. Ensure webgazer.js loaded correctly (check browser console for network errors).";
    appState = 'ERROR';
    resize(); // Trigger UI update to error state
    return;
  }

  console.log("Mouse clicked! Booting WebGazer...");
  appState = 'BOOTING';
  resize(); // Trigger UI update to loading state

  // Yield to the browser so it can actually render the "Starting camera up..." text 
  // before WebGazer freezes the main thread during its heavy initialization.
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    // Override MediaPipe paths so WebGazer fetches WASM models from a remote
    // CDN instead of your local server. This prevents Vite from accidentally
    // returning an HTML page instead of a WASM file.
    if (window.webgazer.params) {
      window.webgazer.params.faceMeshSolutionPath = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh";
    }
    // Start the tracking model
    await window.webgazer.setGazeListener(function(data, clock) {
        if (data == null) return;
        
        targetX = data.x;
        targetY = data.y;
      })
      .begin();

    console.log("Camera started! WebGazer is active.");

    // Safely hide all default WebGazer UI elements
    const wg = window.webgazer;
    if (wg.showVideo) wg.showVideo(false);
    if (wg.showFaceOverlay) wg.showFaceOverlay(false);
    if (wg.showFaceFeedbackBox) wg.showFaceFeedbackBox(false);
    if (wg.showPredictionPoints) wg.showPredictionPoints(false);

    appState = 'TRACKING';
    fillFog(); // Wipe the loading text completely
    drawBrush(); // Start the painting loop

  } catch (error) {
    console.error("WebGazer crashed while trying to start:", error);
    currentError = error.message || error.toString();
    appState = 'ERROR';
    resize(); // Trigger UI update to error state
  }
});