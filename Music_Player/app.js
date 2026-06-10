/* ============================================
   Wavely Music Player — Web Audio API Edition
   ------------------------------------------------
   Audio chain:
     <audio>
        │
   MediaElementSource
        │
     ┌──┴────────────────────────────────────┐
     │ BiquadFilter × 5  (60/250/1k/4k/12k)  │  ← EQ
     └──┬────────────────────────────────────┘
        │
       GainNode  ← volume / mute (post-EQ)
        │
       AnalyserNode  ← FFT for live visualizer
        │
      destination (speakers)
============================================ */

// ---------- Track library (now with real audio URLs) ----------
// All URLs verified CORS-friendly (Google Cloud Storage `vary: Origin` policy).
const tracks = [
  {
    title: "The Neverwritten Role Playing Game",
    artist: "Kangaroo MusiQue",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    cover: "NR",
    colors: ["#a872ff", "#ff6ad5"],
    liked: true,
    lyrics: [
      { t: 0,   text: "♪  Instrumental  ♪" },
      { t: 6,   text: "A neverwritten tale unfolds" },
      { t: 14,  text: "Roll the dice, the story's told" },
      { t: 24,  text: "Heroes rising from the dust" },
      { t: 34,  text: "Forge the blade, learn to trust" },
      { t: 46,  text: "[ Adventure awaits ]" },
      { t: 58,  text: "Quest beyond the violet sky" },
      { t: 72,  text: "Dragons fall as we ride by" },
      { t: 88,  text: "♪  Battle theme  ♪" },
      { t: 110, text: "Stand together, hand in hand" },
      { t: 134, text: "Write our names across the land" },
      { t: 160, text: "♪" },
    ]
  },
  {
    title: "Untitled (nbsp)",
    artist: "Sevish",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
    cover: "SV",
    colors: ["#6a3df0", "#00d9ff"],
    liked: false,
    lyrics: [
      { t: 0,   text: "♪  Microtonal Electronica  ♪" },
      { t: 8,   text: "Tuning systems bend and flow" },
      { t: 18,  text: "Notes between the notes you know" },
      { t: 32,  text: "Strange and beautiful machine" },
      { t: 48,  text: "Sounds you've never heard between" },
      { t: 68,  text: "[ Drop ]" },
      { t: 80,  text: "Frequencies that twist and bend" },
      { t: 100, text: "Mathematics, your new friend" },
      { t: 130, text: "♪  Synthesis  ♪" },
      { t: 170, text: "Echoes of a thousand keys" },
      { t: 210, text: "Floating on harmonic seas" },
    ]
  },
  {
    title: "Epoq Lepidoptera",
    artist: "Open Source Audio",
    src: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
    cover: "EL",
    colors: ["#ff9966", "#ff5e62"],
    liked: true,
    lyrics: [
      { t: 0,   text: "♪  Cinematic Score  ♪" },
      { t: 10,  text: "Wings of fire across the dawn" },
      { t: 24,  text: "Butterflies of crimson form" },
      { t: 42,  text: "Rising on a thermal wave" },
      { t: 60,  text: "Lepidoptera, fierce and brave" },
      { t: 82,  text: "[ Crescendo ]" },
      { t: 100, text: "Fan the flames, ignite the sky" },
      { t: 130, text: "All the colors learn to fly" },
      { t: 165, text: "♪  Coda  ♪" },
      { t: 200, text: "Settle softly back to earth" },
    ]
  },
  {
    title: "Menu Theme",
    artist: "RiceRacer",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg",
    cover: "RR",
    colors: ["#11998e", "#38ef7d"],
    liked: false,
    lyrics: [
      { t: 0,  text: "♪  Game Menu Loop  ♪" },
      { t: 6,  text: "Engines purring, ready to go" },
      { t: 14, text: "Choose your ride, take it slow" },
      { t: 24, text: "Neon paint on chrome and steel" },
      { t: 32, text: "Feel the rumble, grip the wheel" },
      { t: 44, text: "[ Press Start ]" },
      { t: 56, text: "Race the night, beat the dawn" },
      { t: 70, text: "♪" },
    ]
  },
  {
    title: "Crystal Hours",
    artist: "Kangaroo MusiQue (alt)",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    cover: "CH",
    colors: ["#667eea", "#764ba2"],
    liked: true,
    lyrics: [
      { t: 0,  text: "Crystal Hours" },
      { t: 4,  text: "Hours like glass, fragile and thin" },
      { t: 12, text: "Holding all the light within" },
      { t: 20, text: "Don't let go, don't let it fall" },
      { t: 28, text: "These crystal hours hold us all" },
      { t: 36, text: "[ Chorus ]" },
      { t: 40, text: "Spin slow, spin slow" },
      { t: 46, text: "Watch the prism colors flow" },
      { t: 54, text: "Crystal hours, holding tight" },
      { t: 60, text: "All the magic of the night" },
    ]
  },
  {
    title: "Lavender Pulse",
    artist: "Sevish (alt)",
    src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
    cover: "LP",
    colors: ["#c471f5", "#fa71cd"],
    liked: false,
    lyrics: [
      { t: 0,  text: "Lavender Pulse" },
      { t: 4,  text: "Soft as petals on your skin" },
      { t: 12, text: "This is where the dream begins" },
      { t: 20, text: "Lavender breathing in my veins" },
      { t: 28, text: "Pulsing soft like summer rain" },
      { t: 40, text: "[ Chorus ]" },
      { t: 46, text: "Pulse, pulse, slow and deep" },
      { t: 54, text: "In the garden where we sleep" },
    ]
  },
];

