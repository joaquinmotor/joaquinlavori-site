// Joaquin Lavori — portfolio site logic
// No build step: plain DOM rendering driven by data.js + hash routing.
// Mobile: 4 pages (home/work/info/sideb) live side by side in #pagesTrack
// and are paged with a horizontal swipe; the sidebar is hidden. Desktop:
// one page shown at a time, no swipe, plus a left sidebar rendered per-page
// by renderSidebar() — Home/Work get a compact Photo+About/Contact/
// Instagram card sidebar, Info adds 5 project cards, Side B has none (its
// own content is a photo masonry, not sidebar+grid). Several pages also
// render an entirely separate desktop-only DOM block (Home's 3rd tile
// column, Work's masonry catalog, Info's 3-column content, Side B's
// masonry, the project view's desktop layout) toggled by CSS media query
// rather than mobile's structure just reflowing — Pencil's Desktop frames
// are genuinely different layouts, not the same content restyled. A single
// top pill nav (logo + HOME/WORK/INFO/SIDE B) is shared across both
// breakpoints. See notas.md for the full audit/build history.

/* global NAV, SITE, PROJECTS, INFO_CONTENT, INFO_DESKTOP, SIDE_B, gsap */

const MOBILE_BREAKPOINT = 860;
const pageOrder = NAV.map((n) => n.key);

