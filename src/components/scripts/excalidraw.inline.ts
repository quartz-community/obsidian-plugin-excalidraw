// @ts-nocheck
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.15;

function initExcalidraw() {
  const framePage = document.querySelector(".page[data-frame='excalidraw']");
  if (framePage) {
    initSidebar(framePage);
    initPanZoom(framePage);
    return;
  }

  const embeddedPages = document.querySelectorAll(".excalidraw-page");
  for (const page of embeddedPages) {
    initPanZoom(page);
  }
}

function initSidebar(page) {
  const toggle = page.querySelector(".excalidraw-sidebar-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    page.classList.toggle("excalidraw-sidebar-open");
  });

  window.addCleanup(() => {
    page.classList.remove("excalidraw-sidebar-open");
  });
}

function initPanZoom(page) {
  const container = page.querySelector(".excalidraw-container");
  if (!container) return;

  const svg = container.querySelector("svg");
  if (!svg) return;

  container.style.backgroundColor = "var(--excalidraw-bg, var(--light))";

  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function applyTransform() {
    svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  }

  function isInsideEmbed(target) {
    if (!target) return false;
    let el = target;
    while (el && el !== container) {
      if (el.tagName === "foreignObject" || el.tagName === "FOREIGNOBJECT") return true;
      if (el.classList && (el.classList.contains("excalidraw-embed-note") || el.classList.contains("excalidraw-embed-url"))) return true;
      el = el.parentElement || el.parentNode;
    }
    return false;
  }

  var embeds = container.querySelectorAll(".excalidraw-embed-note, .excalidraw-embed-url");
  for (var i = 0; i < embeds.length; i++) {
    embeds[i].addEventListener("wheel", function(e) { e.stopPropagation(); }, { passive: true });
    embeds[i].addEventListener("mousedown", function(e) { e.stopPropagation(); });
  }

  function handleWheel(e) {
    if (isInsideEmbed(e.target)) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta));
    applyTransform();
  }

  function handleMouseDown(e) {
    if (e.button !== 0) return;
    if (isInsideEmbed(e.target)) return;
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    container.style.cursor = "grabbing";
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    applyTransform();
  }

  function handleMouseUp() {
    isDragging = false;
    container.style.cursor = "grab";
  }

  const zoomInBtn = page.querySelector(".excalidraw-zoom-in");
  const zoomOutBtn = page.querySelector(".excalidraw-zoom-out");
  const resetBtn = page.querySelector(".excalidraw-reset");

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      zoom = Math.min(MAX_ZOOM, zoom + ZOOM_STEP);
      applyTransform();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      zoom = Math.max(MIN_ZOOM, zoom - ZOOM_STEP);
      applyTransform();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      zoom = 1;
      panX = 0;
      panY = 0;
      applyTransform();
    });
  }

  container.addEventListener("wheel", handleWheel, { passive: false });
  container.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  window.addCleanup(() => {
    container.removeEventListener("wheel", handleWheel);
    container.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });
}

document.addEventListener("nav", initExcalidraw);