// ---------- State ----------
const state = {
  currentIndex: 0,
  isPlaying: false,
  volume: 0.75,
  prevVolume: 0.75,
  muted: false,
  shuffle: false,
  repeat: false,            // false | 'all' | 'one'
  searchQuery: "",
  activeTab: "lyrics",
  eqPreset: "flat",
  eqBands: { bass: 0, lowmid: 0, mid: 0, highmid: 0, treble: 0 },
  audioReady: false,        // Web Audio graph built
  loading: false,
};

// ---------- DOM refs ----------
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const audioEl     = $("#audio");
const vinyl       = $("#vinyl");
const vinylArt    = $("#vinylArt");
const trackTitle  = $("#trackTitle");
const trackArtist = $("#trackArtist");
const playBtn     = $("#playBtn");
const prevBtn     = $("#prevBtn");
const nextBtn     = $("#nextBtn");
const shuffleBtn  = $("#shuffleBtn");
const repeatBtn   = $("#repeatBtn");
const progress    = $("#progress");
const progressFill= $("#progressFill");
const progressKnob= $("#progressKnob");
const progressBuf = $("#progressBuf");
const curTimeEl   = $("#curTime");
const durTimeEl   = $("#durTime");
const volume      = $("#volume");
const volLabel    = $("#volLabel");
const volIconBtn  = $("#volIconBtn");
const visualizer  = $("#visualizer");
const playlistEl  = $("#playlist");
const playlistSub = $("#playlistSub");
const emptyState  = $("#emptyState");
const searchInput = $("#searchInput");
const searchWrap  = searchInput.parentElement;
const clearSearch = $("#clearSearch");
const filterBadge = $("#filterBadge");
const themeToggle = $("#themeToggle");
const orb1 = $("#orb1"), orb2 = $("#orb2"), orb3 = $("#orb3");
const lyricsScroll= $("#lyricsScroll");
const lyricsInner = $("#lyricsInner");
const tabBtns     = $$(".tab-btn");
const panelLyrics = $("#panelLyrics");
const panelEq     = $("#panelEq");
const eqPresets   = $("#eqPresets");
const eqSliders   = $("#eqSliders");
const statusPill  = $("#statusPill");

// ---------- Utility ----------
const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  s = Math.floor(s);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
};
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}
function highlight(text, q) {
  if (!q) return escapeHtml(text);
  const safe = escapeHtml(text);
  const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(`(${safeQ})`, "ig"), '<mark class="match">$1</mark>');
}
function setStatus(text, kind = "info") {
  if (!statusPill) return;
  statusPill.textContent = text;
  statusPill.dataset.kind = kind;
  statusPill.classList.toggle("visible", !!text);
}