const els = {
  siteNav: document.getElementById("siteNav"),
  layout: document.getElementById("layout"),
  pagesTrack: document.getElementById("pagesTrack"),
  heroMedia: document.getElementById("heroMedia"),
  heroMediaCover: document.getElementById("heroMediaCover"),
  homeIntro: document.getElementById("homeIntro"),
  gridHome: document.getElementById("grid-home"),
  gridHomeLeft: document.getElementById("grid-home-left"),
  gridHomeRight: document.getElementById("grid-home-right"),
  gridHomeThird: document.getElementById("grid-home-third"),
  gridWork: document.getElementById("grid-work"),
  gridWorkDesktop: document.getElementById("grid-work-desktop"),
  pageWork: document.getElementById("page-work"),
  infoContent: document.getElementById("infoContent"),
  infoDesktop: document.getElementById("infoDesktop"),
  sidebContent: document.getElementById("sidebContent"),
  sidebDesktop: document.getElementById("sidebDesktop"),
  projectView: document.getElementById("project-view"),
  sidebar: document.getElementById("sidebar"),
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

// Play badges removed site-wide (2026-08-11, user request) — videos autoplay
// now (see realMediaTag()), so a "tap to play" affordance is misleading, and
// static placeholders never needed one either. Kept as a no-op function
// (rather than stripping every call site) so slideTag()'s isVideo branching
// stays intact if badges ever need to come back for a specific case.
function playBadge() {
  return "";
}

// Real media only renders for projects listed here — every other project
// still shows the gray placeholder box (structure-first pass, matches
// Pencil) until its photos are reviewed and confirmed ready. Add a slug
// once that project's assets/img/<slug>/ folder is final. See notas.md
// "El sitio hoy NO renderiza fotos/videos reales" for the full context.
const REAL_MEDIA_PROJECTS = new Set(["the-movement", "afends", "ceremonia", "lacalle", "roark", "vans", "laguitarrita"]);

function mediaSrc(media) {
  if (!media) return null;
  return typeof media === "string" ? media : media.src;
}

function hasRealMedia(media) {
  const src = mediaSrc(media);
  if (!src) return false;
  for (const slug of REAL_MEDIA_PROJECTS) {
    if (src.startsWith(`assets/img/${slug}/`)) return true;
  }
  return false;
}

// Real <img>/<video> markup for a media entry already confirmed real by
// hasRealMedia(). Videos autoplay muted + looped, no controls (2026-08-11,
// per user feedback — a static poster read as broken/unfinished).
// Cache-busting for MEDIA files (index.html's ?v= only versions css/js).
// The user replaces files in place all the time — same filename, new content
// (a re-cut video, a re-exported photo, the 2026-08-22 pass that resized
// every carrusel image to 660px) — and browsers that already loaded a page
// keep serving the stale copy. Appending this to every real-media URL at
// render time makes those replacements land without a hard refresh.
// BUMP THIS whenever media files are overwritten in place. It is applied
// here, not in data.js, so the paths in data.js stay clean and hasRealMedia()
// keeps matching them.
const MEDIA_V = "5";
function withMediaV(url) {
  if (!url) return url;
  return url + (url.includes("?") ? "&" : "?") + "v=" + MEDIA_V;
}

function realMediaTag(media) {
  if (media && typeof media === "object" && media.type === "video") {
    return `<video class="media-real" src="${withMediaV(media.src)}" poster="${withMediaV(media.poster)}" muted autoplay loop playsinline preload="auto" fetchpriority="low"></video>`;
  }
  return `<img class="media-real" src="${withMediaV(media)}" alt="" loading="lazy" />`;
}

// The big Home hero (mobile) stays placeholder-only on purpose (2026-08-11,
// user request) even for projects with real media unlocked elsewhere — it
// doesn't take a media argument, matching its pre-2026-08-11 behavior.
// 2026-08-12: fills with the JQ personal seal badge (see badgeTag()) instead
// of the flat gray box.
function coverTag() {
  return badgeTag();
}

// Personal seal badge (JQ monogram, Est. 1987 / Buenos Aires) — a finished
// asset, not a real-project photo, so it's kept separate from
// slideTag()/hasRealMedia() and only wired into the three spots the user
// asked for (2026-08-12): the Home hero (mobile, via coverTag above), the
// Info hero (mobile, renderInfo's info-hero-media), and the shared desktop
// sidebar photo (renderSidebar's page-sidebar-photo) — which by itself
// repeats across Home Desktop, Work selected Desktop (project view keeps
// the sidebar mounted, see renderProjectDesktop) and Info Desktop. Static
// piece (2026-08-12: bounce removed per user request) with a soft contact
// shadow and a periodic light glint that sweeps across the mark itself.
//
// The glint mechanism has gone through THREE architectures in one day
// (2026-08-12) chasing two separate, confirmed rendering bugs — worth
// recording in full since a future "it's not animating" report should
// start from here, not from scratch:
//   1) Original: CSS `-webkit-mask-image`/`mask-image` (masked to the
//      badge's own alpha) on a div, with an animated `transform` on a
//      child bar. Worked at first, then broke on iOS Safari specifically
//      (confirmed live): first froze on one bright stuck frame, then after
//      a GPU-layer-promotion attempt (translate3d/will-change/backface-
//      visibility) it stopped rendering the animation at all. This is a
//      known WebKit trigger: CSS masking of an HTML element + an animated
//      transform on a descendant.
//   2) Rewrite to an inline SVG with a native <mask> (from the badge PNG's
//      alpha) and SMIL <animateTransform> on a gradient <rect> — a
//      completely different rendering pipeline from (1), chosen to
//      sidestep that WebKit bug class. It didn't: verified in this sandbox
//      (Chromium only, no WebKit available) that the <animateTransform>
//      genuinely progresses (getCTM() sampled across the full cycle showed
//      real movement) and the mask/gradient both render correctly in
//      total isolation, but INSIDE THE ACTUAL APP the gradient-filled rect
//      never painted a single differing pixel across the whole 8s cycle —
//      confirmed by sampling raw pixel color directly over the darkest ink
//      stroke of the badge every 200-400ms for a full cycle: constant
//      (20,11,0) the entire time, vs. a plain SOLID-color rect (no
//      gradient) animating correctly in the exact same DOM position. So:
//      solid SVG fills animate fine here, but a gradient fill on an
//      animated/masked shape silently never repaints — a real Chromium
//      bug specific to this app's compositing context (the page track
//      this sits inside carries `will-change: transform` for the swipe
//      gesture, which is suspected but not confirmed as the trigger).
//      Static (non-animated) gradients DID paint, just proving the
//      gradient definition itself was fine — only the animated case inside
//      this DOM ever silently failed to paint.
//   3) Current: back to plain CSS, but *without* any masking at all. A
//      `background: linear-gradient(...)` bar on a div, moved by a CSS
//      `@keyframes` transform, blended with `mix-blend-mode: screen`. No
//      `-webkit-mask-image` (avoids bug #1's trigger) and no SVG animate/
//      gradient combo (avoids bug #2). It doesn't need masking to the
//      badge's silhouette to look right: `mix-blend-mode: screen` over a
//      light backdrop is nearly a no-op by the blend math itself (screen
//      of a light base stays close to that base regardless of the blend
//      layer), so the sweep is only meaningfully visible where it crosses
//      genuinely dark/saturated pixels — i.e. the ink strokes — which is
//      exactly the same "only lights up the mark" look the mask used to
//      provide on purpose, just achieved as a side effect of the blend
//      math instead of an explicit clip. Containment to the badge's
//      rectangular box (so the bar can't spill into neighboring layout)
//      comes from `.jq-badge-wrap`'s own `overflow:hidden`, same as
//      before. Verified in this sandbox (Chromium) by sampling the same
//      dark-ink pixel across a full cycle: constant at rest, then a real,
//      strong jump (from near-black to a mid-grey) exactly mid-sweep, and
//      back to the original value after — a clean rest state on both ends
//      of the cycle. Since this is plain CSS (no mask, no SVG SMIL), it's
//      the simplest of the three approaches and, unlike (2), was actually
//      confirmed working end-to-end in this exact app before shipping —
//      but only in Chromium; iOS Safari still can't be verified locally
//      (no WebKit browser in this sandbox), so it remains an informed bet
//      that removing the CSS mask (the specific ingredient bug #1 needed)
//      avoids that failure mode, not a confirmed fix on real hardware.
function badgeTag() {
  return `
    <div class="jq-badge-wrap">
      <div class="jq-badge-stage">
        <div class="jq-badge-shine-wrap">
          <img class="jq-badge-img" src="assets/img/badge/jq-seal.png" alt="Joaquin Lavori — personal seal, Est. 1987" />
          <div class="jq-badge-shine"><div class="jq-badge-shine-bar"></div></div>
        </div>
        <div class="jq-badge-shadow"></div>
      </div>
    </div>`;
}

function renderHero() {
  const featured = PROJECTS.find((p) => p.type !== "logos") || PROJECTS[0];
  els.heroMediaCover.innerHTML = coverTag(featured);
  els.heroMedia.href = `#/project/${featured.slug}`;
}

function renderHomeIntro() {
  if (els.homeIntro) els.homeIntro.textContent = SITE.aboutShort;
}

// Desktop sidebar (360px). Home Desktop (z2Lknd) and Work Desktop
// (Ghq1t/uDnON) both use the same Photo + About/Contact/Instagram card
// sidebar; Info Desktop (X8g8f) adds 5 project preview cards below it;
// Side B Desktop (BI3ZW) has no persistent sidebar at all — its own body
// is a 4-track photo masonry instead (see renderSideBDesktop). This
// replaces the old single About/Contact/Featured-In/Awards sidebar that
// used to show unconditionally on every desktop page.
function sidebarCardsHTML() {
  const aboutBody = INFO_CONTENT.bio.replace(/\n\n/g, " ");
  const cards = [
    { title: "About Joaquin", link: "Read more", href: "#/info", body: aboutBody },
    { title: "Project inquiries", link: "Contact", href: mailtoUrl("Project inquiry / consultation"), body: SITE.email },
    { title: "Instagram", link: "Follow", href: SITE.instagramUrl, external: true, body: SITE.instagram },
  ];
  return cards
    .map(
      (c) => `
      <div class="page-sidebar-card">
        <div class="page-sidebar-card-header">
          <span>${c.title}</span>
          <a href="${c.href}"${c.external ? ' target="_blank" rel="noopener"' : ""}>${c.link}</a>
        </div>
        <p>${c.body}</p>
      </div>`
    )
    .join('<div class="page-sidebar-divider"></div>');
}

const SIDEBAR_PROJECT_HEIGHTS = [200, 170, 210, 180, 230];
function sidebarProjectsHTML() {
  return PROJECTS.slice(0, 5)
    .map(
      (p, i) => `
      <div class="page-sidebar-project">
        <div class="tile-cover" style="height:${SIDEBAR_PROJECT_HEIGHTS[i]}px">${slideTag(p.hero)}</div>
        <p class="tile-caption-text">${fantasyCaptionHTML("tile-caption-title", "tile-caption-desc")}</p>
      </div>`
    )
    .join("");
}

function renderSidebar(key) {
  if (key === "sideb") {
    els.sidebar.innerHTML = "";
    return;
  }
  els.sidebar.innerHTML = `
    <div class="page-sidebar-photo">${badgeTag()}</div>
    <div class="page-sidebar-divider"></div>
    ${sidebarCardsHTML()}
    ${key === "info" ? `<div class="page-sidebar-divider"></div>${sidebarProjectsHTML()}` : ""}
  `;
}

// Real media (see coverTag/REAL_MEDIA_PROJECTS above) renders as a real
// <img>/<video>, with the play badge kept only on videos (real photos don't
// get one). Everything else still falls back to the gray placeholder box
// with a badge, same as the generic media placeholders in Pencil.
function slideTag(media) {
  if (hasRealMedia(media)) {
    const isVideo = media && typeof media === "object" && media.type === "video";
    return `${realMediaTag(media)}${isVideo ? playBadge() : ""}`;
  }
  return `<div class="media-placeholder">${playBadge()}</div>`;
}

// A nested array inside a project's `gallery` (see data.js) is a "carrusel"
// group — photos meant to render as one continuous horizontal filmstrip
// instead of stacked full-width items (2026-08-11, user request: phone
// photos side by side, auto-scrolling right-to-left, infinite loop). Plain
// entries (string/video object) still render as a normal full-width
// .project-gallery-item via slideTag(), same as before.
function galleryItemHTML(entry) {
  if (Array.isArray(entry)) return marqueeHTML(entry);
  // {type:"carrusel", items:[...], height:N} — same marquee as a plain
  // array (see above), but with an explicit height override instead of the
  // default 220px (2026-08-12, user request: 3 of Ceremonia's 1-item
  // carrusel groups needed to sit at 70px instead of the usual 220px).
  // Plain-array carrusel groups elsewhere (the-movement, afends, and
  // Ceremonia's own carrusel4) are untouched by this — they keep the
  // default height from .project-marquee in styles.css.
  if (entry && entry.type === "carrusel") return marqueeHTML(entry.items, entry.height, entry.speed);
  if (entry && entry.type === "slideshow") return slideshowHTML(entry.items, entry.height, entry.interval);
  return `<div class="project-gallery-item">${slideTag(entry)}</div>`;
}

// "Slide-cut" group (see data.js comment on PROJECTS[].gallery): one photo
// at a time, hard cut (no fade — no transition on opacity) to the next
// every .5s, infinite loop, no nav/dots (2026-08-12, user request). Distinct
// from a "carrusel" marquee: nothing scrolls, only one photo is ever
// visible, all photos are stacked in the same box and shown/hidden via the
// is-active class instead of laid out side by side. Optional `height`
// (2026-08-12, Ceremonia: "las fotos... ahora tienen todas el mismo tamaño
// de alto") switches every slide to a fixed box (object-fit:cover, see
// .is-fixed-height in styles.css) instead of each photo's own natural
// size — without it (afends' slideshows), the box still jumps size on
// every cut, unchanged.
function slideshowHTML(items, height, interval) {
  const fixedClass = height ? " is-fixed-height" : "";
  const style = height ? ` style="height:${height}px"` : "";
  // Optional per-group interval override (2026-08-22, user request: La Calle
  // Bar's slidecut2/slidecut3 needed "la mitad de velocidad" = 1000ms). Read
  // back by initSlideshows() off the data attribute; groups without it keep
  // the SLIDESHOW_INTERVAL_MS default, so afends/Ceremonia are untouched.
  const intervalAttr = interval ? ` data-slideshow-interval="${interval}"` : "";
  const slidesHTML = items
    .map((src, i) => `<div class="project-slideshow-slide${i === 0 ? " is-active" : ""}">${slideTag(src)}</div>`)
    .join("");
  return `<div class="project-slideshow${fixedClass}" data-slideshow${intervalAttr}${style}>${slidesHTML}</div>`;
}

// Runs every active .project-slideshow's interval. Module-level (not per-
// instance) because renderProject() wholesale-replaces #project-view on
// every SPA navigation — an interval left running on a detached node would
// otherwise leak forever; clearSlideshows() (called at the top of
// renderProject(), before either render path runs) always tears down the
// previous page's intervals first.
let slideshowIntervals = [];
function clearSlideshows() {
  slideshowIntervals.forEach(clearInterval);
  slideshowIntervals = [];
}
// Marquee scroll SPEED, not duration: the CSS default (22s per loop, see
// project-marquee-scroll in styles.css) scrolls a WIDER track (more/bigger
// photos) faster in px/s than a narrower one, since every group shares the
// same 22s regardless of its own total width — inconsistent perceived
// speed across groups (user report 2026-08-12: "38-carrusel anda mas
// rapido que los otros"). Once each track's images finish loading, this
// measures its own one-cycle distance (half the track's width — the track
// is the group rendered twice back to back, see marqueeHTML()) and sets an
// explicit animation-duration so every marquee scrolls at the same
// MARQUEE_PX_PER_SEC regardless of item count/width. The CSS's 22s stays
// as the fallback for the brief window before images finish loading.
const MARQUEE_PX_PER_SEC = 55;
function initMarquees(root) {
  root.querySelectorAll(".project-marquee-track").forEach((track) => {
    const imgs = Array.from(track.querySelectorAll("img"));
    const apply = () => {
      const halfWidth = track.scrollWidth / 2;
      const pxPerSec = Number(track.dataset.speed) || MARQUEE_PX_PER_SEC;
      if (halfWidth > 0) track.style.animationDuration = `${halfWidth / pxPerSec}s`;
    };
    if (imgs.every((img) => img.complete)) {
      apply();
      return;
    }
    let remaining = imgs.filter((img) => !img.complete).length;
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener(
        "load",
        () => {
          remaining -= 1;
          if (remaining === 0) apply();
        },
        { once: true }
      );
    });
  });
}

