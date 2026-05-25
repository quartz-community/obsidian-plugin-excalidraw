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

  var overlaysContainer = page.querySelector(".excalidraw-overlays");

  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function positionOverlays() {
    if (!overlaysContainer) return;
    var overlays = overlaysContainer.querySelectorAll(".excalidraw-overlay");
    if (overlays.length === 0) return;

    var vbW = parseFloat(overlaysContainer.getAttribute("data-viewbox-w")) || 1;
    var vbH = parseFloat(overlaysContainer.getAttribute("data-viewbox-h")) || 1;
    var offX = parseFloat(overlaysContainer.getAttribute("data-offset-x")) || 0;
    var offY = parseFloat(overlaysContainer.getAttribute("data-offset-y")) || 0;

    var rect = container.getBoundingClientRect();
    var containerW = rect.width;
    var containerH = rect.height;

    var baseScale = Math.min(containerW / vbW, containerH / vbH);
    var baseCenterX = (containerW - vbW * baseScale) / 2;
    var baseCenterY = (containerH - vbH * baseScale) / 2;

    for (var i = 0; i < overlays.length; i++) {
      var el = overlays[i];
      var ex = parseFloat(el.getAttribute("data-x")) || 0;
      var ey = parseFloat(el.getAttribute("data-y")) || 0;
      var ew = parseFloat(el.getAttribute("data-w")) || 0;
      var eh = parseFloat(el.getAttribute("data-h")) || 0;

      var baseLeft = baseCenterX + (ex + offX) * baseScale;
      var baseTop = baseCenterY + (ey + offY) * baseScale;
      var baseWidth = ew * baseScale;
      var baseHeight = eh * baseScale;

      el.style.left = (baseLeft * zoom + panX) + "px";
      el.style.top = (baseTop * zoom + panY) + "px";
      el.style.width = (baseWidth * zoom) + "px";
      el.style.height = (baseHeight * zoom) + "px";
      el.style.display = "flex";
    }
  }

  positionOverlays();

  function applyTransform() {
    svg.style.transform = "translate(" + panX + "px, " + panY + "px) scale(" + zoom + ")";
    positionOverlays();
  }

  function handleWheel(e) {
    e.preventDefault();
    var delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta));
    applyTransform();
  }

  function handleMouseDown(e) {
    if (e.button !== 0) return;
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

  var zoomInBtn = page.querySelector(".excalidraw-zoom-in");
  var zoomOutBtn = page.querySelector(".excalidraw-zoom-out");
  var resetBtn = page.querySelector(".excalidraw-reset");

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", function() {
      zoom = Math.min(MAX_ZOOM, zoom + ZOOM_STEP);
      applyTransform();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", function() {
      zoom = Math.max(MIN_ZOOM, zoom - ZOOM_STEP);
      applyTransform();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function() {
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

  window.addCleanup(function() {
    container.removeEventListener("wheel", handleWheel);
    container.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });
}

document.addEventListener("nav", initExcalidraw);