// =====================================================
//   WEB AUDIO GRAPH
// =====================================================
let audioCtx = null;
let sourceNode = null;
let eqFilters = {};   // bass/lowmid/mid/highmid/treble
let masterGain = null;
let analyser = null;
let freqData = null;

const EQ_BANDS = [
  { name: "bass",    type: "lowshelf",  freq: 60,    Q: 0.7 },
  { name: "lowmid",  type: "peaking",   freq: 250,   Q: 1.0 },
  { name: "mid",     type: "peaking",   freq: 1000,  Q: 1.0 },
  { name: "highmid", type: "peaking",   freq: 4000,  Q: 1.0 },
  { name: "treble",  type: "highshelf", freq: 12000, Q: 0.7 },
];

function buildAudioGraph() {
  if (audioCtx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AC();

  sourceNode = audioCtx.createMediaElementSource(audioEl);

  // Build filter chain
  let prev = sourceNode;
  for (const band of EQ_BANDS) {
    const filter = audioCtx.createBiquadFilter();
    filter.type = band.type;
    filter.frequency.value = band.freq;
    filter.Q.value = band.Q;
    filter.gain.value = state.eqBands[band.name] || 0;
    prev.connect(filter);
    eqFilters[band.name] = filter;
    prev = filter;
  }

  // Master gain (controls volume post-EQ so EQ shape isn't affected)
  masterGain = audioCtx.createGain();
  masterGain.gain.value = state.muted ? 0 : state.volume;
  prev.connect(masterGain);

  // Analyser for real visualizer
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;        // 128 freq bins
  analyser.smoothingTimeConstant = 0.78;
  freqData = new Uint8Array(analyser.frequencyBinCount);
  masterGain.connect(analyser);

  // To speakers
  analyser.connect(audioCtx.destination);

  state.audioReady = true;
}

async function ensureAudioContext() {
  if (!audioCtx) buildAudioGraph();
  if (audioCtx.state === "suspended") {
    try { await audioCtx.resume(); } catch (e) {}
  }
}

// =====================================================
//   VISUALIZER  (real FFT when playing, idle wave otherwise)
// =====================================================
const BAR_COUNT = 48;
const bars = [];
for (let i = 0; i < BAR_COUNT; i++) {
  const b = document.createElement("div");
  b.className = "viz-bar";
  visualizer.appendChild(b);
  bars.push(b);
}

// Logarithmic bin mapping: bass bins are tightly packed in FFT,
// so we sample more coarsely at the low end and finely at the high end.
function logBinIndex(barIdx, totalBars, binCount) {
  // skip the very lowest bin (DC) and highest few (noisy/ultrasonic)
  const minBin = 1;
  const maxBin = Math.floor(binCount * 0.85);
  const t = barIdx / (totalBars - 1);
  // log mapping
  return Math.floor(minBin * Math.pow(maxBin / minBin, t));
}

function drawVisualizer() {
  if (state.isPlaying && analyser && audioCtx && audioCtx.state === "running") {
    analyser.getByteFrequencyData(freqData);
    const binCount = analyser.frequencyBinCount;
    for (let i = 0; i < BAR_COUNT; i++) {
      // Average a small window around each log-sampled bin for smoother bars
      const center = logBinIndex(i, BAR_COUNT, binCount);
      const win = Math.max(1, Math.floor(binCount / BAR_COUNT / 2));
      let sum = 0, count = 0;
      for (let j = center - win; j <= center + win; j++) {
        if (j >= 0 && j < binCount) { sum += freqData[j]; count++; }
      }
      const v = count ? sum / count : 0;
      const norm = v / 255;
      // Slight per-band emphasis to make output feel lively
      const bell = 0.7 + 0.5 * Math.sin((i / (BAR_COUNT - 1)) * Math.PI);
      const h = 4 + Math.pow(norm, 0.85) * 40 * bell;
      bars[i].style.height = h + "px";
    }
  } else {
    // Idle: gentle sine ripple
    const t = performance.now() / 1000;
    for (let i = 0; i < BAR_COUNT; i++) {
      const wave = (Math.sin(t * 1.8 + i * 0.35) + 1) * 0.5;
      bars[i].style.height = (5 + wave * 4) + "px";
    }
  }
  requestAnimationFrame(drawVisualizer);
}
requestAnimationFrame(drawVisualizer);

// =====================================================
//   PROGRESS / LYRICS LOOP
// =====================================================
function tick() {
  if (!audioEl.paused && audioEl.duration) {
    renderProgress();
    renderLyrics();
  }
  // buffered region
  if (audioEl.buffered && audioEl.buffered.length && audioEl.duration) {
    const end = audioEl.buffered.end(audioEl.buffered.length - 1);
    progressBuf.style.width = (end / audioEl.duration * 100) + "%";
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function renderProgress() {
  const dur = audioEl.duration || 0;
  const cur = audioEl.currentTime || 0;
  const pct = dur ? (cur / dur) * 100 : 0;
  progressFill.style.width = pct + "%";
  progressKnob.style.left = pct + "%";
  curTimeEl.textContent = fmtTime(cur);
  durTimeEl.textContent = fmtTime(dur);
}

// =====================================================
//   TRACK LOADING
// =====================================================
function loadTrack(idx, { autoplay = true } = {}) {
  state.currentIndex = idx;
  const t = tracks[idx];

  trackTitle.textContent = t.title;
  trackArtist.textContent = t.artist;

  // cover art (SVG with gradient)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0' stop-color='${t.colors[0]}'/>
      <stop offset='1' stop-color='${t.colors[1]}'/>
    </linearGradient></defs>
    <rect width='100' height='100' fill='url(#g)'/>
    <text x='50' y='58' text-anchor='middle'
      font-family='Space Grotesk, sans-serif' font-weight='700'
      font-size='34' fill='white' opacity='.9'>${t.cover}</text>
  </svg>`;
  vinylArt.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);

  // Background orbs follow the track palette
  orb1.style.background = `radial-gradient(circle, ${t.colors[0]}, transparent 70%)`;
  orb2.style.background = `radial-gradient(circle, ${t.colors[1]}, transparent 70%)`;
  orb3.style.background = `radial-gradient(circle, ${t.colors[0]}88, transparent 70%)`;

  // Highlight playlist row
  $$(".track").forEach(el => {
    el.classList.toggle("active", Number(el.dataset.idx) === idx);
  });

  renderLyricsList();

  // Set the source. CORS attribute is set in HTML on the <audio> element.
  state.loading = true;
  setStatus("Loading…", "info");
  audioEl.src = t.src;
  audioEl.load();

  if (autoplay) {
    // play() may throw if user hasn't interacted yet; we catch silently
    audioEl.play().catch(() => {
      pause();
      setStatus("Click play to start", "warn");
    });
  }
}

function play() {
  ensureAudioContext().then(() => {
    audioEl.play().then(() => {
      state.isPlaying = true;
      playBtn.classList.add("playing");
      vinyl.classList.add("playing");
    }).catch(err => {
      console.warn("play() rejected:", err);
      setStatus("Playback blocked — click play again", "warn");
    });
  });
}
function pause() {
  audioEl.pause();
  state.isPlaying = false;
  playBtn.classList.remove("playing");
  vinyl.classList.remove("playing");
}
function toggle() { audioEl.paused ? play() : pause(); }

function nextTrack(auto = false) {
  let idx;
  if (state.shuffle) {
    do { idx = Math.floor(Math.random() * tracks.length); }
    while (idx === state.currentIndex && tracks.length > 1);
  } else {
    idx = (state.currentIndex + 1) % tracks.length;
    if (auto && idx === 0 && !state.repeat) {
      loadTrack(0, { autoplay: false });
      return;
    }
  }
  loadTrack(idx, { autoplay: true });
}
function prevTrack() {
  if (audioEl.currentTime > 3) { audioEl.currentTime = 0; return; }
  let idx = state.currentIndex - 1;
  if (idx < 0) idx = tracks.length - 1;
  loadTrack(idx);
}

// =====================================================
//   <audio> EVENT WIRING
// =====================================================
audioEl.addEventListener("loadedmetadata", () => {
  durTimeEl.textContent = fmtTime(audioEl.duration);
  renderProgress();
});
audioEl.addEventListener("canplay", () => {
  state.loading = false;
  setStatus("", "info");
});
audioEl.addEventListener("waiting", () => setStatus("Buffering…", "info"));
audioEl.addEventListener("playing", () => {
  state.isPlaying = true;
  playBtn.classList.add("playing");
  vinyl.classList.add("playing");
  setStatus("", "info");
});
audioEl.addEventListener("pause", () => {
  state.isPlaying = false;
  playBtn.classList.remove("playing");
  vinyl.classList.remove("playing");
});
audioEl.addEventListener("ended", () => {
  if (state.repeat === "one") {
    audioEl.currentTime = 0; audioEl.play();
  } else {
    nextTrack(true);
  }
});
audioEl.addEventListener("error", () => {
  console.error("audio error", audioEl.error);
  setStatus("Audio failed to load (CORS/network)", "error");
  pause();
});

// =====================================================
//   PLAYLIST RENDER
// =====================================================
function renderPlaylist() {
  const q = state.searchQuery.trim().toLowerCase();
  const filtered = !q ? tracks.slice() :
    tracks.filter(t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q));

  playlistEl.innerHTML = "";
  filtered.forEach(t => {
    const idx = tracks.indexOf(t);
    const li = document.createElement("li");
    li.className = "track" + (idx === state.currentIndex ? " active" : "");
    li.dataset.idx = idx;

    const cSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <defs><linearGradient id='gg${idx}' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0' stop-color='${t.colors[0]}'/>
        <stop offset='1' stop-color='${t.colors[1]}'/>
      </linearGradient></defs>
      <rect width='100' height='100' fill='url(#gg${idx})'/></svg>`;
    const cUrl = "data:image/svg+xml;utf8," + encodeURIComponent(cSvg);

    li.innerHTML = `
      <span class="track-num">${String(idx + 1).padStart(2, "0")}</span>
      <span class="track-eq-icon"><span></span><span></span><span></span></span>
      <div class="track-cover" style="background-image:url('${cUrl}');background-size:cover">${t.cover}</div>
      <div class="track-info">
        <div class="track-name">${highlight(t.title, q)}</div>
        <div class="track-artist-name">${highlight(t.artist, q)}</div>
      </div>
      <span class="track-duration" data-dur="${idx}">—</span>
      <button class="like-btn ${t.liked ? "liked" : ""}" aria-label="Like">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>`;

    li.querySelector(".like-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      t.liked = !t.liked;
      e.currentTarget.classList.toggle("liked", t.liked);
    });
    li.addEventListener("click", () => loadTrack(idx));
    playlistEl.appendChild(li);
  });

  // counters
  const total = tracks.length, matched = filtered.length;
  if (q) {
    filterBadge.hidden = false;
    filterBadge.textContent = `${matched} of ${total} matches`;
    playlistSub.textContent = `Filtering by "${q}"`;
  } else {
    filterBadge.hidden = true;
    playlistSub.textContent = `${total} tracks · streaming live`;
  }
  emptyState.hidden = matched > 0;
  playlistEl.style.display = matched > 0 ? "" : "none";
}

