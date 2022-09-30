document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
const paises = ["Chile", "Perú", "México", "Argentina", "Colombia", "Brasil"];

function iniciarApp() {
  crearDestinos();
  scrollnav();
  navegacionFija();
  enviarFormulario();
}
function crearDestinos() {
  const destinos = document.querySelector("#destinos__galeria");

  for (let i = 1; i <= 6; i++) {
    const imagen = document.createElement("figure");
    imagen.setAttribute("class", "destinos__galeria__container");
    imagen.innerHTML = ` 
    <img class="destinos__imagen" src="img/galeria/${i}.webp" alt="paisaje" />
    <div class="capa">
      <h3 class="capa__titulo">${paises[i - 1]} </h3>
      <a class="capa__boton" href="#">Ver Más</a>
    `;
    // console.log(imagen);
    destinos.appendChild(imagen);
  }
}
function scrollnav() {
  const enlaces = document.querySelectorAll(".barra__link");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}
function navegacionFija() {
  const barra = document.querySelector(".header");
  const destinos = document.querySelector("#destinos__galeria");

  window.addEventListener("scroll", () => {
    // console.log(destinos.getBoundingClientRect());
    if (destinos.getBoundingClientRect().top < 132.5) {
      barra.classList.add("fijo");
    } else {
      barra.classList.remove("fijo");
    }
  });
}
function enviarFormulario() {
  const submit = document.getElementById("submit");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensajeError = document.querySelector(".error");

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (nombre.value.trim() === "") {
      mensajeError.textContent = "Este campo es obligatorio";
      setTimeout(() => {
        mensajeError.textContent = "";
      }, 5000);
    }
    if (email.value.trim() === "") {
      mensajeError.textContent = "Este campo es obligatorio";
    } else {
      mensajeError.textContent = "";
    }
  });
}
