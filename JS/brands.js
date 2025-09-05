// import contenido de cabecera
import { cabeceraMenuLanding } from "../parciales/cabecera-menu-landing.js";

window.onload = function () {
  // Colocamos cabecera y menú en el DOM
  let main = document.querySelector("main");
  let header = document.querySelector("header");
  header.innerHTML = cabeceraMenuLanding;
  main.before(header);

  async function loadBrands() {
    const response = await fetch("../RESOURCES/DATA/brands.json");
    const brands = await response.json();

    // Leer la marca seleccionada de localStorage
    const selectedBrand = localStorage.getItem("selectedBrand");

    // Filtrar marcas si hay una seleccionada
    let filteredBrands = brands;
    if (selectedBrand) {
      filteredBrands = brands.filter((b) => b.name === selectedBrand);
      localStorage.removeItem("selectedBrand");
    }

    filteredBrands.forEach((brand) => {
      // Título principal
      const h1 = document.createElement("h1");
      h1.classList.add("brand-title");
      h1.textContent = brand.name;
      main.appendChild(h1);

      // Article brand
      const brandSection = document.createElement("article");
      brandSection.classList.add("brand");

      // Collage
      const collage = document.createElement("article");
      collage.classList.add("collage");
      collage.setAttribute("data-marca", brand.name.toLowerCase());

      if (Array.isArray(brand.images)) {
        brand.images.forEach((src, idx) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = `${brand.name} - Image ${idx + 1}`;
          collage.appendChild(img);
        });
      }

      // Info
      const info = document.createElement("article");
      info.classList.add("brand-info");
      info.innerHTML = `
        <h2>About ${brand.name}</h2>
        <p>${brand.description}</p>
      `;

      brandSection.appendChild(collage);
      brandSection.appendChild(info);

      main.appendChild(brandSection);
    });
  }

  loadBrands();
};
