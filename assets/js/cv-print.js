/**
 * Genera el CV en formato A4 a partir de los datos de la web (assets/js/i18n.js).
 * cv-print.html?lang=es | ?lang=en
 */
(function () {
  "use strict";

  const { DICT, EXPERIENCE, PROJECTS, CERTS } = window.CV_DATA;
  const lang = new URLSearchParams(location.search).get("lang") === "en" ? "en" : "es";
  const d = DICT[lang];
  const t = (v) => (typeof v === "string" ? v : v[lang]);

  const L = {
    es: {
      contact: "Contacto", skills: "Habilidades", languages: "Idiomas", other: "Otros datos",
      profile: "Perfil profesional", experience: "Experiencia profesional", projects: "Proyectos destacados",
      education: "Formación", certs: "Cursos y certificaciones", web: "CV online, proyectos y enlaces:",
      more: "Otros proyectos:", private: "distribución privada"
    },
    en: {
      contact: "Contact", skills: "Skills", languages: "Languages", other: "Other details",
      profile: "Professional profile", experience: "Professional experience", projects: "Selected projects",
      education: "Education", certs: "Courses & certifications", web: "Online CV, projects and links:",
      more: "Other projects:", private: "private distribution"
    }
  }[lang];

  // Mismos grupos que la sección Habilidades de index.html
  const SKILLS = [
    ["skills.android", ["Kotlin", "Java", "Jetpack Compose", "Kotlin Multiplatform", "Coroutines", "StateFlow / SharedFlow", "Hilt", "Retrofit", "OkHttp / Ktor", "Coil", "XML Views", "Material Design"]],
    ["skills.hybrid", ["Angular", "Ionic", "Capacitor", "Cordova", "TypeScript", "Vue", "Quasar", "HTML / CSS", "Tailwind CSS"]],
    ["skills.architecture", ["Clean Architecture", "MVVM", "MVI", "SOLID", "JUnit", "MockK", "Mockito"]],
    ["skills.backend", ["Django (Python)", "Firebase", "Kubernetes", "Gradle", "Jenkins", "Git", "@skills.storePublishing", "Google Play Console", "Apple Developer"]],
    ["skills.ai", ["Claude Code", "RAG", "MCP Servers"]],
    ["skills.hardware", ["Bluetooth", "RFID / NFC", "@skills.barcode", "@skills.printers", "@skills.payments", "QR / OCR"]],
    ["skills.leadership", ["@skills.scrum", "@skills.techLead", "@skills.training", "@skills.clients"]]
  ];

  // Proyectos que se muestran con detalle en el PDF (el resto se listan por nombre)
  const FEATURED = [
    "DolcePOS", "Fourvenues Access App", "Fourvenues Totem App", "Librerías de hardware a medida (Fourvenues)",
    "EMT Valencia", "RUDO App", "Lotería Castillo", "Hundred Burgers", "Fitzgerald Company",
    "Colevisa", "Schooltivity", "Palaus (GVA)", "Volvo Car Service", "HOOMVIP"
  ];

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nameOf = (p) => (typeof p.name === "string" ? p.name : p.name.es);

  /* ---------- Lateral ---------- */
  const side = [];
  side.push('<img class="photo" src="assets/img/profile-yeffry.jpg" alt="">');
  side.push(`<h3>${L.contact}</h3><ul class="contact">
    <li><i class="bi bi-envelope"></i><a href="mailto:yeff43@gmail.com">yeff43@gmail.com</a></li>
    <li><i class="bi bi-telephone"></i><a href="tel:+34658420165">+34 658 420 165</a></li>
    <li><i class="bi bi-geo-alt"></i><span>${esc(d["about.locationValue"])}</span></li>
    <li><i class="bi bi-linkedin"></i><a href="https://www.linkedin.com/in/yeff43/">linkedin.com/in/yeff43</a></li>
    <li><i class="bi bi-github"></i><a href="https://github.com/Yeff43">github.com/Yeff43</a></li>
    <li><i class="bi bi-globe2"></i><a href="https://yeff43.github.io/cv/${lang === "en" ? "?lang=en" : ""}">yeff43.github.io/cv</a></li>
  </ul>`);
  side.push(`<h3>${L.skills}</h3>`);
  SKILLS.forEach(([key, items]) => {
    const chips = items.map((i) => `<span class="chip">${esc(i.startsWith("@") ? d[i.slice(1)] : i)}</span>`).join("");
    side.push(`<div class="skill-group"><h4>${esc(d[key])}</h4><div class="chips">${chips}</div></div>`);
  });
  side.push(`<h3>${L.languages}</h3><ul class="plain">
    <li>${esc(d["resume.lang.es"])}</li><li>${esc(d["resume.lang.en"])}</li></ul>`);
  side.push(`<h3>${L.other}</h3><ul class="plain">
    <li><strong>${esc(d["about.license"])}</strong> ${esc(d["about.licenseValue"])}</li>
    <li><strong>${esc(d["about.interests"])}</strong> ${esc(d["about.interestsValue"])}</li></ul>`);
  side.push(`<h3>${L.certs}</h3><ul class="certs-side">`);
  CERTS.forEach((c) => {
    side.push(`<li><strong>${esc(t(c.name))}</strong><span>${esc(c.issuer)} · ${esc(t(c.date))}</span></li>`);
  });
  side.push("</ul>");
  document.getElementById("side").innerHTML = side.join("");

  /* ---------- Principal ---------- */
  const main = [];
  main.push(`<header class="head">
    <h1>Yeffry L. Rodriguez P.</h1>
    <p class="role">${esc(d["about.role"])}</p>
    <p class="quote">${esc(d["hero.quote"])}</p>
    <p class="weblink">${L.web} <a href="https://yeff43.github.io/cv/${lang === "en" ? "?lang=en" : ""}">yeff43.github.io/cv</a></p>
  </header>`);

  main.push(`<h2><i class="bi bi-person"></i>${L.profile}</h2>
    <p class="summary">${esc(d["about.intro"])} ${esc(d["about.body"])}</p>`);

  main.push(`<h2><i class="bi bi-briefcase"></i>${L.experience}</h2>`);
  EXPERIENCE.forEach((job) => {
    const bullets = job.bullets.map((b) => `<li${b.sub ? ' class="sub"' : ""}>${esc(b[lang])}</li>`).join("");
    const company = job.logo
      ? `<img src="${job.logo}" alt="${esc(job.company)}">`
      : `<strong>${esc(job.company)}</strong>`;
    main.push(`<div class="job">
      <div class="job-top"><h3>${esc(t(job.title))}</h3><span class="period">${esc(t(job.period))}</span></div>
      <div class="company">${company}<span class="stack">${esc(job.stack)}</span></div>
      <ul>${bullets}</ul></div>`);
  });

  main.push(`<h2><i class="bi bi-phone"></i>${L.projects}</h2><div class="projects">`);
  const featured = FEATURED.map((n) => PROJECTS.find((p) => nameOf(p) === n)).filter(Boolean);
  featured.forEach((p) => {
    const icon = p.logo ? `<img src="${p.logo}" alt="">` : `<span class="pi"><i class="bi ${p.icon}"></i></span>`;
    const meta = [p.stack, p.platforms].filter(Boolean).join(" · ");
    main.push(`<div class="project">${icon}<div>
      <h4>${esc(t(p.name))}</h4>
      <p>${esc(t(p.desc))}</p>
      ${meta ? `<p class="pstack">${esc(meta)}</p>` : ""}
    </div></div>`);
  });
  main.push("</div>");
  const rest = PROJECTS.filter((p) => !featured.includes(p)).map((p) => esc(t(p.name)));
  if (rest.length) main.push(`<p class="more"><strong>${L.more}</strong> ${rest.join(" · ")}.</p>`);

  main.push(`<h2><i class="bi bi-mortarboard"></i>${L.education}</h2>`);
  [
    ["resume.edu0.title", "resume.edu0.school", d["resume.edu0.period"]],
    ["resume.edu1.title", "resume.edu1.school", "2021 – 2023"],
    ["resume.edu2.title", "resume.edu2.school", ""],
    ["resume.edu3.title", "resume.edu3.school", "2013"]
  ].forEach(([title, school, when]) => {
    main.push(`<div class="edu"><div><strong>${esc(d[title])}</strong><br><span>${esc(d[school])}</span></div>
      <div class="when">${esc(when)}</div></div>`);
  });

  document.getElementById("main").innerHTML = main.join("");
  document.documentElement.lang = lang;
  document.title = lang === "en" ? "Yeffry L. Rodriguez P. — CV" : "Yeffry L. Rodriguez P. — Currículum";
})();
