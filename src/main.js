const canvas = document.getElementById('fog-canvas');
const ctx = canvas.getContext('2d');

// Smooth brush position (lerps toward target every frame)
let brushX = window.innerWidth  / 2;
let brushY = window.innerHeight / 2;
let targetX = brushX;
let targetY = brushY;

// Detect touch-primary device (phone / tablet)
// (pointer: coarse) = primary pointer is a finger, not a mouse
const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches;

// States: START | BOOTING | CALIBRATING | TRACKING | TOUCH_MODE | ERROR
let state = 'START';
let errorMsg = '';

// ─── Calibration grid (9 points, as fractions of screen size) ────────────────
const CAL_PTS = [
  [0.5, 0.5],                         // center — start here, easiest gaze
  [0.1, 0.1], [0.9, 0.1],             // top corners
  [0.1, 0.9], [0.9, 0.9],             // bottom corners
  [0.5, 0.1], [0.5, 0.9],             // top/bottom edge centers
  [0.1, 0.5], [0.9, 0.5],             // left/right edge centers
];
const CAL_MARGIN = 58; // px from screen edge so dots aren't clipped
let calIdx = 0;

const calOverlay = document.getElementById('cal-overlay');
const calDot     = document.getElementById('cal-dot');
const calLabel   = document.getElementById('cal-label');
const calSkip    = document.getElementById('cal-skip');

// ─── Brush settings ───────────────────────────────────────────────────────────
// Larger radius compensates for WebGazer's inherent ±100px prediction error.
// Faster lerp means the brush reacts to gaze changes more quickly.
const LERP   = IS_TOUCH ? 0.20 : 0.14;
const RADIUS = IS_TOUCH ? 160  : 130;

