/**
 * Scroll reveals, animated counters, hero parallax, a reactive header and the
 * pointer-driven effects (spotlight, magnetic buttons, cursor label).
 *
 * Every effect is opt-out through `prefers-reduced-motion` and is re-initialised
 * on each Astro view transition via `astro:page-load`, which also fires on the
 * very first load. All window/document listeners hang off a single
 * AbortController so `teardown()` can drop them in one call, and all per-frame
 * work funnels through one scroll and one pointer rAF tick.
 */

const STAGGER_STEP_MS = 70;
const STAGGER_MAX_STEPS = 6;
const COUNTER_DURATION_MS = 1100;
const PARALLAX_STRENGTH = 0.07;
const PARALLAX_MAX_PX = 16;
const HEADER_COMPACT_AT_PX = 24;
const HEADER_HIDE_AFTER_PX = 120;
const HEADER_HYSTERESIS_PX = 8;
const MAGNETIC_STRENGTH = 0.22;
const MAGNETIC_MAX_PX = 6;
const MAGNETIC_REACH_PX = 90;
const LEADING_NUMBER = /^(\d+(?:[.,]\d+)?)/;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

/** Cubic ease-out, matching the timing function used by the reveal transition. */
const easeOut = (progress) => 1 - (1 - progress) ** 3;

const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value));

const isInViewport = (rect) => rect.bottom > 0 && rect.top < window.innerHeight;

const containsPoint = (rect, x, y) =>
	x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

let observers = [];
let listeners;
let scrollFrame = 0;
let pointerFrame = 0;

let parallaxItems = [];
let headerElement = null;
let lastScrollY = 0;

let spotlightItems = [];
let magneticItems = [];
let cursorLabelItems = [];
let cursorLabel = null;
let pointerX = 0;
let pointerY = 0;

/* ── reveals ──────────────────────────────────────────────────────────── */

function revealEverything() {
	for (const element of document.querySelectorAll("[data-reveal]")) {
		element.classList.add("is-revealed");
	}
}

function setupReveals() {
	const targets = document.querySelectorAll("[data-reveal]");
	if (!targets.length) return;

	// Siblings inside a group fade in one after another instead of all at once.
	for (const group of document.querySelectorAll("[data-reveal-group]")) {
		const children = group.querySelectorAll(":scope > [data-reveal]");
		children.forEach((child, index) => {
			const step = Math.min(index, STAGGER_MAX_STEPS);
			child.style.setProperty("--reveal-delay", `${step * STAGGER_STEP_MS}ms`);
		});
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-revealed");
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
	);

	for (const target of targets) observer.observe(target);
	observers.push(observer);
}

/* ── counters ─────────────────────────────────────────────────────────── */

function runCounter(element) {
	const raw = element.dataset.counterValue;
	const suffix = element.dataset.counterSuffix ?? "";
	const separator = raw.includes(",") ? "," : ".";
	const decimals = raw.split(/[.,]/)[1]?.length ?? 0;
	const target = Number.parseFloat(raw.replace(",", "."));
	const startedAt = performance.now();

	const format = (value) =>
		`${value.toFixed(decimals).replace(".", separator)}${suffix}`;

	const step = (now) => {
		const progress = Math.min((now - startedAt) / COUNTER_DURATION_MS, 1);
		element.textContent = format(target * easeOut(progress));
		if (progress < 1) requestAnimationFrame(step);
	};

	element.textContent = format(0);
	requestAnimationFrame(step);
}

function setupCounters() {
	const targets = [];

	for (const element of document.querySelectorAll("[data-counter]")) {
		const text = element.textContent.trim();
		const match = LEADING_NUMBER.exec(text);
		// Values without a leading number ("FinTech") simply keep their text.
		if (!match) continue;
		element.dataset.counterValue = match[1];
		element.dataset.counterSuffix = text.slice(match[1].length);
		targets.push(element);
	}

	if (!targets.length) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				runCounter(entry.target);
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.6 },
	);

	for (const target of targets) observer.observe(target);
	observers.push(observer);
}

/* ── scroll tick: parallax + header ───────────────────────────────────── */

function setupParallax() {
	parallaxItems = [...document.querySelectorAll("[data-parallax]")];
}

function updateParallax() {
	const viewport = window.innerHeight;

	for (const item of parallaxItems) {
		const rect = item.getBoundingClientRect();
		if (!isInViewport(rect)) continue;
		const centerOffset = rect.top + rect.height / 2 - viewport / 2;
		const shift = clamp(-centerOffset * PARALLAX_STRENGTH, PARALLAX_MAX_PX);
		item.style.setProperty("--parallax-y", `${shift.toFixed(2)}px`);
	}
}

function setupHeader() {
	headerElement = document.getElementById("header");
	lastScrollY = Math.max(window.scrollY, 0);
}

function updateHeader() {
	if (!headerElement) return;

	const y = Math.max(window.scrollY, 0);
	const scrollable = document.documentElement.scrollHeight - window.innerHeight;

	headerElement.style.setProperty(
		"--scroll-progress",
		scrollable > 0 ? Math.min(y / scrollable, 1).toFixed(4) : "0",
	);
	headerElement.classList.toggle("is-compact", y > HEADER_COMPACT_AT_PX);

	// Hysteresis keeps the header from flickering on sub-pixel scroll jitter.
	const delta = y - lastScrollY;
	if (Math.abs(delta) <= HEADER_HYSTERESIS_PX) return;
	lastScrollY = y;

	// Never slide the header away while the mobile menu hangs off it.
	const menu = document.getElementById("menu");
	const menuOpen = menu ? !menu.classList.contains("hidden") : false;

	headerElement.classList.toggle(
		"is-hidden",
		delta > 0 && y > HEADER_HIDE_AFTER_PX && !menuOpen,
	);
}

