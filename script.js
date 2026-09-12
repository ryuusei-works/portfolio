const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const range = (value, start, end) => clamp((value - start) / (end - start));

const loader = document.querySelector(".loader");
const dismissLoader = () => loader?.classList.add("done");

window.addEventListener("load", () => window.setTimeout(dismissLoader, 320), { once: true });
window.setTimeout(dismissLoader, 1800);

const heroGallery = document.querySelector("#hero-gallery");
const worksList = document.querySelector("#works-list");

const heroArtworkTemplate = (project) => {
  const index = projects.indexOf(project);

  return `
    <button class="hero-artwork" type="button" data-project-index="${index}" aria-label="${project.title}の詳細を見る" tabindex="-1">
      <span class="hero-artwork-frame">
        <img src="${project.thumbnail}" alt="" loading="eager" />
      </span>
      <span class="hero-artwork-caption">
        <span><strong>${project.title}</strong><span>${project.category}</span></span>
        <b aria-hidden="true">↗</b>
      </span>
    </button>
  `;
};

const workRowTemplate = (project, index) => {
  const number = String(index + 1).padStart(2, "0");
  const loading = index < 2 ? "eager" : "lazy";

  return `
    <button class="work-row reveal" type="button" data-project-index="${index}" aria-label="${project.title}の作品詳細を見る">
      <span class="row-number" aria-hidden="true">${number}</span>
      <span class="row-image"><img src="${project.thumbnail}" alt="" loading="${loading}" /></span>
      <span>
        <strong class="row-title">${project.title}</strong>
        <span class="row-role">${project.role}</span>
      </span>
      <span class="row-category">${project.category}</span>
      <span class="row-arrow" aria-hidden="true">↗</span>
    </button>
  `;
};

if (heroGallery) {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  heroGallery.innerHTML = featuredProjects.map(heroArtworkTemplate).join("");
}

if (worksList) {
  worksList.innerHTML = projects.map(workRowTemplate).join("");
}

const dialog = document.querySelector("#work-dialog");
const dialogClose = dialog?.querySelector(".dialog-close");
const dialogFields = dialog
  ? {
      image: dialog.querySelector("#dialog-image"),
      category: dialog.querySelector("#dialog-category"),
      number: dialog.querySelector("#dialog-number"),
      title: dialog.querySelector("#dialog-title"),
      role: dialog.querySelector("#dialog-role"),
      description: dialog.querySelector("#dialog-description"),
      year: dialog.querySelector("#dialog-year"),
      tools: dialog.querySelector("#dialog-tools"),
      link: dialog.querySelector("#dialog-link"),
      note: dialog.querySelector("#dialog-note"),
    }
  : null;

