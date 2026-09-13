// ==========================================
// 0. CEK BLOKIR TANGGAL
//    Website hanya bisa dibuka mulai 30-09-2026
// ==========================================
(function checkBlockedDate() {
  const TARGET_DATE = new Date(2026, 8, 13); // 30 Sept 2026 (bulan 8 = September)
  TARGET_DATE.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Kalau belum sampai tanggal target → BLOKIR
  if (today < TARGET_DATE) {
    const blocked = document.getElementById("blocked");
    blocked.classList.add("active");

    const gate = document.getElementById("gate");
    const landing = document.getElementById("landing");
    if (gate) gate.style.display = "none";
    if (landing) landing.style.display = "none";

    // Hitung mundur
    const diff = TARGET_DATE - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").innerHTML =
      `Tinggal <b>${days} hari</b> lagi 🐱`;

    throw new Error("Website belum waktunya dibuka.");
  }
})();


// ==========================================
// 1. GATE (INPUT TANGGAL)
// ==========================================
const TANGGAL_BENAR = "30-09-1999";
const song = document.getElementById("song");
const playBtn = document.getElementById("playBtn");

function checkDate() {
  const input = document.getElementById("dateInput");
  const val = input.value.trim();
  const err = document.getElementById("errorMsg");

  if (val === TANGGAL_BENAR) {
    err.textContent = "";
    document.getElementById("gate").style.display = "none";
    document.getElementById("landing").style.display = "block";
    document.getElementById("player").classList.add("show");
    launchConfetti();
    spawnCats();

    setTimeout(() => {
      song.play().then(() => {
        playBtn.textContent = "❚❚";
      }).catch(() => {});
    }, 300);
  } else {
    err.textContent = "❌ Tanggalnya belum tepat. Coba lagi ya 🐱";
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 400);
  }
}

document.getElementById("dateInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkDate();
});

document.getElementById("dateInput").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 8);
  if (v.length > 4) v = v.slice(0,2) + "-" + v.slice(2,4) + "-" + v.slice(4);
  else if (v.length > 2) v = v.slice(0,2) + "-" + v.slice(2);
  e.target.value = v;
});


// ==========================================
// 2. KONTEN MODAL
// ==========================================
const konten = {
  ucapan: {
    emoji: "💌",
    title: "Selamat Ulang Tahun 🎂",
    text: "Barakallahu fi umrik, sayang.\n\nSemoga di umur yang baru ini kamu selalu sehat, bahagia, dan semua impianmu satu per satu terwujud.\n\nAku akan selalu ada di sini, menemani setiap langkahmu. 🐱💕"
  },
  doa: {
    emoji: "🕯️",
    title: "Doa & Harapan",
    text: "Semoga panjang umur, murah rezeki, dikelilingi orang-orang yang menyayangimu, dan semoga kita selalu bersama.\n\nAamiin 🤲💕"
  },
  rahasia: {
    emoji: "🔐",
    title: "Pesan Rahasia",
    text: "FAKHRI >>>>> ALL MEMBER CORTIZZZSSS"
  }
};


// ==========================================
// 3. MODAL UMUM
// ==========================================
function openModal(key) {
  const d = konten[key];
  if (!d) return;
  document.getElementById("modalEmoji").textContent = d.emoji;
  document.getElementById("modalTitle").textContent = d.title;
  document.getElementById("modalText").textContent = d.text;
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}


// ==========================================
// 4. MODAL GALERI
// ==========================================
function openGallery() {
  document.getElementById("galleryModal").classList.add("active");
}

function closeGallery() {
  document.getElementById("galleryModal").classList.remove("active");
}


// ==========================================
// 5. LIGHTBOX
// ==========================================
const lbImg   = document.getElementById("lightboxImg");
const lbVideo = document.getElementById("lightboxVideo");

function openLightbox(src, type) {
  if (type === "video") {
    lbImg.style.display = "none";
    lbImg.src = "";
    lbVideo.style.display = "block";
    lbVideo.src = src;
    lbVideo.play().catch(() => {});
  } else {
    lbVideo.style.display = "none";
    lbVideo.pause();
    lbVideo.src = "";
    lbImg.style.display = "block";
    lbImg.src = src;
  }
  document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb.classList.contains("active")) return;
  lb.classList.remove("active");
  lbVideo.pause();
  lbVideo.src = "";
}


