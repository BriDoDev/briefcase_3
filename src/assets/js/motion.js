/**
 * Scroll reveals, animated counters and hero parallax.
 *
 * Every effect is opt-out through `prefers-reduced-motion` and is re-initialised
 * on each Astro view transition via `astro:page-load`, which also fires on the
 * very first load.
 */

const STAGGER_STEP_MS = 70;
const STAGGER_MAX_STEPS = 6;
const COUNTER_DURATION_MS = 1100;
const PARALLAX_STRENGTH = 0.07;
const PARALLAX_MAX_PX = 16;
const LEADING_NUMBER = /^(\d+(?:[.,]\d+)?)/;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Cubic ease-out, matching the timing function used by the reveal transition. */
const easeOut = (progress) => 1 - (1 - progress) ** 3;

let observers = [];
let parallaxItems = [];
let parallaxFrame = 0;

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

function updateParallax() {
	const viewport = window.innerHeight;

	for (const item of parallaxItems) {
		const rect = item.getBoundingClientRect();
		if (rect.bottom < 0 || rect.top > viewport) continue;
		const centerOffset = rect.top + rect.height / 2 - viewport / 2;
		const shift = Math.max(
			-PARALLAX_MAX_PX,
			Math.min(PARALLAX_MAX_PX, -centerOffset * PARALLAX_STRENGTH),
		);
		item.style.setProperty("--parallax-y", `${shift.toFixed(2)}px`);
	}
}

function onScroll() {
	if (parallaxFrame) return;
	parallaxFrame = requestAnimationFrame(() => {
		parallaxFrame = 0;
		updateParallax();
	});
}

function setupParallax() {
	parallaxItems = [...document.querySelectorAll("[data-parallax]")];
	if (!parallaxItems.length) return;
	window.addEventListener("scroll", onScroll, { passive: true });
	updateParallax();
}

function teardown() {
	for (const observer of observers) observer.disconnect();
	observers = [];

	if (parallaxItems.length) {
		window.removeEventListener("scroll", onScroll);
		parallaxItems = [];
	}

	if (parallaxFrame) {
		cancelAnimationFrame(parallaxFrame);
		parallaxFrame = 0;
	}
}

function init() {
	teardown();

	if (reducedMotion.matches) {
		revealEverything();
		return;
	}

	setupReveals();
	setupCounters();
	setupParallax();
}

document.addEventListener("astro:page-load", init);
document.addEventListener("astro:before-swap", teardown);
reducedMotion.addEventListener("change", init);
