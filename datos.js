

const datosOportunidades = {
  "beca-usmp": {
    id: "beca-usmp",
    titulo: "Beca de Excelencia Académica USMP",
    institucion: "Universidad San Martín de Porres",
    categoria: "Beca",
    categoriaClase: "etiqueta",
    destacada: true,
    modalidad: "Presencial",
    modalidadClase: "modalidad",
    lugar: "Lima, Perú",
    fechaLimite: "15 Sep 2026",
    fechaLimiteISO: "20260915T235959Z",
    icono: "img/beca.png",
    cupos: "30 becas integrales",
    area: "Ingeniería, Ciencias y Administración",
    duracion: "Semestre académico 2027-I (renovable)",
    descripcion: "El Programa de Excelencia Académica de la Universidad San Martín de Porres (USMP) premia el esfuerzo, la constancia y el alto desempeño de estudiantes regulares de pregrado, brindando cobertura total de costos académicos y acceso directo a grupos de investigación.",
    beneficios: [
      { icono: "🎓", texto: "Cobertura del 100% en matrícula y cuotas académicas regulares." },
      { icono: "📚", texto: "Exoneración de aranceles administrativos y constancias oficiales." },
      { icono: "👨‍🏫", texto: "Mentoría directa con docentes investigadores y acceso a laboratorios." },
      { icono: "🌐", texto: "Cupo preferencial en cursos intensivos del Centro de Idiomas USMP." }
    ],
    requisitos: [
      "Estar matriculado entre el 3er y 8vo ciclo en modalidad regular de pregrado.",
      "Pertenecer al tercio superior o décimo superior de su respectiva facultad.",
      "Acreditar un promedio ponderado acumulado histórico mínimo de 15.00 / 20.00.",
      "No registrar sanciones disciplinarias ni asignaturas desaprobadas en el ciclo anterior."
    ],
    documentos: [
      "Ficha socioeconómica oficial y solicitud de postulación firmada.",
      "Récord histórico de notas emitido por Registros Académicos.",
      "Constancia de pertenencia al tercio superior expedida por la facultad.",
      "Copia simple y legible del DNI o carné de extranjería vigente."
    ],
    cronograma: [
      { fecha: "01 Ago - 15 Sep 2026", evento: "Recepción de postulaciones y carga de expedientes virtuales." },
      { fecha: "18 - 25 Sep 2026", evento: "Validación académica y evaluación socioeconómica." },
      { fecha: "28 Sep 2026", evento: "Publicación de preseleccionados para entrevista." },
      { fecha: "05 Oct 2026", evento: "Publicación oficial de becarios seleccionados." }
    ],
    contacto: "becas@usmp.pe | Oficina de Bienestar Universitario USMP"
  },

  "practica-software": {
    id: "practica-software",
    titulo: "Práctica de ingeniería de software",
    institucion: "Empresa tecnológica internacional (Tokyo Tech Lab)",
    categoria: "Práctica",
    categoriaClase: "etiqueta morada",
    destacada: true,
    modalidad: "Híbrido",
    modalidadClase: "modalidad amarilla",
    lugar: "Tokyo, Japón",
    fechaLimite: "30 Sep 2026",
    fechaLimiteISO: "20260930T235959Z",
    icono: "img/practica.png",
    cupos: "5 vacantes internacionales",
    area: "Ingeniería de Sistemas y Computación",
    duracion: "6 meses (con opción a contratación fija)",
    descripcion: "Pasantía preprofesional remunerada enfocada en desarrollo de microservicios, optimización de algoritmos en la nube y aplicaciones web de alta concurrencia, colaborando en equipos ágiles distribuidos entre América Latina y Japón.",
    beneficios: [
      { icono: "💵", texto: "Subvención mensual de $1,400 USD (equivalente en moneda local / JPY)." },
      { icono: "💻", texto: "Equipo de cómputo de alta gama (MacBook Pro M3 o Dell XPS)." },
      { icono: "✈️", texto: "Bono para visado y pasajes aéreos en caso de rotación presencial en Tokyo." },
      { icono: "🤝", texto: "Mentoría técnica 1-a-1 y posibilidad de oferta laboral fija (Full-time)." }
    ],
    requisitos: [
      "Estudiante universitario de últimos ciclos (7mo a 10mo) o egresado reciente (máx. 1 año).",
      "Experiencia comprobable en JavaScript/TypeScript, Python, bases de datos SQL y Git.",
      "Nivel de inglés intermedio a avanzado (B2/C1) para comunicación en reuniones técnicas.",
      "Disponibilidad de 30 horas semanales en horario flexible."
    ],
    documentos: [
      "Curriculum Vitae (CV) actualizado en inglés (formato de 1 página).",
      "Enlace a repositorio de proyectos personales (GitHub o GitLab).",
      "Carta de recomendación académica o de pasantías previas."
    ],
    cronograma: [
      { fecha: "Hasta 30 Sep 2026", evento: "Cierre de postulaciones en plataforma." },
      { fecha: "03 - 08 Oct 2026", evento: "Desafío técnico en línea de resolución de algoritmos." },
      { fecha: "14 - 18 Oct 2026", evento: "Entrevistas técnicas con líderes de ingeniería." },
      { fecha: "02 Nov 2026", evento: "Onboarding e inicio formal de la práctica." }
    ],
    contacto: "internships@tokyotechcorp.jp"
  },

  "intercambio-unam": {
    id: "intercambio-unam",
    titulo: "Programa de Movilidad Estudiantil UNAM",
    institucion: "Universidad Nacional Autónoma de México",
    categoria: "Intercambio",
    categoriaClase: "etiqueta celeste",
    destacada: false,
    modalidad: "Presencial",
    modalidadClase: "modalidad",
    lugar: "México D.F.",
    fechaLimite: "15 Sep 2026",
    fechaLimiteISO: "20260915T235959Z",
    icono: "img/intercambio.png",
    cupos: "20 plazas por convenio bilateral",
    area: "Multidisciplinaria",
    duracion: "1 semestre académico completo",
    descripcion: "Cursa un semestre académico regular en la Universidad Nacional Autónoma de México (UNAM), una de las instituciones educativas líderes de Iberoamérica, con plena homologación de asignaturas en tu universidad de origen.",
    beneficios: [
      { icono: "🏛️", texto: "Exención del 100% en pago de colegiatura y matrícula académica en la UNAM." },
      { icono: "📑", texto: "Convalidación oficial de hasta 5 asignaturas semestrales." },
      { icono: "🏥", texto: "Seguro médico estudiantil y acceso a instalaciones de Ciudad Universitaria." },
      { icono: "🌎", texto: "Red de contactos multicultural y actividades culturales y deportivas gratuitas." }
    ],
    requisitos: [
      "Tener al menos el 50% de los créditos aprobados en tu plan de estudios de pregrado.",
      "Promedio general acumulado igual o superior a 8.5 / 10 (o 14.5 / 20 en escala peruana).",
      "Aprobación formal de las asignaturas a convalidar por el director de carrera.",
      "Pasaporte vigente con validez mínima de un año."
    ],
    documentos: [
      "Formulario oficial de postulación a movilidad internacional UNAM.",
      "Dictamen de convalidación académica firmado por tu facultad.",
      "Historial académico oficial con sello institucional.",
      "Carta de exposición de motivos académicos (máximo 500 palabras)."
    ],
    cronograma: [
      { fecha: "15 Sep 2026", evento: "Cierre de recepción de expedientes en tu universidad." },
      { fecha: "12 Oct 2026", evento: "Emisión de cartas de aceptación oficial por parte de la UNAM." },
      { fecha: "Noviembre 2026", evento: "Gestión de visa de estudiante y reserva de alojamiento." },
      { fecha: "Enero 2027", evento: "Jornada de bienvenida e inicio de clases presenciales en CU." }
    ],
    contacto: "movilidad@unam.mx | Dirección General de Cooperación Internacional"
  },

  "voluntariado-techo": {
    id: "voluntariado-techo",
    titulo: "Voluntariado TECHO",
    institucion: "Construcción comunitaria TECHO",
    categoria: "Voluntariado",
    categoriaClase: "etiqueta verde",
    destacada: false,
    modalidad: "Presencial",
    modalidadClase: "modalidad",
    lugar: "Santiago, Chile",
    fechaLimite: "10 Sep 2026",
    fechaLimiteISO: "20260910T235959Z",
    icono: "img/voluntariado.png",
    cupos: "80 voluntarios universitarios",
    area: "Social, Ingeniería y Desarrollo Comunitario",
    duracion: "Jornada intensiva + formación (40 horas)",
    descripcion: "Súmate a brigadas de jóvenes universitarios para construir viviendas de emergencia y proyectos de infraestructura comunitaria junto a familias en situación de vulnerabilidad, fomentando liderazgo social y trabajo colaborativo en terreno.",
    beneficios: [
      { icono: "📜", texto: "Certificado institucional oficial por 40 horas de voluntariado acreditado." },
      { icono: "🛠️", texto: "Talleres prácticos de seguridad, carpintería comunitaria y gestión de crisis." },
      { icono: "🚌", texto: "Transporte coordinado desde Santiago, alimentación completa y alojamiento." },
      { icono: "❤️", texto: "Experiencia transformadora de impacto social directo en comunidades." }
    ],
    requisitos: [
      "Ser mayor de 18 años a la fecha de inicio del voluntariado.",
      "Compromiso de asistencia a la inducción previa y al fin de semana de construcción.",
      "Disposición para trabajo físico al aire libre y dinámicas grupales.",
      "Contar con seguro de salud estudiantil o personal vigente."
    ],
    documentos: [
      "Ficha médica de voluntario con datos de contacto en caso de emergencia.",
      "Copia simple de cédula de identidad, DNI o pasaporte vigente.",
      "Carta de compromiso y protocolo de convivencia firmados."
    ],
    cronograma: [
      { fecha: "10 Sep 2026", evento: "Cierre de inscripciones de voluntarios." },
      { fecha: "13 Sep 2026", evento: "Taller obligatorio de inducción técnica y seguridad." },
      { fecha: "19 - 21 Sep 2026", evento: "Jornadas de construcción comunitaria en terreno." },
      { fecha: "26 Sep 2026", evento: "Encuentro de cierre, evaluación y entrega de certificados." }
    ],
    contacto: "voluntariado.chile@techo.org"
  },

  "curso-python": {
    id: "curso-python",
    titulo: "Data Science con Python",
    institucion: "Certificación MIT / MITx MicroMasters",
    categoria: "Curso",
    categoriaClase: "etiqueta morada",
    destacada: true,
    modalidad: "Virtual",
    modalidadClase: "modalidad morada",
    lugar: "En línea",
    fechaLimite: "05 Oct 2026",
    fechaLimiteISO: "20261005T235959Z",
    icono: "img/python.png",
    cupos: "250 becas con certificado verificado",
    area: "Ciencias de Datos y Computación",
    duracion: "8 semanas (6-8 horas por semana)",
    descripcion: "Programa intensivo de formación en línea que profundiza en manipulación avanzada de datos con Pandas y NumPy, análisis estadístico inferencial, visualización interactiva y algoritmos fundamentales de Machine Learning.",
    beneficios: [
      { icono: "🎓", texto: "Beca del 100% para la emisión del certificado oficial verificado por MITx." },
      { icono: "💻", texto: "Acceso ilimitado a laboratorios interactivos Jupyter Notebooks en la nube." },
      { icono: "📁", texto: "Desarrollo de 4 casos prácticos reales para tu portafolio en GitHub." },
      { icono: "💬", texto: "Tutorías y foros moderados por asistentes de cátedra del MIT." }
    ],
    requisitos: [
      "Conocimientos básicos de lógica de programación (variables, ciclos y funciones).",
      "Comprensión lectora de inglés técnico (el material incluye subtítulos en español).",
      "Disponibilidad de 6 a 8 horas semanales de estudio autónomo."
    ],
    documentos: [
      "Formulario de postulación a beca con carta de motivación (máx. 200 palabras).",
      "Constancia de estudios universitarios o carné universitario vigente.",
      "Enlace a perfil de LinkedIn o GitHub."
    ],
    cronograma: [
      { fecha: "05 Oct 2026", evento: "Cierre de solicitud de becas para certificado gratuito." },
      { fecha: "10 Oct 2026", evento: "Notificación de admitidos y entrega de códigos de acceso." },
      { fecha: "15 Oct 2026", evento: "Inicio del Módulo 1: Estructuras de datos y Pandas." },
      { fecha: "10 Dic 2026", evento: "Examen integrador final y emisión de certificados." }
    ],
    contacto: "support@mitxonline.mit.edu"
  },

  "hackathon-nasa": {
    id: "hackathon-nasa",
    titulo: "Hackathon NASA Space Apps",
    institucion: "NASA Space Apps Challenge (Sede Lima)",
    categoria: "Concurso",
    categoriaClase: "etiqueta amarilla",
    destacada: false,
    modalidad: "Híbrido",
    modalidadClase: "modalidad amarilla",
    lugar: "Lima, Perú",
    fechaLimite: "01 Oct 2026",
    fechaLimiteISO: "20261001T235959Z",
    icono: "img/nasa.png",
    cupos: "300 participantes (equipos de 2 a 6)",
    area: "Aeroespacial, Software, Ciencias y Diseño",
    duracion: "48 horas continuas (fin de semana)",
    descripcion: "La hackathon internacional más grande impulsada por la NASA. Durante 48 horas, equipos interdisciplinarios diseñan prototipos tecnológicos y soluciones innovadoras para problemas reales de la Tierra y la exploración espacial utilizando datos satelitales abiertos.",
    beneficios: [
      { icono: "🏆", texto: "Pase directo de los ganadores locales a la Evaluación Global de la NASA." },
      { icono: "💰", texto: "Premios e incentivos locales: $3,000 USD al 1er puesto y $1,500 USD al 2do puesto." },
      { icono: "🛰️", texto: "Mentoría en vivo con especialistas aeroespaciales, científicos y desarrolladores." },
      { icono: "🍕", texto: "Kit de bienvenida oficial (merchandising), alimentación e internet de alta velocidad." }
    ],
    requisitos: [
      "Inscripción en equipos de 2 a 6 integrantes (o individual con formación de equipo el día 1).",
      "Abierto a estudiantes de programación, ingeniería, ciencias, diseño, comunicación y afines.",
      "Integrar al menos una base de datos abierta o API oficial de la NASA en la solución."
    ],
    documentos: [
      "Registro oficial del equipo en la plataforma Space Apps.",
      "Repositorio público (GitHub/GitLab) con el código o prototipo desarrollado.",
      "Presentación ejecutiva en PDF y video pitch demostrativo de 30 segundos."
    ],
    cronograma: [
      { fecha: "01 Oct 2026", evento: "Cierre de inscripciones y confirmación de equipos." },
      { fecha: "03 Oct 2026 (09:00)", evento: "Inauguración oficial y apertura de desafíos técnicos." },
      { fecha: "04 Oct 2026 (23:59)", evento: "Cierre de entregas de proyectos y videos demostrativos." },
      { fecha: "09 Oct 2026", evento: "Sustentación ante el jurado y premiación de ganadores." }
    ],
    contacto: "lead.lima@spaceappschallenge.org"
  }
};
