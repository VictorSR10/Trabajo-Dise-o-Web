
const botonBuscar = document.getElementById("botonBuscar");
const botonLimpiar = document.getElementById("botonLimpiar");
const opcionesCategoria = document.querySelectorAll('input[name="categoria"]');
const opcionesModalidad = document.querySelectorAll('input[name="modalidad"]');
const categorias = document.querySelectorAll(".categoria");
const botonesVer = document.querySelectorAll(".boton-ver");
const mensajeResultados = document.getElementById("mensajeResultados");


function filtrarOportunidades() {
  const texto = document
    .getElementById("textoBusqueda")
    .value.toLowerCase()
    .trim();

  const lugar = document
    .getElementById("lugarBusqueda")
    .value.toLowerCase()
    .trim();

  const areaBusqueda = document.getElementById("areaBusqueda").value;
  const areaFiltro = document.getElementById("filtroArea").value;

  const categoriaSeleccionada = document.querySelector(
    'input[name="categoria"]:checked'
  ).value;

  const modalidadesSeleccionadas = [];

  opcionesModalidad.forEach(function (opcion) {
    if (opcion.checked) {
      modalidadesSeleccionadas.push(opcion.value);
    }
  });

  let cantidadVisible = 0;


  const tarjetas = document.querySelectorAll(".tarjeta-oportunidad");

  tarjetas.forEach(function (tarjeta) {
    const categoriaTarjeta = tarjeta.dataset.categoria;
    const modalidadTarjeta = tarjeta.dataset.modalidad;
    const areaTarjeta = tarjeta.dataset.area;
    const lugarTarjeta = tarjeta.dataset.lugar;
    const textoTarjeta = tarjeta.textContent.toLowerCase();

    const cumpleTexto = texto === "" || textoTarjeta.includes(texto);
    const cumpleLugar = lugar === "" || lugarTarjeta.includes(lugar);

    const cumpleCategoria =
      categoriaSeleccionada === "todas" ||
      categoriaTarjeta === categoriaSeleccionada;

    const cumpleModalidad =
      modalidadesSeleccionadas.length === 0 ||
      modalidadesSeleccionadas.includes(modalidadTarjeta);

    const cumpleAreaBusqueda =
      areaBusqueda === "todas" || areaTarjeta === areaBusqueda;

    const cumpleAreaFiltro =
      areaFiltro === "todas" || areaTarjeta === areaFiltro;

    if (
      cumpleTexto &&
      cumpleLugar &&
      cumpleCategoria &&
      cumpleModalidad &&
      cumpleAreaBusqueda &&
      cumpleAreaFiltro
    ) {
      tarjeta.classList.remove("oculta");
      cantidadVisible = cantidadVisible + 1;
    } else {
      tarjeta.classList.add("oculta");
    }
  });

  mensajeResultados.textContent =
    "Se encontraron " + cantidadVisible + " oportunidades.";
}


botonBuscar.addEventListener("click", function () {
  filtrarOportunidades();
  document.getElementById("oportunidades").scrollIntoView();
});


opcionesCategoria.forEach(function (opcion) {
  opcion.addEventListener("change", filtrarOportunidades);
});

opcionesModalidad.forEach(function (opcion) {
  opcion.addEventListener("change", filtrarOportunidades);
});

document
  .getElementById("filtroArea")
  .addEventListener("change", filtrarOportunidades);


categorias.forEach(function (botonCategoria) {
  botonCategoria.addEventListener("click", function () {
    const categoriaElegida = botonCategoria.dataset.categoria;

    opcionesCategoria.forEach(function (opcion) {
      if (opcion.value === categoriaElegida) {
        opcion.checked = true;
      }
    });

    filtrarOportunidades();
    document.getElementById("oportunidades").scrollIntoView();
  });
});


botonLimpiar.addEventListener("click", function () {
  document.getElementById("textoBusqueda").value = "";
  document.getElementById("lugarBusqueda").value = "";
  document.getElementById("areaBusqueda").value = "todas";
  document.getElementById("filtroArea").value = "todas";

  opcionesCategoria[0].checked = true;

  opcionesModalidad.forEach(function (opcion) {
    opcion.checked = false;
  });

  filtrarOportunidades();
});




// Gestión de estado de sesión en la barra de navegación
function inicializarEstadoSesion() {
  const contenedorBotones = document.querySelector(".botones-cuenta");
  if (!contenedorBotones) return;

  try {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioActivo && usuarioActivo.nombre) {
      contenedorBotones.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="color: #ffffff; font-weight: 600; font-size: 14px;"> Hola, ${usuarioActivo.nombre}</span>
          <a href="mis_postulaciones.html" class="boton-ingresar" style="background-color: #0284c7; border: 1px solid #0284c7; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; color: white; padding: 7px 12px; border-radius: 6px; font-weight: 600; font-size: 13px;"> Mis Postulaciones</a>
          <button type="button" id="btnCerrarSesion" class="boton-ingresar" style="background-color: #ef4444; border: 1px solid #dc2626; cursor: pointer; color: white; padding: 7px 12px; border-radius: 6px; font-weight: 600; font-size: 13px;">Cerrar sesión</button>
        </div>
      `;

      const btnCerrar = document.getElementById("btnCerrarSesion");
      if (btnCerrar) {
        btnCerrar.addEventListener("click", function () {
          localStorage.removeItem("usuarioActivo");
          window.location.reload();
        });
      }
    }
  } catch (e) {
    console.error("Error al gestionar la sesión:", e);
  }
}

inicializarEstadoSesion();


filtrarOportunidades();
