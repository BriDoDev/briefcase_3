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
				// v3 brand tokens — mirror of the :root block in the design canvas.
				canvas: "#f6f7f9",
				surface: "#ffffff",
				ink: {
					DEFAULT: "#10151c",
					deep: "#0d1520",
					soft: "#16202e",
				},
				muted: {
					DEFAULT: "#5b6572",
					strong: "#3f4a58",
					soft: "#8a93a0",
				},
				accent: {
					DEFAULT: "#1f4fd8",
					light: "#3f6bea",
					dark: "#1a44bd",
					100: "#eef2ff",
					200: "#dbe4ff",
					300: "#b8c8ff",
					400: "#7d9bff",
					500: "#3f6bea",
					600: "#1a44bd",
					700: "#16389c",
					800: "#122c78",
					900: "#0d1f52",
				},
				mint: {
					DEFAULT: "#7fe3c0",
					100: "#e6fbf3",
					800: "#14523f",
				},
				success: "#10b981",
				warning: "#f59e0b",
				error: "#ef4444",
			},
			borderColor: {
				divider: "rgba(16,21,28,0.10)",
			},
			borderRadius: {
				sm: "12px",
				md: "20px",
				lg: "32px",
				pill: "999px",
			},
			boxShadow: {
				sm: "0 1px 2px rgba(16,21,28,0.05), 0 6px 18px rgba(16,21,28,0.05)",
				md: "0 2px 6px rgba(16,21,28,0.05), 0 18px 44px rgba(16,21,28,0.09)",
				lg: "0 30px 80px rgba(16,21,28,0.16)",
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
