
$(document).ready(function () {
  // 1. Inyectar estructura del widget en el DOM si no existe
  if ($("#contenedorWidgetAccesibilidad").length === 0) {
    const widgetHTML = `
      <div id="contenedorWidgetAccesibilidad">
        <button id="btnAbrirAccesibilidad" type="button" aria-expanded="false" aria-label="Abrir panel de accesibilidad e inclusión">
          <span>♿</span> Accesibilidad
        </button>

        <div id="panelAccesibilidad" role="dialog" aria-modal="true" aria-label="Herramientas de accesibilidad">
          <div class="encabezado-panel-acc">
            <h4><span>♿</span> Accesibilidad B.O.U.</h4>
            <button id="btnCerrarAccesibilidad" type="button" title="Cerrar panel" aria-label="Cerrar">&times;</button>
          </div>

          <!-- Tamaño de texto -->
          <div class="grupo-acc">
            <label>Tamaño de texto</label>
            <div class="fila-botones-acc">
              <button type="button" class="btn-acc-opcion" id="btnTamanoMenos" title="Texto pequeño">A-</button>
              <button type="button" class="btn-acc-opcion activo" id="btnTamanoNormal" title="Texto normal">A</button>
              <button type="button" class="btn-acc-opcion" id="btnTamanoMas" title="Texto grande">A+</button>
              <button type="button" class="btn-acc-opcion" id="btnTamanoExtra" title="Texto muy grande">A++</button>
            </div>
          </div>

          <!-- Modos visuales -->
          <div class="grupo-acc">
            <label>Adaptación visual</label>
            <button type="button" class="btn-acc-accion" id="btnModoOscuro">
              <span id="iconoModoOscuro">🌙</span> <span id="textoModoOscuro">Modo Oscuro</span>
            </button>
            <button type="button" class="btn-acc-accion" id="btnAltoContraste">
              <span>⚡</span> <span id="textoAltoContraste">Alto Contraste</span>
            </button>
          </div>

          <!-- Lector de pantalla / Voz -->
          <div class="grupo-acc">
            <label>Lectura por voz</label>
            <button type="button" class="btn-acc-accion" id="btnLeerVoz">
              <span id="iconoVoz">🔊</span> <span id="textoVoz">Escuchar contenido</span>
            </button>
            <div id="indicadorVoz" class="indicador-voz">🔊 Reproduciendo audio de la página...</div>
          </div>

          <!-- Restablecer -->
          <button type="button" class="btn-acc-reset" id="btnResetAccesibilidad">
            🔄 Restablecer valores originales
          </button>
        </div>
      </div>
    `;

    $("body").append(widgetHTML);
  }

  // Elementos jQuery
  const $panel = $("#panelAccesibilidad");
  const $btnAbrir = $("#btnAbrirAccesibilidad");
  const $btnCerrar = $("#btnCerrarAccesibilidad");
  const $body = $("body");

  // 2. Cargar preferencias guardadas en localStorage
  function aplicarPreferenciasGuardadas() {
    // Tamaño de texto
    const tamanoGuardado = localStorage.getItem("bou_tamano_texto") || "normal";
    aplicarTamanoTexto(tamanoGuardado);

    // Modo Oscuro
    const modoOscuro = localStorage.getItem("bou_modo_oscuro") === "true";
    if (modoOscuro) {
      $body.addClass("modo-oscuro");
      $("#btnModoOscuro").addClass("activo");
      $("#iconoModoOscuro").text("☀️");
      $("#textoModoOscuro").text("Modo Claro");
    }

    // Alto Contraste
    const altoContraste = localStorage.getItem("bou_alto_contraste") === "true";
    if (altoContraste) {
      $body.addClass("alto-contraste");
      $("#btnAltoContraste").addClass("activo");
    }
  }

  // Función para aplicar tamaño de texto
  function aplicarTamanoTexto(tipo) {
    $body.removeClass("tamano-reducido tamano-aumentado tamano-extra");
    $(".btn-acc-opcion").removeClass("activo");

    if (tipo === "reducido") {
      $body.addClass("tamano-reducido");
      $("#btnTamanoMenos").addClass("activo");
    } else if (tipo === "aumentado") {
      $body.addClass("tamano-aumentado");
      $("#btnTamanoMas").addClass("activo");
    } else if (tipo === "extra") {
      $body.addClass("tamano-extra");
      $("#btnTamanoExtra").addClass("activo");
    } else {
      $("#btnTamanoNormal").addClass("activo");
    }

    localStorage.setItem("bou_tamano_texto", tipo);
  }

  aplicarPreferenciasGuardadas();

  // 3. Eventos de apertura / cierre del panel
  $btnAbrir.on("click", function (e) {
    e.stopPropagation();
    $panel.fadeToggle(200, function () {
      const visible = $panel.is(":visible");
      $btnAbrir.attr("aria-expanded", visible);
    });
  });

  $btnCerrar.on("click", function () {
    $panel.fadeOut(200);
    $btnAbrir.attr("aria-expanded", "false");
  });

  // Cerrar al hacer clic fuera del panel
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#contenedorWidgetAccesibilidad").length) {
      $panel.fadeOut(200);
      $btnAbrir.attr("aria-expanded", "false");
    }
  });

  // Cerrar con tecla Escape
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $panel.is(":visible")) {
      $panel.fadeOut(200);
      $btnAbrir.attr("aria-expanded", "false");
    }
  });

  // 4. Controles de tamaño de texto
  $("#btnTamanoMenos").on("click", function () { aplicarTamanoTexto("reducido"); });
  $("#btnTamanoNormal").on("click", function () { aplicarTamanoTexto("normal"); });
  $("#btnTamanoMas").on("click", function () { aplicarTamanoTexto("aumentado"); });
  $("#btnTamanoExtra").on("click", function () { aplicarTamanoTexto("extra"); });

  // 5. Control de Modo Oscuro
  $("#btnModoOscuro").on("click", function () {
    // Si alto contraste está activo, desactivarlo
    if ($body.hasClass("alto-contraste")) {
      $body.removeClass("alto-contraste");
      $("#btnAltoContraste").removeClass("activo");
      localStorage.setItem("bou_alto_contraste", "false");
    }

    $body.toggleClass("modo-oscuro");
    const activo = $body.hasClass("modo-oscuro");

    $(this).toggleClass("activo", activo);
    $("#iconoModoOscuro").text(activo ? "☀️" : "🌙");
    $("#textoModoOscuro").text(activo ? "Modo Claro" : "Modo Oscuro");
    localStorage.setItem("bou_modo_oscuro", activo ? "true" : "false");
  });

  // 6. Control de Alto Contraste
  $("#btnAltoContraste").on("click", function () {
    // Si modo oscuro está activo, desactivarlo
    if ($body.hasClass("modo-oscuro")) {
      $body.removeClass("modo-oscuro");
      $("#btnModoOscuro").removeClass("activo");
      $("#iconoModoOscuro").text("🌙");
      $("#textoModoOscuro").text("Modo Oscuro");
      localStorage.setItem("bou_modo_oscuro", "false");
    }

    $body.toggleClass("alto-contraste");
    const activo = $body.hasClass("alto-contraste");

    $(this).toggleClass("activo", activo);
    localStorage.setItem("bou_alto_contraste", activo ? "true" : "false");
  });

  // 7. Lector de Pantalla / Texto a voz (Web Speech API)
  let sintetizador = window.speechSynthesis;
  let emisionEnCurso = false;

  $("#btnLeerVoz").on("click", function () {
    if (!sintetizador) {
      alert("Tu navegador no soporta síntesis de voz.");
      return;
    }

    // Si ya está hablando, detenerlo
    if (emisionEnCurso || sintetizador.speaking) {
      sintetizador.cancel();
      emisionEnCurso = false;
      $("#iconoVoz").text("🔊");
      $("#textoVoz").text("Escuchar contenido");
      $("#indicadorVoz").hide();
      $("#btnLeerVoz").removeClass("activo");
      return;
    }

    // Extraer texto representativo de la página actual
    let textoALeer = "";

    if ($("#detalleTitulo").length > 0) {
      // Estamos en ver_mas.html
      const titulo = $("#detalleTitulo").text().trim();
      const institucion = $("#detalleInstitucion").text().trim();
      const lugar = $("#detalleLugar").text().trim();
      const fecha = $("#detalleFecha").text().trim();
      const descripcion = $("#detalleDescripcion").text().trim();

      textoALeer = `Detalle de oportunidad en BOU. Título: ${titulo}. Ofrecido por: ${institucion}. Lugar: ${lugar}. Fecha límite: ${fecha}. Descripción: ${descripcion}`;
    } else if ($("#formRegistro").length > 0) {
      // Estamos en Registro.html
      textoALeer = "Página de registro de BOU. Crea tu cuenta completando tu nombre completo, correo electrónico y contraseña.";
    } else if ($("#formLogin").length > 0) {
      // Estamos en Imiciosesion.html
      textoALeer = "Página de inicio de sesión de BOU. Ingresa tu usuario o correo electrónico y tu contraseña para acceder.";
    } else {
      // Estamos en index.html
      const portada = $(".descripcion-portada").text().trim();
      textoALeer = `Bienvenido a B.O.U. Bolsa de Oportunidades Universitarias. ${portada} Puedes explorar becas, prácticas, voluntariados e intercambios utilizando nuestros filtros de búsqueda.`;
    }

    const mensajeVoz = new SpeechSynthesisUtterance(textoALeer);
    mensajeVoz.lang = "es-ES";
    mensajeVoz.rate = 1.0;
    mensajeVoz.pitch = 1.0;

    mensajeVoz.onstart = function () {
      emisionEnCurso = true;
      $("#iconoVoz").text("⏹️");
      $("#textoVoz").text("Detener audio");
      $("#indicadorVoz").fadeIn(150);
      $("#btnLeerVoz").addClass("activo");
    };

    mensajeVoz.onend = function () {
      emisionEnCurso = false;
      $("#iconoVoz").text("🔊");
      $("#textoVoz").text("Escuchar contenido");
      $("#indicadorVoz").fadeOut(150);
      $("#btnLeerVoz").removeClass("activo");
    };

    mensajeVoz.onerror = function () {
      emisionEnCurso = false;
      $("#iconoVoz").text("🔊");
      $("#textoVoz").text("Escuchar contenido");
      $("#indicadorVoz").fadeOut(150);
      $("#btnLeerVoz").removeClass("activo");
    };

    sintetizador.speak(mensajeVoz);
  });

  // 8. Restablecer valores
  $("#btnResetAccesibilidad").on("click", function () {
    if (sintetizador && sintetizador.speaking) {
      sintetizador.cancel();
    }
    emisionEnCurso = false;
    $("#iconoVoz").text("🔊");
    $("#textoVoz").text("Escuchar contenido");
    $("#indicadorVoz").hide();
    $("#btnLeerVoz").removeClass("activo");

    $body.removeClass("modo-oscuro alto-contraste tamano-reducido tamano-aumentado tamano-extra");
    $(".btn-acc-opcion, .btn-acc-accion").removeClass("activo");
    $("#btnTamanoNormal").addClass("activo");
    $("#iconoModoOscuro").text("🌙");
    $("#textoModoOscuro").text("Modo Oscuro");

    localStorage.removeItem("bou_tamano_texto");
    localStorage.removeItem("bou_modo_oscuro");
    localStorage.removeItem("bou_alto_contraste");
  });
});
