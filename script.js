/* ========================================== */
/* 3. script.js                               */
/* ========================================== */

const RESTAURANT_PHONE = "6294601364";

// 1. Comprehensive Authentic Indian Menu Items
const MENU_DATA = [
  {
    name: "Awadhi Shahi Dum Biryani",
    category: "biryani",
    price: "₹680",
    diet: "Non-Veg",
    desc: "Slow-cooked young goat meat layered with aged basmati rice, saffron milk, and kewra water sealed in an earthen degh.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Purani Dilli Butter Chicken",
    category: "curries",
    price: "₹590",
    diet: "Non-Veg",
    desc: "Charcoal-roasted chicken in a velvety gravy of San Marzano tomatoes, churned white makhana butter, and sun-dried kasuri methi.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dal Dāwat (24-Hour Simmer)",
    category: "curries",
    price: "₹460",
    diet: "Pure Veg",
    desc: "Organic black urad lentils slow-cooked overnight on wood-fire embers with cultured cream and cold-pressed butter.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sigri Smoked Kakori & Seekh Platter",
    category: "tandoor",
    price: "₹720",
    diet: "Non-Veg",
    desc: "Melt-in-the-mouth hand-minced lamb kebabs infused with 28 royal spices and smoked over fragrant charcoal.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Angaar Paneer Tikka Shashlik",
    category: "tandoor",
    price: "₹520",
    diet: "Pure Veg",
    desc: "Prime cottage cheese marinated in Kashmiri deghi mirch, hung curd, and yellow mustard, flash-grilled in clay tandoor.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Garlic Truffle Butter Naan",
    category: "breads",
    price: "₹180",
    diet: "Pure Veg",
    desc: "Tandoor-blistered refined flour bread topped with minced Himalayan garlic, fresh coriander, and white truffle essence.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Nawabi Kesar Shahi Tukda",
    category: "desserts",
    price: "₹380",
    diet: "Pure Veg",
    desc: "Golden brioche steeped in saffron syrup, smothered in rich reduced rabri cream, pistachios, and 24K edible silver vark.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Dahi Ke Kebab Truffle Dust",
    category: "starters",
    price: "₹480",
    diet: "Pure Veg",
    desc: "Golden-crusted velvet hung curd croquettes flavored with green cardamom, fresh pomegranate pearls, and black pepper.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80"
  }
];

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems(MENU_DATA);
  setupDateDefault();
  setupScrollEffects();
  setupMobileMenu();
});

// Render Menu Cards
function renderMenuItems(items) {
  const container = document.getElementById("menuGrid");
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="menu-card">
      <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" />
      <div class="menu-card-body">
        <div>
          <div class="card-header">
            <h3 class="item-name">${item.name}</h3>
            <span class="item-price">${item.price}</span>
          </div>
          <p class="item-desc">${item.desc}</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-gold w-100" onclick="inquireDishWhatsApp('${item.name}', '${item.price}')">
            WhatsApp Order
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// Menu Category Filtering
function filterMenu(category, btnElement) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  btnElement.classList.add("active");

  if (category === "all") {
    renderMenuItems(MENU_DATA);
  } else {
    const filtered = MENU_DATA.filter(item => item.category === category);
    renderMenuItems(filtered);
  }
}

