/**
 * CV bilingüe (ES / EN) + controlador de idioma.
 *
 * - Textos fijos de la página: atributo data-i18n="clave" en el HTML, traducciones en DICT.
 * - Experiencia y proyectos: se generan desde los arrays EXPERIENCE y PROJECTS.
 * - Idioma por defecto: español. Se recuerda la elección en localStorage
 *   y se puede forzar con ?lang=en / ?lang=es en la URL.
 *
 * Este archivo debe cargarse ANTES de main.js (main.js inicializa Isotope sobre los proyectos).
 */
(function () {
  "use strict";

  const DEFAULT_LANG = "es";
  const SUPPORTED = ["es", "en"];
  const STORAGE_KEY = "cv-lang";

  /* ------------------------------------------------------------------
   * Textos fijos
   * ------------------------------------------------------------------ */
  const DICT = {
    es: {
      "meta.title": "Yeffry L. Rodríguez P. | Desarrollador de Aplicaciones Multiplataforma",
      "meta.description": "Currículum de Yeffry L. Rodríguez P., desarrollador Android, Kotlin Multiplatform y Angular/Capacitor en Valencia. Tech Lead y fundador de DolcePOS.",

      "nav.home": "Inicio",
      "nav.about": "Sobre mí",
      "nav.skills": "Habilidades",
      "nav.resume": "Experiencia",
      "nav.projects": "Proyectos",
      "nav.contact": "Contacto",
      "nav.certs": "Certificaciones",
      "certs.title": "Cursos y certificaciones",
      "certs.subtitle": "Formación complementaria en desarrollo, metodologías ágiles y ciberseguridad.",
      "certs.credentialId": "ID de credencial:",
      "certs.verify": "Verificar credencial",
      "about.license": "Carnet de conducir:",
      "about.licenseValue": "B y A",

      "lang.label": "Idioma",
      "photo.open": "Ver foto ampliada",

      "hero.iam": "Soy",
      "hero.typed": "Desarrollador Mobile,Desarrollador Android,Desarrollador Kotlin Multiplatform,Desarrollador Angular & Capacitor,Tech Lead,Fundador de DolcePOS",
      "hero.quote": "«La mejor forma de predecir el futuro es inventarlo.» — Alan Kay",
      "hero.cta.projects": "Ver proyectos",
      "hero.cta.contact": "Contactar",

      "about.title": "Sobre mí",
      "about.lead": "Desarrollador de aplicaciones multiplataforma con experiencia liderando equipos y construyendo apps nativas e híbridas de principio a fin.",
      "about.role": "Desarrollador Mobile · Android · Kotlin Multiplatform · Angular & Capacitor",
      "about.intro": "Desde 2023 desarrollo aplicaciones Android nativas (Kotlin, Java, Jetpack Compose, KMP) e híbridas (Angular, Ionic, Capacitor) para clientes como BBVA, BNP Paribas, Volvo, EMT Valencia o la Generalitat Valenciana.",
      "about.location": "Ubicación:",
      "about.locationValue": "Benimamet, Valencia (España)",
      "about.phone": "Teléfono:",
      "about.email": "Email:",
      "about.degree": "Titulación:",
      "about.degreeValue": "CFGS Desarrollo de Aplicaciones Multiplataforma",
      "about.languages": "Idiomas:",
      "about.languagesValue": "Español (nativo), Inglés (C1)",
      "about.current": "Actualmente:",
      "about.currentValue": "CEO y Fundador de DolcePOS",
      "about.body": "He sido Tech Lead en Laberit Sistemas y Android Engineer – Team Lead en Fourvenues, donde he definido arquitecturas desde cero (Clean Architecture, MVVM, MVI), coordinado equipos, impartido formaciones y desarrollado integraciones con hardware (Bluetooth, RFID/NFC, impresoras, pagos tap-to-pay). También trabajo con IA aplicada al desarrollo: sistemas RAG y servidores MCP con Claude. Hoy dirijo DolcePOS, mi propio producto, combinando desarrollo y gestión comercial.",
      "about.interests": "Intereses:",
      "about.interestsValue": "Familia · Tecnología · Viajes · Música · Cine",

      "stats.years": "Años de experiencia",
      "stats.yearsSub": "desarrollo profesional desde 2023",
      "stats.projects": "Proyectos",
      "stats.projectsSub": "nativos e híbridos",
      "stats.apps": "Apps publicadas",
      "stats.appsSub": "en Google Play, App Store y web",
      "stats.platforms": "Plataformas",
      "stats.platformsSub": "Android, iOS y Web",

      "skills.title": "Habilidades",
      "skills.subtitle": "Tecnologías y prácticas con las que trabajo a diario.",
      "skills.android": "Android nativo",
      "skills.hybrid": "Híbrido y Web",
      "skills.architecture": "Arquitectura y Testing",
      "skills.backend": "Backend, DevOps y herramientas",
      "skills.ai": "Inteligencia Artificial",
      "skills.hardware": "Hardware e integraciones",
      "skills.leadership": "Liderazgo y metodologías",
      "skills.storePublishing": "Gestión de Stores",
      "skills.printers": "Impresoras Bluetooth",
      "skills.barcode": "Lectores 1D / 2D",
      "skills.payments": "Pagos tap-to-pay (Adyen)",
      "skills.scrum": "Scrum y Agile",
      "skills.techLead": "Liderazgo técnico",
      "skills.training": "Formación de equipos",
      "skills.clients": "Trato con cliente y Product Owner",

      "resume.title": "Experiencia",
      "resume.subtitle": "Trayectoria profesional y formación.",
      "resume.experience": "Experiencia profesional",
      "resume.education": "Formación",
      "resume.edu0.title": "Grado en Ingeniería Informática",
      "resume.edu0.period": "2024 – Actualidad · 2.º curso",
      "resume.edu0.school": "Universidad Internacional de Valencia (VIU)",
      "about.studying": "Estudiando:",
      "about.studyingValue": "Ingeniería Informática (VIU)",
      "resume.edu1.title": "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (CFGS)",
      "resume.edu1.school": "Centro de Formación Profesional PROGRESA",
      "resume.edu2.title": "Administración de Empresas",
      "resume.edu2.school": "CUN – Centro Unificado de Educación",
      "resume.edu3.title": "Educación secundaria (Bachillerato)",
      "resume.edu3.school": "Colegio Jerusalem",
      "resume.languages": "Idiomas",
      "resume.lang.es": "Español — nativo",
      "resume.lang.en": "Inglés — C1 (avanzado)",
      "resume.download": "Descargar CV en PDF",

      "projects.title": "Proyectos",
      "projects.subtitle": "Una selección de las aplicaciones en las que he participado, desde la arquitectura hasta la publicación.",
      "projects.filter.all": "Todos",
      "projects.filter.android": "Android nativo",
      "projects.filter.kmp": "Kotlin Multiplatform",
      "projects.filter.hybrid": "Híbridas (Angular / Ionic / Vue)",
      "projects.private": "Distribución privada",
      "projects.web": "Web",

      "contact.title": "Contacto",
      "contact.subtitle": "¿Tienes un proyecto o una oferta? Escríbeme y hablamos.",
      "contact.location": "Ubicación",
      "contact.phone": "Teléfono",
      "contact.email": "Email",
      "contact.social": "Redes profesionales",
      "contact.ctaTitle": "Trabajemos juntos",
      "contact.ctaText": "Estoy abierto a nuevos retos en desarrollo Android, Kotlin Multiplatform y Angular/Capacitor, así como a colaboraciones con DolcePOS.",
      "contact.ctaEmail": "Enviar un email",
      "contact.ctaLinkedin": "Conectar en LinkedIn",

      "footer.rights": "Todos los derechos reservados"
    },

    en: {
      "meta.title": "Yeffry L. Rodríguez P. | Multiplatform Application Developer",
      "meta.description": "Resume of Yeffry L. Rodríguez P., Android, Kotlin Multiplatform and Angular/Capacitor developer based in Valencia, Spain. Tech Lead and founder of DolcePOS.",

      "nav.home": "Home",
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.resume": "Experience",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "nav.certs": "Certifications",
      "certs.title": "Courses & Certifications",
      "certs.subtitle": "Additional training in development, agile methodologies and cybersecurity.",
      "certs.credentialId": "Credential ID:",
      "certs.verify": "Verify credential",
      "about.license": "Driving licence:",
      "about.licenseValue": "B and A",

      "lang.label": "Language",
      "photo.open": "View larger photo",

      "hero.iam": "I'm a",
      "hero.typed": "Mobile Developer,Android Developer,Kotlin Multiplatform Developer,Angular & Capacitor Developer,Tech Lead,Founder of DolcePOS",
      "hero.quote": "“The best way to predict the future is to invent it.” — Alan Kay",
      "hero.cta.projects": "See projects",
      "hero.cta.contact": "Get in touch",

      "about.title": "About",
      "about.lead": "Multiplatform application developer with experience leading teams and building native and hybrid apps end to end.",
      "about.role": "Mobile Developer · Android · Kotlin Multiplatform · Angular & Capacitor",
      "about.intro": "Since 2023 I have been building native Android apps (Kotlin, Java, Jetpack Compose, KMP) and hybrid apps (Angular, Ionic, Capacitor) for clients such as BBVA, BNP Paribas, Volvo, EMT Valencia and the Valencian Regional Government.",
      "about.location": "Location:",
      "about.locationValue": "Benimamet, Valencia (Spain)",
      "about.phone": "Phone:",
      "about.email": "Email:",
      "about.degree": "Degree:",
      "about.degreeValue": "Higher Vocational Degree in Multiplatform App Development",
      "about.languages": "Languages:",
      "about.languagesValue": "Spanish (native), English (C1)",
      "about.current": "Currently:",
      "about.currentValue": "CEO & Founder of DolcePOS",
      "about.body": "I have worked as Tech Lead at Laberit Sistemas and as Android Engineer – Team Lead at Fourvenues, where I defined architectures from scratch (Clean Architecture, MVVM, MVI), coordinated teams, delivered training sessions and built hardware integrations (Bluetooth, RFID/NFC, printers, tap-to-pay payments). I also work with AI applied to development: RAG systems and MCP servers with Claude. Today I run DolcePOS, my own product, combining engineering and business development.",
      "about.interests": "Interests:",
      "about.interestsValue": "Family · Technology · Travel · Music · Movies",

      "stats.years": "Years of experience",
      "stats.yearsSub": "professional development since 2023",
      "stats.projects": "Projects",
      "stats.projectsSub": "native and hybrid",
      "stats.apps": "Published apps",
      "stats.appsSub": "on Google Play, App Store and web",
      "stats.platforms": "Platforms",
      "stats.platformsSub": "Android, iOS and Web",

      "skills.title": "Skills",
      "skills.subtitle": "Technologies and practices I work with every day.",
      "skills.android": "Native Android",
      "skills.hybrid": "Hybrid & Web",
      "skills.architecture": "Architecture & Testing",
      "skills.backend": "Backend, DevOps & tooling",
      "skills.ai": "Artificial Intelligence",
      "skills.hardware": "Hardware & integrations",
      "skills.leadership": "Leadership & methodologies",
      "skills.storePublishing": "Store management",
      "skills.printers": "Bluetooth printers",
      "skills.barcode": "1D / 2D code readers",
      "skills.payments": "Tap-to-pay payments (Adyen)",
      "skills.scrum": "Scrum & Agile",
      "skills.techLead": "Technical leadership",
      "skills.training": "Team training",
      "skills.clients": "Client & Product Owner relations",

      "resume.title": "Experience",
      "resume.subtitle": "Professional background and education.",
      "resume.experience": "Professional Experience",
      "resume.education": "Education",
      "resume.edu0.title": "Bachelor's Degree in Computer Engineering",
      "resume.edu0.period": "2024 – Present · 2nd year",
      "resume.edu0.school": "Valencian International University (VIU)",
      "about.studying": "Studying:",
      "about.studyingValue": "Computer Engineering (VIU)",
      "resume.edu1.title": "Higher Vocational Degree (C.F.G.S.) in Multiplatform Application Development",
      "resume.edu1.school": "PROGRESA Vocational Training Centre",
      "resume.edu2.title": "Business Management",
      "resume.edu2.school": "CUN – Unified Academic Center",
      "resume.edu3.title": "Secondary Education (High School)",
      "resume.edu3.school": "Jerusalem School",
      "resume.languages": "Languages",
      "resume.lang.es": "Spanish — native",
      "resume.lang.en": "English — C1 (advanced)",
      "resume.download": "Download CV as PDF",

      "projects.title": "Projects",
      "projects.subtitle": "A selection of the apps I have worked on, from architecture to store release.",
      "projects.filter.all": "All",
      "projects.filter.android": "Native Android",
      "projects.filter.kmp": "Kotlin Multiplatform",
      "projects.filter.hybrid": "Hybrid (Angular / Ionic / Vue)",
      "projects.private": "Private distribution",
      "projects.web": "Website",

      "contact.title": "Contact",
      "contact.subtitle": "Have a project or a job opportunity? Drop me a line.",
      "contact.location": "Location",
      "contact.phone": "Phone",
      "contact.email": "Email",
      "contact.social": "Professional networks",
      "contact.ctaTitle": "Let's work together",
      "contact.ctaText": "I'm open to new challenges in Android, Kotlin Multiplatform and Angular/Capacitor development, as well as partnerships with DolcePOS.",
      "contact.ctaEmail": "Send an email",
      "contact.ctaLinkedin": "Connect on LinkedIn",

      "footer.rights": "All Rights Reserved"
    }
  };

  /* ------------------------------------------------------------------
   * Experiencia profesional
   * ------------------------------------------------------------------ */
  const EXPERIENCE = [
    {
      title: { es: "CEO y Fundador (Autónomo)", en: "CEO & Founder (Self-employed)" },
      company: "DolcePOS",
      logo: "assets/img/brands/dolcepos-logo.png",
      period: { es: "06/2026 – Actualidad", en: "06/2026 – Present" },
      stack: "Android · Kotlin Multiplatform · Angular Capacitor · Django · Kubernetes",
      bullets: [
        { es: "Ventas: prospección, llamadas, visitas a clientes, seguimiento y cierre.", en: "Sales: prospecting, calls, client visits, follow-up and closing." },
        { es: "Gestión de la cartera de clientes.", en: "Client portfolio management." },
        { es: "Atención al cliente y soporte postventa.", en: "Customer service and after-sales support." },
        { es: "Desarrollo de nuevas funcionalidades y mantenimiento de las aplicaciones de la marca.", en: "Developing new features and maintaining the brand's applications." }
      ]
    },
    {
      title: { es: "Android Engineer – Team Lead", en: "Android Engineer – Team Lead" },
      company: "Fourvenues Inc",
      logo: "assets/img/brands/fourvenues-logo.png",
      period: { es: "11/2025 – 06/2026", en: "11/2025 – 06/2026" },
      stack: "Android · Kotlin Multiplatform · Angular Capacitor",
      bullets: [
        { es: "Coordinación y apoyo a los miembros del equipo.", en: "Coordinating and supporting team members." },
        { es: "Toma de decisiones técnicas y definición de arquitectura.", en: "Technical decision-making and architecture definition." },
        { es: "Impartición de formaciones internas.", en: "Delivering training sessions." },
        { es: "Desarrollo y mantenimiento de apps Android (Kotlin, Java, Jetpack Compose, KMP) y Angular/Capacitor.", en: "Developing and maintaining Android (Kotlin, Java, Jetpack Compose, KMP) and Angular/Capacitor apps." },
        { es: "Librerías a medida para conectar con impresoras Bluetooth, lectores RFID y lectores de códigos 1D/2D.", en: "Custom libraries to connect with Bluetooth printers, RFID readers and 1D/2D code readers." },
        { es: "Desarrollo y uso de IA, incluidos sistemas RAG y servidores MCP con Claude.", en: "AI development and usage, including RAG systems and MCP servers with Claude." },
        { es: "Testing con JUnit, MockK y Mockito.", en: "Testing with JUnit, MockK and Mockito." }
      ]
    },
    {
      title: { es: "Tech Lead – Android | Angular", en: "Tech Lead – Android | Angular" },
      company: "Laberit Sistemas",
      logo: "assets/img/brands/laberit-logo.png",
      period: { es: "03/2023 – 11/2025", en: "03/2023 – 11/2025" },
      stack: "Android · Angular · Ionic · Capacitor",
      bullets: [
        { es: "Desarrollo y mantenimiento de apps Android y Angular/Capacitor para clientes como BBVA, BNP Paribas, Volvo o EMT Valencia.", en: "Developing and maintaining Android and Angular/Capacitor apps for clients such as BBVA, BNP Paribas, Volvo and EMT Valencia." },
        { es: "Coordinación y apoyo al equipo y toma de decisiones técnicas.", en: "Coordinating and supporting the team and making technical decisions." },
        { es: "Impartición de cursos y formaciones para entidades del sector público y privado:", en: "Delivering courses and training programmes for public- and private-sector organisations:" },
        { sub: true, es: "Sector público: Bootcamp de Android (Kotlin + Jetpack Compose) en el programa CampusDual de la Xunta de Galicia, para 20 estudiantes.", en: "Public sector: Android Bootcamp (Kotlin + Jetpack Compose) in the Xunta de Galicia CampusDual programme, for 20 students." },
        { sub: true, es: "Sector privado: formación en Angular + Capacitor orientada a desarrollo móvil para el equipo de Neural Health Group, S.L.", en: "Private sector: Angular + Capacitor training focused on mobile development for the Neural Health Group, S.L. team." },
        { es: "Kotlin, Java, TypeScript, KMP; Jetpack Compose, Coroutines, StateFlow/SharedFlow, Retrofit, OkHttp/Ktor, Coil; Capacitor con HTML + Tailwind.", en: "Kotlin, Java, TypeScript, KMP; Jetpack Compose, Coroutines, StateFlow/SharedFlow, Retrofit, OkHttp/Ktor, Coil; Capacitor with HTML + Tailwind." },
        { es: "Desarrollo y uso de IA, incluidos sistemas RAG y servidores MCP con Claude.", en: "AI development and usage, including RAG systems and MCP servers with Claude." },
        { es: "Testing con JUnit, MockK y Mockito.", en: "Testing with JUnit, MockK and Mockito." },
        { es: "Incorporación en 2023 a través de las prácticas en Rudo Apps (Academy Android y Academy Ionic).", en: "Joined in 2023 through an internship at Rudo Apps (Android Academy and Ionic Academy)." }
      ]
    }
  ];

  /* ------------------------------------------------------------------
   * Proyectos
   * filters: android | kmp | hybrid
   * links: [{ type: "play" | "appstore" | "web", url }]
   * ------------------------------------------------------------------ */
  const PROJECTS = [
    {
      name: "DolcePOS",
      icon: "bi-shop",
      logo: "assets/img/brands/dolcepos-mark.png",
      filters: ["android", "kmp", "hybrid"],
      period: { es: "2026 – Actualidad", en: "2026 – Present" },
      stack: "Android · KMP · Angular Capacitor · Django · Kubernetes",
      desc: { es: "Producto propio: solución de punto de venta (TPV) que dirijo como fundador, desde el desarrollo hasta la venta y el soporte a clientes.", en: "My own product: a point-of-sale (POS) solution I run as founder, from development to sales and customer support." }
    },
    {
      name: "Fourvenues Access App",
      logo: "assets/img/apps/fourvenues.png",
      icon: "bi-qr-code-scan",
      filters: ["android", "kmp"],
      period: { es: "2025 – 2026", en: "2025 – 2026" },
      stack: "Android · Java · Kotlin Multiplatform",
      desc: { es: "App de control de acceso para eventos, construida desde cero.", en: "Event access-control app built from scratch." },
      bullets: [
        { es: "Definición del alcance y la arquitectura (Clean Architecture, MVI orientado a estados).", en: "Defined scope and architecture (Clean Architecture, state-driven MVI)." },
        { es: "Desarrollo del MVP 0.0, gestión de QR y conexión con impresoras.", en: "Built the 0.0 MVP, QR management and printer connections." },
        { es: "Pagos in-app tap-to-pay con librería personalizada de Adyen.", en: "In-app tap-to-pay payments with a custom Adyen library." }
      ]
    },
    {
      name: "Fourvenues Totem App",
      logo: "assets/img/apps/fourvenues.png",
      icon: "bi-display",
      filters: ["hybrid"],
      period: { es: "2025 – 2026", en: "2025 – 2026" },
      stack: "Capacitor · Android",
      desc: { es: "App para tótems Android en discotecas y festivales.", en: "App for Android totem devices at nightclubs and festivals." },
      bullets: [
        { es: "Refactorización e implantación de arquitectura.", en: "Code refactoring and architecture implementation." },
        { es: "Plugin de Capacitor propio para comunicación con hardware: Bluetooth, RFID e impresoras.", en: "Custom Capacitor plugin for hardware communication: Bluetooth, RFID and printers." }
      ]
    },
    {
      name: { es: "Librerías de hardware a medida (Fourvenues)", en: "Custom hardware libraries (Fourvenues)" },
      logo: "assets/img/apps/fourvenues.png",
      icon: "bi-cpu",
      filters: ["android", "kmp", "hybrid"],
      period: { es: "2025 – 2026", en: "2025 – 2026" },
      stack: "Kotlin · Android · Capacitor",
      desc: { es: "Librerías propias para conectar las apps de Fourvenues con dispositivos físicos.", en: "In-house libraries connecting Fourvenues apps with physical devices." },
      bullets: [
        { es: "Impresoras Bluetooth.", en: "Bluetooth printers." },
        { es: "Lectores RFID.", en: "RFID readers." },
        { es: "Lectores de códigos 1D y 2D (códigos de barras y QR).", en: "1D and 2D code readers (barcodes and QR)." }
      ]
    },
    {
      name: "EMT Valencia",
      logo: "assets/img/apps/emt.png",
      icon: "bi-bus-front",
      filters: ["android"],
      stack: "Android · Java",
      desc: { es: "App oficial para los usuarios de las líneas de autobús urbano de Valencia.", en: "Official app for users of Valencia's city bus lines." },
      bullets: [
        { es: "Depuración y corrección de crashes reportados.", en: "Debugging and fixing reported crashes." },
        { es: "Revisiones de código y tests en Jenkins a través de VPN antes de cada pull request.", en: "Code reviews and test verification on Jenkins over VPN before each pull request." }
      ],
      links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=es.emtvalencia.emt" }]
    },
    {
      name: "RUDO App",
      logo: "assets/img/apps/rudo.png",
      icon: "bi-calendar-check",
      filters: ["android"],
      period: { es: "07/2023 – 03/2024", en: "07/2023 – 03/2024" },
      stack: "Android · Jetpack Compose · Hilt",
      desc: { es: "App de uso diario para los empleados de la empresa.", en: "Daily-use app for the company's employees." },
      bullets: [
        { es: "Base de Clean Architecture con MVI, Compose y Hilt.", en: "Clean Architecture foundation with MVI, Compose and Hilt." },
        { es: "Migración de vistas XML a composables y tests con Mockito.", en: "Migrated XML views to composables; tests with Mockito." }
      ],
      links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=es.rudo.planning" }]
    },
    {
      name: "Lotería Castillo",
      logo: "assets/img/apps/loteria.png",
      icon: "bi-ticket-perforated",
      filters: ["android"],
      period: { es: "07/2023 – 03/2024", en: "07/2023 – 03/2024" },
      stack: "Android · MVVM · Hilt",
      desc: { es: "App desarrollada desde cero para una administración de lotería.", en: "App built from scratch for a lottery retailer." },
      bullets: [
        { es: "Arquitectura limpia con MVVM y Hilt, componentes XML personalizados.", en: "Clean architecture with MVVM and Hilt, custom XML components." },
        { es: "Servicio de notificaciones, tests con MockK y publicación en tienda.", en: "Notification service, MockK tests and store release." }
      ],
      links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=es.rudo.loteriacastillo" }]
    },
    {
      name: "SIGPA",
      icon: "bi-trophy",
      filters: ["android"],
      period: { es: "09/2023 – 03/2024", en: "09/2023 – 03/2024" },
      stack: "Android · MVVM · Hilt",
      desc: { es: "Producto interno bancario que permite lanzar procesos tras completar «retos» de los usuarios invitados.", en: "Internal banking product that launches processes once invited users complete specific “challenges”." },
      bullets: [
        { es: "Documentación técnica, arquitectura MVVM + Hilt y tests con Mockito.", en: "Technical documentation, MVVM + Hilt architecture and Mockito tests." },
        { es: "Gestión de errores con un manejador de API propio.", en: "Error handling through a custom API handler." }
      ]
    },
    {
      name: "Hundred Burgers",
      logo: "assets/img/apps/hundred.png",
      icon: "bi-bag",
      filters: ["android"],
      period: { es: "06/2023 – 08/2023", en: "06/2023 – 08/2023" },
      stack: "Android",
      desc: { es: "App para pedir a domicilio o para llevar y gestionar reservas en los restaurantes Hundred Burgers.", en: "App to order delivery or take-away and manage bookings at Hundred Burgers restaurants." },
      bullets: [
        { es: "Mantenimiento y desarrollo de funcionalidades a medida.", en: "Maintenance and custom feature development." },
        { es: "Tests del flujo de pagos.", en: "Tests for the payment data flow." },
        { es: "Integración de la API v2 manteniendo compatibilidad con versiones anteriores, siguiendo principios SOLID.", en: "Integrated the v2 API while keeping backward compatibility, following SOLID principles." }
      ],
      links: [{ type: "play", url: "https://play.google.com/store/apps/details?id=es.rudo.hundred" }]
    },
    {
      name: "Fitzgerald Company",
      icon: "bi-building",
      filters: [],
      desc: { es: "App integral para la cadena de restaurantes: gestión de reservas, check-in diario de los locales y gestión de la operativa de los colaboradores del negocio.", en: "All-in-one app for the restaurant chain: booking management, daily restaurant check-in and management of the business's staff operations." },
      bullets: [
        { es: "Mantenimiento y desarrollo de funcionalidades a medida.", en: "Maintenance and custom feature development." }
      ]
    },
    {
      name: "BBVA MyAccess",
      icon: "bi-credit-card-2-front",
      filters: ["android"],
      period: { es: "06/2023", en: "06/2023" },
      stack: "Android nativo",
      desc: { es: "App interna para empleados del banco BBVA.", en: "Internal app for BBVA bank employees." },
      bullets: [
        { es: "Corrección y recompilación de una dependencia de lector de tarjetas sin soporte desde 2018.", en: "Fixed and rebuilt a third-party card-reader dependency unsupported since 2018." }
      ],
      private: true
    },
    {
      name: "Colevisa",
      logo: "assets/img/apps/colevisa.png",
      icon: "bi-cup-hot",
      filters: ["hybrid"],
      period: { es: "03/2023 – 06/2023", en: "03/2023 – 06/2023" },
      stack: "Angular · Ionic · Capacitor",
      platforms: "Android · iOS · Web",
      desc: { es: "Gestión de comedores escolares: planificación de menús, reservas, usuarios e informes.", en: "School canteen management: meal planning, bookings, users and reporting." },
      bullets: [
        { es: "Migración de Ionic 3 a Ionic 6 (componentes, TypeScript, HTML y estilos).", en: "Migration from Ionic 3 to Ionic 6 (components, TypeScript, HTML and styles)." },
        { es: "Actualización de dependencias para eliminar vulnerabilidades; contacto diario con el Product Owner.", en: "Dependency upgrades to remove vulnerabilities; daily contact with the Product Owner." }
      ],
      links: [
        { type: "play", url: "https://play.google.com/store/apps/details?id=com.colevisa.colevisa" },
        { type: "appstore", url: "https://apps.apple.com/es/app/colevisa/id1436814165" },
        { type: "web", url: "https://www.colevisa.es/" }
      ]
    },
    {
      name: "Istobal CarwashManager",
      icon: "bi-droplet",
      filters: ["hybrid"],
      stack: "Quasar · Vue · Capacitor",
      platforms: "Android · iOS · Web",
      desc: { es: "Gestión de máquinas físicas de lavado de coches para clientes de varios países directamente desde la app.", en: "Manage physical car-wash machines for clients across several countries directly from the app." },
      links: [{ type: "web", url: "https://istobal.com/" }]
    },
    {
      name: "Eserman Industrial Logistics",
      logo: "assets/img/apps/eserman.png",
      icon: "bi-box-seam",
      filters: ["hybrid"],
      stack: "Angular · Ionic",
      desc: { es: "Registro de pedidos de salida de mercancía y asistencia a operarios mediante lector QR, cámara y OCR.", en: "Records outbound goods orders and assists operators using a QR reader, the camera and OCR." },
      private: true
    },
    {
      name: "Schooltivity",
      logo: "assets/img/apps/schooltivity.png",
      icon: "bi-mortarboard",
      filters: ["hybrid"],
      stack: "Angular · Ionic",
      platforms: "Android · iOS · Web",
      desc: { es: "Sistema de gestión escolar con más de 20 «flavors»: una app propia para cada cliente.", en: "School management system with 20+ flavors: a dedicated app for each customer." },
      links: [
        { type: "play", url: "https://play.google.com/store/apps/details?id=com.schooltivity.test" },
        { type: "appstore", url: "https://apps.apple.com/es/app/schooltivity-familias/id1107546869" },
        { type: "web", url: "https://schooltivity.com/" }
      ]
    },
    {
      name: "Palaus (GVA)",
      logo: "assets/img/apps/palaus.png",
      icon: "bi-bank",
      filters: ["hybrid"],
      stack: "Angular · Ionic · Cordova · Capacitor",
      platforms: "Android · iOS",
      desc: { es: "App pública de la Generalitat Valenciana para descubrir los castillos y palacios del territorio valenciano.", en: "Public app by the Valencian Regional Government to discover castles and palaces across the Valencian territory." },
      links: [
        { type: "play", url: "https://play.google.com/store/apps/details?id=es.gva.palaus_transparents" },
        { type: "appstore", url: "https://apps.apple.com/us/app/gva-palaus/id1198978410" }
      ]
    },
    {
      name: "Salt (GVA)",
      logo: "assets/img/apps/salt.png",
      icon: "bi-translate",
      filters: ["hybrid"],
      stack: "Angular · Ionic · Cordova",
      platforms: "Android · iOS",
      desc: { es: "Traductor y diccionario de valenciano para móvil.", en: "Mobile translator and dictionary for the Valencian language." },
      links: [{ type: "appstore", url: "https://apps.apple.com/es/app/gva-salt-usu/id1355690538" }]
    },
    {
      name: "BNP Paribas Employees",
      icon: "bi-people",
      filters: ["hybrid"],
      stack: "Angular · Ionic · Capacitor",
      platforms: "Android · iOS",
      desc: { es: "App de RR. HH. para los empleados del Grupo BNP Paribas.", en: "HR app for BNP Paribas Group employees." },
      private: true
    },
    {
      name: "PadelGo",
      logo: "assets/img/apps/padelgo.png",
      icon: "bi-dribbble",
      filters: ["hybrid"],
      stack: "Angular · Ionic · Cordova · Capacitor",
      platforms: "Android · iOS · Web",
      desc: { es: "Inscripciones y suscripciones a competiciones de pádel de la Federación de Pádel de la Comunidad Valenciana.", en: "Enrolments and subscriptions for padel competitions of the Valencian Padel Federation." },
      links: [
        { type: "appstore", url: "https://apps.apple.com/es/app/padelgo/id1459400433" },
        { type: "web", url: "https://padelcv.com/padelgo-la-app-de-fpcv/" }
      ]
    },
    {
      name: "HOOMVIP",
      logo: "assets/img/apps/hoomvip.png",
      icon: "bi-house-door",
      filters: ["hybrid"],
      stack: "Angular · Ionic · Cordova · Capacitor",
      platforms: "Android · iOS · Web",
      desc: { es: "Gestión remota de alojamientos turísticos, con 4 versiones de marca blanca.", en: "Remote management of tourist accommodations, with 4 white-label clones." },
      links: [
        { type: "web", url: "https://www.hoomvip.com/" }
      ]
    },
    {
      name: "Volvo Car Service",
      logo: "assets/img/apps/volvo.png",
      icon: "bi-car-front",
      filters: ["hybrid"],
      stack: "Angular · Ionic · Cordova",
      platforms: "Android · iOS · Web",
      desc: { es: "Asistencia e información del vehículo para clientes de Volvo.", en: "Assistance and vehicle information for Volvo customers." },
      links: [
        { type: "play", url: "https://play.google.com/store/apps/details?id=com.volvocars.volvocarservice" },
        { type: "appstore", url: "https://apps.apple.com/es/app/volvo-car-service/id1039306066" },
        { type: "web", url: "https://www.volvocars.com/es/l/servicios/extras/apps/app-volvo-car-service/" }
      ]
    }
  ];


  /* ------------------------------------------------------------------
   * Cursos y certificaciones (más reciente primero)
   * url: enlace de verificación (opcional)
   * ------------------------------------------------------------------ */
  const CERTS = [
    { name: { es: "Certified Ethical Hacker (CEH)", en: "Certified Ethical Hacker (CEH)" }, issuer: "Cisco Networking Academy", date: { es: "sept. 2025", en: "Sep 2025" }, id: "fbf7dd6c-c547-43ba-8f7f-d1ce9a10587d", icon: "bi-shield-lock" },
    { name: { es: "Curso de Introducción a la Programación", en: "Introduction to Programming" }, issuer: "Código Facilito", date: { es: "ago. 2021", en: "Aug 2021" }, id: "16c0158d-bac0-4fa9-aa6f-1e9df6438f0d", icon: "bi-code-square" },
    { name: { es: "Curso Profesional de Python", en: "Professional Python Course" }, issuer: "Código Facilito", date: { es: "ago. 2021", en: "Aug 2021" }, id: "d0b0a4b8-8a50-4dc8-b9da-5e1c270312aa", icon: "bi-filetype-py" },
    { name: { es: "Scrum Master", en: "Scrum Master" }, issuer: "Netxus University", date: { es: "ago. 2021", en: "Aug 2021" }, icon: "bi-kanban" },
    { name: { es: "2021 Scrum Master Certificación", en: "2021 Scrum Master Certification" }, issuer: "Udemy", date: { es: "ago. 2021", en: "Aug 2021" }, id: "UC-373966ed-fb49-4daf-bf15-d73608b5decd", url: "https://www.udemy.com/certificate/UC-373966ed-fb49-4daf-bf15-d73608b5decd/", icon: "bi-kanban" },
    { name: { es: "Introducción al Desarrollo Web II", en: "Introduction to Web Development II" }, issuer: "Google España", date: { es: "jul. 2021", en: "Jul 2021" }, id: "BCA PDN EH7", icon: "bi-google" },
    { name: { es: "Curso Profesional de Git", en: "Professional Git Course" }, issuer: "Código Facilito", date: { es: "jul. 2021", en: "Jul 2021" }, id: "68755c11-cbf6-43fe-b586-062ed8be9a2a", icon: "bi-git" },
    { name: { es: "Introducción al Desarrollo Web I", en: "Introduction to Web Development I" }, issuer: "Google España", date: { es: "jul. 2021", en: "Jul 2021" }, id: "AL4 BBK B5K", icon: "bi-google" },
    { name: { es: "Desarrollo de Apps Móviles", en: "Mobile App Development" }, issuer: "Google España", date: { es: "jun. 2021", en: "Jun 2021" }, id: "QTJ D3L 54X", icon: "bi-google" },
    { name: { es: "Consultor SAP Business", en: "SAP Business Consultant" }, issuer: "Hot El Punto Múltiple Del Sabor", date: { es: "2016", en: "2016" }, note: { es: "Formación interna · Departamento de IT", en: "In-house training · IT Department" }, icon: "bi-building-gear" },
    { name: { es: "Emprendimiento y gestión de negocio (7 cursos)", en: "Entrepreneurship & Business Management (7 courses)" }, issuer: "HP LIFE", date: { es: "2013 – 2014", en: "2013 – 2014" }, note: { es: "Sitios web de negocios · Público objetivo · Marketing en redes sociales · Pronósticos de ventas · Flujo de caja · Pérdidas y ganancias · Financiación", en: "Effective business websites · Target audience · Social media marketing · Sales forecasting · Cash flow · Profit & loss · Finding financing" }, icon: "bi-briefcase" },
    { name: { es: "Planeación Estratégica de Proyectos", en: "Strategic Project Planning" }, issuer: "SENA (Colombia)", date: { es: "may. 2011", en: "May 2011" }, note: { es: "40 horas", en: "40 hours" }, icon: "bi-diagram-2" }
  ];

  /* ------------------------------------------------------------------
   * Render helpers
   * ------------------------------------------------------------------ */
  const bound = []; // [{ el, value: {es, en} }]

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /** Crea un nodo cuyo texto cambia con el idioma. */
  function tEl(tag, className, value) {
    const node = el(tag, className);
    if (typeof value === "string") node.textContent = value;
    else bound.push({ el: node, value });
    return node;
  }

  /** Nodo enlazado a una clave del diccionario. */
  function keyEl(tag, className, key) {
    const node = el(tag, className);
    node.setAttribute("data-i18n", key);
    return node;
  }

  function renderExperience() {
    const host = document.getElementById("experience-list");
    if (!host) return;
    EXPERIENCE.forEach((job) => {
      const item = el("div", "resume-item");
      item.appendChild(tEl("h4", "", job.title));
      item.appendChild(tEl("h5", "", job.period));
      const company = el("p");
      if (job.logo) {
        const img = el("img", "company-logo");
        img.src = job.logo;
        img.alt = job.company;
        company.appendChild(img);
      } else {
        company.appendChild(el("em", "", job.company));
      }
      item.appendChild(company);
      item.appendChild(el("p", "resume-stack", job.stack));
      const ul = el("ul");
      job.bullets.forEach((b) => ul.appendChild(tEl("li", b.sub ? "sub" : "", b)));
      item.appendChild(ul);
      host.appendChild(item);
    });
  }

  const LINK_META = {
    play: { icon: "bi-google-play", label: "Google Play" },
    appstore: { icon: "bi-apple", label: "App Store" },
    web: { icon: "bi-globe2", key: "projects.web" }
  };

  function renderProjects() {
    const host = document.getElementById("projects-grid");
    if (!host) return;
    PROJECTS.forEach((p) => {
      const col = el("div", "col-lg-4 col-md-6 portfolio-item isotope-item " + p.filters.map((f) => "filter-" + f).join(" "));
      const card = el("article", "project-card h-100");

      const head = el("div", "project-head");
      const icon = el("div", "project-icon" + (p.logo ? " has-logo" : ""));
      if (p.logo) {
        const img = el("img");
        img.src = p.logo;
        img.alt = typeof p.name === "string" ? p.name : p.name.es;
        icon.appendChild(img);
      } else {
        icon.appendChild(el("i", "bi " + p.icon));
      }
      head.appendChild(icon);
      const titles = el("div");
      titles.appendChild(tEl("h4", "", p.name));
      if (p.period) titles.appendChild(tEl("span", "project-period", p.period));
      head.appendChild(titles);
      card.appendChild(head);

      card.appendChild(tEl("p", "project-desc", p.desc));

      if (p.bullets && p.bullets.length) {
        const ul = el("ul", "project-bullets");
        p.bullets.forEach((b) => ul.appendChild(tEl("li", "", b)));
        card.appendChild(ul);
      }

      const meta = el("div", "project-meta");
      if (p.stack) meta.appendChild(el("span", "chip", p.stack));
      if (p.platforms) meta.appendChild(el("span", "chip chip-muted", p.platforms));
      if (p.private) meta.appendChild(keyEl("span", "chip chip-muted", "projects.private"));
      card.appendChild(meta);

      if (p.links && p.links.length) {
        const links = el("div", "project-links");
        p.links.forEach((l) => {
          const m = LINK_META[l.type];
          const a = el("a");
          a.href = l.url;
          a.target = "_blank";
          a.rel = "noopener";
          a.appendChild(el("i", "bi " + m.icon));
          const label = m.key ? keyEl("span", "", m.key) : el("span", "", m.label);
          a.appendChild(label);
          links.appendChild(a);
        });
        card.appendChild(links);
      }

      col.appendChild(card);
      host.appendChild(col);
    });
  }

  function renderCerts() {
    const host = document.getElementById("certs-grid");
    if (!host) return;
    CERTS.forEach((c) => {
      const col = el("div", "col-lg-4 col-md-6");
      const card = el("article", "cert-card h-100");
      const icon = el("div", "cert-icon");
      icon.appendChild(el("i", "bi " + c.icon));
      card.appendChild(icon);
      const body = el("div");
      body.appendChild(tEl("h4", "", c.name));
      const meta = el("p", "cert-meta");
      meta.appendChild(el("strong", "", c.issuer));
      meta.appendChild(document.createTextNode(" · "));
      meta.appendChild(tEl("span", "", c.date));
      body.appendChild(meta);
      if (c.note) body.appendChild(tEl("p", "cert-id", c.note));
      if (c.id) {
        const idLine = el("p", "cert-id");
        idLine.appendChild(keyEl("span", "", "certs.credentialId"));
        idLine.appendChild(document.createTextNode(" " + c.id));
        body.appendChild(idLine);
      }
      if (c.url) {
        const a = el("a", "cert-link");
        a.href = c.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(el("i", "bi bi-patch-check"));
        a.appendChild(keyEl("span", "", "certs.verify"));
        body.appendChild(a);
      }
      card.appendChild(body);
      col.appendChild(card);
      host.appendChild(col);
    });
  }

  /* ------------------------------------------------------------------
   * Typed.js (texto animado del hero)
   * ------------------------------------------------------------------ */
  let typedInstance = null;

  function startTyped(lang) {
    const target = document.querySelector(".typed");
    if (!target || typeof Typed === "undefined") return;
    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }
    target.textContent = "";
    typedInstance = new Typed(".typed", {
      strings: DICT[lang]["hero.typed"].split(","),
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000
    });
  }

  /* ------------------------------------------------------------------
   * Controlador de idioma
   * ------------------------------------------------------------------ */
  function readStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* almacenamiento no disponible: se ignora */
    }
  }

  function initialLang() {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.includes(fromUrl)) return fromUrl;
    const stored = readStoredLang();
    if (SUPPORTED.includes(stored)) return stored;
    return DEFAULT_LANG;
  }

  function relayoutProjects() {
    const container = document.getElementById("projects-grid");
    if (container && window.Isotope && Isotope.data(container)) {
      Isotope.data(container).layout();
    }
  }

  function setLang(lang, options) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    const dict = DICT[lang];

    document.documentElement.lang = lang;
    document.title = dict["meta.title"];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", dict["meta.description"]);

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = dict[node.getAttribute("data-i18n")];
      if (value !== undefined) node.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const value = dict[node.getAttribute("data-i18n-aria")];
      if (value !== undefined) node.setAttribute("aria-label", value);
    });
    bound.forEach((b) => {
      b.el.textContent = b.value[lang];
    });
    document.querySelectorAll("[data-cv-pdf]").forEach((a) => {
      a.href = "assets/docs/Yeffry-Rodriguez-CV-" + lang.toUpperCase() + ".pdf";
    });

    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (!options || !options.initial) {
      storeLang(lang);
      startTyped(lang);
      relayoutProjects();
    }
  }

  /* ------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------ */
  renderExperience();
  renderProjects();
  renderCerts();

  const lang = initialLang();
  setLang(lang, { initial: true });

  document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  // Typed.js se arranca cuando todos los scripts han cargado.
  window.addEventListener("load", () => startTyped(document.documentElement.lang));

  document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

  window.CVLang = { set: setLang, get: () => document.documentElement.lang };
  // Datos expuestos para generar el CV en PDF (cv-print.html)
  window.CV_DATA = { DICT, EXPERIENCE, PROJECTS, CERTS };
})();
