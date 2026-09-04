/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				// Neutral ramp kept for the legacy pages (/posts, /certifications, /post).
				primary: {
					50: "#f5f5f5",
					100: "#e5e5e5",
					200: "#d4d4d4",
					300: "#a3a3a3",
					400: "#737373",
					500: "#525252",
					600: "#404040",
					700: "#262626",
					800: "#171717",
					900: "#0a0a0a",
					950: "#030303",
				},
				// v3 brand tokens. The values live in the :root / .dark blocks of
				// src/assets/css/main.css so one palette drives both these utilities
				// and the component layer. None of them is used with an opacity
				// modifier (`bg-surface/50`), so a plain var() is safe here — adding
				// such a usage would need the `rgb(var(--x) / <alpha-value>)` form.
				canvas: "var(--color-bg)",
				surface: "var(--color-surface)",
				ink: {
					DEFAULT: "var(--color-text)",
					deep: "var(--color-ink)",
					soft: "var(--color-ink-2)",
				},
				muted: {
					DEFAULT: "var(--color-muted)",
					strong: "var(--color-muted-strong)",
					soft: "var(--color-muted-soft)",
				},
				accent: {
					DEFAULT: "var(--color-accent)",
					light: "var(--color-accent-light)",
					dark: "var(--color-accent-dark)",
					100: "var(--color-accent-100)",
					200: "var(--color-accent-200)",
					300: "var(--color-accent-300)",
					400: "var(--color-accent-400)",
					500: "var(--color-accent-500)",
					600: "var(--color-accent-600)",
					700: "var(--color-accent-700)",
					800: "var(--color-accent-800)",
					900: "var(--color-accent-900)",
				},
				mint: {
					DEFAULT: "var(--color-mint)",
					100: "var(--color-mint-100)",
					800: "var(--color-mint-800)",
				},
				success: "#10b981",
				warning: "#f59e0b",
				error: "#ef4444",
			},
			borderColor: {
				divider: "var(--color-divider)",
			},
			borderRadius: {
				sm: "12px",
				md: "20px",
				lg: "32px",
				pill: "999px",
			},
			boxShadow: {
				sm: "var(--shadow-sm)",
				md: "var(--shadow-md)",
				lg: "var(--shadow-lg)",
			},
			fontFamily: {
				sans: ["Archivo", "Inter", "system-ui", "-apple-system", "sans-serif"],
				display: ["Archivo", "Inter", "system-ui", "sans-serif"],
			},
			letterSpacing: {
				tight: "-0.02em",
				tighter: "-0.04em",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar-hide"),
	],
};