// ─── Canvas resize — preserves revealed fog holes ────────────────────────────
function resize() {
  let snap = null;
  if ((state === 'TRACKING' || state === 'TOUCH_MODE') && canvas.width > 0 && canvas.height > 0) {
    snap = Object.assign(document.createElement('canvas'), {
      width: canvas.width, height: canvas.height,
    });
    snap.getContext('2d').drawImage(canvas, 0, 0);
  }

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  if (snap) {
    ctx.drawImage(snap, 0, 0);
  } else {
    renderOverlay();
  }
}
window.addEventListener('resize', resize);
resize();

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function fillFog() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(17, 17, 17, 0.92)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(msg, color, sizePx, dy = 0) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = color;
  ctx.font = `${sizePx}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(msg, canvas.width / 2, canvas.height / 2 + dy);
}

function renderOverlay() {
  if (state === 'START') {
    fillFog();
    if (IS_TOUCH) {
      drawText('Tap here, then drag your finger to reveal the text', 'white', 20);
    } else {
      drawText('Click anywhere to start the eye tracker', 'white', 22);
    }
  } else if (state === 'BOOTING') {
    fillFog();
    drawText('Starting camera — allow access when prompted', 'white', 20);
  } else if (state === 'ERROR') {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawText('Camera access denied or an error occurred.', '#ff6b6b', 20, -35);
    if (errorMsg) drawText(errorMsg.slice(0, 72), '#888', 14, 5);
    drawText('Tap anywhere to try again', '#aaa', 16, 52);
  }
}

// ─── Fog brush loop (runs every frame while TRACKING or TOUCH_MODE) ───────────
function brushLoop() {
  if (state !== 'TRACKING' && state !== 'TOUCH_MODE') return;

  brushX += (targetX - brushX) * LERP;
  brushY += (targetY - brushY) * LERP;

  ctx.globalCompositeOperation = 'destination-out';
  const g = ctx.createRadialGradient(brushX, brushY, 0, brushX, brushY, RADIUS);
  g.addColorStop(0,    'rgba(0,0,0,1)');
  g.addColorStop(0.45, 'rgba(0,0,0,0.7)');
  g.addColorStop(0.8,  'rgba(0,0,0,0.3)');
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(brushX, brushY, RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  requestAnimationFrame(brushLoop);
}

// ─── Calibration helpers ──────────────────────────────────────────────────────
function calPixel(idx) {
  const [rx, ry] = CAL_PTS[idx];
  return {
    x: CAL_MARGIN + Math.round(rx * (window.innerWidth  - 2 * CAL_MARGIN)),
    y: CAL_MARGIN + Math.round(ry * (window.innerHeight - 2 * CAL_MARGIN)),
  };
}

function showCalPoint(idx) {
  const { x, y } = calPixel(idx);
  calDot.style.left = x + 'px';
  calDot.style.top  = y + 'px';
  // Restart CSS pulse animation on each new point
  calDot.style.animation = 'none';
  void calDot.offsetWidth; // force reflow
  calDot.style.animation  = '';
  calLabel.textContent = `Point ${idx + 1} of ${CAL_PTS.length} — look at the dot, then click it`;
  calSkip.hidden = idx < 4; // "Skip" appears only after first 5 points
}

function finishCalibration() {
  calOverlay.style.display = 'none';
  fillFog();
  brushX = targetX = window.innerWidth  / 2;
  brushY = targetY = window.innerHeight / 2;
  state = 'TRACKING';
  brushLoop();
}

// Calibration dot click — let the event bubble so WebGazer records it as
// a training sample (it listens on document for clicks to build its regression model)
calDot.addEventListener('click', () => {
  if (state !== 'CALIBRATING') return;
  calIdx++;
  if (calIdx < CAL_PTS.length) {
    showCalPoint(calIdx);
  } else {
    finishCalibration();
  }
});

// Skip button — NOT a training sample, so stop propagation
calSkip.addEventListener('click', e => {
  e.stopPropagation();
  if (state !== 'CALIBRATING') return;
  finishCalibration();
});

// ─── Start WebGazer (desktop eye tracking) ────────────────────────────────────
async function startEyeTracking() {
  state = 'BOOTING';
  renderOverlay();
  await new Promise(r => setTimeout(r, 80)); // let the browser paint BOOTING text

  try {
    if (window.webgazer?.params) {
      // Point at CDN so WebGazer doesn't request WASM files from our own server
      window.webgazer.params.faceMeshSolutionPath = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh';
      // Always use fresh calibration — stale session data degrades accuracy
      window.webgazer.params.saveDataAcrossSessions = false;
    }

    await window.webgazer
      .setGazeListener(data => {
        if (!data) return;
        targetX = data.x;
        targetY = data.y;
      })
      .begin();

    const wg = window.webgazer;
    wg.showVideo?.(false);
    wg.showFaceOverlay?.(false);
    wg.showFaceFeedbackBox?.(false);
    wg.showPredictionPoints?.(false);

    // Begin calibration phase
    calIdx = 0;
    state = 'CALIBRATING';
    calOverlay.style.display = 'block';
    showCalPoint(0);

  } catch (err) {
    console.error('WebGazer failed to start:', err);
    errorMsg = err.message || String(err);
    state = 'ERROR';
    renderOverlay();
  }
}

// ─── Touch mode (mobile — no WebGazer needed) ─────────────────────────────────
function startTouchMode() {
  brushX = targetX = window.innerWidth  / 2;
  brushY = targetY = window.innerHeight / 2;
  state = 'TOUCH_MODE';
  fillFog();
  brushLoop();
}

// ─── Click / tap — start the experience ───────────────────────────────────────
window.addEventListener('click', async () => {
  if (state === 'BOOTING' || state === 'CALIBRATING') return;
  if (state !== 'START' && state !== 'ERROR') return;

  if (IS_TOUCH) {
    // Mobile: skip WebGazer, use touch position directly
    startTouchMode();
    return;
  }

  if (typeof window.webgazer === 'undefined') {
    errorMsg = 'WebGazer did not load — check your network connection and refresh.';
    state = 'ERROR';
    renderOverlay();
    return;
  }

  await startEyeTracking();
});

// ─── Touch events (TOUCH_MODE) ────────────────────────────────────────────────

// First finger contact: snap brush instantly so reveal starts immediately
window.addEventListener('touchstart', e => {
  if (state === 'START' || state === 'ERROR') {
    // First tap on mobile starts touch mode (fires before 'click')
    if (IS_TOUCH) startTouchMode();
    return;
  }
  if (state !== 'TOUCH_MODE') return;
  const t = e.touches[0];
  brushX = targetX = t.clientX; // snap — no lerp lag on first contact
  brushY = targetY = t.clientY;
}, { passive: true });

// Finger drag: update target (brush lerps toward it each frame)
document.addEventListener('touchmove', e => {
  if (state !== 'TOUCH_MODE') return;
  e.preventDefault(); // prevent page scroll while revealing
  const t = e.touches[0];
  targetX = t.clientX;
  targetY = t.clientY;
}, { passive: false });
