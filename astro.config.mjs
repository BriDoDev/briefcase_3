import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import astroIcon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: "https://brian-dominguez.dev",
	i18n: {
		defaultLocale: "es",
		locales: ["es", "en"],
		routing: { prefixDefaultLocale: false },
	},
	integrations: [tailwind(), astroIcon()],
});
