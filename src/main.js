// ─── Passages (random quote or science fact each session) ─────────────────────
const PASSAGES = [
  // ── Quotes ──────────────────────────────────────────────────────────────────
  { body: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.", credit: "— Carl Sagan" },
  { body: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.", credit: "— Albert Einstein" },
  { body: "The only true wisdom is in knowing you know nothing.", credit: "— Socrates" },
  { body: "In the depth of winter, I finally learned that within me there lay an invincible summer.", credit: "— Albert Camus" },
  { body: "We are all just walking each other home.", credit: "— Ram Dass" },
  { body: "Not all those who wander are lost.", credit: "— J.R.R. Tolkien" },
  { body: "The measure of intelligence is the ability to change.", credit: "— Albert Einstein" },
  { body: "You only live once, but if you do it right, once is enough.", credit: "— Mae West" },
  { body: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.", credit: "— Viktor Frankl" },
  { body: "You have power over your mind, not outside events. Realize this, and you will find strength.", credit: "— Marcus Aurelius" },
  { body: "Out beyond ideas of wrongdoing and rightdoing there is a field. I'll meet you there.", credit: "— Rumi" },
  { body: "A journey of a thousand miles begins with a single step.", credit: "— Lao Tzu" },
  { body: "I would rather have questions that can't be answered than answers that can't be questioned.", credit: "— Richard Feynman" },
  { body: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.", credit: "— Marie Curie" },
  { body: "If you want to find the secrets of the universe, think in terms of energy, frequency, and vibration.", credit: "— Nikola Tesla" },
  { body: "If I have seen further it is by standing on the shoulders of giants.", credit: "— Isaac Newton" },
  { body: "Excellence is not an act but a habit. We are what we repeatedly do.", credit: "— Aristotle" },
  { body: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", credit: "— Ralph Waldo Emerson" },
  { body: "Travel is fatal to prejudice, bigotry, and narrow-mindedness.", credit: "— Mark Twain" },
  { body: "Do the best you can until you know better. Then when you know better, do better.", credit: "— Maya Angelou" },
  { body: "It always seems impossible until it's done.", credit: "— Nelson Mandela" },
  { body: "Success is stumbling from failure to failure with no loss of enthusiasm.", credit: "— Winston Churchill" },
  { body: "Life is either a daring adventure or nothing at all.", credit: "— Helen Keller" },
  { body: "The mind is everything. What you think, you become.", credit: "— Buddha" },
  { body: "It does not matter how slowly you go as long as you do not stop.", credit: "— Confucius" },
  { body: "Not everything that is faced can be changed, but nothing can be changed until it is faced.", credit: "— James Baldwin" },
  { body: "Beauty will save the world.", credit: "— Fyodor Dostoevsky" },
  { body: "Pain is inevitable. Suffering is optional.", credit: "— Haruki Murakami" },
  { body: "A book must be the axe for the frozen sea within us.", credit: "— Franz Kafka" },
  { body: "The world breaks everyone, and afterward, some are strong at the broken places.", credit: "— Ernest Hemingway" },
  { body: "You cannot find peace by avoiding life.", credit: "— Virginia Woolf" },
  { body: "Mistakes are the portals of discovery.", credit: "— James Joyce" },
  { body: "All of humanity's problems stem from man's inability to sit quietly in a room alone.", credit: "— Blaise Pascal" },
  { body: "Doubt is an uncomfortable condition, but certainty is an absurd one.", credit: "— Voltaire" },
  { body: "I think, therefore I am.", credit: "— René Descartes" },
  { body: "Two things fill the mind with ever-increasing wonder: the starry sky above me and the moral law within me.", credit: "— Immanuel Kant" },
  { body: "If the doors of perception were cleansed, everything would appear to man as it is — infinite.", credit: "— William Blake" },
  { body: "Do not go where the path may lead; go instead where there is no path and leave a trail.", credit: "— Ralph Waldo Emerson" },
  { body: "Go confidently in the direction of your dreams. Live the life you have imagined.", credit: "— Henry David Thoreau" },
  { body: "Hope is the thing with feathers that perches in the soul and sings the tune without the words and never stops at all.", credit: "— Emily Dickinson" },
  { body: "All that we see or seem is but a dream within a dream.", credit: "— Edgar Allan Poe" },
  { body: "We shall not cease from exploration, and the end of all our exploring will be to arrive where we started and know the place for the first time.", credit: "— T.S. Eliot" },
  { body: "When you want something, all the universe conspires in helping you to achieve it.", credit: "— Paulo Coelho" },
  { body: "Who looks outside, dreams; who looks inside, awakes.", credit: "— Carl Jung" },
  { body: "Unexpressed emotions will never die. They are buried alive and will come forth later in uglier ways.", credit: "— Sigmund Freud" },
  { body: "Whatever you are, be a good one.", credit: "— Abraham Lincoln" },
  { body: "Do what you can, with what you have, where you are.", credit: "— Theodore Roosevelt" },
  { body: "The time is always right to do what is right.", credit: "— Martin Luther King Jr." },
  { body: "Be the change you wish to see in the world.", credit: "— Mahatma Gandhi" },
  { body: "If you judge people, you have no time to love them.", credit: "— Mother Teresa" },
  { body: "My religion is very simple. My religion is kindness.", credit: "— Dalai Lama" },
  { body: "The present moment is the only moment available to us, and it is the door to all moments.", credit: "— Thich Nhat Hanh" },
  { body: "It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all.", credit: "— J.K. Rowling" },
  { body: "Vulnerability is not winning or losing. It's having the courage to show up when you can't control the outcome.", credit: "— Brené Brown" },
  { body: "The really important kind of freedom involves attention and awareness and discipline, and being able truly to care about other people.", credit: "— David Foster Wallace" },
  { body: "The creative adult is the child who survived.", credit: "— Ursula K. Le Guin" },
  { body: "In a time of universal deceit, telling the truth is a revolutionary act.", credit: "— George Orwell" },
  { body: "The secret of genius is to carry the spirit of the child into old age, which means never losing your enthusiasm.", credit: "— Aldous Huxley" },
  { body: "The whole problem with the world is that fools and fanatics are always so certain of themselves, and wiser people so full of doubts.", credit: "— Bertrand Russell" },
  { body: "I am not afraid of storms, for I am learning how to sail my ship.", credit: "— Louisa May Alcott" },
  { body: "We accept the love we think we deserve.", credit: "— Stephen Chbosky" },
  { body: "In the middle of difficulty lies opportunity.", credit: "— Albert Einstein" },
  { body: "The unexamined life is not worth living.", credit: "— Socrates" },
  { body: "Wherever you go, go with all your heart.", credit: "— Confucius" },
  { body: "Turn your wounds into wisdom.", credit: "— Oprah Winfrey" },
  { body: "You can't go back and change the beginning, but you can start where you are and change the ending.", credit: "— C.S. Lewis" },
  { body: "The only way out of the labyrinth of suffering is to forgive.", credit: "— John Green" },
  { body: "Stars can't shine without darkness.", credit: "— D.H. Sidebottom" },
  { body: "Every moment is a fresh beginning.", credit: "— T.S. Eliot" },
  { body: "What we think, we become.", credit: "— Buddha" },
  { body: "Happiness is not something ready-made. It comes from your own actions.", credit: "— Dalai Lama" },
  { body: "The cave you fear to enter holds the treasure you seek.", credit: "— Joseph Campbell" },
  { body: "Reality is merely an illusion, albeit a very persistent one.", credit: "— Albert Einstein" },
  { body: "The greatest glory in living lies not in never falling, but in rising every time we fall.", credit: "— Nelson Mandela" },
  { body: "To live is the rarest thing in the world. Most people exist, that is all.", credit: "— Oscar Wilde" },
  { body: "I have not failed. I've just found 10,000 ways that won't work.", credit: "— Thomas Edison" },
  { body: "Life is what happens when you're busy making other plans.", credit: "— John Lennon" },
  { body: "The only impossible journey is the one you never begin.", credit: "— Tony Robbins" },
  { body: "If you look at what you have in life, you'll always have more. If you look at what you don't have, you'll never have enough.", credit: "— Oprah Winfrey" },
  { body: "You miss 100% of the shots you don't take.", credit: "— Wayne Gretzky" },
  { body: "Whether you think you can or you think you can't, you're right.", credit: "— Henry Ford" },
  { body: "The two most important days in your life are the day you are born and the day you find out why.", credit: "— Mark Twain" },
  { body: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", credit: "— Maya Angelou" },
  // ── Science Facts ────────────────────────────────────────────────────────────
  { body: "A day on Venus is longer than a year on Venus. It rotates so slowly that it completes a full orbit around the Sun before finishing a single spin.", credit: "◆ Science Fact" },
  { body: "There are more possible chess games than atoms in the observable universe — over 10¹²⁰ unique games can be played.", credit: "◆ Science Fact" },
  { body: "Honey never expires. Archaeologists found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.", credit: "◆ Science Fact" },
  { body: "Light from the Sun takes 8 minutes and 20 seconds to reach Earth. Every time you glance at the sky, you are seeing 8 minutes into the past.", credit: "◆ Science Fact" },
  { body: "Octopuses have three hearts, blue blood, and nine brains — one central brain and one for each arm.", credit: "◆ Science Fact" },
  { body: "Your body replaces roughly 330 billion cells per day — about 3.8 million every second. You are not the same person you were a year ago.", credit: "◆ Science Fact" },
  { body: "The human eye can distinguish about 10 million different colors, yet the brain invents most of what you think you see.", credit: "◆ Science Fact" },
  { body: "Sharks are older than trees. Sharks have existed for over 450 million years; trees appeared only around 350 million years ago.", credit: "◆ Science Fact" },
  { body: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza.", credit: "◆ Science Fact" },
  { body: "Mantis shrimp have 16 types of color receptors — humans have just 3. They can see colors entirely invisible to us.", credit: "◆ Science Fact" },
  { body: "The Moon is drifting away from Earth at a rate of about 3.8 centimetres per year. In the distant past, it was much closer and appeared far larger in the sky.", credit: "◆ Science Fact" },
  { body: "Every atom in your body was forged inside a dying star. The iron in your blood, the calcium in your bones — all were born in stellar explosions.", credit: "◆ Science Fact" },
  { body: "A single bolt of lightning is approximately five times hotter than the surface of the Sun, reaching around 30,000 Kelvin.", credit: "◆ Science Fact" },
  { body: "Roughly 99% of Earth's gold lies in its core. The gold near the surface arrived later, delivered by meteorite impacts over billions of years.", credit: "◆ Science Fact" },
  { body: "Neptune was discovered through mathematics before it was ever observed. Astronomers predicted its existence from irregularities in Uranus's orbit.", credit: "◆ Science Fact" },
  { body: "Hot water can freeze faster than cold water under certain conditions — a phenomenon known as the Mpemba effect, still not fully explained.", credit: "◆ Science Fact" },
  { body: "Diamonds rain down on Neptune and Uranus. The extreme pressure in their interiors converts carbon into diamond crystals that sink toward the core.", credit: "◆ Science Fact" },
  { body: "A teaspoon of neutron star material would weigh approximately a billion tonnes on Earth. That is the density of crushing a mountain into a sugar cube.", credit: "◆ Science Fact" },
  { body: "Water is one of the very few substances that expands when it freezes. This is why ice floats — and why aquatic life can survive beneath frozen lakes.", credit: "◆ Science Fact" },
  { body: "There are more trees on Earth than stars in the Milky Way galaxy. Earth has roughly 3 trillion trees; the Milky Way has an estimated 200–400 billion stars.", credit: "◆ Science Fact" },
  { body: "A solar day on Mercury lasts 176 Earth days — twice as long as its year. Mercury orbits the Sun every 88 days, but spins so slowly one day spans two years.", credit: "◆ Science Fact" },
  { body: "Tardigrades — microscopic animals also called water bears — can survive the vacuum of outer space, boiling temperatures, and radiation doses lethal to all other known life.", credit: "◆ Science Fact" },
  { body: "If you uncoiled all the DNA in a single human body and stretched it end to end, it would reach approximately 10 billion miles — far beyond Pluto.", credit: "◆ Science Fact" },
  { body: "The observable universe contains an estimated 2 trillion galaxies, each with hundreds of billions of stars.", credit: "◆ Science Fact" },
  { body: "The number of possible distinct shuffles of a standard 52-card deck exceeds the number of atoms in the observable universe by an almost incomprehensible margin.", credit: "◆ Science Fact" },
  { body: "Trees in a forest share nutrients and chemical signals through vast underground fungal networks sometimes called the 'Wood Wide Web.'", credit: "◆ Science Fact" },
  { body: "Crows can recognise individual human faces, hold grudges, and pass that knowledge to their offspring.", credit: "◆ Science Fact" },
  { body: "Oxford University is older than the Aztec Empire. Teaching began at Oxford around 1096 CE; the Aztec Empire was founded in 1428 CE.", credit: "◆ Science Fact" },
  { body: "The Pacific Ocean covers a larger area than all of Earth's land combined — about 165 million square kilometres versus 149 million square kilometres.", credit: "◆ Science Fact" },
  { body: "There are more atoms in a single glass of water than there are glasses of water in all the Earth's oceans.", credit: "◆ Science Fact" },
  { body: "Each second, the Sun converts about 4 million tonnes of matter directly into energy via nuclear fusion — and has been doing so for 4.6 billion years.", credit: "◆ Science Fact" },
  { body: "A photon of light takes roughly 100,000 years to travel from the Sun's core to its surface, then just 8 minutes to cross the remaining 150 million kilometres to Earth.", credit: "◆ Science Fact" },
  { body: "Your brain uses about 20% of your body's total oxygen and caloric energy, despite accounting for only about 2% of your body weight.", credit: "◆ Science Fact" },
  { body: "Sloths can hold their breath for up to 40 minutes by slowing their heart rate — longer than most dolphins and seals.", credit: "◆ Science Fact" },
  { body: "The human nose can detect over 1 trillion distinct smells, far more than the 10,000 commonly cited in older research.", credit: "◆ Science Fact" },
  { body: "Raindrops are not teardrop-shaped. Smaller drops are nearly perfect spheres; larger ones flatten into a shape more like a hamburger bun as they fall.", credit: "◆ Science Fact" },
  { body: "Time actually passes faster at higher altitudes. GPS satellites must correct for this relativistic effect or navigation errors would accumulate by several kilometres per day.", credit: "◆ Science Fact" },
  { body: "The Great Wall of China is not visible from space with the naked eye. The myth was debunked — astronauts cannot discern it without optical aids.", credit: "◆ Science Fact" },
  { body: "Whales evolved from small, four-legged land mammals around 50 million years ago. Their front limbs became flippers; vestigial rear limb bones remain embedded in their bodies.", credit: "◆ Science Fact" },
  { body: "An average cloud weighs around 500,000 kilograms. Clouds appear weightless only because the water droplets are so small they float on updrafts.", credit: "◆ Science Fact" },
  { body: "The magnetic north pole is not stationary — it wanders roughly 50 kilometres per year, driven by shifting electric currents deep in Earth's liquid iron core.", credit: "◆ Science Fact" },
  { body: "The human brain contains approximately 86 billion neurons. Each neuron connects to up to 10,000 others, forming roughly 100 trillion synapses.", credit: "◆ Science Fact" },
  { body: "Lake Baikal in Siberia holds about 20% of all the liquid fresh water on Earth's surface — more than all of North America's Great Lakes combined.", credit: "◆ Science Fact" },
  { body: "Antarctica is technically a desert — it receives less than 200 mm of precipitation per year, making it drier than the Sahara.", credit: "◆ Science Fact" },
  { body: "Voyager 1, launched in 1977, is now more than 23 billion kilometres from Earth. It is the farthest human-made object ever sent into space.", credit: "◆ Science Fact" },
  { body: "Bananas are very mildly radioactive due to their potassium-40 content. You would need to eat millions to receive a harmful dose.", credit: "◆ Science Fact" },
  { body: "The speed of light in a vacuum is exactly 299,792,458 metres per second. This constant is so fundamental that the metre itself is now defined in terms of it.", credit: "◆ Science Fact" },
  { body: "Quantum entanglement allows two particles to be correlated instantly across any distance. Einstein called it 'spooky action at a distance' — yet experiments confirm it is real.", credit: "◆ Science Fact" },
  { body: "Elephants are among the few animals that recognise themselves in mirrors — a sign of self-awareness shared with great apes, dolphins, and some corvids.", credit: "◆ Science Fact" },
  { body: "The Amazon River discharges about 20% of all fresh water entering the world's oceans. At its mouth, fresh water can be detected 200 kilometres offshore.", credit: "◆ Science Fact" },
  { body: "Sound cannot travel through a vacuum. The dramatic explosions seen in space films would, in reality, be completely silent.", credit: "◆ Science Fact" },
  { body: "A single human hair is strong enough to hold approximately 100 grams. A full head of hair — around 100,000 strands — could theoretically lift more than 10 tonnes.", credit: "◆ Science Fact" },
  { body: "The Eiffel Tower grows about 15 centimetres taller in summer. Metal expands when heated; on hot days the tower's iron structure measurably stretches.", credit: "◆ Science Fact" },
  { body: "Glass is technically an amorphous solid, not a liquid — the old myth that ancient window glass is thicker at the bottom comes from how glass was made, not from it flowing.", credit: "◆ Science Fact" },
  { body: "Identical twins do not have identical fingerprints. Although their DNA is nearly the same, fingerprint patterns are shaped by unique environmental pressures in the womb.", credit: "◆ Science Fact" },
  { body: "Helium is the only element on Earth discovered in the Sun before it was found on Earth. Its name comes from Helios, the Greek god of the Sun.", credit: "◆ Science Fact" },
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