// =====================================================
//   LYRICS
// =====================================================
function renderLyricsList() {
  const t = tracks[state.currentIndex];
  lyricsInner.innerHTML = "";
  t.lyrics.forEach((line, i) => {
    const div = document.createElement("div");
    div.className = "lyric-line";
    div.dataset.t = line.t; div.dataset.i = i;
    div.textContent = line.text;
    div.addEventListener("click", () => {
      audioEl.currentTime = line.t;
      renderProgress(); renderLyrics();
      if (audioEl.paused) play();
    });
    lyricsInner.appendChild(div);
  });
  renderLyrics(true);
}
function renderLyrics(force = false) {
  const t = tracks[state.currentIndex];
  const cur = audioEl.currentTime || 0;
  let activeIdx = 0;
  for (let i = 0; i < t.lyrics.length; i++) {
    if (t.lyrics[i].t <= cur) activeIdx = i;
  }
  const lines = lyricsInner.querySelectorAll(".lyric-line");
  if (!lines.length) return;
  let changed = false;
  lines.forEach((ln, i) => {
    const was = ln.classList.contains("active");
    const is = i === activeIdx;
    if (is !== was) { ln.classList.toggle("active", is); changed = true; }
  });
  if (changed || force) {
    const active = lines[activeIdx];
    if (active) {
      const scrollH = lyricsScroll.clientHeight;
      const lineTop = active.offsetTop + active.offsetHeight / 2;
      lyricsInner.style.transform = `translateY(${scrollH / 2 - lineTop}px)`;
    }
  }
}

