// Joaquin Lavori — portfolio site logic
// No build step: plain DOM rendering driven by data.js + hash routing.

const els = {
  grid: document.getElementById("grid"),
  projectView: document.getElementById("project-view"),
  aboutView: document.getElementById("about-view"),
  tabs: document.querySelectorAll(".tab"),
  aboutShortText: document.getElementById("about-short-text"),
  bookLink: document.getElementById("book-link"),
  emailLink: document.getElementById("email-link"),
  igLink: document.getElementById("ig-link"),
  featuredInList: document.getElementById("featured-in-list"),
  awardsList: document.getElementById("awards-list"),
};

function mailtoUrl(subject) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

function initSidebar() {
  els.aboutShortText.textContent = SITE.aboutShort;
  els.bookLink.href = mailtoUrl("Project inquiry / consultation");
  els.emailLink.href = mailtoUrl("Hello");
  els.emailLink.textContent = SITE.email;
  els.igLink.href = SITE.instagramUrl;

  els.featuredInList.innerHTML = SITE.featuredIn
    .map((f) => `<li>${f}</li>`)
    .join("");

  els.awardsList.innerHTML = SITE.awards
    .map((a) => `<li><span class="year">${a.title}</span>${a.detail}</li>`)
    .join("");
}

function renderGrid() {
  els.grid.innerHTML = PROJECTS.map((p) => {
    if (p.type === "logos") {
      return `
        <a class="tile logos-tile" href="#/project/${p.slug}">
          <div class="tile-img">
            <div class="logos-tile-grid">
              ${p.marks
                .slice(0, 4)
                .map((m) => `<span>${m.name}</span>`)
                .join("")}
            </div>
          </div>
          <div class="tile-caption">
            <h3>${p.brand}</h3>
            <p>${p.blurb}</p>
          </div>
        </a>`;
    }
    return `
      <a class="tile" href="#/project/${p.slug}">
        <div class="tile-img">
          <img src="${p.hero}" alt="${p.brand}" loading="lazy" />
        </div>
        <div class="tile-caption">
          <h3>${p.brand}</h3>
          <p>${p.blurb}</p>
        </div>
      </a>`;
  }).join("");
}

function renderProject(slug) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) {
    els.projectView.innerHTML = `<a class="back-link" href="#/">← back</a><p>Project not found.</p>`;
    return;
  }

  const metaBits = [p.location, p.year].filter(Boolean);

  if (p.type === "logos") {
    els.projectView.innerHTML = `
      <a class="back-link" href="#/">← back to all work</a>
      <div class="project-header">
        <h1>${p.brand}</h1>
        <div class="project-meta">
          ${metaBits.map((m) => `<div>${m}</div>`).join("")}
        </div>
      </div>
      <div class="project-body">
        ${p.body.map((para) => `<p>${para}</p>`).join("")}
      </div>
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
    `;
    return;
  }

  els.projectView.innerHTML = `
    <a class="back-link" href="#/">← back to all work</a>
    <div class="project-header">
      <h1>${p.brand}</h1>
      <div class="project-meta">
        ${metaBits.map((m) => `<div>${m}</div>`).join("")}
        ${p.link ? `<div><a href="${p.link}" target="_blank" rel="noopener">${p.linkLabel}</a></div>` : ""}
      </div>
    </div>
    <div class="project-body">
      ${p.body.map((para) => `<p>${para}</p>`).join("")}
    </div>
    <div class="project-gallery">
      ${p.gallery.map((src) => `<img src="${src}" alt="${p.brand}" loading="lazy" />`).join("")}
    </div>
  `;
}

function renderAbout() {
  els.aboutView.innerHTML = `
    <h1>About</h1>
    ${SITE.aboutLong.map((para) => `<p>${para}</p>`).join("")}

    <h2>Education</h2>
    <ul class="about-list">
      ${SITE.education.map((e) => `<li><span class="year">${e.year}</span>${e.detail}</li>`).join("")}
    </ul>

    <h2>In-house roles</h2>
    <ul class="about-list">
      ${SITE.roles.map((e) => `<li><span class="year">${e.year}</span>${e.detail}</li>`).join("")}
    </ul>

    <h2>Exhibitions</h2>
    <ul class="about-list">
      ${SITE.exhibitions.map((e) => `<li><span class="year">${e.year}</span>${e.detail}</li>`).join("")}
    </ul>

    <h2>Residencies</h2>
    <p>${SITE.residencies}</p>

    <h2>Awards</h2>
    <ul class="about-list">
      ${SITE.awards.map((a) => `<li><span class="year">${a.title}</span>${a.detail}</li>`).join("")}
    </ul>

    <h2>Featured in</h2>
    <ul class="about-list">
      ${SITE.featuredIn.map((f) => `<li>${f}</li>`).join("")}
    </ul>

    <div class="about-contact">
      <h2>Get in touch</h2>
      <div class="sidebar-row"><span>Consultation</span><a class="sidebar-link" href="${mailtoUrl("Project inquiry / consultation")}">book a call</a></div>
      <div class="sidebar-row"><span>Email</span><a class="sidebar-link" href="${mailtoUrl("Hello")}">${SITE.email}</a></div>
      <div class="sidebar-row"><span>Instagram</span><a class="sidebar-link" href="${SITE.instagramUrl}" target="_blank" rel="noopener">follow</a></div>
    </div>
  `;
}

function setActiveTab(tabName) {
  els.tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tabName));
}

function showView(view) {
  els.grid.hidden = view !== "grid";
  els.projectView.hidden = view !== "project";
  els.aboutView.hidden = view !== "about";
}

function route() {
  const hash = location.hash || "#/";
  const projectMatch = hash.match(/^#\/project\/(.+)$/);

  if (projectMatch) {
    renderProject(decodeURIComponent(projectMatch[1]));
    showView("project");
    setActiveTab("work");
    window.scrollTo(0, 0);
    return;
  }

  if (hash === "#/about") {
    showView("about");
    setActiveTab("about");
    window.scrollTo(0, 0);
    return;
  }

  // default: grid ("all" / "work")
  showView("grid");
  const current = document.querySelector(".tab.active");
  setActiveTab(current && current.dataset.tab === "about" ? "all" : (current ? current.dataset.tab : "all"));
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const name = tab.dataset.tab;
    setActiveTab(name);
    if (name === "about") {
      location.hash = "#/about";
    } else {
      location.hash = "#/";
      showView("grid");
    }
  });
});

window.addEventListener("hashchange", route);

initSidebar();
renderGrid();
renderAbout();
route();