// ==========================================
// 6. PLAYER LAGU
// ==========================================
function togglePlay() {
  if (song.paused) {
    song.play().then(() => {
      playBtn.textContent = "❚❚";
    }).catch(() => {
      alert("File lagu belum ada atau formatnya tidak didukung 🎵");
    });
  } else {
    song.pause();
    playBtn.textContent = "▶";
  }
}


// ==========================================
// 7. CONFETTI
// ==========================================
function launchConfetti() {
  const colors = ["#ff7aa8", "#ffb6ce", "#ffd6e7", "#fff0b3", "#ff5c91", "#c98aa0", "#ffd700"];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2 + Math.random() * 2.5) + "s";
    c.style.animationDelay = (Math.random() * 0.6) + "s";
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}


// ==========================================
// 8. KUCING JALAN
// ==========================================
function spawnCats() {
  const catList = [
    { emoji: "🐈",     size: 34, speed: 22, bottom: 60,  delay: 0   },
    { emoji: "🐈‍⬛",    size: 36, speed: 28, bottom: 110, delay: 3   },
    { emoji: "😺",     size: 30, speed: 18, bottom: 160, delay: 6   },
    { emoji: "😸",     size: 32, speed: 25, bottom: 200, delay: 1.5 },
    { emoji: "😻",     size: 38, speed: 32, bottom: 250, delay: 8   },
    { emoji: "😼",     size: 30, speed: 20, bottom: 90,  delay: 11  },
    { emoji: "😽",     size: 32, speed: 26, bottom: 140, delay: 4.5 },
    { emoji: "🐾",     size: 26, speed: 16, bottom: 300, delay: 7   },
    { emoji: "🐈",     size: 28, speed: 24, bottom: 30,  delay: 9   },
    { emoji: "🐱",     size: 34, speed: 21, bottom: 340, delay: 2   },
    { emoji: "🐈‍⬛",    size: 32, speed: 27, bottom: 380, delay: 13  },
    { emoji: "😺",     size: 28, speed: 19, bottom: 220, delay: 10  }
  ];

  catList.forEach((cat) => {
    const el = document.createElement("div");
    el.className = "cat-walker";
    el.textContent = cat.emoji;
    el.style.fontSize = cat.size + "px";
    el.style.bottom = cat.bottom + "px";
    el.style.animationDuration = cat.speed + "s";
    el.style.animationDelay = cat.delay + "s";
    el.style.opacity = 0.85;
    document.body.appendChild(el);
  });
}
// ==========================================
// 8b. KUE ULANG TAHUN (TIUP LILIN)
// ==========================================
function openCake() {
  document.getElementById("cakeModal").classList.add("active");
}

function closeCake() {
  document.getElementById("cakeModal").classList.remove("active");
  // Reset setelah modal tertutup (biar bisa dimainkan lagi)
  setTimeout(resetCandles, 500);
}

// Tiup satu lilin (saat lilin diklik langsung)
function blowOne(el) {
  if (el.classList.contains("out")) return;
  el.classList.add("out");
  addSmoke(el);
  checkAllOut();
}

// Tiup semua lilin sekaligus (saat tombol diklik)
function blowAll() {
  const candles = document.querySelectorAll("#candles .candle:not(.out)");
  if (candles.length === 0) return;
  candles.forEach((c, i) => {
    setTimeout(() => {
      c.classList.add("out");
      addSmoke(c);
      checkAllOut();
    }, i * 320);
  });
}

// Efek asap saat lilin mati
function addSmoke(candle) {
  const smoke = document.createElement("div");
  smoke.className = "smoke";
  smoke.textContent = "💨";
  candle.appendChild(smoke);
  setTimeout(() => smoke.remove(), 2000);
}

// Cek kalau semua lilin sudah mati
function checkAllOut() {
  const all = document.querySelectorAll("#candles .candle");
  const out = document.querySelectorAll("#candles .candle.out");
  if (all.length > 0 && all.length === out.length) {
    document.getElementById("cakeMessage").classList.add("show");
    const btn = document.getElementById("blowBtn");
    btn.disabled = true;
    btn.textContent = "Lilin sudah mati ✨";
    // Confetti meriah!
    launchConfetti();
    setTimeout(launchConfetti, 400);
    setTimeout(launchConfetti, 800);
  }
}

// Reset lilin ke kondisi menyala lagi
function resetCandles() {
  document.querySelectorAll("#candles .candle").forEach(c => c.classList.remove("out"));
  document.getElementById("cakeMessage").classList.remove("show");
  const btn = document.getElementById("blowBtn");
  btn.disabled = false;
  btn.textContent = "Tiup Lilin 🎈";
}

