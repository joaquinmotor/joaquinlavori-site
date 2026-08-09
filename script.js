// Joaquin Lavori — portfolio site logic
// No build step: plain DOM rendering driven by data.js + hash routing.
// Mobile: 4 pages (home/work/info/sideb) live side by side in #pagesTrack
// and are paged with a horizontal swipe; the sidebar is hidden. Desktop:
// same content, one page shown at a time, no swipe, plus a persistent
// left sidebar (About/Contact/Featured In/Awards). A single top pill nav
// (logo + HOME/WORK/INFO/SIDE B) is shared across both breakpoints.

/* global NAV, SITE, PROJECTS, INFO_CONTENT, SIDE_B, gsap */

const MOBILE_BREAKPOINT = 860;
const pageOrder = NAV.map((n) => n.key);

const els = {
  siteNav: document.getElementById("siteNav"),
  layout: document.getElementById("layout"),
  pagesTrack: document.getElementById("pagesTrack"),
  heroMedia: document.getElementById("heroMedia"),
  heroMediaCover: document.getElementById("heroMediaCover"),
  sidebEyebrow: document.getElementById("sidebEyebrow"),
  gridHome: document.getElementById("grid-home"),
  gridWork: document.getElementById("grid-work"),
  infoContent: document.getElementById("infoContent"),
  sidebContent: document.getElementById("sidebContent"),
  projectView: document.getElementById("project-view"),
  aboutText: document.getElementById("about-text"),
  bookLink: document.getElementById("book-link"),
  emailLink: document.getElementById("email-link"),
  phoneLink: document.getElementById("phone-link"),
  igLink: document.getElementById("ig-link"),
  featuredInList: document.getElementById("featured-in-list"),
  awardsList: document.getElementById("awards-list"),
};

let currentPageIndex = 0;
const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

function mailtoUrl(subject) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

function chevron(direction) {
  const points = direction < 0 ? "15 18 9 12 15 6" : "9 18 15 12 9 6";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${points}"></polyline></svg>`;
}

function playBadge() {
  return `<span class="play-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><polygon points="6,4 20,12 6,20" fill="currentColor" /></svg></span>`;
}

function coverTag(item) {
  if (item.video) {
    return `<video src="${item.video}" poster="${item.cover || item.hero}" muted loop playsinline></video>`;
  }
  return `<img src="${item.cover || item.hero}" alt="${item.title || item.brand || ""}" loading="lazy" />`;
}

function renderHero() {
  const featured = PROJECTS.find((p) => p.type !== "logos") || PROJECTS[0];
  els.heroMediaCover.innerHTML = coverTag(featured);
  els.heroMedia.href = `#/project/${featured.slug}`;
}

function initSidebar() {
  els.aboutText.textContent = SITE.aboutShort;
  els.bookLink.href = mailtoUrl("Project inquiry / consultation");
  els.emailLink.href = mailtoUrl("Hello");
  els.emailLink.textContent = SITE.email;
  els.phoneLink.href = `tel:${SITE.phone.replace(/\s+/g, "")}`;
  els.phoneLink.textContent = SITE.phone;
  els.igLink.href = SITE.instagramUrl;
  els.featuredInList.innerHTML = SITE.featuredIn.map((f) => `<li>${f}</li>`).join("");
  els.awardsList.innerHTML = SITE.awards.map((a) => `<li>${a.title} — ${a.detail}</li>`).join("");
}

// A slide is either a plain image URL string, or { type: "video", src, poster }.
function slideTag(slide) {
  if (slide && typeof slide === "object" && slide.type === "video") {
    return `<video src="${slide.src}" poster="${slide.poster || ""}" muted loop playsinline></video>${playBadge()}`;
  }
  const src = typeof slide === "string" ? slide : slide.src;
  return `<img src="${src}" alt="" loading="lazy" />`;
}

