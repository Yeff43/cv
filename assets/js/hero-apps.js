/**
 * Fondo del hero: filas inclinadas de iconos de apps publicadas que se desplazan en bucle.
 * Cada fila lleva los iconos duplicados para que la animación (translateX -50%) no tenga corte.
 */
(function () {
  "use strict";

  const tilt = document.querySelector("#hero .hero-apps .tilt");
  if (!tilt) return;

  const ICONS = [
    "brands/dolcepos-mark.png", "apps/fourvenues.png", "apps/emt.png", "apps/volvo.png",
    "apps/colevisa.png", "apps/palaus.png", "apps/rudo.png", "apps/hundred.png",
    "apps/loteria.png", "apps/schooltivity.png", "apps/salt.png", "apps/padelgo.png",
    "apps/hoomvip.png", "apps/eserman.png"
  ].map((f) => "assets/img/" + f);

  const ROWS = 5;
  const frag = document.createDocumentFragment();
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement("div");
    row.className = "row-apps";
    const shifted = ICONS.slice(r * 3).concat(ICONS.slice(0, r * 3));
    shifted.concat(shifted).forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.decoding = "async";
      img.width = 84;
      img.height = 84;
      row.appendChild(img);
    });
    frag.appendChild(row);
  }
  tilt.appendChild(frag);
})();
