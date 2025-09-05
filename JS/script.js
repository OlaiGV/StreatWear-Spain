// import contenido de cabecera
import { cabeceraMenuLanding } from "../parciales/cabecera-menu-landing.js";

window.onload = function () {
  // Colocamos cabecera y menú en el DOM
  let main = document.querySelector("main");
  let header = document.querySelector("header");
  header.innerHTML = cabeceraMenuLanding;
  main.before(header);
};