// Default hard-cut interval for a "slide-cut" group (2026-08-12, user
// request: half a second). A group can override it with `interval` in
// data.js -> data-slideshow-interval (2026-08-22).
const SLIDESHOW_INTERVAL_MS = 500;
function initSlideshows(root) {
  root.querySelectorAll("[data-slideshow]").forEach((el) => {
    const slides = el.querySelectorAll(".project-slideshow-slide");
    if (slides.length <= 1) return;
    const ms = Number(el.dataset.slideshowInterval) || SLIDESHOW_INTERVAL_MS;
    let i = 0;
    slideshowIntervals.push(
      setInterval(() => {
        slides[i].classList.remove("is-active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("is-active");
      }, ms)
    );
  });
}

// CSS-only infinite marquee: the track renders the group twice back to
// back and animates translateX(0 → -50%) — since both halves are
// identical and equal width, the loop point is seamless. Images keep
// their natural aspect ratio at a fixed height (no object-fit crop), so
// they read as a filmstrip, not a cropped grid.
// No loading="lazy" here (2026-08-11): the track's width:max-content — and
// therefore where the -50% loop point lands — depends on every image's
// intrinsic size being known immediately, not resolved gradually as the
// user scrolls into each one.
function marqueeHTML(items, height, speed) {
  // fetchpriority="high" + decoding="async" (2026-08-22, user report: "a las
  // fotos de los carruseles les cuesta cargar"). These images can't be lazy
  // (see the note above), so they all request the moment a project opens —
  // right when the gallery's autoplaying <video>s start pulling tens of MB.
  // The hint puts the filmstrip photos ahead of the videos in the browser's
  // request queue instead of behind them; realMediaTag() marks the videos
  // fetchpriority="low" for the same reason. The other half of that fix was
  // resizing every marquee source to 660px tall (3x the 220px display
  // height) — they were being served at up to 1600px, ~4.3MB total across
  // the site, now ~1.7MB.
  const itemsHTML = items
    .map((src) => `<div class="project-marquee-item"><img src="${withMediaV(src)}" alt="" fetchpriority="high" decoding="async" /></div>`)
    .join("");
  const style = height ? ` style="height:${height}px"` : "";
  // Optional per-group scroll speed in px/s, overriding MARQUEE_PX_PER_SEC
  // (2026-08-22, user request: Roark's carrusel4 "tiene que correr apenas
  // mas rapido"). Read back by initMarquees() off the data attribute.
  const speedAttr = speed ? ` data-speed="${speed}"` : "";
  return `<div class="project-marquee"${style}><div class="project-marquee-track"${speedAttr}>${itemsHTML}${itemsHTML}</div></div>`;
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

// Pencil still has placeholder ("fantasy") caption copy everywhere it uses
// this Title+description pattern — every Home tile and every Related Work
// tile literally reads "Vans" / "Serie de ilustraciones y desarrollo de
// personajes", not per-item content. Mirroring it exactly (not swapping in
// real project names/blurbs) until real captions land in Pencil.
const FANTASY_CAPTION_TITLE = "Vans";
const FANTASY_CAPTION_DESC = "Serie de ilustraciones y desarrollo de personajes";
function fantasyCaptionHTML(titleClass, descClass) {
  return `<span class="${titleClass}">${FANTASY_CAPTION_TITLE}</span> <span class="${descClass}">${FANTASY_CAPTION_DESC}</span>`;
}

// Real caption (client + overview, straight from the project's own
// brand/blurb — sourced from its text doc, see notas.md) for the same
// Title+description slot the fantasy copy above uses. Only shown for
// REAL_MEDIA_PROJECTS entries (2026-08-11, user request) — everything else
// keeps the Pencil fantasy placeholder until its media/copy is unlocked.
function realCaptionHTML(titleClass, descClass, item) {
  return `<span class="${titleClass}">${item.brand}</span> <span class="${descClass}">${item.blurb}</span>`;
}

function tileHTML(item, index, { linkable = true, numbered = true, carousel = true, fantasyCaption = false, coverOverride = null } = {}) {
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

  // coverOverride (e.g. PROJECTS[n].homeCover) swaps in a specific slide
  // for this tile's cover only — used by renderHomeGrid so a project can
  // show a video (or any single asset) as its Home tile instead of
  // gallery[0]/hero, without touching the Project page's own hero/gallery
  // order. Doesn't affect Work/related-work tiles, which never pass it.
  const slides = coverOverride
    ? [coverOverride]
    : item.gallery && item.gallery.length
      ? item.gallery
      : [item.cover || item.hero];
  const cover = carousel ? carouselHTML(slides, { max: 4 }) : `<div class="tile-cover">${slideTag(slides[0])}</div>`;
  const useRealCaption = fantasyCaption && item.slug && REAL_MEDIA_PROJECTS.has(item.slug) && item.blurb;
  const captionInner = fantasyCaption
    ? `<p class="tile-caption-text">${
        useRealCaption
          ? realCaptionHTML("tile-caption-title", "tile-caption-desc", item)
          : fantasyCaptionHTML("tile-caption-title", "tile-caption-desc")
      }</p>`
    : `<h3>${displayTitle}</h3><p>${category}</p>`;
  const captionClass = fantasyCaption ? "tile-caption tile-caption--fantasy" : "tile-caption";

  if (linkable && item.slug) {
    return `
      <div class="tile" data-slug="${item.slug}">
        ${cover}
        <a class="${captionClass}" href="#/project/${item.slug}">${captionInner}</a>
      </div>`;
  }
  return `<div class="tile static">${cover}<div class="${captionClass}">${captionInner}</div></div>`;
}

function renderGrid(el, items, opts) {
  el.innerHTML = items.map((item, i) => tileHTML(item, i, opts)).join("");
  initTileCarousels(el);
}

// Home Mobile (tZLyC): two independent columns of 3 tiles each (matches
// Pencil's "Column Left" / "Column Right"). Home Desktop (z2Lknd) is a 3x3
// grid instead — the 3rd column (next 3 projects) renders here too but
// stays CSS-hidden below 861px, so mobile's exact 6-tile set is unchanged.
// How many projects the Home grid features across its two main columns.
// New projects are appended in PROJECTS order — the user's rule (2026-08-22):
// "cuando se agregan proyectos se van agregando abajo del ultimo". So when a
// project is finished and added, BUMP THIS NUMBER; nothing else needs to
// change. The two columns alternate by index (even -> left, odd -> right), so
// an odd count simply leaves the left column one tile longer. The desktop-only
// third column picks up the 3 projects that follow.
const HOME_FEATURED_COUNT = 7;
// The first 6 tiles keep Pencil's original layout exactly: strict alternation,
// even index -> left column, odd -> right. Tiles BEYOND those 6 are appended
// starting on the RIGHT, then alternating (7th -> right, 8th -> left,
// 9th -> right...). That's what puts La Guitarrita directly under Vans, the
// last tile of the right column (2026-08-22, user: "abajo de vans pone el
// proyecto en el home") instead of at the foot of the taller left column,
// which is where plain alternation sent it.
const HOME_BASE_TILES = 6;
function renderHomeGrid(items) {
  const featured = items.slice(0, HOME_FEATURED_COUNT);
  const onLeft = (i) => (i < HOME_BASE_TILES ? i % 2 === 0 : (i - HOME_BASE_TILES) % 2 === 1);
  const left = featured.filter((_, i) => onLeft(i));
  const right = featured.filter((_, i) => !onLeft(i));
  const third = items.slice(HOME_FEATURED_COUNT, HOME_FEATURED_COUNT + 3);
  const tile = (item) =>
    tileHTML(item, items.indexOf(item), { carousel: false, fantasyCaption: true, coverOverride: item.homeCover });
  els.gridHomeLeft.innerHTML = left.map(tile).join("");
  els.gridHomeRight.innerHTML = right.map(tile).join("");
  initTileCarousels(els.gridHomeLeft);
  initTileCarousels(els.gridHomeRight);
  if (els.gridHomeThird) {
    els.gridHomeThird.innerHTML = third.map(tile).join("");
    initTileCarousels(els.gridHomeThird);
  }
}

// Work Desktop unselected (Ghq1t): the full 12-project catalog as a 3-column
// masonry grid of fantasy-caption tiles (same u9oDO pattern as Home), no
// header text. CSS-hidden below 861px, where #grid-work (single-column
// list) is used instead. All 12 PROJECTS fill exactly 3x4 tiles.
function renderWorkDesktopGrid(items) {
  if (!els.gridWorkDesktop) return;
  const cols = [[], [], []];
  items.forEach((item, i) => cols[i % 3].push(item));
  els.gridWorkDesktop.innerHTML = cols
    .map(
      (col, ci) => `
      <div class="work-desktop-col">
        ${col.map((item) => tileHTML(item, items.indexOf(item), { carousel: false, fantasyCaption: true })).join("")}
      </div>`
    )
    .join("");
  initTileCarousels(els.gridWorkDesktop);
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

// Info Grid (8 category columns, since 2026-08-11) renders as two side-by-side
// groups (5 + 3) matching Pencil's "Grid Column A / B" split — not a single
// stacked column.
function infoColumnsHTML(columns) {
  const groupHTML = (cols) =>
    cols
      .map(
        (col) => `
        <div class="info-column">
          <h4 class="info-column-label">${col.label}</h4>
          <div class="info-column-values">${col.values.join("<br />")}</div>
        </div>`
      )
      .join("");
  return `
    <div class="info-columns">
      <div class="info-column-group">${groupHTML(columns.slice(0, 5))}</div>
      <div class="info-column-group">${groupHTML(columns.slice(5))}</div>
    </div>`;
}

function renderInfo() {
  const c = INFO_CONTENT;
  els.infoContent.innerHTML = `
    <div class="info-left">
      <div class="info-hero-wrap"><div class="info-hero-media">${badgeTag()}</div></div>
      ${c.bio
        .split("\n\n")
        .map((para) => `<p class="info-bio">${para}</p>`)
        .join("")}
      <div class="info-divider"></div>
      <div class="info-sections">
        ${c.sections
          .map(
            (s, i) => `
          ${i > 0 ? '<div class="info-divider"></div>' : ""}
          <div class="info-section">
            <p class="info-section-heading">${s.title}</p>
            <p class="info-section-body">${s.body}</p>
          </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="info-right">
      ${infoColumnsHTML(c.columns)}
      <p class="info-cta">${c.cta}</p>
      <div class="info-indent-row">
        <div class="info-spacer"></div>
        <div class="info-indent-col info-contact-col">
          <div>${SITE.email}</div>
          <div>${SITE.phone}</div>
          <div>Currently living in ${SITE.location}</div>
        </div>
      </div>
    </div>
  `;
  renderInfoDesktop();
}

// Info Desktop (X8g8f): a completely different layout from mobile, not a
// CSS reflow of it — 3 content columns (each ending in a photo), using
// Pencil's Desktop-specific list content (INFO_DESKTOP in data.js, approved
// by the user in place of the mobile INFO_CONTENT lists for this layout
// only). The matching photo+About/Contact/Instagram+5-project sidebar is
// rendered separately by renderSidebar("info").
function infoDesktopSectionHTML(s, i) {
  const body = s.list ? `<div class="info-desktop-list">${s.list.join("<br />")}</div>` : `<p class="info-desktop-body">${s.body}</p>`;
  return `
    ${i > 0 ? '<div class="info-divider"></div>' : ""}
    <div class="info-desktop-section">
      <p class="info-desktop-heading">${s.title}</p>
      ${body}
    </div>`;
}
function renderInfoDesktop() {
  if (!els.infoDesktop) return;
  els.infoDesktop.innerHTML = INFO_DESKTOP.columns
    .map(
      (col) => `
      <div class="info-desktop-col">
        ${col.sections.map(infoDesktopSectionHTML).join("")}
        <div class="info-desktop-photo">${slideTag()}</div>
      </div>`
    )
    .join("");
}

function renderSideB() {
  els.sidebContent.innerHTML = `
    <div class="sideb-title-wrap">
      <p class="sideb-intro">${SIDE_B.introMobile}</p>
    </div>
    <div class="sideb-grid" id="grid-sideb"></div>
    <div class="sideb-footer-divider"></div>
  `;
  renderGrid(document.getElementById("grid-sideb"), SIDE_B.items, { linkable: false, numbered: false, carousel: false });
  renderSideBDesktop();
}

// Side B Desktop (BI3ZW): NOT a wider version of the mobile grid — a 4-track
// masonry. Track 1 ("Sidebar") holds the title + full intro copy + 2
// photos; the other 3 tracks are pure photo columns (3 each), 11 media
// slots total, no captions/numbers/links anywhere. CSS-hidden below 861px,
// where .sideb-content (the mobile grid above) is used instead.
const SIDEB_DESKTOP_TRACKS = {
  sidebar: { heights: [240, 240], badges: [true, true] },
  col1: { heights: [240, 200, 230], badges: [true, false, false] },
  col2: { heights: [190, 260, 210], badges: [false, true, false] },
  col3: { heights: [220, 180, 260], badges: [false, false, true] },
};
function sideBDesktopPhotoHTML(height, badge) {
  return `<div class="sideb-desktop-photo" style="height:${height}px">${badge ? slideTag() : `<div class="media-placeholder"></div>`}</div>`;
}
function renderSideBDesktop() {
  if (!els.sidebDesktop) return;
  const track = (key) => {
    const t = SIDEB_DESKTOP_TRACKS[key];
    return t.heights.map((h, i) => sideBDesktopPhotoHTML(h, t.badges[i])).join("");
  };
  els.sidebDesktop.innerHTML = `
    <div class="sideb-desktop-sidebar">
      <div class="sideb-desktop-intro">
        <h1 class="sideb-desktop-title">Side B</h1>
        <p class="sideb-desktop-body">${SIDE_B.intro}</p>
      </div>
      ${track("sidebar")}
    </div>
    <div class="sideb-desktop-col">${track("col1")}</div>
    <div class="sideb-desktop-col">${track("col2")}</div>
    <div class="sideb-desktop-col">${track("col3")}</div>
  `;
}

// Kept only for the (currently unused) "logos" project type — no PROJECTS
// entry sets type:"logos" today, but the branch below still depends on it.
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

// Related Work: next 4 projects after the current one, wrapping — matches
// Pencil's 2x2 staggered grid (Project Mobile / K9YKC).
// Related Work = the SAME set of projects the Home grid features, minus the
// one being viewed, in PROJECTS order (2026-08-22, user: "tienen que volver a
// aparecer todos los proyectos del home").
// It used to be "the next 4 projects after this one, wrapping", which broke
// down as the catalogue filled in from the top: opening La Guitarrita — the
// last featured project — wrapped straight into fatima/lightningbolt/aim/
// voicot, four projects still in placeholder mode, so the footer was four
// grey boxes. Reusing HOME_FEATURED_COUNT means this section grows with the
// Home grid automatically and can never fall off the end of the list.
function relatedProjects(slug) {
  return PROJECTS.slice(0, HOME_FEATURED_COUNT).filter((p) => p.slug !== slug);
}

function relatedWorkHTML(slug) {
  const items = relatedProjects(slug);
  if (!items.length) return "";
  const rows = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return `
    <div class="project-related">
      ${rows
        .map(
          (row) => `
        <div class="project-related-row">
          ${row
            .map(
              (item) => `
            <a class="project-related-item" href="#/project/${item.slug}">
              <div class="tile-cover">${slideTag(item.hero)}</div>
              <p class="project-related-caption">${
                REAL_MEDIA_PROJECTS.has(item.slug) && item.blurb
                  ? realCaptionHTML("project-related-title", "project-related-desc", item)
                  : fantasyCaptionHTML("project-related-title", "project-related-desc")
              }</p>
            </a>`
            )
            .join("")}
        </div>`
        )
        .join("")}
    </div>`;
}

function renderProject(slug) {
  clearSlideshows();
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) {
    els.projectView.innerHTML = `<div class="project-info"><p>Project not found.</p></div>`;
    return;
  }

  if (p.type === "logos") {
    const nextRow = `<div class="next-project-row"><a class="next-project-link" href="#/project/${nextProjectSlug(p.slug)}">NEXT PROJECT →</a></div>`;
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

  if (!isMobile()) {
    renderProjectDesktop(p);
    return;
  }

  // Matches Pencil's Project Mobile frame (K9YKC): Hero Media, then a
  // Title/"Overview" header row, a Meta Col + body-text row, a stacked
  // gallery (no carousel chrome — mirrors the gray placeholder mockup),
  // a Related Work grid, and the shared footer. No CLIENT/ROLE/YEAR
  // labels or carousel dots/counter — none of that exists in Pencil.
  const gallery = p.gallery && p.gallery.length ? p.gallery : [p.hero];
  const restGallery = gallery.slice(1);
  const linkHTML = p.link
    ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel} →</a>`
    : "";

  els.projectView.innerHTML = `
    <div class="project-hero-wrap">
      <div class="project-hero-media">${slideTag(gallery[0])}</div>
    </div>
    <div class="project-info">
      <div class="project-info-header">
        <h1 class="project-title">${p.brand}</h1>
        <div class="project-overview-label">Overview</div>
      </div>
      <div class="project-info-body">
        <div class="project-meta-col">
          <div class="project-meta-line">${p.category}</div>
          ${p.year ? `<div class="project-meta-line">${p.year}</div>` : ""}
        </div>
        <div class="project-overview-text">
          ${p.body.map((para) => `<p>${para}</p>`).join("")}
          ${linkHTML}
        </div>
      </div>
    </div>
    ${
      restGallery.length
        ? `<div class="project-gallery">${restGallery.map(galleryItemHTML).join("")}</div>`
        : ""
    }
    <div class="project-gallery-divider"></div>
    ${relatedWorkHTML(p.slug)}
    <div class="project-footer-divider"></div>
    <footer class="site-footer">${footerHTML()}</footer>
  `;
  initSlideshows(els.projectView);
  initMarquees(els.projectView);
}

// Desktop project view — matches Pencil's Work selected Desktop (uDnON), NOT
// a scaled-up version of the mobile layout: a header (title + tagline, then
// a description paragraph) and a 3-column masonry photo gallery with no
// captions at all. The shared page sidebar (Photo+About+Contact+Instagram,
// "work" variant) stays visible alongside this — openProject() re-renders
// it, this function only fills #project-view. No Pencil "Project Desktop"
// frame exists separately; this selected-Work-Desktop state fills that role.
const PROJECT_DESKTOP_GALLERY_HEIGHTS = [240, 200, 230, 190, 260, 210, 220, 180, 260];
// A masonry cell whose gallery entry is a nested array (a "carrusel" group,
// see galleryItemHTML()/marqueeHTML() above) renders the same auto-scroll
// filmstrip as mobile instead of falling through slideTag() to an empty
// placeholder (slideTag()/hasRealMedia() only know how to read a string or a
// {type:"video"} object, not an array — 2026-08-12 bug, was showing as a
// blank gray box on every project with a carrusel group in Desktop). The
// filmstrip keeps its own fixed height (.project-marquee, 220px) instead of
// the masonry's randomized per-cell height — stretching/cropping it to an
// arbitrary column height would defeat the "natural aspect ratio" point of
// the marquee.
function renderDesktopGalleryCell(item) {
  if (Array.isArray(item.src)) {
    return `<div class="project-desktop-photo project-desktop-photo--marquee">${marqueeHTML(item.src)}</div>`;
  }
  // {type:"carrusel", items, height} — same override as galleryItemHTML()
  // above, mirrored here so Desktop's masonry respects the custom height too
  // instead of falling back to the fixed 220px (2026-08-12, Ceremonia).
  if (item.src && item.src.type === "carrusel") {
    return `<div class="project-desktop-photo project-desktop-photo--marquee">${marqueeHTML(item.src.items, item.src.height, item.src.speed)}</div>`;
  }
  if (item.src && item.src.type === "slideshow") {
    return `<div class="project-desktop-photo project-desktop-photo--slideshow">${slideshowHTML(item.src.items, item.src.height, item.src.interval)}</div>`;
  }
  return `<div class="project-desktop-photo" style="height:${item.height}px">${slideTag(item.src)}</div>`;
}
function renderProjectDesktop(p) {
  const gallery = p.gallery && p.gallery.length ? p.gallery : [p.hero];
  const cols = [[], [], []];
  gallery.forEach((s, i) => {
    cols[i % 3].push({ src: s, height: PROJECT_DESKTOP_GALLERY_HEIGHTS[i % PROJECT_DESKTOP_GALLERY_HEIGHTS.length] });
  });
  els.projectView.innerHTML = `
    <div class="project-desktop-header">
      <div class="project-desktop-header-row">
        <h1 class="project-desktop-title">${p.brand}</h1>
        <p class="project-desktop-tagline">${p.blurb}</p>
      </div>
      <div class="project-desktop-description">${p.body.map((para) => `<p>${para}</p>`).join("")}</div>
    </div>
    <div class="project-desktop-gallery">
      ${cols
        .map(
          (col) => `
        <div class="project-desktop-col">
          ${col.map(renderDesktopGalleryCell).join("")}
        </div>`
        )
        .join("")}
    </div>
    <footer class="site-footer">${footerHTML()}</footer>
  `;
  initSlideshows(els.projectView);
  initMarquees(els.projectView);
}

// Info page shows a Footer instance with the contact-links block removed
// (email/phone/Instagram already appear via .info-contact-col above it) —
// includeContact:false renders just the divider-less copyright/back-to-top
// row, matching Pencil's per-page override. Every other page keeps the
// default full footer.
function footerHTML({ includeContact = true } = {}) {
  return `
    ${
      includeContact
        ? `
    <div class="footer-contact">
      <a class="footer-contact-line" href="${mailtoUrl("Hello")}">${SITE.email}</a>
      <a class="footer-contact-line" href="tel:${SITE.phone.replace(/\s+/g, "")}">${SITE.phone}</a>
      <a class="footer-contact-line" href="${SITE.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
    </div>
    <div class="footer-divider"></div>`
        : ""
    }
    <div class="footer-bottom">
      <div class="footer-copy">
        <div class="footer-copyright">© ${new Date().getFullYear()} Joaquin Lavori</div>
        <div class="footer-rights">All rights reserved</div>
      </div>
      <button type="button" class="back-to-top" data-back-to-top>Back to top</button>
    </div>
  `;
}

function initNav() {
  els.siteNav.innerHTML = `
    <nav class="nav-links">
      ${NAV.map(
        (n, i) => `
        ${i > 0 ? '<div class="nav-divider"></div>' : ""}
        <a class="nav-segment" data-key="${n.key}" href="${n.hash}">
          <span class="nav-pill-wrap"><span class="nav-pill"><span class="nav-label">${n.label}</span></span></span>
        </a>`
      ).join("")}
    </nav>
  `;

  document.querySelectorAll("[data-footer]").forEach((f) => {
    f.innerHTML = footerHTML({ includeContact: !f.closest("#page-info") });
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

  // Clicking the WORK nav pill is the explicit way back to the catalog.
  // Swiping to Work while a project is open lands on the same "#/work"
  // hash (see initSwipe()'s silent history.replaceState), so a click here
  // often doesn't change location.hash and never fires hashchange/route() —
  // handle the close directly instead of relying on that.
  els.siteNav.addEventListener("click", (e) => {
    const link = e.target.closest('.nav-segment[data-key="work"]');
    if (!link || !els.pageWork.classList.contains("is-project-open")) return;
    closeProject();
    goToPage("work");
  });
}

function setActiveNav(key) {
  els.siteNav.querySelectorAll(".nav-links a").forEach((a) => a.classList.toggle("active", a.dataset.key === key));
}

function initNavScroll() {
  const setScrolled = (top) => els.siteNav.classList.toggle("is-scrolled", top > 4);
  // #project-view no longer scrolls independently — it lives inside Work's
  // own .page-scroll, already covered below.
  const scrollers = [window, ...document.querySelectorAll(".page-scroll")];
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
  renderSidebar(key);

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
  els.pageWork.classList.remove("is-project-open");
  els.projectView.classList.remove("is-open");
}

// Opening a project always "pins" it to the Work tab (Pencil's Work
// selected Desktop, uDnON, reused for this — see notas.md) instead of
// covering the whole screen: #project-view lives inside #page-work's own
// scroller, so Work stays fixed on this project while the swipe gesture
// (and the top nav) keep working normally to browse Home/Info/Side B. The
// project stays open until a different one is opened, or the Work tab is
// explicitly re-selected (see route()) — navigating elsewhere doesn't
// close it.
function openProject(slug) {
  renderProject(slug);
  els.pageWork.classList.add("is-project-open");
  goToPage("work");
  const scroller = els.pageWork.querySelector(".page-scroll");
  if (scroller) scroller.scrollTo(0, 0);
  if (isMobile()) {
    requestAnimationFrame(() => els.projectView.classList.add("is-open"));
  } else if (typeof gsap !== "undefined") {
    gsap.fromTo(els.projectView, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  } else {
    els.projectView.classList.add("is-open");
  }
  // renderProject() (above) fills #project-view with innerHTML — including
  // any <video autoplay> tags — while .project-view still has display:none
  // (the is-project-open class above is what flips it to display:block).
  // Browsers don't start loading/autoplaying <video> elements that were
  // inserted into a display:none subtree, and simply becoming visible
  // afterward doesn't retroactively kick that off (2026-08-12 bug: real
  // videos in the gallery — poster.jpg loads, .mp4 never does — same cause
  // on mobile and desktop). Explicitly (re)start them now that the view is
  // actually visible.
  els.projectView.querySelectorAll("video[autoplay]").forEach((v) => {
    v.load();
    v.play().catch(() => {});
  });
}

function route() {
  const hash = location.hash || "#/";
  const projectMatch = hash.match(/^#\/project\/(.+)$/);

  if (projectMatch) {
    openProject(decodeURIComponent(projectMatch[1]));
    return;
  }

  const found = NAV.find((n) => n.hash === hash);
  const key = found ? found.key : "home";

  // Explicitly navigating to the Work tab (nav click, direct link, back
  // button) is the way to leave an open project behind and see the catalog
  // again. Navigating to Home/Info/Side B leaves it pinned/open on Work.
  if (key === "work") closeProject();

  goToPage(key);
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
      if (!isMobile()) return;
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
      if (!isMobile()) return;
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
    goToPage(pageOrder[targetIndex]);
    // A swipe is just a page peek — unlike a real nav click it must not
    // close a project pinned open on Work (see openProject/route()), so
    // sync the URL silently instead of going through hashchange routing.
    const targetHash = NAV[targetIndex].hash;
    if (location.hash !== targetHash) history.replaceState(null, "", targetHash);
  });
}

window.addEventListener("hashchange", route);
window.addEventListener("resize", () => {
  setNavHeight();
  goToPage(pageOrder[currentPageIndex], { animate: false });
});

initNav();
initNavScroll();
renderHomeIntro();
renderHero();
renderHomeGrid(PROJECTS);
// Work Mobile (z0NKkz) is a single-column list of fantasy-caption cards, same
// pattern as Home — not the old numbered/carousel 2-col grid. CSS (`.grid`)
// switches #grid-work to a full-width single column at mobile widths.
renderGrid(els.gridWork, PROJECTS, { carousel: false, fantasyCaption: true });
renderWorkDesktopGrid(PROJECTS);
renderInfo();
renderSideB();
setNavHeight();
initSwipe();
route();