// =====================================================
//   TABS
// =====================================================
tabBtns.forEach(b => b.addEventListener("click", () => {
  tabBtns.forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  const tab = b.dataset.tab;
  state.activeTab = tab;
  panelLyrics.classList.toggle("active", tab === "lyrics");
  panelEq.classList.toggle("active", tab === "eq");
}));

// =====================================================
//   EQUALIZER  (writes to BiquadFilter.gain in real time)
// =====================================================
const PRESETS = {
  flat:       { bass:  0, lowmid:  0, mid:  0, highmid:  0, treble:  0 },
  bass:       { bass: 10, lowmid:  5, mid:  0, highmid: -2, treble: -3 },
  vocal:      { bass: -4, lowmid: -2, mid:  6, highmid:  4, treble:  1 },
  rock:       { bass:  5, lowmid:  2, mid: -1, highmid:  3, treble:  6 },
  electronic: { bass:  7, lowmid: -2, mid: -3, highmid:  2, treble:  8 },
  acoustic:   { bass:  3, lowmid:  4, mid:  3, highmid:  2, treble:  4 },
};

function applyEqValuesToUI() {
  eqSliders.querySelectorAll("input[type=range]").forEach(inp => {
    const band = inp.dataset.band;
    inp.value = state.eqBands[band];
    const lbl = eqSliders.querySelector(`[data-val="${band}"]`);
    const v = state.eqBands[band];
    lbl.textContent = (v > 0 ? "+" : "") + v + " dB";
    lbl.style.color = v > 0 ? "var(--purple-2)"
                    : v < 0 ? "var(--text-mute)"
                    : "var(--text-dim)";
  });
}
function applyEqToAudio() {
  if (!eqFilters.bass) return;
  for (const band of EQ_BANDS) {
    const node = eqFilters[band.name];
    // Smooth ramp prevents zipper noise
    const now = audioCtx.currentTime;
    node.gain.cancelScheduledValues(now);
    node.gain.setTargetAtTime(state.eqBands[band.name], now, 0.02);
  }
}