function carouselHTML(slides, { max } = {}) {
  const items = max ? slides.slice(0, max) : slides;
  if (items.length <= 1) {
    return `<div class="tile-cover">${slideTag(items[0])}</div>`;
  }
  return `
    <div class="tile-cover" data-carousel>
      <div class="tile-carousel-track" data-track>
        ${items.map((s) => `<div class="tile-slide" data-slide>${slideTag(s)}</div>`).join("")}
      </div>
      <button type="button" class="carousel-nav prev" data-nav="-1" aria-label="Previous image">${chevron(-1)}</button>
      <button type="button" class="carousel-nav next" data-nav="1" aria-label="Next image">${chevron(1)}</button>
      <div class="carousel-dots">${items.map((_, i) => `<span class="dot${i === 0 ? " is-active" : ""}" data-dot></span>`).join("")}</div>
    </div>`;
}

function tileHTML(item, index, { linkable = true, numbered = true, carousel = true } = {}) {
  const title = item.brand || item.title;
  const displayTitle = numbered ? `${String(index + 1).padStart(2, "0")} — ${title}` : title;
  const category = item.category || "";

  if (item.type === "logos") {
    return `
      <a class="tile logos-tile" href="#/project/${item.slug}">
        <div class="tile-cover">
          <div class="logos-tile-grid">
            ${item.marks.slice(0, 4).map((m) => `<span>${m.name}</span>`).join("")}
          </div>
        </div>
        <div class="tile-caption"><h3>${displayTitle}</h3><p>${category}</p></div>
      </a>`;
  }

  const slides = item.gallery && item.gallery.length ? item.gallery : [item.cover || item.hero];
  const cover = carousel ? carouselHTML(slides, { max: 4 }) : `<div class="tile-cover">${slideTag(slides[0])}</div>`;
  const captionInner = `<h3>${displayTitle}</h3><p>${category}</p>`;

  if (linkable && item.slug) {
    return `
      <div class="tile" data-slug="${item.slug}">
        ${cover}
        <a class="tile-caption" href="#/project/${item.slug}">${captionInner}</a>
      </div>`;
  }
  return `<div class="tile static">${cover}<div class="tile-caption">${captionInner}</div></div>`;
}

function renderGrid(el, items, opts) {
  el.innerHTML = items.map((item, i) => tileHTML(item, i, opts)).join("");
  initTileCarousels(el);
}

// Generic carousel controller. Nav/dot clicks always work; `draggable` also
// wires up touch-drag with axis-locking (only safe where the carousel isn't
// nested inside the mobile page-swipe track, e.g. the project detail view).
function initCarousel(root, { draggable = false } = {}) {
  const track = root.querySelector("[data-track]");
  const slides = Array.from(root.querySelectorAll("[data-slide]"));
  if (!track || slides.length <= 1) return;

  let index = 0;

  function render(animate = true) {
    const xPercent = -index * 100;
    if (typeof gsap !== "undefined") {
      gsap.to(track, { xPercent, duration: animate ? 0.4 : 0, ease: "power3.out", overwrite: true });
    } else {
      track.style.transition = animate ? "transform .4s ease" : "none";
      track.style.transform = `translate3d(${xPercent}%,0,0)`;
    }
    root.querySelectorAll("[data-dot]").forEach((d, i) => d.classList.toggle("is-active", i === index));
    root.querySelectorAll("[data-nav]").forEach((b) => {
      const dir = Number(b.dataset.nav);
      b.disabled = (dir < 0 && index === 0) || (dir > 0 && index === slides.length - 1);
    });
    const counter = root.querySelector("[data-counter]");
    if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  }

  function setIndex(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    render();
  }

  root.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex(index + Number(btn.dataset.nav));
    });
  });
  root.querySelectorAll("[data-dot]").forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex(i);
    });
  });

  if (draggable) {
    let startX = 0;
    let startY = 0;
    let axis = null;
    let isDown = false;
    let baseXPercent = 0;

    root.addEventListener(
      "touchstart",
      (e) => {
        const t = e.touches[0];
        startX = t.clientX;
        startY = t.clientY;
        axis = null;
        isDown = true;
        baseXPercent = -index * 100;
        if (typeof gsap !== "undefined") gsap.killTweensOf(track);
      },
      { passive: true }
    );

    root.addEventListener(
      "touchmove",
      (e) => {
        if (!isDown) return;
        const t = e.touches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (!axis) {
          if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
          axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
        }
        if (axis !== "x") return;
        e.preventDefault();
        const deltaPercent = (dx / root.clientWidth) * 100;
        let xPercent = baseXPercent + deltaPercent;
        const min = -(slides.length - 1) * 100;
        if (xPercent > 0) xPercent *= 0.35;
        if (xPercent < min) xPercent = min + (xPercent - min) * 0.35;
        if (typeof gsap !== "undefined") gsap.set(track, { xPercent });
        else track.style.transform = `translate3d(${xPercent}%,0,0)`;
      },
      { passive: false }
    );

    root.addEventListener("touchend", (e) => {
      if (!isDown) return;
      isDown = false;
      if (axis !== "x") return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      if (Math.abs(dx) > root.clientWidth * 0.18) {
        setIndex(index + (dx < 0 ? 1 : -1));
      } else {
        render();
      }
    });
  }

  // Keyboard access: left/right arrows when the carousel (or a control inside it) has focus.
  root.setAttribute("tabindex", "0");
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setIndex(index + 1);
    }
  });

  render(false);
}

