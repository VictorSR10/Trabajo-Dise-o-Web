
(function () {
  "use strict";


  function leerLS(clave, porDefecto) {
    try {
      const dato = localStorage.getItem(clave);
      return dato ? JSON.parse(dato) : porDefecto;
    } catch (e) {
      return porDefecto;
    }
  }

  function guardarLS(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (e) {}
  }

  function esCorreoValido(correo) {

    return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(correo);
  }

  function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[,.]/g, "")
      .trim();
  }

  const CLAVE_PUBLICADAS = "bou_oportunidades_publicadas";

  const modal = document.getElementById("modalPublicar");
  const botonPublicar = document.getElementById("botonPublicar");
  const formPublicar = document.getElementById("formPublicar");
  const pasoForm = document.getElementById("pasoFormPublicar");
  const pasoExito = document.getElementById("pasoExitoPublicar");
  const errorPublicar = document.getElementById("pubMensajeError");
  const listaOportunidades = document.getElementById("listaOportunidades");

  const etiquetasCategoria = {
    beca: { texto: "Beca", clase: "etiqueta" },
    practica: { texto: "Práctica", clase: "etiqueta morada" },
    intercambio: { texto: "Intercambio", clase: "etiqueta celeste" },
    voluntariado: { texto: "Voluntariado", clase: "etiqueta verde" }
  };

  const etiquetasModalidad = {
    presencial: { texto: "Presencial", clase: "modalidad" },
    virtual: { texto: "Virtual", clase: "modalidad celeste" },
    hibrido: { texto: "Híbrido", clase: "modalidad amarilla" }
  };

  const iconosCategoria = {
    beca: "img/beca.png",
    practica: "img/practica.png",
    intercambio: "img/intercambio.png",
    voluntariado: "img/voluntariado.png"
  };

  let ultimaPublicadaId = null;

  function formatearFecha(iso) {

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const partes = iso.split("-");
    return parseInt(partes[2], 10) + " " + meses[parseInt(partes[1], 10) - 1] + " " + partes[0];
  }

  function hoyISO() {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + mes + "-" + dia;
  }

  function crearTarjeta(op) {
    const cat = etiquetasCategoria[op.categoria];
    const mod = etiquetasModalidad[op.modalidad];

    const art = document.createElement("article");
    art.className = "tarjeta-oportunidad tarjeta-publicada";
    art.id = op.id;
    art.dataset.categoria = op.categoria;
    art.dataset.modalidad = op.modalidad;
    art.dataset.area = op.area;
    art.dataset.lugar = normalizar(op.lugar);

    art.innerHTML =
      '<div class="parte-superior">' +
        '<span class="' + cat.clase + '">' + cat.texto + "</span>" +
        '<span class="badge-nueva">✨ Nueva</span>' +
      "</div>" +
      '<div class="informacion-tarjeta">' +
        '<img class="icono-tarjeta" src="' + iconosCategoria[op.categoria] + '" alt="">' +
        "<div>" +
          "<h3>" + escapar(op.titulo) + "</h3>" +
          "<p>" + escapar(op.institucion) + "</p>" +
        "</div>" +
      "</div>" +
      (op.descripcion ? '<p class="descripcion-publicada">' + escapar(op.descripcion) + "</p>" : "") +
      '<div class="datos-tarjeta">' +
        '<span class="' + mod.clase + '">' + mod.texto + "</span>" +
        "<span>📌 " + escapar(op.lugar) + "</span>" +
      "</div>" +
      '<div class="pie-tarjeta">' +
        "<p>⏰ <b>" + formatearFecha(op.fecha) + "</b></p>" +
        '<a href="mailto:' + escapar(op.correo) + '?subject=' + encodeURIComponent("Consulta: " + op.titulo) + '" class="boton-ver">Contactar</a>' +
      "</div>" +
      '<button type="button" class="quitar-publicada" data-id="' + op.id + '">Quitar mi publicación</button>';

    return art;
  }

  function refrescarFiltros() {
    if (typeof filtrarOportunidades === "function") {
      filtrarOportunidades();
    }
  }

  function pintarPublicadas() {
    const guardadas = leerLS(CLAVE_PUBLICADAS, []);

    guardadas.slice().reverse().forEach(function (op) {
      if (!document.getElementById(op.id)) {
        listaOportunidades.insertBefore(crearTarjeta(op), listaOportunidades.firstChild);
      }
    });
    refrescarFiltros();
  }

  function mostrarErrorPublicar(texto, campo) {
    errorPublicar.textContent = texto;
    errorPublicar.style.display = "block";
    if (campo) campo.focus();
  }

  function abrirModalPublicar() {
    formPublicar.reset();
    errorPublicar.style.display = "none";
    pasoExito.style.display = "none";
    pasoForm.style.display = "block";
    document.getElementById("pubFecha").min = hoyISO();
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    document.getElementById("pubInstitucion").focus();
  }

  function cerrarModalPublicar() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  if (modal && botonPublicar) {
    botonPublicar.addEventListener("click", abrirModalPublicar);

    document.getElementById("btnCerrarPublicar").addEventListener("click", cerrarModalPublicar);
    document.getElementById("btnCancelarPublicar").addEventListener("click", cerrarModalPublicar);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) cerrarModalPublicar();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "flex") cerrarModalPublicar();
    });

    formPublicar.addEventListener("submit", function (e) {
      e.preventDefault();

      const institucion = document.getElementById("pubInstitucion");
      const correo = document.getElementById("pubCorreo");
      const titulo = document.getElementById("pubTitulo");
      const lugar = document.getElementById("pubLugar");
      const fecha = document.getElementById("pubFecha");

      if (institucion.value.trim().length < 3) {
        return mostrarErrorPublicar("Escribe el nombre de la institución.", institucion);
      }
      if (!esCorreoValido(correo.value.trim())) {
        return mostrarErrorPublicar("Ingresa un correo de contacto válido (ej. contacto@institucion.edu.pe).", correo);
      }
      if (titulo.value.trim().length < 5) {
        return mostrarErrorPublicar("El título de la oportunidad es muy corto (mínimo 5 caracteres).", titulo);
      }
      if (lugar.value.trim().length < 2) {
        return mostrarErrorPublicar("Indica el lugar de la oportunidad.", lugar);
      }
      if (!fecha.value) {
        return mostrarErrorPublicar("Selecciona la fecha límite de postulación.", fecha);
      }
      if (fecha.value < hoyISO()) {
        return mostrarErrorPublicar("La fecha límite no puede ser anterior a hoy.", fecha);
      }

      errorPublicar.style.display = "none";

      const nueva = {
        id: "publicada-" + Date.now(),
        institucion: institucion.value.trim(),
        correo: correo.value.trim(),
        titulo: titulo.value.trim(),
        categoria: document.getElementById("pubCategoria").value,
        modalidad: document.getElementById("pubModalidad").value,
        area: document.getElementById("pubArea").value,
        lugar: lugar.value.trim(),
        fecha: fecha.value,
        descripcion: document.getElementById("pubDescripcion").value.trim()
      };

      const guardadas = leerLS(CLAVE_PUBLICADAS, []);
      guardadas.push(nueva);
      guardarLS(CLAVE_PUBLICADAS, guardadas);

      listaOportunidades.insertBefore(crearTarjeta(nueva), listaOportunidades.firstChild);
      refrescarFiltros();
      ultimaPublicadaId = nueva.id;

      document.getElementById("pubTextoExito").textContent =
        "«" + nueva.titulo + "» ya aparece en el listado de oportunidades.";
      pasoForm.style.display = "none";
      pasoExito.style.display = "block";
    });

    document.getElementById("btnPublicarOtra").addEventListener("click", abrirModalPublicar);

    document.getElementById("btnVerPublicada").addEventListener("click", function () {
      cerrarModalPublicar();

      const limpiar = document.getElementById("botonLimpiar");
      if (limpiar) limpiar.click();
      const tarjeta = document.getElementById(ultimaPublicadaId);
      const destino = tarjeta || document.getElementById("oportunidades");
      destino.scrollIntoView({ behavior: "smooth", block: "center" });
      if (tarjeta) {
        tarjeta.classList.add("resaltada");
        setTimeout(function () { tarjeta.classList.remove("resaltada"); }, 2500);
      }
    });


    listaOportunidades.addEventListener("click", function (e) {
      const boton = e.target.closest(".quitar-publicada");
      if (!boton) return;
      const id = boton.dataset.id;
      const restantes = leerLS(CLAVE_PUBLICADAS, []).filter(function (op) { return op.id !== id; });
      guardarLS(CLAVE_PUBLICADAS, restantes);
      const tarjeta = document.getElementById(id);
      if (tarjeta) tarjeta.remove();
      refrescarFiltros();
    });

    pintarPublicadas();
  }

  const CLAVE_SUSCRITOS = "bou_suscripcion_correo";

  const formSusc = document.getElementById("formSuscripcion");
  const inputSusc = document.getElementById("correoSuscripcion");
  const mensajeSusc = document.getElementById("mensajeSuscripcion");
  const bloqueExito = document.getElementById("suscripcionExito");
  const textoExito = document.getElementById("textoSuscripcionExito");
  const botonCambiar = document.getElementById("botonCambiarCorreo");


  const dominiosComunes = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gamil.com": "gmail.com",
    "gmail.con": "gmail.com",
    "gmail.co": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
    "hotmail.con": "hotmail.com",
    "outlok.com": "outlook.com",
    "outlook.con": "outlook.com",
    "yahho.com": "yahoo.com",
    "yahoo.con": "yahoo.com"
  };

  function mostrarMensajeSusc(texto, tipo) {
    mensajeSusc.textContent = texto;
    mensajeSusc.className = "mensaje-suscripcion " + (tipo || "");
  }

  function mostrarEstadoSuscrito(correo) {
    textoExito.textContent = "Recibirás alertas en " + correo + ". ¡Revisa tu bandeja de entrada!";
    formSusc.style.display = "none";
    mensajeSusc.textContent = "";
    mensajeSusc.className = "mensaje-suscripcion";
    bloqueExito.style.display = "flex";
  }

  function mostrarFormularioSusc() {
    bloqueExito.style.display = "none";
    formSusc.style.display = "flex";
    inputSusc.value = "";
    inputSusc.focus();
  }

  if (formSusc && inputSusc) {

    const previo = leerLS(CLAVE_SUSCRITOS, null);
    if (previo && previo.correo) {
      mostrarEstadoSuscrito(previo.correo);
    }

    inputSusc.addEventListener("input", function () {
      inputSusc.classList.remove("campo-invalido");
      mostrarMensajeSusc("", "");
    });

    formSusc.addEventListener("submit", function (e) {
      e.preventDefault();
      const correo = inputSusc.value.trim().toLowerCase();

      if (correo === "") {
        inputSusc.classList.add("campo-invalido");
        mostrarMensajeSusc("Escribe tu correo para suscribirte.", "error");
        inputSusc.focus();
        return;
      }

      if (!esCorreoValido(correo)) {
        inputSusc.classList.add("campo-invalido");
        mostrarMensajeSusc("El correo no es válido. Ejemplo: tucorreo@universidad.edu", "error");
        inputSusc.focus();
        return;
      }

      const dominio = correo.split("@")[1];
      if (dominiosComunes[dominio]) {
        inputSusc.classList.add("campo-invalido");
        mostrarMensajeSusc(
          "¿Quisiste decir " + correo.split("@")[0] + "@" + dominiosComunes[dominio] + "?",
          "error"
        );
        inputSusc.focus();
        return;
      }

      const previoGuardado = leerLS(CLAVE_SUSCRITOS, null);
      if (previoGuardado && previoGuardado.correo === correo) {
        mostrarEstadoSuscrito(correo);
        return;
      }

      guardarLS(CLAVE_SUSCRITOS, { correo: correo, fecha: new Date().toISOString() });
      inputSusc.classList.remove("campo-invalido");
      mostrarEstadoSuscrito(correo);
    });

    botonCambiar.addEventListener("click", function () {
      try { localStorage.removeItem(CLAVE_SUSCRITOS); } catch (e) {}
      mostrarFormularioSusc();
    });
  }
})();