// ==========================================
// 8c. POPUP PERPISAHAN + MEOW + PAUSE LAGU
// ==========================================

// ====== KONFIGURASI ======
const EXIT_CONFIG = {
  title: "Sampai Bertemu 1 Tahun Lagi 💕",
  message: "Terima kasih sudah mampir ya, Dhiya 🐱<br>Semoga harimu selalu menyenangkan.<br>Sampai jumpa di ulang tahun berikutnya!",
  emojiPool: ["🌸", "🐾", "💕", "✨", "🎀", "🌟", "🐱", "💗", "🦋", "🌷"],
  confettiColors: ["#ff7aa8", "#ffb6ce", "#ffd6e7", "#fff0b3", "#ff5c91", "#ffd700"]
};

let exitPopupActive = false;
let leavingConfirmed = false;   // flag: user sudah konfirmasi mau keluar
let songWasPlaying = false;

// Tampilkan popup
function showExitPopup() {
  if (exitPopupActive) return;
  exitPopupActive = true;

  // 1. Pause lagu biar meow terdengar
  songWasPlaying = !song.paused;
  if (songWasPlaying) {
    song.pause();
    playBtn.textContent = "▶";
  }

  // 2. Set teks dari config
  document.getElementById("exitTitle").textContent = EXIT_CONFIG.title;
  document.getElementById("exitMessage").innerHTML = EXIT_CONFIG.message;

  // 3. Random emoji dekorasi
  const deco = document.getElementById("exitDeco");
  const shuffled = [...EXIT_CONFIG.emojiPool].sort(() => Math.random() - 0.5);
  deco.textContent = shuffled.slice(0, 5).join(" ");

  // 4. Tampilkan popup
  document.getElementById("exitPopup").classList.add("active");

  // 5. Suara meow
  playMeow();

  // 6. Confetti mini
  launchPopupConfetti();
}

// Tombol "Tetap di Halaman"
function stayOnPage() {
  document.getElementById("exitPopup").classList.remove("active");
  document.getElementById("popupConfetti").innerHTML = "";
  exitPopupActive = false;

  // Resume lagu
  if (songWasPlaying) {
    song.play().then(() => {
      playBtn.textContent = "❚❚";
    }).catch(() => {});
    songWasPlaying = false;
  }
}

// Tombol "Keluar"
function leavePage() {
  leavingConfirmed = true;  // biar beforeunload tidak muncul lagi
  document.getElementById("exitPopup").classList.remove("active");
  // Tutup tab
  window.close();
  // Kalau tidak bisa (browser sering block), arahkan ke halaman kosong
  setTimeout(() => {
    window.location.href = "about:blank";
  }, 100);
}

// ==== Suara meow ====
function playMeow() {
  const meowAudio = document.getElementById("meowSound");
  if (meowAudio) {
    meowAudio.currentTime = 0;
    meowAudio.play().catch(() => synthMeow());
  } else {
    synthMeow();
  }
  // Meow kedua
  setTimeout(() => {
    if (meowAudio) {
      meowAudio.currentTime = 0;
      meowAudio.play().catch(() => {});
    }
  }, 400);
}

function synthMeow() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.5);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {}
}

// ==== Confetti mini ====
function launchPopupConfetti() {
  const container = document.getElementById("popupConfetti");
  container.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const c = document.createElement("div");
    c.className = "mini-conf";
    c.style.left = Math.random() * 100 + "%";
    c.style.background = EXIT_CONFIG.confettiColors[Math.floor(Math.random() * EXIT_CONFIG.confettiColors.length)];
    c.style.animationDuration = (1.5 + Math.random() * 1.5) + "s";
    c.style.animationDelay = (Math.random() * 0.5) + "s";
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    container.appendChild(c);
  }
  setTimeout(() => { container.innerHTML = ""; }, 4000);
}

// ==== DETEKSI: kursor keluar ke atas (mau klik X) — TANPA DELAY ====
document.addEventListener("mouseleave", (e) => {
  if (e.clientY <= 0
      && !exitPopupActive
      && !leavingConfirmed
      && document.getElementById("landing").style.display === "block") {
    showExitPopup();  // langsung, tanpa setTimeout
  }
});

// ==== BACKUP: kalau user benar-benar klik X tanpa popup muncul ====
window.addEventListener("beforeunload", (e) => {
  if (!leavingConfirmed && document.getElementById("landing").style.display === "block") {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }
});
