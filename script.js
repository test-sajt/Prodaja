/* =========================================================
   LUMINA — script.js
   Proizvodi, animacije, modal forma i slanje porudžbine
   ========================================================= */

(() => {
  "use strict";

  /* ---------- KONFIGURACIJA ---------- */
  const CONFIG = {
    // Porudžbine stižu na ovaj mejl preko FormSubmit servisa (bez backend-a).
    // NAPOMENA: pri PRVOM slanju FormSubmit šalje aktivacioni mejl na ovu adresu —
    // potrebno je kliknuti "Activate" u tom mejlu, posle čega sve porudžbine stižu normalno.
    ORDER_EMAIL: "ovojebroj01@gmail.com",
    ENDPOINT: "https://formsubmit.co/ajax/ovojebroj01@gmail.com",
    // Alternativa: Formspree — napravite formu na formspree.io i zalepite URL, npr. "https://formspree.io/f/xxxxxxxx"
    SUPPORT_PHONE: "0612006959",
    CURRENCY: "RSD",
    MAX_QTY: 10,
  };

  /* ---------- 20 PROIZVODA ---------- */
  const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

  const PRODUCTS = [
    { id: 1,  name: "Aura Pro bežične slušalice", cat: "Audio", emoji: "🎧", tag: "Bestseler", price: 14990,
      img: img("photo-1505740420928-5e560c06d30e"),
      desc: "Aktivno poništavanje buke, 40 sati rada na bateriji i kristalno čist zvuk za posao, trening i putovanja." },
    { id: 2,  name: "Chrono Elite ručni sat", cat: "Moda", emoji: "⌚", tag: "Luksuz", price: 18900,
      img: img("photo-1523275335684-37898b6baf30"),
      desc: "Minimalistički analogni sat od nerđajućeg čelika sa safirnim staklom i vodootpornošću do 50 metara." },
    { id: 3,  name: "Solaris polarizovane naočare", cat: "Moda", emoji: "🕶️", tag: "Novo", price: 6490,
      img: img("photo-1572635196237-14b3f281503f"),
      desc: "Lagani okvir i UV400 polarizovana stakla koja štite oči i daju vašem stilu upečatljiv karakter." },
    { id: 4,  name: "Velocity trkačke patike", cat: "Obuća", emoji: "👟", tag: "Popularno", price: 11490,
      img: img("photo-1542291026-7eec264c27ff"),
      desc: "Prozračna mrežasta konstrukcija i penasti đon za maksimalnu amortizaciju na svakom koraku." },
    { id: 5,  name: "Nomad urbani ranac", cat: "Torbe", emoji: "🎒", tag: "", price: 7990,
      img: img("photo-1553062407-98eeb64c6a62"),
      desc: "Vodootporan ranac sa pregradom za laptop od 15,6 inča, skrivenim džepom i USB portom za punjenje." },
    { id: 6,  name: "Vision X retro kamera", cat: "Foto", emoji: "📷", tag: "Limitirano", price: 52900,
      img: img("photo-1516035069371-29a1b244cc32"),
      desc: "Digitalni aparat sa 24 MP senzorom i klasičnim dizajnom — za fotografije pune karaktera." },
    { id: 7,  name: "Nova S smartfon", cat: "Tehnologija", emoji: "📱", tag: "Hit", price: 39900,
      img: img("photo-1511707171634-5f897ff02aa9"),
      desc: "Brz AMOLED ekran od 6,5 inča, tri kamere i baterija koja traje ceo dan uz brzo punjenje." },
    { id: 8,  name: "Slim Air ultrabook", cat: "Tehnologija", emoji: "💻", tag: "Premium", price: 89900,
      img: img("photo-1496181133206-80ce9b88a853"),
      desc: "Tanak aluminijumski laptop od 1,2 kg sa brzim SSD diskom — snaga za posao i kreativu." },
    { id: 9,  name: "Noir Essence parfem", cat: "Parfemi", emoji: "🧴", tag: "Luksuz", price: 9490,
      img: img("photo-1541643600914-78b084683601"),
      desc: "Sofisticirana kompozicija ambera, vanile i drveta koja ostavlja elegantan trag čitavog dana." },
    { id: 10, name: "Pulse Mini bluetooth zvučnik", cat: "Audio", emoji: "🔊", tag: "", price: 5490,
      img: img("photo-1608043152269-423dbba4e7e8"),
      desc: "Džepni zvučnik snažnog basa, otporan na prskanje, sa 12 sati neprekidne reprodukcije." },
    { id: 11, name: "Heritage kožni novčanik", cat: "Moda", emoji: "👛", tag: "", price: 4290,
      img: img("photo-1627123424574-724758594e93"),
      desc: "Ručno šiven novčanik od prave kože sa RFID zaštitom i prostorom za osam kartica." },
    { id: 12, name: "Titan mehanička tastatura", cat: "Gejming", emoji: "⌨️", tag: "RGB", price: 12990,
      img: img("photo-1587829741301-dc798b83add3"),
      desc: "Taktilni mehanički tasteri, programabilno RGB osvetljenje i čvrsto metalno kućište za brzo i tačno kucanje." },
    { id: 13, name: "Glide ergonomski miš", cat: "Gejming", emoji: "🖱️", tag: "", price: 3990,
      img: img("photo-1527864550417-7fd91fc51a46"),
      desc: "Precizan senzor od 16.000 DPI i oblik prilagođen šaci — udobnost i kontrola tokom celog dana." },
    { id: 14, name: "Fit Orbit pametni sat", cat: "Tehnologija", emoji: "⌚", tag: "Novo", price: 13490,
      img: img("photo-1546868871-7041f2a55e12"),
      desc: "Prati puls, san i trening, prikazuje obaveštenja i izdržava do 10 dana bez punjenja." },
    { id: 15, name: "Terra keramička šolja", cat: "Dom", emoji: "☕", tag: "", price: 1790,
      img: img("photo-1514228742587-6b1558fcca3d"),
      desc: "Ručno glazirana keramika koja duže čuva toplotu — jutarnja kafa dobija svoj mali ritual." },
    { id: 16, name: "Halo stona LED lampa", cat: "Dom", emoji: "💡", tag: "Popularno", price: 5990,
      img: img("photo-1507473885765-e6ed057f782c"),
      desc: "Podesiva jačina i boja svetla, bežično punjenje telefona na postolju i elegantna linija." },
    { id: 17, name: "Verde dekorativna biljka", cat: "Dom", emoji: "🪴", tag: "", price: 2490,
      img: img("photo-1485955900006-10f4d324d411"),
      desc: "Dekorativna biljka u minimalističkoj žardinjeri — unosi svežinu i mir u svaki enterijer." },
    { id: 18, name: "Storm vodootporna jakna", cat: "Odeća", emoji: "🧥", tag: "Sezona", price: 15990,
      img: img("photo-1551028719-00167b16eac5"),
      desc: "Lagana jakna sa kapuljačom i zalepljenim šavovima — štiti od kiše i vetra, a ostaje prozračna." },
    { id: 19, name: "Mila kožna torbica", cat: "Torbe", emoji: "👜", tag: "Luksuz", price: 12490,
      img: img("photo-1584917865442-de89df76afd3"),
      desc: "Elegantna torbica strukturiranog oblika sa podesivim kaišem za rame — savršena za svaku priliku." },
    { id: 20, name: "Skyline kompaktna dron kamera", cat: "Foto", emoji: "🚁", tag: "Hit", price: 47900,
      img: img("photo-1473968512647-3e447244af8f"),
      desc: "Sklopivi dron sa 4K kamerom, stabilizacijom slike i 30 minuta leta — snimci kao iz filma." },
  ];

  /* ---------- POMOĆNE FUNKCIJE ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const fmt = (n) => `${new Intl.NumberFormat("sr-RS").format(n)} ${CONFIG.CURRENCY}`;
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- RENDER PROIZVODA ---------- */
  const grid = $("#productGrid");

  function renderProducts() {
    grid.innerHTML = PRODUCTS.map(
      (p, i) => `
      <article class="card reveal" style="--d:${(i % 4) * 0.08}s" data-id="${p.id}">
        <div class="card-media">
          <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy" decoding="async" />
          <span class="fallback" aria-hidden="true">${p.emoji}</span>
          ${p.tag ? `<span class="card-tag">${escapeHtml(p.tag)}</span>` : ""}
        </div>
        <div class="card-body">
          <span class="card-cat">${escapeHtml(p.cat)}</span>
          <h3 class="card-title">${escapeHtml(p.name)}</h3>
          <p class="card-desc">${escapeHtml(p.desc)}</p>
          <div class="card-foot">
            <div class="price"><strong>${fmt(p.price)}</strong><small>sa PDV-om</small></div>
            <button type="button" class="btn btn-glow buy" data-buy="${p.id}" aria-label="Kupi: ${escapeHtml(p.name)}">Kupi</button>
          </div>
        </div>
      </article>`
    ).join("");

    // Rezervna slika ako Unsplash nije dostupan
    $$(".card-media img", grid).forEach((im) => {
      im.addEventListener("error", () => im.parentElement.classList.add("no-img"));
    });
  }

  /* ---------- ANIMACIJE PRI SKROLOVANJU ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- BROJAČI U HERO SEKCIJI ---------- */
  function initCounters() {
    const els = $$("[data-count]");
    const run = (el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) return els.forEach(run);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 3D "TILT" EFEKAT NA KARTICAMA + SVETLO ZA KURSOROM ---------- */
  function initPointerEffects() {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const glow = $(".cursor-glow");
    let raf = null, mx = 0, my = 0;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      glow.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        raf = null;
      });
    });
    document.addEventListener("pointerleave", () => (glow.style.opacity = "0"));

    grid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "transform .08s linear, border-color .4s, box-shadow .5s";
      card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-6px)`;
    });
    grid.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".card");
      if (!card || card.contains(e.relatedTarget)) return;
      card.style.transition = "";
      card.style.transform = "";
    });
  }

  /* ---------- ZAGLAVLJE I MOBILNI MENI ---------- */
  function initHeader() {
    const header = $("#header");
    const burger = $("#burger");
    const nav = $("#nav");

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setMenu = (open) => {
      nav.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) setMenu(false);
    });
  }

  /* ---------- TOAST ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3600);
  }

  /* ---------- MODAL / PORUDŽBINA ---------- */
  const modal = $("#orderModal");
  const form = $("#orderForm");
  const formView = $("#formView");
  const successView = $("#successView");
  const qtyInput = $("#fQty");
  const submitBtn = $("#submitBtn");
  const formError = $("#formError");
  let current = null;
  let lastFocus = null;

  function updateTotal() {
    const q = clampQty(+qtyInput.value);
    $("#mTotal").textContent = current ? fmt(current.price * q) : "—";
  }
  const clampQty = (n) => Math.min(CONFIG.MAX_QTY, Math.max(1, Number.isFinite(n) ? Math.floor(n) : 1));

  function openModal(product) {
    current = product;
    lastFocus = document.activeElement;

    form.reset();
    $$(".field", form).forEach((f) => f.classList.remove("invalid"));
    formError.hidden = true;
    formView.hidden = false;
    successView.hidden = true;

    const mpImg = $("#mpImg");
    mpImg.src = product.img;
    mpImg.alt = product.name;
    mpImg.onerror = () => { mpImg.style.visibility = "hidden"; };
    mpImg.style.visibility = "visible";
    $("#mpName").textContent = product.name;
    $("#mpPrice").textContent = fmt(product.price);
    qtyInput.value = 1;
    updateTotal();

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    setTimeout(() => $("#fName").focus(), 120);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Validacija
  const validators = {
    fName: (v) => (v.trim().split(/\s+/).filter(Boolean).length >= 2 && v.trim().length >= 5) || "Unesite ime i prezime.",
    fAddress: (v) => (v.trim().length >= 5 && /\d/.test(v)) || "Unesite ulicu i kućni broj.",
    fCity: (v) => v.trim().length >= 2 || "Unesite grad.",
    fPhone: (v) => {
      const digits = v.replace(/[^\d]/g, "");
      return (/^[+\d\s()/-]+$/.test(v.trim()) && digits.length >= 8 && digits.length <= 15) || "Unesite ispravan broj telefona.";
    },
  };

  function validateField(id) {
    const input = $("#" + id);
    const wrap = input.closest(".field");
    const res = validators[id](input.value);
    const ok = res === true;
    wrap.classList.toggle("invalid", !ok);
    $(".err", wrap).textContent = ok ? "" : res;
    return ok;
  }

  Object.keys(validators).forEach((id) => {
    const el = $("#" + id);
    el.addEventListener("blur", () => validateField(id));
    el.addEventListener("input", () => {
      if (el.closest(".field").classList.contains("invalid")) validateField(id);
    });
  });

  // Količina
  $("#qtyMinus").addEventListener("click", () => { qtyInput.value = clampQty(+qtyInput.value - 1); updateTotal(); });
  $("#qtyPlus").addEventListener("click", () => { qtyInput.value = clampQty(+qtyInput.value + 1); updateTotal(); });
  qtyInput.addEventListener("input", updateTotal);
  qtyInput.addEventListener("blur", () => { qtyInput.value = clampQty(+qtyInput.value); updateTotal(); });

  // Slanje
  const makeOrderId = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `LUM-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  async function sendOrder(order) {
    const payload = {
      _subject: `Nova porudžbina ${order.id} — ${order.product}`,
      _template: "table",
      _captcha: "false",
      "Broj porudžbine": order.id,
      "Proizvod": order.product,
      "Količina": order.qty,
      "Cena po komadu": fmt(order.unitPrice),
      "UKUPNO (pouzećem)": fmt(order.total),
      "Ime i prezime": order.name,
      "Adresa": order.address,
      "Grad": order.city,
      "Telefon": order.phone,
      "Vreme porudžbine": order.time,
    };

    const res = await fetch(CONFIG.ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json().catch(() => ({}));
    if (data && (data.success === false || data.success === "false")) throw new Error(data.message || "Slanje nije uspelo");
    return data;
  }

  function saveBackup(order) {
    try {
      const all = JSON.parse(localStorage.getItem("lumina_orders") || "[]");
      all.push(order);
      localStorage.setItem("lumina_orders", JSON.stringify(all));
    } catch (_) { /* privatni režim — ignoriši */ }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!current) return;

    // Honeypot — botovi popunjavaju skriveno polje
    if (form.elements["_honey"].value) return;

    const allOk = Object.keys(validators).map(validateField).every(Boolean);
    if (!allOk) {
      const firstBad = $(".field.invalid input", form);
      if (firstBad) firstBad.focus();
      return;
    }

    const qty = clampQty(+qtyInput.value);
    const order = {
      id: makeOrderId(),
      product: current.name,
      qty,
      unitPrice: current.price,
      total: current.price * qty,
      name: $("#fName").value.trim(),
      address: $("#fAddress").value.trim(),
      city: $("#fCity").value.trim(),
      phone: $("#fPhone").value.trim(),
      time: new Date().toLocaleString("sr-RS"),
    };

    formError.hidden = true;
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    $(".btn-label", submitBtn).textContent = "Šaljem porudžbinu…";

    try {
      await sendOrder(order);
      saveBackup(order);

      $("#sName").textContent = order.name.split(" ")[0];
      $("#sPhone").textContent = order.phone;
      $("#sId").textContent = order.id;
      $("#sProduct").textContent = `${order.product} × ${order.qty}`;
      $("#sTotal").textContent = fmt(order.total);
      formView.hidden = true;
      successView.hidden = false;
    } catch (err) {
      console.error("Greška pri slanju porudžbine:", err);
      saveBackup(order);
      formError.innerHTML =
        `Porudžbinu trenutno nismo uspeli da pošaljemo. Pokušajte ponovo ili nas pozovite na ` +
        `<a href="tel:${CONFIG.SUPPORT_PHONE}">${CONFIG.SUPPORT_PHONE}</a>.`;
      formError.hidden = false;
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      $(".btn-label", submitBtn).textContent = "Potvrdi porudžbinu";
    }
  });

  // Otvaranje / zatvaranje modala
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-buy]");
    if (!btn) return;
    const product = PRODUCTS.find((p) => p.id === +btn.dataset.buy);
    if (product) openModal(product);
  });
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      // Zadrži fokus unutar modala
      const f = $$("button:not([disabled]), input:not([tabindex='-1']):not([type='hidden']), a[href]", modal)
        .filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- START ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();
    renderProducts();
    initHeader();
    initReveal();
    initCounters();
    initPointerEffects();
  });
})();
