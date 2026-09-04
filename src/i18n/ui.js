export const languages = { es: "ES", en: "EN" };
export const defaultLang = "es";

/** Route slugs per language. The toggle maps a page between the two. */
export const routes = {
	es: {
		home: "/",
		projects: "/projects",
		services: "/servicios",
		contact: "/contacto",
		about: "/about",
	},
	en: {
		home: "/en/",
		projects: "/en/projects",
		services: "/en/services",
		contact: "/en/contact",
		about: "/en/about",
	},
};

/** Reads the language out of the URL. Anything under /en/ is English. */
export function getLangFromUrl(url) {
	const [, segment] = url.pathname.split("/");
	return segment === "en" ? "en" : defaultLang;
}

export function useTranslations(lang) {
	return ui[lang] ?? ui[defaultLang];
}

export const ui = {
	es: {
		meta: {
			titleSuffix: "Brian Domínguez",
			defaultTitle:
				"Brian Domínguez – Ingeniero de software · Digitalizo negocios",
			description:
				"Ingeniero de software en CDMX. Encuentro el proceso manual que está frenando tu negocio y construyo la herramienta que lo resuelve: pedidos, inventario, citas, cotizaciones, cortes y reportes.",
			imageAlt: "Brian Domínguez – Ingeniero de software",
		},
		nav: {
			home: "Inicio",
			projects: "Proyectos",
			services: "Servicios",
			about: "Sobre mí",
			cta: "Cuéntame tu proceso",
			openMenu: "Abrir menú",
			language: "Idioma",
			theme: "Cambiar tema",
			themeToLight: "Cambiar a tema claro",
			themeToDark: "Cambiar a tema oscuro",
		},
		common: {
			seeProjects: "Ver proyectos",
			allProjects: "Ver todos los proyectos →",
			openProject: "Abrir el proyecto →",
			photoAlt: "Brian Domínguez",
		},
		home: {
			kicker: "Brian Domínguez · Ingeniero de software · CDMX",
			title: "Digitalizo negocios",
			intro:
				"Llevo más de cinco años construyendo software en producción: apps de cliente, portales, back offices y aplicaciones móviles. Encuentro el proceso manual que está frenando un negocio y construyo la herramienta que lo resuelve.",
			stats: [
				{ value: "5+ años", label: "construyendo software en producción" },
				{ value: "FinTech", label: "pagos, 2FA, biometría y KYC" },
				{ value: "80%", label: "menos tiempo en un proceso de facturación" },
				{
					value: "Web, iOS y Android",
					label: "publicado en App Store y Google Play",
				},
			],
			servicesTitle: "Qué puedo construir",
			servicesLead:
				"Lo mismo que hago para una institución financiera, a la escala de tu negocio.",
			servicesLink: "Servicios y proceso →",
			workTitle: "Lo que ya construí",
			workLead:
				"Trabajo publicado que puedes abrir, y el software en producción que vive detrás de un login.",
			productionKicker: "Software en producción",
		},
		projects: {
			title: "Proyectos",
			lead: "Sitios y aplicaciones que puedes abrir y recorrer, y el software en producción que vive detrás de un login.",
			portfolioTitle: "Portafolio",
			portfolioLead:
				"Trabajo publicado. Cada tarjeta abre el proyecto en vivo.",
			productionTitle: "Software en producción",
			productionLead:
				"No son ejercicios. La mayoría vive detrás de un login, así que aquí está el alcance y las decisiones técnicas.",
		},
		services: {
			title: "Servicios y cómo trabajo",
			lead: "Trabajo por proyecto, con alcance escrito antes de empezar. Si tu proceso no necesita software, te lo digo.",
			processTitle: "Cómo trabajamos",
			processLead: "Cuatro pasos, sin sorpresas en el camino.",
			recordTitle: "¿Y si además lo grabamos?",
			recordBody:
				"Algunos proyectos se convierten en un caso documentado. Si tu negocio acepta salir en video, el trabajo se documenta y llega a más gente como tú.",
			ctaTitle: "Cuéntame tu proceso",
			ctaBody:
				"Contesto en menos de 48 horas con qué construiría y qué costaría.",
			ctaButton: "Abrir el formulario",
		},
		contact: {
			title: "Cuéntame tu proceso",
			lead: "Describe qué haces a mano hoy y cuánto tiempo te cuesta. Contesto en menos de 48 horas, con qué construiría y qué costaría.",
			directKicker: "Directo",
			recordTitle: "¿Puede ser un caso documentado?",
			recordBody:
				"Si tu negocio acepta grabar el proceso, el desarrollo puede quedar documentado en video. Márcalo al lado.",
			fields: {
				name: "Tu nombre",
				business: "Negocio y giro",
				email: "Correo",
				whatsapp: "WhatsApp",
				problem: "¿Qué proceso te está frenando?",
				record: "¿Aceptarías que lo grabemos?",
				recordYes: "Sí, adelante",
				recordNo: "Prefiero que no",
			},
			submit: "Enviar",
			sending: "Enviando…",
			sent: "Listo. Contesto en menos de 48 horas al correo que dejaste.",
			iframeTitle: "Envío del formulario",
		},
		about: {
			title: "Brian Domínguez",
			lead: "Ingeniero de software frontend con más de cinco años construyendo interfaces web y aplicaciones multiplataforma con React, TypeScript y wrappers nativos de iOS y Android.",
			body: [
				"Hoy desarrollo el ecosistema digital completo de una institución financiera: app de cliente, portal público, back office de autogestión y apps móviles. Lo que más hago es digitalizar procesos: trámites que eran papel, pagos que eran fila, reportes que eran hojas de cálculo.",
				"Integro herramientas de IA —Claude, agentes y servidores MCP— en mi flujo de trabajo para acelerar el desarrollo y mantener las pruebas automatizadas sin bajar la calidad del código. Estudio Ingeniería en Desarrollo de Software en la UVEG.",
			],
			downloadCv: "Descargar CV",
			stackKicker: "Stack",
			specialtiesKicker: "Especialidades",
			specialties: [
				"Pasarelas de pago",
				"2FA y biometría",
				"KYC",
				"Design systems",
				"Desarrollo asistido por IA",
			],
			timelineTitle: "Trayectoria",
			portraitAlt: "Retrato de Brian Domínguez",
		},
		footer: {
			title: "¿Qué haces a mano hoy?",
			body: "Describe el proceso que te está frenando. Contesto en menos de 48 horas con qué construiría y qué costaría.",
			rights: "Ingeniero de software · CDMX",
		},
	},

	en: {
		meta: {
			titleSuffix: "Brian Domínguez",
			defaultTitle:
				"Brian Domínguez – Software engineer · I digitize businesses",
			description:
				"Software engineer in Mexico City. I find the manual process that is holding your business back and build the tool that fixes it: orders, inventory, appointments, quotes, daily closings and reports.",
			imageAlt: "Brian Domínguez – Software engineer",
		},
		nav: {
			home: "Home",
			projects: "Projects",
			services: "Services",
			about: "About",
			cta: "Tell me your process",
			openMenu: "Open menu",
			language: "Language",
			theme: "Switch theme",
			themeToLight: "Switch to light theme",
			themeToDark: "Switch to dark theme",
		},
		common: {
			seeProjects: "See projects",
			allProjects: "See all projects →",
			openProject: "Open the project →",
			photoAlt: "Brian Domínguez",
		},
		home: {
			kicker: "Brian Domínguez · Software engineer · Mexico City",
			title: "I digitize businesses",
			intro:
				"I have spent more than five years building software in production: customer apps, portals, back offices and mobile applications. I find the manual process that is holding a business back and build the tool that fixes it.",
			stats: [
				{ value: "5+ years", label: "building software in production" },
				{ value: "FinTech", label: "payments, 2FA, biometrics and KYC" },
				{ value: "80%", label: "less time spent on an invoicing process" },
				{
					value: "Web, iOS and Android",
					label: "shipped to the App Store and Google Play",
				},
			],
			servicesTitle: "What I can build",
			servicesLead:
				"The same work I do for a financial institution, at the scale of your business.",
			servicesLink: "Services and process →",
			workTitle: "What I have built",
			workLead:
				"Published work you can open, and the production software that lives behind a login.",
			productionKicker: "Software in production",
		},
		projects: {
			title: "Projects",
			lead: "Sites and applications you can open and explore, and the production software that lives behind a login.",
			portfolioTitle: "Portfolio",
			portfolioLead: "Published work. Every card opens the live project.",
			productionTitle: "Software in production",
			productionLead:
				"These are not exercises. Most of it lives behind a login, so here is the scope and the technical decisions instead.",
		},
		services: {
			title: "Services and how I work",
			lead: "I work project by project, with the scope written down before we start. If your process does not need software, I will tell you.",
			processTitle: "How we work",
			processLead: "Four steps, no surprises along the way.",
			recordTitle: "What if we film it too?",
			recordBody:
				"Some projects turn into a documented case. If your business is up for being on video, the work gets documented and reaches more people like you.",
			ctaTitle: "Tell me your process",
			ctaBody:
				"I reply in under 48 hours with what I would build and what it would cost.",
			ctaButton: "Open the form",
		},
		contact: {
			title: "Tell me your process",
			lead: "Describe what you do by hand today and how much time it costs you. I reply in under 48 hours with what I would build and what it would cost.",
			directKicker: "Direct",
			recordTitle: "Could this be a documented case?",
			recordBody:
				"If your business is up for filming the process, the build can be documented on video. Tick the box on the right.",
			fields: {
				name: "Your name",
				business: "Business and industry",
				email: "Email",
				whatsapp: "WhatsApp",
				problem: "Which process is holding you back?",
				record: "Would you let us film it?",
				recordYes: "Yes, go ahead",
				recordNo: "I'd rather not",
			},
			submit: "Send",
			sending: "Sending…",
			sent: "Done. I'll reply within 48 hours to the email you left.",
			iframeTitle: "Form submission",
		},
		about: {
			title: "Brian Domínguez",
			lead: "Frontend software engineer with more than five years building web interfaces and cross-platform applications with React, TypeScript and native iOS and Android wrappers.",
			body: [
				"Today I build the entire digital ecosystem of a financial institution: customer app, public portal, self-service back office and mobile apps. Most of what I do is digitizing processes: paperwork that used to be paper, payments that used to be a queue, reports that used to be spreadsheets.",
				"I bring AI tooling —Claude, agents and MCP servers— into my workflow to move faster and keep the automated tests in place without lowering code quality. I am studying Software Development Engineering at UVEG.",
			],
			downloadCv: "Download CV",
			stackKicker: "Stack",
			specialtiesKicker: "Specialties",
			specialties: [
				"Payment gateways",
				"2FA and biometrics",
				"KYC",
				"Design systems",
				"AI-assisted development",
			],
			timelineTitle: "Experience",
			portraitAlt: "Portrait of Brian Domínguez",
		},
		footer: {
			title: "What do you do by hand today?",
			body: "Describe the process that is holding you back. I reply in under 48 hours with what I would build and what it would cost.",
			rights: "Software engineer · Mexico City",
		},
	},
};
