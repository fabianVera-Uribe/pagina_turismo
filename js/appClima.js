const container = document.querySelector(".container");
const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});
let kervilACelcius = (grados) => parseInt(grados - 273.15);
let mostrarClima = (datos) => {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;
  const celcius = kervilACelcius(temp);
  const min = kervilACelcius(temp_min);
  const max = kervilACelcius(temp_max);

  const nombreCiudad = document.createElement("P");
  nombreCiudad.textContent = `${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("P");
  actual.innerHTML = `${celcius} &#8451; `;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("P");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("P");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("DIV");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
};
let mostrarError = (mensaje) => {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("DIV");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `
  <strong class="font-bold">Error</strong>
  <span class="block">${mensaje}</span>
  `;
    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
};
let consultarAPI = (ciudad, pais) => {
  const appId = "d199da7c8ad52de6b80611691f1be041";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid={${appId}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML(); // Limpiar HTML previo
      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      // Imprime respuesta en HTML
      mostrarClima(datos);
    });
};

function buscarClima(e) {
  e.preventDefault();

  // Validando FORM
  const ciudad = document.getElementById("ciudad").value;
  const pais = document.getElementById("pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios");

    return;
  }

  // Consultando API
  consultarAPI(ciudad, pais);
}
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
