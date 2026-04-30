const imagenEscena = document.getElementById("imagenEscena");
const textoEscena = document.getElementById("textoEscena");
const opcionesEscena = document.getElementById("opcionesEscena");
const escenaElemento = document.getElementById("escena");
const resultadoReto = document.getElementById("resultado-reto");
const beep = document.getElementById("beepTexto");

const RUTA_IMG = "/img/reto4/";

let indiceEscena = -1;
let escribiendo = false;

const fallosGenerales = [
    "[ERROR DE LÍNEA TEMPORAL]\n\nBeth nunca aparece en tu vida.\nEl sistema se vuelve funcional... pero aburrido.\n\nReiniciando simulación...",
    "[ERROR DE LÍNEA TEMPORAL]\n\nHas creado una realidad alternativa donde todo compila,\npero nadie es feliz.\n\nReiniciando simulación...",
    "[ERROR DE LÍNEA TEMPORAL]\n\nDecisión incorrecta.\nEl destino se ha ido a por café y no piensa volver.\n\nReiniciando simulación...",
    "[ERROR DE LÍNEA TEMPORAL]\n\nLa línea temporal ha perdido coherencia.\nSaltarina recomienda no hacer eso.\nLo cual es preocupante.\n\nReiniciando simulación..."
];

const escenas = [
    {
        imagen: "placeholder.png",
        texto: `[RECONSTRUCCIÓN TEMPORAL INICIADA]

La línea vital del sujeto ROOT presenta fragmentación.

Existen múltiples rutas posibles.
Solo una conduce al estado actual del sistema.

Tu misión:
reconstruir la secuencia correcta.

Advertencia:
una mala decisión puede provocar una vida aburrida, una relación inexistente o una línea temporal demasiado triste para compilar.`,
        opciones: [
            { texto: "Iniciar reconstrucción temporal", correcta: true }
        ]
    },
    {
        imagen: "01_melilla_canarias.png",
        texto: `El usuario vive felizmente con su familia en Melilla.

Tras varios años, su padre es trasladado a Gran Canaria. Con el tiempo compra una casa en Canarias y la madre y el hermano también se mudan.

El sujeto pasa un último verano en Melilla con sus abuelos:
amigos, carnet de conducir, fiestas, abuelos y vida buena.

Pero septiembre llega.

Y como diría Roxas...
las vacaciones de verano se están acabando.

¿Qué decide?`,
        opciones: [
            { texto: "A) Ir a Canarias y empezar una nueva etapa", correcta: true },
            { texto: "B) Seguir viviendo la vida eternamente", correcta: false, fallo: "Final alternativo: demasiada fiesta, cero progreso. La línea temporal se queda en modo verano infinito." },
            { texto: "C) Quedarse con los abuelos y pausar la misión", correcta: false, fallo: "Final alternativo: vida tranquila, pero Beth nunca aparece. Sistema emocional incompleto." },
            { texto: "D) Montar una pizzería antes de cumplir 20", correcta: false, fallo: "Final alternativo: su padre tenía razón. Pizzero confirmado antes de tiempo." }
        ]
    },
    {
        imagen: "02_teleco_ulpgc.png",
        texto: `El sujeto quería estudiar Informática.

Pero un problema de papeleo altera el destino.
La solicitud llega tarde y el sistema busca una ruta alternativa.

Aparece una opción compatible:
Telecomunicaciones en la ULPGC.

No era el plan original...
pero quizá el sistema sabe algo.`,
        opciones: [
            { texto: "A) Estudiar cualquier cosa elegida al azar", correcta: false, fallo: "El sistema detecta carrera aleatoria. Línea temporal sin sentido." },
            { texto: "B) Rendirse porque el papeleo ha ganado", correcta: false, fallo: "Final alternativo: el papeleo vence. Derrota administrativa total." },
            { texto: "C) Entrar en Teleco para luego convalidar y saltar a Informática", correcta: true },            
            { texto: "D) Demandar al sistema académico y huir", correcta: false, fallo: "ERROR: iniciar guerra contra la burocracia requiere demasiada energía." }
        ]
    },
    {
        imagen: "03_programacion_gafas.png",
        texto: `Primer año de Teleco.

Asignatura: Programación.

Una chica no tiene compañero para el trabajo.
Mira hacia la fila del fondo.

Entre todos los candidatos, decide aplicar un algoritmo de selección altamente científico.`,
        opciones: [
            { texto: "A) Huir del aula y fingir que programación no existe", correcta: false, fallo: "Programación siempre te encuentra. No puedes escapar." },
            { texto: "B) Elegir al que parece más gracioso", correcta: false, fallo: "Resultado: risas muchas, trabajo dudoso. Compilación fallida." },
            { texto: "C) Hacer el trabajo sola", correcta: false, fallo: "Beth sobrevive, pero la línea temporal romántica queda sin inicializar." },            
            { texto: "D) Elegir al chico con gafas porque parece estudioso", correcta: true }
        ]
    },
    {
        imagen: "04_debug_trabajo.png",
        texto: `Beth pregunta:

“¿Tienes compañero?”

El sujeto responde que no.

Se forma el primer equipo.

El trabajo trata sobre debug.
El sistema registra un evento curioso:
dos personas depurando código...
sin saber que también estaban iniciando otra cosa.`,
        opciones: [
            { texto: "A) Hacer juntos el trabajo de debug", correcta: true },
            { texto: "B) Decir “mejor lo hago con otro”", correcta: false, fallo: "Final alternativo: oportunidad perdida. El sistema llora en Java." },
            { texto: "C) No presentarse al trabajo", correcta: false, fallo: "ERROR académico: trabajo no entregado. Relación no compilada." },
            { texto: "D) Romper el debugger por mirar demasiado fuerte", correcta: false, fallo: "El debugger se ofende. Proceso terminado." }
        ]
    },
    {
        imagen: "05_amistad.png",
        texto: `Pasan los años.

Hay clases, cambios de carrera, amistades, bromas, conversaciones y muchas pequeñas decisiones.

La relación no avanza rápido.
Pero el sistema acumula datos.

Estado:
amistad estable.
posibilidad futura: alta.`,
        opciones: [
            { texto: "A) Forzar la relación demasiado pronto", correcta: false, fallo: "Relación ejecutada antes de tiempo. Error de sincronización emocional." },
            { texto: "B) Mantener la amistad hasta que el sistema esté preparado", correcta: true },            
            { texto: "C) Desaparecer misteriosamente", correcta: false, fallo: "Usuario no encontrado. Beth continúa la vida sin esta ruta." },
            { texto: "D) Bloquear toda emoción porque “eso consume RAM”", correcta: false, fallo: "RAM liberada. Vida vacía." }
        ]
    },
    {
        imagen: "06_parking.png",
        texto: `Evento crítico detectado.

Ubicación:
parking de casa de Beth.

Después de años de amistad, el sujeto debe tomar una decisión.`,
        opciones: [
            { texto: "A) Consultarlo primero con Stack Overflow", correcta: false, fallo: "Pregunta cerrada por ser demasiado específica." },
            { texto: "B) Esperar otros diez años por seguridad", correcta: false, fallo: "Final alternativo: friendzone extendida. Caducidad emocional alcanzada." },
            { texto: "C) Mandar un WhatsApp ambiguo", correcta: false, fallo: "Mensaje leído. Interpretación incierta. Sistema bloqueado." },            
            { texto: "D) Pedirle salir en el parking", correcta: true }
        ]
    },
    {
        imagen: "07_estadio_insular.png",
        texto: `Primera cita como novios.

Destino:
Estadio Insular de Las Palmas.

El sujeto pronuncia una frase romántica:

“Solo tengo ojos para ti.”`,
        opciones: [
            { texto: "A) Beth responde: “¿Ojos u ojo?”", correcta: true },
            { texto: "B) Beth llora de emoción sin hacer ninguna broma", correcta: false, fallo: "ERROR: romanticismo excesivo no compatible con Beth versión real." },
            { texto: "C) Ambos se quedan en silencio dramático", correcta: false, fallo: "Silencio incómodo detectado. Reiniciando cita." },
            { texto: "D) Aparece un narrador diciendo “demasiado romántico para este sistema”", correcta: false, fallo: "Narrador expulsado por cursi." }
        ]
    },
    {
        imagen: "08_cuarentena.png",
        texto: `Llega la cuarentena.

El mundo se detiene.
Pero el sistema doméstico sigue generando eventos.

Se registran:
lentejas duras,
un aniversario en casa,
100 Gustavitos,
juegos cooperativos,
y un incidente con tijeras de podar usadas como hacha.`,
        opciones: [
            { texto: "A) No celebrar nada porque no se puede salir", correcta: false, fallo: "Final alternativo: aniversario triste. Sistema gastronómico decepcionado." },
            { texto: "B) Sobrevivir con humor, juegos y 100 Gustavitos", correcta: true },
            { texto: "C) Volver a cocinar lentejas como material de construcción", correcta: false, fallo: "Las lentejas han adquirido dureza estructural. Posible uso en obra pública." },
            { texto: "D) Taladrar árboles con más fuerza todavía", correcta: false, fallo: "La pierna presenta una queja formal." }
        ]
    },
    {
        imagen: "09_saltarina.png",
        texto: `30 de diciembre.

Aparece una entidad caprina pequeña.

Nombre:
Saltarina.

Al principio parece solo ternura y caos.
Pero el sistema registra un evento crítico:
Saltarina enferma gravemente.

Guardias nocturnas.
Biberón.
Salón convertido en unidad de cuidados caprinos.
Andador con ruedas y madera.
Ejercicios.
Paciencia.
Miedo.
Esperanza.`,
        opciones: [
            { texto: "A) Rendir el sistema por cansancio", correcta: false, fallo: "El sistema detecta abandono. Reinicio obligatorio." },            
            { texto: "B) Ignorar la anomalía caprina", correcta: false, fallo: "ERROR moral crítico. Esta línea temporal queda eliminada." },
            { texto: "C) Cuidarla día y noche hasta que vuelva a caminar", correcta: true },
            { texto: "D) Instalarle Linux para que se arregle sola", correcta: false, fallo: "Saltarina rechaza Linux. Prefiere caos nativo." }
        ]
    },
    {
        imagen: "10_boda_cumple.png",
        texto: `La línea temporal avanza.

Jinámar.
Trabajo.
DESIC.
Fotos robadas de Beth durmiendo.
Cine BOVE.
BOVE Burguer Club.
LOTR versión extendida.
Boda el 13 de diciembre de 2025.

Y ahora...

Gus está a punto de cumplir 30.

Beth ha preparado un protocolo especial.`,
        opciones: [
            { texto: "A) Intentar descubrir todo en el código fuente", correcta: false, fallo: "Acceso denegado. Beth ya pensó en eso. Probablemente." },
            { texto: "B) Buscarle la lógica a todo y romper la magia", correcta: false, fallo: "ERROR: exceso de análisis. La ilusión pierde 40 puntos de vida." },
            { texto: "C) Pasar del tema completamente", correcta: false, fallo: "Final alternativo: Beth activa modo mirada asesina." },            
            { texto: "D) Disfrutar el regalo, seguir las pistas y llegar al día del cumpleaños", correcta: true }
        ]
    },
    {
        imagen: "final_timeline.png",
        texto: `[RECONSTRUCCIÓN COMPLETADA]

Has recreado correctamente la línea temporal.

Eventos clave verificados:
→ Melilla
→ Canarias
→ Teleco
→ Debug
→ Amistad
→ Parking
→ Cuarentena
→ Saltarina
→ Boda
→ GUS_30

Resultado:
la línea temporal es estable.

Interferencia detectada...

[ANOMALÍA CAPRINA DETECTADA]

...

No todo lo que hice fue romper cosas.

A veces...
solo quería comprobar si esta historia aguantaba un poco de caos.

— Saltarina`,
        opciones: [
            { texto: "Recuperar fragmento de clave", correcta: true, final: true }
        ]
    }
];

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function obtenerFalloGeneral() {
    return fallosGenerales[Math.floor(Math.random() * fallosGenerales.length)];
}