eqSliders.addEventListener("input", (e) => {
  if (e.target.matches("input[type=range]")) {
    const band = e.target.dataset.band;
    state.eqBands[band] = Number(e.target.value);
    state.eqPreset = "custom";
    eqPresets.querySelectorAll(".preset").forEach(p => p.classList.remove("active"));
    applyEqValuesToUI();
    applyEqToAudio();
  }
});
eqPresets.addEventListener("click", (e) => {
  const btn = e.target.closest(".preset");
  if (!btn) return;
  const name = btn.dataset.preset;
  state.eqPreset = name;
  state.eqBands = { ...PRESETS[name] };
  eqPresets.querySelectorAll(".preset").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  applyEqValuesToUI();
  applyEqToAudio();
});

// =====================================================
//   VOLUME
// =====================================================
function applyVolume() {
  volume.value = Math.round(state.volume * 100);
  volume.style.setProperty("--vol", (state.volume * 100) + "%");
  volLabel.textContent = Math.round(state.volume * 100) + "%";
  volIconBtn.classList.toggle("muted", state.volume === 0);
  volIconBtn.classList.toggle("low", state.volume > 0 && state.volume < 0.4);
  // Apply to the audio graph if ready, else to the element directly
  if (masterGain && audioCtx) {
    masterGain.gain.setTargetAtTime(state.volume, audioCtx.currentTime, 0.01);
  } else {
    audioEl.volume = state.volume;
  }
}
volume.addEventListener("input", () => {
  state.volume = Number(volume.value) / 100;
  if (state.volume > 0) { state.muted = false; state.prevVolume = state.volume; }
  applyVolume();
});
volIconBtn.addEventListener("click", () => {
  if (state.volume > 0) {
    state.prevVolume = state.volume;
    state.volume = 0; state.muted = true;
  } else {
    state.volume = state.prevVolume || 0.75;
    state.muted = false;
  }
  applyVolume();
});