function initTileCarousels(scopeEl) {
  scopeEl.querySelectorAll("[data-carousel]").forEach((el) => initCarousel(el, { draggable: false }));
}

function initProjectCarousel() {
  const el = els.projectView.querySelector("[data-carousel]");
  if (el) initCarousel(el, { draggable: true });
}

function renderInfo() {
  const c = INFO_CONTENT;
  els.infoContent.innerHTML = `
    <div class="info-left">
      ${c.sections
        .map(
          (s) => `
        <div class="info-section">
          <div class="info-section-head">
            <span class="info-section-number">${s.number}</span>
            <span class="info-section-title">${s.title}</span>
          </div>
          <div class="info-section-indent"><p>${s.body}</p></div>
        </div>`
        )
        .join("")}
    </div>
    <div class="info-right">
      <div class="info-specs">
        ${c.specs
          .map(
            (s) => `
          <div class="info-spec-row">
            <div class="info-spec-number">${s.number}</div>
            <div class="info-spec-label">${s.label}</div>
            <div class="info-spec-values">${s.values.join("<br />")}</div>
          </div>`
          )
          .join("")}
      </div>
      <div class="info-contact-block">
        <h3>Contact</h3>
        <div>${SITE.email}</div>
        <div>${SITE.phone}</div>
        <div>Currently living in ${SITE.location}</div>
      </div>
    </div>
  `;
}

function renderSideB() {
  els.sidebEyebrow.textContent = SIDE_B.eyebrow;
  els.sidebContent.innerHTML = `
    <p class="sideb-intro">${SIDE_B.intro}</p>
    <div class="grid" id="grid-sideb"></div>
  `;
  renderGrid(document.getElementById("grid-sideb"), SIDE_B.items, { linkable: false, numbered: false });
}

function nextProjectSlug(currentSlug) {
  const idx = PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return PROJECTS[0].slug;
  return PROJECTS[(idx + 1) % PROJECTS.length].slug;
}

function projectMetaHTML(p) {
  const items = [
    { label: "CLIENT", value: p.brand },
    { label: "ROLE", value: p.category },
  ];
  if (p.year) items.push({ label: "YEAR", value: p.year });
  return `<div class="project-meta">${items
    .map((m) => `<div class="project-meta-item"><span class="project-meta-label">${m.label}</span><span class="project-meta-value">${m.value}</span></div>`)
    .join("")}</div>`;
}