async function escribirTexto(texto) {
    escribiendo = true;
    textoEscena.textContent = "";

    for (let i = 0; i < texto.length; i++) {
        textoEscena.textContent += texto[i];

        // Sonido cada 2 letras (para que no sea molesto)
        if (i % 2 === 0 && beep) {
            beep.currentTime = 0;
            beep.play().catch(() => {
            });
        }

        await esperar(18);
    }

    escribiendo = false;
}

function bloquearOpciones(bloquear) {
    document.querySelectorAll(".opcion-btn").forEach(btn => {
        btn.disabled = bloquear;
    });
}

function pintarOpciones(opciones) {
    opcionesEscena.innerHTML = "";

    opciones.forEach(opcion => {
        const btn = document.createElement("button");
        btn.className = "opcion-btn";
        btn.type = "button";
        btn.textContent = opcion.texto;

        btn.addEventListener("click", () => manejarOpcion(opcion));

        opcionesEscena.appendChild(btn);
    });
}

async function mostrarEscena(indice) {
    indiceEscena = indice;
    const escena = escenas[indiceEscena];

    escenaElemento.classList.add("fade-out");
    await esperar(450);

    imagenEscena.src = RUTA_IMG + escena.imagen;
    opcionesEscena.innerHTML = "";
    escenaElemento.classList.remove("fade-out");

    await escribirTexto(escena.texto);
    pintarOpciones(escena.opciones);
}

async function manejarOpcion(opcion) {
    if (escribiendo) {
        return;
    }

    bloquearOpciones(true);

    if (opcion.final) {
        completarReto4();
        return;
    }

    if (opcion.correcta) {
        await esperar(350);
        await mostrarEscena(indiceEscena + 1);
        return;
    }

    await mostrarFallo(opcion.fallo);
}

async function mostrarFallo(mensajeFallo) {
    escenaElemento.classList.add("fade-out");
    await esperar(450);

    imagenEscena.src = RUTA_IMG + "error_timeline.png";
    opcionesEscena.innerHTML = "";
    escenaElemento.classList.remove("fade-out");

    const textoFallo = `${mensajeFallo}

${obtenerFalloGeneral()}`;

    await escribirTexto(textoFallo);

    await esperar(1800);
    await mostrarEscena(0);
}

function completarReto4() {
    resultadoReto.classList.remove("oculto");

    marcarRetoComoCompletado(4);
    localStorage.setItem("protocolo_gus_reto_4_letra", "R");
}

mostrarEscena(0);