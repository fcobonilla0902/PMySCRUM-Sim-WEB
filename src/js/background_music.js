// Carga un archivo de contenido sin recargar toda la página
    async function loadPage(file) {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById('content').innerHTML = html;
    }

    // Carga la página inicial
    loadPage("inicio.html");

    // Ejemplo: cambiar de página sin recargar
    document.addEventListener("click", e => {
      if (e.target.matches("[data-page]")) {
        e.preventDefault();
        loadPage(e.target.getAttribute("data-page"));
      }
    });