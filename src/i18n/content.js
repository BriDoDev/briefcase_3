import enProcess from "../collections/en/process.json";
import enProjects from "../collections/en/projects.json";
import enServices from "../collections/en/services.json";
import enStack from "../collections/en/stack.json";
import enTimeline from "../collections/en/timeline.json";
import enWork from "../collections/en/work.json";
import esProcess from "../collections/process.json";
import esProjects from "../collections/projects.json";
import esServices from "../collections/services.json";
import esTimeline from "../collections/timeline.json";
import esWork from "../collections/work.json";

const esStack = [
	"React",
	"TypeScript",
	"Next.js",
	"Astro",
	"Tailwind",
	"Swift",
	"Kotlin",
	"Node.js",
	"Medusa",
	".NET Core",
	"SQL Server",
	"Docker",
	"Storybook",
	"Sentry",
];

const content = {
	es: {
		portfolio: esProjects,
		work: esWork,
		services: esServices,
		process: esProcess,
		timeline: esTimeline,
		stack: esStack,
	},
	en: {
		portfolio: enProjects,
		work: enWork,
		services: enServices,
		process: enProcess,
		timeline: enTimeline,
		stack: enStack,
	},
};

/** Collections for a language, falling back to Spanish. */
export function getContent(lang) {
	return content[lang] ?? content.es;
}