function renderProject(slug) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) {
    els.projectView.innerHTML = `<div class="project-body"><p>Project not found.</p></div>`;
    return;
  }

  const linkHTML = p.link
    ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel} →</a>`
    : "";
  const nextRow = `<div class="next-project-row"><a class="next-project-link" href="#/project/${nextProjectSlug(p.slug)}">NEXT PROJECT →</a></div>`;

  if (p.type === "logos") {
    els.projectView.innerHTML = `
      <div class="project-header">
        <h1>${p.brand}</h1>
        ${projectMetaHTML(p)}
      </div>
      <div class="project-body">${p.body.map((para) => `<p>${para}</p>`).join("")}</div>
      <div class="logos-detail-grid">
        ${p.marks
          .map(
            (m) => `
          <a class="logo-card" href="${m.url}" target="_blank" rel="noopener">
            <span class="logo-mark style-${m.style}">${m.name}</span>
          </a>`
          )
          .join("")}
      </div>
      ${nextRow}
    `;
    return;
  }

  els.projectView.innerHTML = `
    <div class="project-header">
      <h1>${p.brand}</h1>
      ${projectMetaHTML(p)}
    </div>
    ${projectCarouselHTML(p.gallery)}
    <div class="project-body">${p.body.map((para) => `<p>${para}</p>`).join("")}</div>
    ${linkHTML}
    ${nextRow}
  `;
  initProjectCarousel();
}

function projectCarouselHTML(gallery) {
  const multi = gallery.length > 1;
  return `
    <div class="project-carousel" data-carousel>
      <div class="project-carousel-track" data-track>
        ${gallery.map((s) => `<div class="project-slide" data-slide>${slideTag(s)}</div>`).join("")}
      </div>
      ${
        multi
          ? `
      <button type="button" class="carousel-nav prev" data-nav="-1" aria-label="Previous image">${chevron(-1)}</button>
      <button type="button" class="carousel-nav next" data-nav="1" aria-label="Next image">${chevron(1)}</button>
      <div class="carousel-dots">${gallery.map((_, i) => `<span class="dot${i === 0 ? " is-active" : ""}" data-dot></span>`).join("")}</div>
      <div class="carousel-counter" data-counter>01 / ${String(gallery.length).padStart(2, "0")}</div>`
          : ""
      }
    </div>`;
}

function footerHTML() {
  return `
    <p class="footer-cta">For new partnerships and general enquiries, reach out on:</p>
    <div>
      <a class="footer-email" href="${mailtoUrl("Hello")}">${SITE.email}</a>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© ${new Date().getFullYear()} Joaquin Lavori</div>
      <button type="button" class="back-to-top" data-back-to-top>Back to top</button>
    </div>
  `;
}

function initNav() {
  els.siteNav.innerHTML = `
    <a class="logo" href="#/">${SITE.name.toUpperCase()}</a>
    <nav class="nav-links">
      ${NAV.map((n) => `<a data-key="${n.key}" href="${n.hash}">${n.label}</a>`).join("")}
    </nav>
  `;

  document.querySelectorAll("[data-footer]").forEach((f) => {
    f.innerHTML = footerHTML();
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-nav],[data-dot]")) return;
    const cover = e.target.closest(".tile-cover");
    if (!cover) return;
    const tile = cover.closest(".tile[data-slug]");
    if (!tile) return;
    location.hash = `#/project/${tile.dataset.slug}`;
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-back-to-top]");
    if (!btn) return;
    const scroller = btn.closest(".page-scroll") || btn.closest(".project-view") || window;
    scroller.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setActiveNav(key) {
  els.siteNav.querySelectorAll(".nav-links a").forEach((a) => a.classList.toggle("active", a.dataset.key === key));
}

function initNavScroll() {
  const setScrolled = (top) => els.siteNav.classList.toggle("is-scrolled", top > 4);
  const scrollers = [window, els.projectView, ...document.querySelectorAll(".page-scroll")];
  scrollers.forEach((el) => {
    if (!el) return;
    el.addEventListener(
      "scroll",
      () => setScrolled(el === window ? window.scrollY : el.scrollTop),
      { passive: true }
    );
  });
}

const revealedPages = new Set();

function revealTiles(pageEl, key) {
  if (revealedPages.has(key)) return;
  revealedPages.add(key);
  const tiles = pageEl.querySelectorAll(".tile");
  if (!tiles.length || typeof gsap === "undefined") return;
  gsap.fromTo(
    tiles,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04, overwrite: true }
  );
}

