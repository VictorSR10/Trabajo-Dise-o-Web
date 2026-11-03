$(document).ready(function () {

  const metaEventos = {
    "evento-beca": {
      fechaISO: "20260912T150000Z",
      sala: "meet.bou.edu.pe/becas-exterior-2026",
      auditorio: "Auditorio Central BOU - Av. Javier Prado Este 4200, Lima"
    },
    "evento-linkedin": {
      fechaISO: "20260919T230000Z",
      sala: "zoom.us/j/linkedin-latam-2026",
      auditorio: "Centro de Convenciones Lima - Sala 3B"
    },
    "evento-feria": {
      fechaISO: "20261003T140000Z",
      sala: "feria.bou.edu.pe/campus-virtual",
      auditorio: "Explanada Universitaria BOU (15 stands oficiales)"
    },
    "evento-hackedu": {
      fechaISO: "20261017T130000Z",
      sala: "hackedu.minedu.gob.pe/live",
      auditorio: "Hub de Innovación Minedu - San Borja, Lima"
    }
  };

  let $tarjetaActual = null;
  let idEventoActual = null;

  function obtenerInscripcionesGuardadas() {
    try {
      const data = localStorage.getItem("bou_inscripciones_eventos");
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function guardarInscripcionEvento(idEvento, datosRegistro) {
    try {
      const registros = obtenerInscripcionesGuardadas();
      registros[idEvento] = datosRegistro;
      localStorage.setItem("bou_inscripciones_eventos", JSON.stringify(registros));
    } catch (e) {}
  }

  function eliminarInscripcionEvento(idEvento) {
    try {
      const registros = obtenerInscripcionesGuardadas();
      delete registros[idEvento];
      localStorage.setItem("bou_inscripciones_eventos", JSON.stringify(registros));
    } catch (e) {}
  }


  function actualizarVistaTarjeta($tarjeta, inscrito) {
    const $boton = $tarjeta.find(".boton-inscribir");
    const cuposBase = parseInt($tarjeta.attr("data-cupos"), 10) || 25;
    const $numCupos = $tarjeta.find(".num-cupos");
    const $badgeCupos = $tarjeta.find(".badge-cupos");

    if (inscrito) {
      $boton.html("✔ Inscrito · Ver mi pase")
            .addClass("inscrito-activo")
            .css("background-color", "#16a34a");
      $numCupos.text(cuposBase - 1);
      $badgeCupos.addClass("cupo-reservado");
    } else {
      $boton.html("Inscribirse")
            .removeClass("inscrito-activo")
            .css("background-color", "");
      $numCupos.text(cuposBase);
      $badgeCupos.removeClass("cupo-reservado");
    }
  }


  function mostrarPasoTicket(registro) {
    $("#ticketCodigo").text(registro.codigo);
    $("#ticketEvento").text(registro.nombreEvento);
    $("#ticketFecha").text(registro.fechaEvento);
    $("#ticketAsistente").text(registro.nombre);
    $("#ticketUni").text(registro.universidad + " (" + registro.ciclo + ")");
    $("#ticketMod").text(registro.modalidad);
    $("#ticketEmail").text(registro.correo);

    const infoExtra = metaEventos[registro.idEvento] || metaEventos["evento-beca"];
    if (registro.modalidad.indexOf("Presencial") !== -1) {
      $("#ticketAcceso").html("📍 <b>Sede presencial:</b> " + infoExtra.auditorio);
    } else {
      $("#ticketAcceso").html("🔗 <b>Sala virtual:</b> " + infoExtra.sala);
    }

    $("#pasoFormularioEvento").hide();
    $("#pasoTicketEvento").fadeIn(220);
  }


  const inscripcionesIniciales = obtenerInscripcionesGuardadas();
  $(".tarjeta-evento").each(function () {
    const $card = $(this);
    const idEv = $card.attr("data-evento");
    if (idEv && inscripcionesIniciales[idEv]) {
      actualizarVistaTarjeta($card, true);
    }
  });


  $(".boton-inscribir").on("click", function () {
    $tarjetaActual = $(this).closest(".tarjeta-evento");
    idEventoActual = $tarjetaActual.attr("data-evento") || "evento-beca";

    const icono = $tarjetaActual.find(".icono-evento").text().trim();
    const nombreEvento = $tarjetaActual.find("h3").text().trim();
    const organizador = $tarjetaActual.find("p").not(".icono-evento").first().text().trim();
    const fechaEvento = $tarjetaActual.find("small").text().trim();


    $("#evModalIcono").text(icono);
    $("#evModalTitulo").text(nombreEvento);
    $("#evModalOrganizador").text("Organiza: " + organizador);
    $("#evModalFecha").text(fechaEvento);
    $("#evMensajeError").hide();


    const guardados = obtenerInscripcionesGuardadas();
    if (guardados[idEventoActual]) {
      mostrarPasoTicket(guardados[idEventoActual]);
    } else {
      $("#pasoTicketEvento").hide();
      $("#pasoFormularioEvento").show();
    }


    $("#modalInscripcionEvento").fadeIn(200);
    $("body").css("overflow", "hidden");
  });


  $("#formInscripcionEvento").on("submit", function (evento) {
    evento.preventDefault();

    const nombre = $("#evNombre").val().trim();
    const correo = $("#evCorreo").val().trim();
    const universidad = $("#evUniversidad").val().trim();
    const modalidad = $("#evModalidad").val();
    const ciclo = $("#evCiclo").val();
    const pregunta = $("#evPregunta").val().trim();

    if (nombre === "" || correo === "" || universidad === "") {
      $("#evMensajeError")
        .text("Por favor, completa tu nombre, correo y universidad para generar tu pase.")
        .slideDown(150);
      return;
    }

    $("#evMensajeError").slideUp(100);


    const numAleatorio = Math.floor(1000 + Math.random() * 9000);
    const codigoTicket = "#BOU-2026-" + numAleatorio;

    const datosRegistro = {
      idEvento: idEventoActual,
      codigo: codigoTicket,
      nombreEvento: $("#evModalTitulo").text(),
      organizador: $("#evModalOrganizador").text(),
      fechaEvento: $("#evModalFecha").text(),
      nombre: nombre,
      correo: correo,
      universidad: universidad,
      modalidad: modalidad,
      ciclo: ciclo,
      pregunta: pregunta
    };


    guardarInscripcionEvento(idEventoActual, datosRegistro);
    if ($tarjetaActual) {
      actualizarVistaTarjeta($tarjetaActual, true);
    }

    $("#pasoFormularioEvento").slideUp(200, function () {
      mostrarPasoTicket(datosRegistro);
    });
  });


  $("#btnAgendarEventoCal").on("click", function () {
    const guardados = obtenerInscripcionesGuardadas();
    const reg = guardados[idEventoActual];
    if (!reg) return;

    const infoExtra = metaEventos[idEventoActual] || metaEventos["evento-beca"];
    const titulo = encodeURIComponent("Evento BOU: " + reg.nombreEvento);
    const fechaISO = infoExtra.fechaISO;
    const detalles = encodeURIComponent(
      "Pase de acceso: " + reg.codigo + " | Asistente: " + reg.nombre + " | Modalidad: " + reg.modalidad
    );
    const ubicacion = encodeURIComponent(
      reg.modalidad.indexOf("Presencial") !== -1 ? infoExtra.auditorio : infoExtra.sala
    );

    const urlCal = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + titulo + "&dates=" + fechaISO + "/" + fechaISO + "&details=" + detalles + "&location=" + ubicacion;
    window.open(urlCal, "_blank");
  });


  $("#btnAnularInscripcion").on("click", function () {
    if (!idEventoActual) return;
    eliminarInscripcionEvento(idEventoActual);
    if ($tarjetaActual) {
      actualizarVistaTarjeta($tarjetaActual, false);
    }
    $("#formInscripcionEvento")[0].reset();
    cerrarModalEvento();
  });


  function cerrarModalEvento() {
    $("#modalInscripcionEvento").fadeOut(180);
    $("body").css("overflow", "");
  }

  $("#btnCerrarInscripcion, #btnCancelarFormEv, #btnListoTicket").on("click", function () {
    cerrarModalEvento();
  });

  $("#modalInscripcionEvento").on("click", function (e) {
    if ($(e.target).is("#modalInscripcionEvento")) {
      cerrarModalEvento();
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $("#modalInscripcionEvento").is(":visible")) {
      cerrarModalEvento();
    }
  });

  $("#verCalendario").on("click", function (evento) {
    evento.preventDefault();
    $(".lista-eventos").slideToggle(280);
  });

});