const openProject = (index) => {
  const project = projects[index];
  if (!dialog || !dialogFields || !project) return;

  dialogFields.image.src = project.thumbnail;
  dialogFields.image.alt = project.imageAlt;
  dialogFields.category.textContent = project.category;
  dialogFields.number.textContent = `ARTWORK ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  dialogFields.title.textContent = project.title;
  dialogFields.role.textContent = project.role;
  dialogFields.description.textContent = project.description;
  dialogFields.year.textContent = project.year;
  dialogFields.tools.textContent = project.technologies.join(" / ");

  const hasPublicUrl = Boolean(project.url) && !project.isConcept;
  dialogFields.link.hidden = !hasPublicUrl;
  dialogFields.note.textContent = hasPublicUrl ? "新しいタブで開きます" : "CONCEPT WORK / 公開準備中";
  if (hasPublicUrl) {
    dialogFields.link.href = project.url;
    dialogFields.link.setAttribute("aria-label", `${project.title}の公開サイトを見る（新しいタブで開きます）`);
  } else {
    dialogFields.link.removeAttribute("href");
  }

  document.body.classList.add("dialog-open");
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
  dialog.scrollTop = 0;
};

const closeProject = () => {
  if (!dialog) return;
  if (typeof dialog.close === "function" && dialog.open) {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  }
};

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-project-index]");
  if (!trigger) return;
  openProject(Number(trigger.dataset.projectIndex));
});

dialogClose?.addEventListener("click", closeProject);
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) closeProject();
});
dialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog?.addEventListener("cancel", () => document.body.classList.remove("dialog-open"));

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -5%" },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const siteHeader = document.querySelector(".site-header");
const journey = document.querySelector(".journey");
const heroBackground = document.querySelector(".hero-background");
const heroTint = document.querySelector(".hero-tint");
const heroCopy = document.querySelector(".hero-copy");
const galleryScene = document.querySelector(".gallery-scene");
const chapterLabel = document.querySelector("#chapter-label");
const progressFill = document.querySelector("#journey-progress");
const galleryControls = galleryScene?.querySelectorAll("button, a") ?? [];
let frameRequested = false;

const setGalleryInteractive = (isInteractive) => {
  if (!galleryScene) return;
  galleryScene.classList.toggle("is-active", isInteractive);
  galleryScene.setAttribute("aria-hidden", String(!isInteractive));
  if ("inert" in galleryScene) galleryScene.inert = !isInteractive;
  galleryControls.forEach((control) => control.setAttribute("tabindex", isInteractive ? "0" : "-1"));
};

const renderScrollState = () => {
  frameRequested = false;
  siteHeader?.classList.toggle("scrolled", window.scrollY > 30);

  if (!journey || document.body.classList.contains("motion-off")) {
    setGalleryInteractive(false);
    return;
  }

  const journeyTop = journey.offsetTop;
  const distance = Math.max(1, journey.offsetHeight - window.innerHeight);
  const progress = clamp((window.scrollY - journeyTop) / distance);
  const introExit = range(progress, 0.12, 0.34);
  const galleryEnter = range(progress, 0.31, 0.53);
  const galleryExit = range(progress, 0.88, 1);

  if (heroBackground) {
    const scale = 1.01 + progress * 0.085;
    heroBackground.style.transform = `scale(${scale}) translateX(${progress * -1.8}%)`;
    heroBackground.style.filter = `brightness(${1 - progress * 0.28}) saturate(${1 - progress * 0.16})`;
  }

  if (heroTint) heroTint.style.opacity = String(1 - galleryEnter * 0.22);
  if (heroCopy) {
    heroCopy.style.opacity = String(1 - introExit);
    heroCopy.style.transform = `translateY(${introExit * -34}px)`;
  }
  if (galleryScene) {
    galleryScene.style.opacity = String(galleryEnter * (1 - galleryExit));
    galleryScene.style.transform = `translateY(${(1 - galleryEnter) * 38 - galleryExit * 28}px)`;
  }

  const galleryIsInteractive = galleryEnter > 0.72 && galleryExit < 0.4;
  setGalleryInteractive(galleryIsInteractive);
  if (chapterLabel) chapterLabel.textContent = progress < 0.34 ? "01 — THE ENTRANCE" : "02 — SELECTED WORKS";
  if (progressFill) progressFill.style.transform = `scaleX(${progress})`;
};

const requestScrollRender = () => {
  if (frameRequested) return;
  frameRequested = true;
  window.requestAnimationFrame(renderScrollState);
};

window.addEventListener("scroll", requestScrollRender, { passive: true });
window.addEventListener("resize", requestScrollRender, { passive: true });

const motionToggle = document.querySelector(".motion-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const setMotionOff = (motionOff) => {
  document.body.classList.toggle("motion-off", motionOff);
  motionToggle?.setAttribute("aria-pressed", String(motionOff));
  motionToggle?.setAttribute("aria-label", motionOff ? "動きを有効にする" : "動きを止める");
  if (motionToggle) motionToggle.querySelector("span").textContent = motionOff ? "▶" : "Ⅱ";

  if (motionOff) {
    heroBackground?.removeAttribute("style");
    heroTint?.removeAttribute("style");
    heroCopy?.removeAttribute("style");
    galleryScene?.removeAttribute("style");
  }

  renderScrollState();
};

if (prefersReducedMotion.matches) setMotionOff(true);
motionToggle?.addEventListener("click", () => {
  setMotionOff(!document.body.classList.contains("motion-off"));
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

const closeMenu = () => {
  siteNav?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "メニューを開く");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("open") ?? false;
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) closeMenu();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

setGalleryInteractive(false);
renderScrollState();