function setNavHeight() {
  document.documentElement.style.setProperty("--nav-h", els.siteNav.offsetHeight + "px");
}

function goToPage(key, { animate = true } = {}) {
  const index = Math.max(0, pageOrder.indexOf(key));
  currentPageIndex = index;
  setActiveNav(key);

  const targetEl = document.getElementById(`page-${key}`);

  if (isMobile()) {
    const x = -index * window.innerWidth;
    if (animate && typeof gsap !== "undefined") {
      gsap.to(els.pagesTrack, { x, duration: 0.45, ease: "power3.out" });
    } else if (typeof gsap !== "undefined") {
      gsap.set(els.pagesTrack, { x });
    } else {
      els.pagesTrack.style.transform = `translate3d(${x}px,0,0)`;
    }
  } else {
    document.querySelectorAll(".page").forEach((p) => p.classList.toggle("is-active", p === targetEl));
  }

  revealTiles(targetEl, key);
}

function closeProject() {
  els.layout.classList.remove("is-project-open");
  els.projectView.classList.remove("is-open");
  els.projectView.hidden = true;
}

function openProject(slug) {
  renderProject(slug);
  els.layout.classList.add("is-project-open");
  els.projectView.hidden = false;
  els.projectView.scrollTo(0, 0);
  if (isMobile()) {
    requestAnimationFrame(() => els.projectView.classList.add("is-open"));
  } else if (typeof gsap !== "undefined") {
    gsap.fromTo(els.projectView, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }
  setActiveNav("work");
}

function route() {
  const hash = location.hash || "#/";
  const projectMatch = hash.match(/^#\/project\/(.+)$/);

  if (projectMatch) {
    openProject(decodeURIComponent(projectMatch[1]));
    return;
  }

  closeProject();

  const found = NAV.find((n) => n.hash === hash);
  goToPage(found ? found.key : "home");
}

function initSwipe() {
  const track = els.pagesTrack;
  let startX = 0;
  let startY = 0;
  let axis = null;
  let dragging = false;
  let baseX = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      if (!isMobile() || els.layout.classList.contains("is-project-open")) return;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      axis = null;
      dragging = false;
      baseX = -currentPageIndex * window.innerWidth;
      if (typeof gsap !== "undefined") gsap.killTweensOf(track);
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isMobile() || els.layout.classList.contains("is-project-open")) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
        dragging = axis === "x";
      }
      if (axis !== "x") return;

      e.preventDefault();
      const min = -(pageOrder.length - 1) * window.innerWidth;
      let x = baseX + dx;
      if (x > 0) x = x * 0.35;
      if (x < min) x = min + (x - min) * 0.35;
      if (typeof gsap !== "undefined") {
        gsap.set(track, { x });
      } else {
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
    },
    { passive: false }
  );

  track.addEventListener("touchend", (e) => {
    if (!dragging) return;
    dragging = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    let targetIndex = currentPageIndex;
    if (Math.abs(dx) > window.innerWidth * 0.16) {
      targetIndex = dx < 0 ? currentPageIndex + 1 : currentPageIndex - 1;
      targetIndex = Math.max(0, Math.min(pageOrder.length - 1, targetIndex));
    }
    const targetKey = pageOrder[targetIndex];
    if (targetKey !== pageOrder[currentPageIndex]) {
      location.hash = NAV[targetIndex].hash;
    } else {
      goToPage(targetKey);
    }
  });
}

window.addEventListener("hashchange", route);
window.addEventListener("resize", () => {
  setNavHeight();
  if (els.layout.classList.contains("is-project-open")) return;
  goToPage(pageOrder[currentPageIndex], { animate: false });
});

initNav();
initNavScroll();
initSidebar();
renderHero();
renderGrid(els.gridHome, PROJECTS, { carousel: false });
renderGrid(els.gridWork, PROJECTS);
renderInfo();
renderSideB();
setNavHeight();
initSwipe();
route();