function onScroll() {
	if (scrollFrame) return;
	scrollFrame = requestAnimationFrame(() => {
		scrollFrame = 0;
		updateParallax();
		updateHeader();
	});
}

/* ── pointer tick: spotlight + magnetic + cursor label ────────────────── */

function setupSpotlight() {
	spotlightItems = [...document.querySelectorAll("[data-spotlight]")];
}

function updateSpotlight() {
	for (const item of spotlightItems) {
		const rect = item.getBoundingClientRect();
		if (!isInViewport(rect)) continue;

		if (!containsPoint(rect, pointerX, pointerY)) {
			item.style.setProperty("--spot-opacity", "0");
			continue;
		}

		item.style.setProperty("--spot-opacity", "1");
		item.style.setProperty("--mx", `${(pointerX - rect.left).toFixed(1)}px`);
		item.style.setProperty("--my", `${(pointerY - rect.top).toFixed(1)}px`);
	}
}

function setupMagnetic() {
	magneticItems = [...document.querySelectorAll("[data-magnetic]")];
}

function releaseMagnet(item) {
	item.style.removeProperty("--magnet-x");
	item.style.removeProperty("--magnet-y");
}

function updateMagnetic() {
	for (const item of magneticItems) {
		const rect = item.getBoundingClientRect();
		if (!isInViewport(rect)) continue;

		const dx = pointerX - (rect.left + rect.width / 2);
		const dy = pointerY - (rect.top + rect.height / 2);
		const distance = Math.hypot(dx, dy);
		const reach = Math.max(rect.width, rect.height) / 2 + MAGNETIC_REACH_PX;

		if (distance > reach) {
			releaseMagnet(item);
			continue;
		}

		const pull = MAGNETIC_STRENGTH * (1 - distance / reach);
		item.style.setProperty(
			"--magnet-x",
			`${clamp(dx * pull, MAGNETIC_MAX_PX).toFixed(2)}px`,
		);
		item.style.setProperty(
			"--magnet-y",
			`${clamp(dy * pull, MAGNETIC_MAX_PX).toFixed(2)}px`,
		);
	}
}

function setupCursorLabel() {
	cursorLabelItems = [...document.querySelectorAll("[data-cursor-label]")];
	if (!cursorLabelItems.length) return;

	// One shared badge for every card. The static label stays in the markup for
	// screen readers and for touch, so this one is decorative.
	cursorLabel = document.createElement("div");
	cursorLabel.className = "cursor-label";
	cursorLabel.setAttribute("aria-hidden", "true");
	document.body.append(cursorLabel);
}

function updateCursorLabel() {
	if (!cursorLabel) return;

	const active = cursorLabelItems.find((item) =>
		containsPoint(item.getBoundingClientRect(), pointerX, pointerY),
	);

	if (!active) {
		cursorLabel.classList.remove("is-visible");
		return;
	}

	cursorLabel.textContent = active.dataset.cursorLabel ?? "";
	cursorLabel.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
	cursorLabel.classList.add("is-visible");
}

function onPointerMove(event) {
	pointerX = event.clientX;
	pointerY = event.clientY;
	if (pointerFrame) return;
	pointerFrame = requestAnimationFrame(() => {
		pointerFrame = 0;
		updateSpotlight();
		updateMagnetic();
		updateCursorLabel();
	});
}

function onPointerLeave() {
	for (const item of spotlightItems)
		item.style.setProperty("--spot-opacity", "0");
	for (const item of magneticItems) releaseMagnet(item);
	cursorLabel?.classList.remove("is-visible");
}

/* ── lifecycle ────────────────────────────────────────────────────────── */

function teardown() {
	for (const observer of observers) observer.disconnect();
	observers = [];

	listeners?.abort();
	listeners = undefined;

	if (scrollFrame) cancelAnimationFrame(scrollFrame);
	if (pointerFrame) cancelAnimationFrame(pointerFrame);
	scrollFrame = 0;
	pointerFrame = 0;

	headerElement?.classList.remove("is-compact", "is-hidden");
	headerElement = null;

	cursorLabel?.remove();
	cursorLabel = null;

	parallaxItems = [];
	spotlightItems = [];
	magneticItems = [];
	cursorLabelItems = [];
}

function init() {
	teardown();

	if (reducedMotion.matches) {
		revealEverything();
		return;
	}

	listeners = new AbortController();
	const { signal } = listeners;

	setupReveals();
	setupCounters();
	setupParallax();
	setupHeader();

	window.addEventListener("scroll", onScroll, { passive: true, signal });
	updateParallax();
	updateHeader();

	// Pointer effects are decoration for a real cursor: skip them on touch,
	// where they would fire once on tap and then stick.
	if (!finePointer.matches) return;

	setupSpotlight();
	setupMagnetic();
	setupCursorLabel();

	if (!spotlightItems.length && !magneticItems.length && !cursorLabel) return;

	document.addEventListener("pointermove", onPointerMove, {
		passive: true,
		signal,
	});
	document.addEventListener("pointerleave", onPointerLeave, { signal });
}

document.addEventListener("astro:page-load", init);
document.addEventListener("astro:before-swap", teardown);
reducedMotion.addEventListener("change", init);
finePointer.addEventListener("change", init);
