// ─── Passages (random quote or science fact each session) ─────────────────────
const PASSAGES = [
  { body: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.", credit: "— Carl Sagan" },
  { body: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.", credit: "— Albert Einstein" },
  { body: "The only true wisdom is in knowing you know nothing.", credit: "— Socrates" },
  { body: "In the depth of winter, I finally learned that within me there lay an invincible summer.", credit: "— Albert Camus" },
  { body: "We are all just walking each other home.", credit: "— Ram Dass" },
  { body: "Not all those who wander are lost.", credit: "— J.R.R. Tolkien" },
  { body: "The measure of intelligence is the ability to change.", credit: "— Albert Einstein" },
  { body: "You only live once, but if you do it right, once is enough.", credit: "— Mae West" },
  { body: "A day on Venus is longer than a year on Venus. It rotates so slowly that it completes a full orbit around the Sun before finishing a single spin.", credit: "◆ Science Fact" },
  { body: "There are more possible chess games than atoms in the observable universe — over 10¹²⁰ unique games can be played.", credit: "◆ Science Fact" },
  { body: "Honey never expires. Archaeologists found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.", credit: "◆ Science Fact" },
  { body: "Light from the Sun takes 8 minutes and 20 seconds to reach Earth. Every time you glance at the sky, you are seeing 8 minutes into the past.", credit: "◆ Science Fact" },
  { body: "Octopuses have three hearts, blue blood, and nine brains — one central brain and one for each arm.", credit: "◆ Science Fact" },
  { body: "Your body replaces roughly 330 billion cells per day — about 3.8 million every second. You are not the same person you were a year ago.", credit: "◆ Science Fact" },
  { body: "The human eye can distinguish about 10 million different colors, yet the brain invents most of what you think you see.", credit: "◆ Science Fact" },
];

// Pick one random passage per load
const passage = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
document.getElementById('passage-body').textContent   = passage.body;
document.getElementById('passage-credit').textContent = passage.credit;

// ─── Random background (unique per session, no two users see the same one) ───
(function () {
  const h1    = Math.floor(Math.random() * 360);
  const h2    = (h1 + 115 + Math.floor(Math.random() * 30)) % 360;
  const h3    = (h1 + 230 + Math.floor(Math.random() * 30)) % 360;
  const angle = Math.floor(Math.random() * 360);
  const cx    = (18 + Math.random() * 64).toFixed(1);
  const cy    = (-42 + Math.random() * 84).toFixed(1);
  document.body.style.backgroundImage = [
    'linear-gradient(to right,  rgba(255,255,255,0.17) 1px, transparent 1px)',
    'linear-gradient(to bottom, rgba(255,255,255,0.17) 1px, transparent 1px)',
    `conic-gradient(from ${angle}deg at ${cx}% ${cy}%, hsl(${h1},100%,52%), hsl(${h2},100%,52%), hsl(${h3},100%,52%), hsl(${h1},100%,52%))`,
  ].join(', ');
})();

// ─── Canvas ───────────────────────────────────────────────────────────────────
const canvas = document.getElementById('fog-canvas');
const ctx    = canvas.getContext('2d');

let brushX = window.innerWidth  / 2;
let brushY = window.innerHeight / 2;
let targetX = brushX;
let targetY = brushY;

// (pointer: coarse) = primary input is a finger, not a mouse
const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches;

// States: IDLE | BOOTING | CALIBRATING | TRACKING | TOUCH_MODE | ERROR
let state    = 'IDLE';
let errorMsg = '';

// ─── Calibration grid (9 points, normalised 0–1) ──────────────────────────────
const CAL_PTS = [
  [0.5, 0.5],
  [0.1, 0.1], [0.9, 0.1],
  [0.1, 0.9], [0.9, 0.9],
  [0.5, 0.1], [0.5, 0.9],
  [0.1, 0.5], [0.9, 0.5],
];
const CAL_MARGIN = 58;
let calIdx = 0;

const introScreen = document.getElementById('intro-screen');
const startBtn    = document.getElementById('start-btn');
const calOverlay  = document.getElementById('cal-overlay');
const calDot      = document.getElementById('cal-dot');
const calLabel    = document.getElementById('cal-label');
const calSkip     = document.getElementById('cal-skip');

// ─── Brush settings ───────────────────────────────────────────────────────────
const LERP = IS_TOUCH ? 0.20 : 0.14;

function brushRadius() {
  if (state === 'TOUCH_MODE') return 75;   // finger drag: small → harder challenge
  if (IS_TOUCH)               return 100;  // eye tracking on mobile: medium
  return 120;                              // eye tracking on desktop: larger
}

// ─── Canvas resize — preserves fog holes ──────────────────────────────────────
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
  if (snap) ctx.drawImage(snap, 0, 0);
  else renderOverlay();
}
window.addEventListener('resize', resize);
resize();

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function fillFog() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(9, 9, 9, 0.97)'; // near-opaque: cannot read through it
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Word-wrapping canvas text — fixes overflow on small screens
function drawTextWrapped(msg, color, sizePx, dy = 0) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle    = color;
  ctx.font         = `${sizePx}px sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  const maxW  = canvas.width * 0.82;
  const lineH = sizePx * 1.5;
  const words = msg.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = word; }
    else line = test;
  }
  if (line) lines.push(line);

  const startY = canvas.height / 2 + dy - ((lines.length - 1) * lineH) / 2;
  lines.forEach((l, i) => ctx.fillText(l, canvas.width / 2, startY + i * lineH));
}

function renderOverlay() {
  if (state === 'IDLE') {
    fillFog(); // intro card handles the UI; canvas just shows dark fog behind it
  } else if (state === 'BOOTING') {
    fillFog();
    drawTextWrapped('Starting camera — allow access when prompted', 'white', 20);
  } else if (state === 'ERROR') {
    ctx.fillStyle = '#090909';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTextWrapped('Camera access was denied or an error occurred.', '#ff6b6b', 20, -44);
    if (errorMsg) drawTextWrapped(errorMsg.slice(0, 90), '#888', 13, 4);
    drawTextWrapped('Tap anywhere to try again', '#aaa', 16, 56);
  }
}

// ─── Fog brush loop ───────────────────────────────────────────────────────────
function brushLoop() {
  if (state !== 'TRACKING' && state !== 'TOUCH_MODE') return;

  brushX += (targetX - brushX) * LERP;
  brushY += (targetY - brushY) * LERP;

  const R = brushRadius();
  ctx.globalCompositeOperation = 'destination-out';
  const g = ctx.createRadialGradient(brushX, brushY, 0, brushX, brushY, R);
  g.addColorStop(0,    'rgba(0,0,0,1)');
  g.addColorStop(0.45, 'rgba(0,0,0,0.7)');
  g.addColorStop(0.8,  'rgba(0,0,0,0.3)');
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(brushX, brushY, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  requestAnimationFrame(brushLoop);
}

// ─── Calibration ──────────────────────────────────────────────────────────────
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
  calDot.style.animation = 'none'; // restart pulse animation
  void calDot.offsetWidth;
  calDot.style.animation = '';
  const verb = IS_TOUCH ? 'tap' : 'click';
  calLabel.textContent = `Point ${idx + 1} of ${CAL_PTS.length} — look at the dot, then ${verb} it`;
  calSkip.hidden = idx < 4;
}

function finishCalibration() {
  calOverlay.style.display = 'none';
  fillFog();
  brushX = targetX = window.innerWidth  / 2;
  brushY = targetY = window.innerHeight / 2;
  state  = 'TRACKING';
  brushLoop();
}

// pointerup fires for both mouse and touch without delay.
// We do NOT stop propagation so the follow-up 'click' event reaches WebGazer's
// internal listener, which records the click position as a calibration sample.
calDot.addEventListener('pointerup', () => {
  if (state !== 'CALIBRATING') return;
  calIdx++;
  if (calIdx < CAL_PTS.length) showCalPoint(calIdx);
  else finishCalibration();
});

calSkip.addEventListener('pointerup', e => {
  e.stopPropagation(); // skip button is NOT a training sample
  if (state !== 'CALIBRATING') return;
  finishCalibration();
});

// ─── Error handling ───────────────────────────────────────────────────────────
function handleTrackerError(err) {
  console.error('WebGazer error:', err);
  if (IS_TOUCH) {
    // Camera unavailable on this device — fall back to touch-drag reveal
    console.warn('Falling back to touch mode');
    startTouchMode();
  } else {
    errorMsg = err?.message || String(err);
    state = 'ERROR';
    renderOverlay();
  }
}

// ─── Touch mode (fallback when eye tracking unavailable) ─────────────────────
function startTouchMode() {
  brushX = targetX = window.innerWidth  / 2;
  brushY = targetY = window.innerHeight / 2;
  state = 'TOUCH_MODE';
  fillFog();
  brushLoop();
}

window.addEventListener('touchstart', e => {
  if (state !== 'TOUCH_MODE') return;
  const t = e.touches[0];
  brushX = targetX = t.clientX; // snap on first touch — no lerp delay
  brushY = targetY = t.clientY;
}, { passive: true });

document.addEventListener('touchmove', e => {
  if (state !== 'TOUCH_MODE') return;
  e.preventDefault(); // prevent scroll while dragging to reveal
  const t = e.touches[0];
  targetX = t.clientX;
  targetY = t.clientY;
}, { passive: false });

// ─── Start eye tracking ───────────────────────────────────────────────────────
function startEyeTracking() {
  state = 'BOOTING';
  renderOverlay();

  if (typeof window.webgazer === 'undefined') {
    if (IS_TOUCH) { startTouchMode(); return; }
    errorMsg = 'WebGazer did not load — please refresh the page.';
    state = 'ERROR'; renderOverlay(); return;
  }

  // Set params synchronously before begin() ─────────────────────────────────
  if (window.webgazer.params) {
    window.webgazer.params.faceMeshSolutionPath = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh';
    window.webgazer.params.saveDataAcrossSessions = false;
    // Hide all WebGazer UI elements before starting to avoid any visual flash
    window.webgazer.params.showVideo            = false;
    window.webgazer.params.showFaceOverlay      = false;
    window.webgazer.params.showFaceFeedbackBox  = false;
    window.webgazer.params.showGazeDot          = false;
  }

  // CRITICAL for iOS Safari: begin() must be called here, synchronously within
  // the user-gesture call stack. Any await/setTimeout before this line would
  // consume the user-activation token and getUserMedia would be blocked.
  const beginPromise = window.webgazer
    .setGazeListener(data => {
      if (!data) return;
      targetX = data.x;
      targetY = data.y;
    })
    .begin();

  // Resolve the async result — now it is safe to use .then()/.catch()
  Promise.resolve(beginPromise)
    .then(() => {
      const wg = window.webgazer;
      wg.showVideo?.(false);
      wg.showFaceOverlay?.(false);
      wg.showFaceFeedbackBox?.(false);
      wg.showPredictionPoints?.(false);

      calIdx = 0;
      state  = 'CALIBRATING';
      calOverlay.style.display = 'block';
      showCalPoint(0);
    })
    .catch(handleTrackerError);
}

// ─── Intro start button ───────────────────────────────────────────────────────
// Using a real <button> element (not window.click) is critical for iOS Safari:
// Safari requires getUserMedia to be initiated from a real interactive element.
startBtn.addEventListener('click', () => {
  introScreen.style.display = 'none';
  startEyeTracking(); // called synchronously — no await before begin()
});

// Error state: tap anywhere to return to intro screen and try again
window.addEventListener('click', () => {
  if (state !== 'ERROR') return;
  state = 'IDLE';
  fillFog();
  introScreen.style.display = 'flex';
});