// Inquire individual dish on WhatsApp
function inquireDishWhatsApp(dishName, price) {
  const msg = `Hello Dāwat, I would like to inquire about ordering "${dishName}" (${price}) for my upcoming table reservation.`;
  window.open(`https://wa.me/91${RESTAURANT_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
}

// Set Default Date to Today
function setupDateDefault() {
  const dateInput = document.getElementById("resDate");
  if (dateInput) {
    const today = istNow().ymd;
    dateInput.value = today;
    dateInput.min = today;
    dateInput.max = new Date(Date.parse(today + "T00:00:00Z") + 60 * 864e5).toISOString().slice(0, 10);
  }
}

// Transparent Navbar to Glassmorphic on Scroll
function setupScrollEffects() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const toggle = document.getElementById("btnMobileToggle");
  const menu = document.getElementById("mobileMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => menu.classList.add("hidden"));
    });
  }

  const btnMobileBooking = document.getElementById("btnMobileBooking");
  if (btnMobileBooking) {
    btnMobileBooking.addEventListener("click", () => {
      menu.classList.add("hidden");
      openBookingModal();
    });
  }

  const btnMobileDirections = document.getElementById("btnMobileDirections");
  if (btnMobileDirections) {
    btnMobileDirections.addEventListener("click", () => {
      menu.classList.add("hidden");
      openDirectionsModal();
    });
  }
}

// Dynamic Table Reservation System
async function handleReservationSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("resName").value.trim();
  const phone = document.getElementById("resPhone").value.trim();
  const date = document.getElementById("resDate").value;
  const guests = document.getElementById("resGuests").value;
  const timeSlot = document.getElementById("resTimeSlot").value;
  const seating = document.getElementById("resSeating").value;
  const notes = document.getElementById("resNotes").value.trim();

  // Reserve the slot first (atomic) so nobody else can take it
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  const held = await Bookings.reserve(date, timeSlot, { name, phone, guests, seating, notes });
  submitBtn.disabled = false;
  if (!held.ok) {
    showToast(held.reason === "full" ? "Sorry, that slot was just taken. Please pick another time." : "Could not complete the booking. Please try again.");
    refreshSlots();
    return;
  }

  // Generate Reference ID
  const refId = `#DWT-${Math.floor(1000 + Math.random() * 9000)}`;

  // Populate on-screen voucher
  document.getElementById("vRefId").textContent = refId;
  document.getElementById("vGuest").textContent = name;
  document.getElementById("vParty").textContent = guests;
  document.getElementById("vSlot").textContent = `${date} at ${timeSlot}`;
  document.getElementById("vSeating").textContent = seating;

  // Build WhatsApp payload
  let waMsg = `*DĀWAT ROYAL TABLE RESERVATION [${refId}]*\n`;
  waMsg += `───────────────────────\n`;
  waMsg += `👤 *Guest Name:* ${name}\n`;
  waMsg += `📱 *Contact:* ${phone}\n`;
  waMsg += `👥 *Party Size:* ${guests}\n`;
  waMsg += `📅 *Date:* ${date}\n`;
  waMsg += `⏰ *Time Slot:* ${timeSlot}\n`;
  waMsg += `🏛️ *Seating Area:* ${seating}\n`;
  if (notes) waMsg += `🌿 *Special Requests:* ${notes}\n`;
  waMsg += `───────────────────────\n`;
  waMsg += `Please confirm table availability for WhatsApp booking: ${RESTAURANT_PHONE}.`;

  const waUrl = `https://wa.me/91${RESTAURANT_PHONE}?text=${encodeURIComponent(waMsg)}`;

  // Wire reopen button
  const reopenBtn = document.getElementById("btnReopenWhatsApp");
  reopenBtn.onclick = () => window.open(waUrl, "_blank");

  // Show on-screen voucher & open WhatsApp
  document.getElementById("reservationForm").classList.add("hidden");
  document.getElementById("voucherContainer").classList.remove("hidden");
  window.open(waUrl, "_blank");
}

function resetReservationForm() {
  document.getElementById("reservationForm").reset();
  setupDateDefault();
  refreshSlots();
  document.getElementById("reservationForm").classList.remove("hidden");
  document.getElementById("voucherContainer").classList.add("hidden");
}

// Modal Handlers
function openBookingModal() {
  document.getElementById("bookingModal").classList.remove("hidden");
}
function closeBookingModal() {
  document.getElementById("bookingModal").classList.add("hidden");
}

function openDirectionsModal() {
  document.getElementById("directionsModal").classList.remove("hidden");
}
function closeDirectionsModal() {
  document.getElementById("directionsModal").classList.add("hidden");
}

function requestPinWhatsApp() {
  const msg = "Hello Dāwat, please share the exact Google Maps live location pin and valet directions.";
  window.open(`https://wa.me/91${RESTAURANT_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ========================================== */
/* PREMIUM MOTION LAYER                       */
/* ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setupHeroIntro(reduced);
  setupMarquee();
  setupScrollProgressAndParallax(reduced);
  setupNavSpy();
  setupCardSpotlight();
  setupExtras();
  if (!reduced) setupReveals();
});

function setupHeroIntro(reduced) {
  const title = document.querySelector(".hero-title");
  if (title) {
    title.innerHTML = title.textContent.trim().split(/\s+/)
      .map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
  }
  const fades = [".hero-kicker", ".hero-description", ".hero-trust-bar", ".hero-ctas", ".meta-card"];
  let n = 0;
  fades.forEach(sel => document.querySelectorAll(sel).forEach(el => {
    el.classList.add("hero-fade");
    el.style.setProperty("--d", `${700 + n * 130}ms`);
    n++;
  }));

  const start = () => document.body.classList.add("hero-ready");
  if (reduced) return start();

  const pl = document.createElement("div");
  pl.id = "preloader";
  pl.innerHTML = '<div class="pl-inner"><span class="pl-brand">Dāwat</span><span class="pl-line"></span></div>';
  document.body.prepend(pl);
  document.body.classList.add("is-loading");
  setTimeout(() => {
    pl.classList.add("out");
    document.body.classList.remove("is-loading");
    start();
    setTimeout(() => pl.remove(), 1000);
  }, 1500);
}

function setupMarquee() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;
  const items = ["Dum Pukht Biryani", "Sigri Kakori Kebabs", "24-Hour Dal Dāwat", "Live Clay Tandoor", "Kashmiri Saffron",
    "Stone-Ground Spices", "Purani Dilli Butter Chicken", "Kesar Shahi Tukda"];
  const html = items.map(t => `<span>${t}</span>`).join("");
  const m = document.createElement("div");
  m.className = "marquee";
  m.setAttribute("aria-hidden", "true");
  m.innerHTML = `<div class="marquee-track">${html}${html}</div>`;
  hero.after(m);
}

function setupScrollProgressAndParallax(reduced) {
  const bar = document.createElement("div");
  bar.id = "scrollProgress";
  document.body.appendChild(bar);

  const heroBg = document.getElementById("heroBg");
  const imgs = [...document.querySelectorAll(".story-media img")];
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (!reduced) {
      if (heroBg && y < window.innerHeight * 1.3) heroBg.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      imgs.forEach(img => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.setProperty("--py", `${(p * -36).toFixed(1)}px`);
      });
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function setupNavSpy() {
  const links = [...document.querySelectorAll(".nav-links a")];
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        map.get(e.target.id)?.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

function setupCardSpotlight() {
  document.addEventListener("mousemove", e => {
    const card = e.target.closest && e.target.closest(".trust-card, .menu-card, .meta-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });
}

function setupReveals() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  const add = (el, cls = "", delay = 0) => {
    el.classList.add("reveal");
    if (cls) el.classList.add(cls);
    el.style.setProperty("--d", `${delay}ms`);
    io.observe(el);
  };

  document.querySelectorAll(".section-header").forEach(el => add(el));
  document.querySelectorAll(".trust-card").forEach((el, i) => add(el, "", i * 110));
  document.querySelectorAll(".reservation-box").forEach(el => add(el, "reveal-zoom"));
  document.querySelectorAll(".story-chapter").forEach(ch => {
    const rev = ch.classList.contains("reverse");
    const t = ch.querySelector(".story-text");
    const m = ch.querySelector(".story-media");
    if (t) add(t, rev ? "reveal-right" : "reveal-left");
    if (m) add(m, "reveal-clip", 150);
  });
  document.querySelectorAll(".gallery-item").forEach((el, i) => add(el, "reveal-zoom", (i % 3) * 120));
  document.querySelectorAll(".menu-filters").forEach(el => add(el));
  document.querySelectorAll(".footer-grid > div").forEach((el, i) => add(el, "", i * 100));

  // Menu cards (re-animate on every filter change)
  const grid = document.getElementById("menuGrid");
  if (grid) {
    const cards = () => grid.querySelectorAll(".menu-card").forEach((c, i) => add(c, "", (i % 6) * 90));
    cards();
    new MutationObserver(cards).observe(grid, { childList: true });
  }
}

function setupExtras() {
  // Wire the header buttons that had no handlers
  document.getElementById("btnOpenBooking")?.addEventListener("click", openBookingModal);
  document.getElementById("btnOpenDirections")?.addEventListener("click", openDirectionsModal);

  // Close modals on backdrop click / Escape
  ["bookingModal", "directionsModal"].forEach(id => {
    const m = document.getElementById(id);
    m?.addEventListener("click", e => { if (e.target === m) m.classList.add("hidden"); });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") ["bookingModal", "directionsModal"].forEach(id => document.getElementById(id)?.classList.add("hidden"));
  });
}


/* ========================================== */
/* OPEN/CLOSED STATUS + LIVE SLOT BOOKING     */
/* ========================================== */
const HOURS = { open: 12, close: 24 };               // 12 PM to 12 AM (IST)
const BOOKING = { tablesPerSlot: 6, firstSlotHour: 12, lastSlotHour: 23, leadMinutes: 30 };

// Paste your Firebase web config here to share bookings between ALL visitors.
// Leave as null for demo mode (bookings only stored in this browser).
const FIREBASE_CONFIG = null;
/* e.g. { apiKey:"...", authDomain:"...", projectId:"...", appId:"..." } */

function istNow() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const g = t => parts.find(p => p.type === t).value;
  return { ymd: `${g("year")}-${g("month")}-${g("day")}`, h: +g("hour"), min: +g("minute") };
}
function slotLabel(h) { return `${String(h % 12 || 12).padStart(2, "0")}:00 ${h < 12 ? "AM" : "PM"}`; }

function renderStatus() {
  const n = istNow();
  let cls, label, sub;
  if (n.h >= HOURS.open) {
    if (n.h === 23 && n.min >= 15) { cls = "soon"; label = "Closing soon"; sub = "Closes 12 AM"; }
    else { cls = "open"; label = "Open now"; sub = "Closes 12 AM"; }
  } else { cls = "closed"; label = "Closed"; sub = "Opens 12 PM"; }
  document.querySelectorAll(".status-pill").forEach(p => {
    p.className = "status-pill " + cls;
    p.innerHTML = `<i class="dot"></i><span>${label}</span><small>· ${sub}</small>`;
  });
}
function setupStatus() {
  const mk = () => { const s = document.createElement("div"); s.className = "status-pill"; return s; };
  document.querySelector(".nav-actions")?.prepend(mk());
  const mm = document.getElementById("mobileMenu");
  if (mm) { const s = mk(); s.classList.add("in-menu"); mm.prepend(s); }
  renderStatus();
  setInterval(renderStatus, 30000);
}

function showToast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(showToast._t); showToast._t = setTimeout(() => t.classList.remove("show"), 4200);
}

const Bookings = {
  db: null,
  async init() {
    if (!FIREBASE_CONFIG) { console.info("Dāwat bookings: demo mode (local browser only). Add FIREBASE_CONFIG for shared slots."); return; }
    const load = src => new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
    try {
      await load("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
      await load("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js");
      firebase.initializeApp(FIREBASE_CONFIG);
      this.db = firebase.firestore();
    } catch (err) { console.warn("Firebase failed to load, using demo mode", err); this.db = null; }
  },
  async counts(date) {
    await this.ready;
    if (!this.db) return JSON.parse(localStorage.getItem("dawat_slots") || "{}")[date] || {};
    try {
      const snap = await this.db.collection("slots").where("date", "==", date).get();
      const out = {}; snap.forEach(d => { out[d.data().slot] = d.data().count; }); return out;
    } catch (err) { console.warn(err); return {}; }
  },
  async reserve(date, slot, info) {
    await this.ready;
    const cap = BOOKING.tablesPerSlot;
    if (!this.db) {
      const all = JSON.parse(localStorage.getItem("dawat_slots") || "{}");
      all[date] = all[date] || {};
      if ((all[date][slot] || 0) >= cap) return { ok: false, reason: "full" };
      all[date][slot] = (all[date][slot] || 0) + 1;
      localStorage.setItem("dawat_slots", JSON.stringify(all));
      return { ok: true };
    }
    try {
      const ref = this.db.collection("slots").doc(`${date}_${slot.replace(/[^0-9APM]/g, "")}`);
      await this.db.runTransaction(async t => {
        const s = await t.get(ref); const c = s.exists ? s.data().count : 0;
        if (c >= cap) throw new Error("FULL");
        t.set(ref, { date, slot, count: c + 1 });
      });
      await this.db.collection("bookings").add({ ...info, date, slot, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      return { ok: true };
    } catch (err) { return { ok: false, reason: err.message === "FULL" ? "full" : "error" }; }
  }
};
Bookings.ready = Bookings.init();

function updateSlotTag(freeCount) {
  const sel = document.getElementById("resTimeSlot"), tag = document.getElementById("urgencyTag");
  if (!sel || !tag) return;
  const t = sel.options[sel.selectedIndex]?.text || "";
  tag.textContent = freeCount === 0 ? "No tables left for this date. Please choose another day."
    : t.includes("⚡") ? "⚡ High demand · this slot is almost full" : "✓ Table available for this slot";
}

async function refreshSlots() {
  const dateEl = document.getElementById("resDate"), sel = document.getElementById("resTimeSlot");
  const btn = document.querySelector('#reservationForm button[type="submit"]');
  if (!dateEl || !sel || !dateEl.value) return;
  const date = dateEl.value, prev = sel.value;
  const counts = await Bookings.counts(date);
  if (dateEl.value !== date) return;
  const now = istNow(), today = date === now.ymd;
  const groups = [["Afternoon", []], ["Evening", []], ["Night", []]];
  let free = 0, first = "";
  for (let h = BOOKING.firstSlotHour; h <= BOOKING.lastSlotHour; h++) {
    if (today && h * 60 - (now.h * 60 + now.min) < BOOKING.leadMinutes) continue; // slot passed
    const label = slotLabel(h), left = BOOKING.tablesPerSlot - (counts[label] || 0);
    const full = left <= 0;
    const text = full ? `${label} · Fully booked` : left <= 2 ? `${label} · ⚡ Only ${left} left` : label;
    groups[h < 16 ? 0 : h < 20 ? 1 : 2][1].push(`<option value="${label}"${full ? " disabled" : ""}>${text}</option>`);
    if (!full) { free++; if (!first) first = label; }
  }
  const html = groups.filter(g => g[1].length).map(g => `<optgroup label="${g[0]}">${g[1].join("")}</optgroup>`).join("");
  sel.innerHTML = html || '<option value="">No slots left today</option>';
  const keep = [...sel.options].find(o => o.value === prev && !o.disabled);
  sel.value = keep ? prev : first;
  if (btn) btn.disabled = free === 0;
  updateSlotTag(free);
}

document.addEventListener("DOMContentLoaded", () => {
  setupStatus();
  document.getElementById("resDate")?.addEventListener("change", refreshSlots);
  document.getElementById("resTimeSlot")?.addEventListener("change", () => updateSlotTag(1));
  refreshSlots();
  setInterval(() => { if (!document.hidden) refreshSlots(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { renderStatus(); refreshSlots(); } });
});