// =====================================================
//   SEEKING
// =====================================================
let isSeeking = false;
function seekFromEvent(e) {
  if (!audioEl.duration) return;
  const rect = progress.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const pct = Math.max(0, Math.min(1, x / rect.width));
  audioEl.currentTime = pct * audioEl.duration;
  renderProgress(); renderLyrics();
}
progress.addEventListener("mousedown", e => { isSeeking = true; seekFromEvent(e); });
document.addEventListener("mousemove", e => { if (isSeeking) seekFromEvent(e); });
document.addEventListener("mouseup",   () => { isSeeking = false; });
progress.addEventListener("touchstart", e => { isSeeking = true; seekFromEvent(e); }, { passive: true });
document.addEventListener("touchmove",  e => { if (isSeeking) seekFromEvent(e); }, { passive: true });
document.addEventListener("touchend",   () => { isSeeking = false; });

// =====================================================
//   CONTROLS
// =====================================================
playBtn.addEventListener("click", toggle);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", () => nextTrack(false));
shuffleBtn.addEventListener("click", () => {
  state.shuffle = !state.shuffle;
  shuffleBtn.classList.toggle("active", state.shuffle);
});
repeatBtn.addEventListener("click", () => {
  state.repeat = state.repeat === false ? "all"
              : state.repeat === "all"  ? "one"
              : false;
  repeatBtn.classList.toggle("active", state.repeat !== false);
  let badge = repeatBtn.querySelector(".one-badge");
  if (state.repeat === "one") {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "one-badge";
      badge.textContent = "1";
      badge.style.cssText = "position:absolute;bottom:2px;right:2px;font-size:9px;font-weight:800;background:white;color:var(--purple-deep);border-radius:50%;width:13px;height:13px;display:grid;place-items:center;line-height:1;";
      repeatBtn.style.position = "relative";
      repeatBtn.appendChild(badge);
    }
  } else if (badge) badge.remove();
});

// =====================================================
//   SEARCH
// =====================================================
searchInput.addEventListener("input", e => {
  state.searchQuery = e.target.value;
  searchWrap.classList.toggle("has-value", !!state.searchQuery);
  renderPlaylist();
});
clearSearch.addEventListener("click", () => {
  searchInput.value = ""; state.searchQuery = "";
  searchWrap.classList.remove("has-value");
  renderPlaylist(); searchInput.focus();
});
document.addEventListener("keydown", e => {
  if (e.key === "/" && document.activeElement !== searchInput) {
    e.preventDefault(); searchInput.focus();
  }
  if (e.code === "Space" && document.activeElement !== searchInput
      && !e.target.matches("input,textarea,select")) {
    e.preventDefault(); toggle();
  }
  if (e.code === "ArrowRight" && document.activeElement !== searchInput) {
    audioEl.currentTime = Math.min((audioEl.duration||0), audioEl.currentTime + 5);
  }
  if (e.code === "ArrowLeft" && document.activeElement !== searchInput) {
    audioEl.currentTime = Math.max(0, audioEl.currentTime - 5);
  }
});

// =====================================================
//   THEME
// =====================================================
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("wavely-theme", theme); } catch (e) {}
}
themeToggle.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  setTheme(cur === "dark" ? "light" : "dark");
});
try {
  const saved = localStorage.getItem("wavely-theme");
  if (saved) setTheme(saved);
} catch (e) {}

// =====================================================
//   FIRST-GESTURE BANNER (browser autoplay policy)
// =====================================================
// We can't start AudioContext until a user gesture. Show a hint.
let gestureArmed = false;
function armOnGesture() {
  if (gestureArmed) return;
  gestureArmed = true;
  ensureAudioContext();
}
["click", "keydown", "touchstart"].forEach(ev =>
  document.addEventListener(ev, armOnGesture, { once: true, capture: true })
);

// =====================================================
//   INIT
// =====================================================
applyVolume();
applyEqValuesToUI();
renderPlaylist();
loadTrack(0, { autoplay: false });
setStatus("Click ▶ to start streaming", "info");
