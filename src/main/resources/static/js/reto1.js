// Referencias a elementos principales de la interfaz del reto
const output = document.getElementById("terminal-output");
const form = document.getElementById("terminal-form");
const input = document.getElementById("command-input");
const resultado = document.getElementById("resultado-reto");

// Estado interno del terminal para controlar el progreso del reto
const state = {
    boveActivado: false,
    accesoSistema: false,
    retoCompletado: false,
    scanEnCurso: false
};

/**
 * Escribe una línea en la terminal.
 * @param {string} text Texto a mostrar.
 * @param {string} cssClass Clase opcional para colorear la línea.
 */
function printLine(text, cssClass = "") {
    const line = document.createElement("div");
    line.className = `terminal-line ${cssClass}`.trim();
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

/**
 * Escribe varias líneas de golpe.
 * @param {string[]} lines Lista de líneas.
 * @param {string} cssClass Clase opcional.
 */
function printBlock(lines, cssClass = "") {
    lines.forEach(line => printLine(line, cssClass));
}

/**
 * Pausa la ejecución durante un número de milisegundos.
 * Se usa para simular procesos como el escaneo del sistema.
 * @param {number} ms Tiempo de espera en milisegundos.
 * @returns {Promise<void>}
 */
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Muestra mensaje de bienvenida.
 */
function bootTerminal() {
    printBlock([
        "Terminal inicializada.",
        "Escribe 'help' para ver comandos disponibles."
    ], "system");
}

/**
 * Muestra la ayuda general del sistema.
 */
function showGeneralHelp() {
    printBlock([
        "Comandos disponibles:",
        "",
        "help          → mostrar ayuda general",
        "status        → ver estado resumido del sistema",
        "scan          → analizar anomalías activas",
        "ls            → listar archivos del directorio actual",
        "cat           → leer contenido de un archivo",
        "repair        → intentar reparación del sistema",
        "bove          → gestionar módulo auxiliar BOVE",
        "protocol_gus  → intentar acceso al protocolo principal",
        "base64        → utilidades de decodificación",
        "make_me       → utilidades de entorno",
        "exit          → salir de la terminal",
        "reboot        → reiniciar sistema",
        "clear         → limpiar terminal",
        "",
        "Usa [comando] --help para ver más opciones."
    ], "system");
}

/**
 * Muestra el estado resumido actual del sistema.
 */
function showStatus() {
    const estadoBove = state.boveActivado ? "ACTIVO" : "INACTIVO";
    const estadoAcceso = state.accesoSistema ? "DESBLOQUEADO" : "BLOQUEADO";
    const estadoRepair = state.accesoSistema ? "COMPLETADA" : "PENDIENTE";

    printBlock([
        "Estado del sistema:",
        `- Núcleo: INESTABLE`,
        `- PROTOCOLO_GUS: ${estadoAcceso}`,
        `- Módulo BOVE: ${estadoBove}`,
        `- Reparación: ${estadoRepair}`
    ], "system");
}

/**
 * Ejecuta un escaneo del sistema con una pausa para simular análisis real.
 */
async function runScan() {
    if (state.scanEnCurso) {
        printLine("Ya hay un escaneo en curso. Espera unos segundos.", "error");
        return;
    }

    state.scanEnCurso = true;
    printLine("Analizando sistema...", "system");

    await wait(5000);

    if (!state.boveActivado) {
        printBlock([
            "",
            "Anomalía detectada en el núcleo.",
            "Módulos auxiliares: NO DISPONIBLES.",
            "Estabilidad del sistema: CRÍTICA.",
            "Recomendación: activar un sistema de apoyo."
        ], "system");
    } else {
        printBlock([
            "",
            "Anomalía detectada en el núcleo.",
            "Módulos auxiliares: BOVE ACTIVO.",
            "Estabilidad parcial recuperada.",
            "Recomendación: ejecutar reparación del sistema."
        ], "success");
    }

    state.scanEnCurso = false;
}

/**
 * Lista los archivos disponibles del directorio actual.
 */
function showFiles() {
    printBlock([
        "logs.txt",
        "bola_venus.txt",
        "unknown_fragment.enc"
    ], "system");
}

/**
 * Lee el contenido de un archivo conocido.
 * @param {string} fileName Nombre del archivo.
 */
function readFile(fileName) {
    switch (fileName.toLowerCase()) {
        case "logs.txt":
            printBlock([
                "[LOGS DEL SISTEMA]",
                "03:14 - Acceso irregular detectado en el núcleo.",
                "03:17 - PROTOCOLO_GUS marcado como restringido.",
                "03:21 - Módulos auxiliares desconectados.",
                "03:33 - Causa exacta aún no identificada."
            ], "system");
            break;

        case "bola_venus.txt":
            printBlock([
                "[REGISTRO AUXILIAR]",
                "BOLA  → estado: estable",
                "VENUS → estado: estable",
                "",
                "No se detecta comportamiento hostil.",
                "Ambos módulos parecen haber sido desconectados externamente.",
                "",
                "Conclusión:",
                "No son responsables de la anomalía."
            ], "success");
            break;

        case "unknown_fragment.enc":
            printBlock([
                "[FRAGMENTO CIFRADO]",
                "T3JpZ2VuIGRlIGxhIGFub21hbMOtYTogbm8gY29uZmlybWFkbw==",
                "UGF0csOzbiBkZXRlY3RhZG86IGNvbXBvcnRhbWllbnRvIGNhw7N0aWNv",
                "SW50ZW5jacOzbiBob3N0aWw6IG5vIGNvbmNsdXllbnRl"
            ], "system");
            break;

        default:
            printLine(`cat: no existe el archivo '${fileName}'`, "error");
            break;
    }
}

/**
 * Muestra la ayuda del comando BOVE.
 */
function showBoveHelp() {
    printBlock([
        "Uso: bove [opción]",
        "",
        "Opciones disponibles:",
        "--on      activar módulo BOVE",
        "--off     desactivar módulo BOVE",
        "--status  ver estado del módulo BOVE",
        "--help    mostrar esta ayuda"
    ], "system");
}

/**
 * Gestiona el módulo BOVE.
 * @param {string} option Opción indicada tras el comando bove.
 */
function handleBove(option) {
    switch (option) {
        case "--help":
            showBoveHelp();
            break;

        case "--status":
            printLine(`Estado del módulo BOVE: ${state.boveActivado ? "ACTIVO" : "INACTIVO"}`, "system");
            break;

        case "--on":
            if (state.boveActivado) {
                printLine("El protocolo BOVE ya estaba activo.", "system");
                return;
            }

            state.boveActivado = true;
            printBlock([
                "Inicializando protocolo BOVE...",
                "",
                "Combinando módulos:",
                "BOLA + VENUS",
                "",
                "Estado: ACTIVO",
                "Sistema estabilizado parcialmente."
            ], "success");
            break;

        case "--off":
            if (!state.boveActivado) {
                printLine("El protocolo BOVE ya estaba desactivado.", "system");
                return;
            }

            state.boveActivado = false;
            printBlock([
                "Desactivando protocolo BOVE...",
                "Estado: INACTIVO",
                "Advertencia: el sistema vuelve a estado crítico."
            ], "error");
            break;

        default:
            printLine("Uso incorrecto. Prueba con 'bove --help'.", "error");
            break;
    }
}

/**
 * Ejecuta la reparación del sistema.
 */
function runRepair() {
    if (!state.boveActivado) {
        printBlock([
            "Error: energía insuficiente.",
            "Error: módulos auxiliares no disponibles.",
            "Sugerencia: activa un sistema de apoyo antes de continuar."
        ], "error");
        return;
    }

    if (state.accesoSistema) {
        printLine("La reparación principal ya ha sido ejecutada.", "system");
        return;
    }

    state.accesoSistema = true;

    printBlock([
        "Reparando sistema...",
        "███▒▒▒▒▒▒▒▒▒▒ 30%",
        "██████▒▒▒▒▒▒ 60%",
        "██████████▒▒ 90%",
        "",
        "Sistema restaurado.",
        "Acceso al núcleo: CONCEDIDO"
    ], "success");
}

/**
 * Intenta acceder al protocolo principal.
 */
function accessProtocolGus() {
    if (!state.accesoSistema) {
        printBlock([
            "Acceso denegado.",
            "Se requiere reparación completa del sistema antes de continuar."
        ], "error");
        return;
    }

    if (state.retoCompletado) {
        printLine("El fragmento de clave ya fue recuperado.", "system");
        return;
    }

    printBlock([
        "Acceso concedido a PROTOCOLO_GUS.",
        "Verificando integridad del protocolo...",
        "Integridad parcial confirmada."
    ], "success");

    completeReto();
}

/**
 * Muestra ayuda del comando base64.
 */
function showBase64Help() {
    printBlock([
        "Uso: base64 [opción] [archivo]",
        "",
        "Opciones disponibles:",
        "--decode   decodificar archivo en base64",
        "--help     mostrar esta ayuda"
    ], "system");
}

/**
 * Gestiona el comando base64.
 * @param {string[]} parts Partes del comando.
 */
function handleBase64(parts) {
    if (parts.length === 1 || parts[1] === "--help") {
        showBase64Help();
        return;
    }

    if (parts[1] === "--decode") {
        if (parts.length < 3) {
            printLine("Falta indicar el archivo a decodificar.", "error");
            return;
        }

        const fileName = parts.slice(2).join(" ").trim().toLowerCase();

        if (fileName !== "unknown_fragment.enc") {
            printLine(`No se puede decodificar '${fileName}'.`, "error");
            return;
        }

        printBlock([
            "[FRAGMENTO PARCIAL]",
            "Origen de la anomalía: no confirmado",
            "Patrón detectado: comportamiento caótico",
            "Intención hostil: no concluyente"
        ], "system");

        return;
    }

    printLine("Uso incorrecto. Prueba con 'base64 --help'.", "error");
}

/**
 * Muestra ayuda del comando make_me.
 */
function showMakeMeHelp() {
    printBlock([
        "Uso: make_me [opción]",
        "",
        "Opciones disponibles:",
        "coffee    preparar café",
        "sandwich  preparar alimento de emergencia",
        "miracle   intentar solución imposible",
        "help      mostrar esta ayuda",
        "",
        "Nota: algunas acciones pueden requerir privilegios elevados."
    ], "system");
}

/**
 * Gestiona el comando make_me.
 * @param {string[]} parts Partes del comando.
 * @param {boolean} withSudo Indica si se usó sudo.
 */
function handleMakeMe(parts, withSudo = false) {
    if (parts.length === 1 || parts[1] === "--help" || parts[1] === "help") {
        showMakeMeHelp();
        return;
    }

    const action = parts[1].toLowerCase();

    if (!withSudo) {
        printLine("Error: privilegios insuficientes. Prueba con sudo.", "error");
        return;
    }

    switch (action) {
        case "coffee":
            printLine("Permiso denegado. Pero buena idea.", "system");
            break;

        case "sandwich":
            printLine("Recurso no encontrado: pan.ini", "system");
            break;

        case "miracle":
            printLine("Solicitud enviada. Resultado: ni root puede tanto.", "system");
            break;

        default:
            printLine("Acción no reconocida. Prueba con 'make_me --help'.", "error");
            break;
    }
}

/**
 * Marca el reto como completado, muestra la letra y guarda el progreso.
 */
function completeReto() {
    if (state.retoCompletado) {
        return;
    }

    state.retoCompletado = true;

    printBlock([
        "",
        "Fragmento de clave recuperado:",
        "[ G ]"
    ], "success");

    resultado.classList.remove("oculto");

    // Guarda el progreso usando la misma convención que la pantalla general de retos
    marcarRetoComoCompletado(1);

    // Guarda también la letra obtenida para usos futuros
    localStorage.setItem("protocolo_gus_reto_1_letra", "G");
}

/**
 * Procesa el comando introducido por el jugador.
 * @param {string} rawCommand Comando escrito en la terminal.
 */
async function handleCommand(rawCommand) {
    const command = rawCommand.trim();

    if (command === "") {
        return;
    }

    printLine(`root@gus30:~# ${command}`);

    const normalized = command.toLowerCase();
    const parts = normalized.split(/\s+/);

    if (normalized === "help") {
        showGeneralHelp();
        return;
    }

    if (normalized === "status") {
        showStatus();
        return;
    }

    if (normalized === "scan") {
        await runScan();
        return;
    }

    if (normalized === "ls") {
        showFiles();
        return;
    }

    if (normalized === "ls -a" || normalized === "ls --all") {
        printLine("Opción no soportada en esta terminal simplificada. Prueba con 'ls'.", "error");
        return;
    }

    if (parts[0] === "cat") {
        if (parts.length < 2) {
            printLine("Falta indicar el archivo a leer.", "error");
            return;
        }

        const fileName = command.substring(4).trim();
        readFile(fileName);
        return;
    }

    if (parts[0] === "bove") {
        if (parts.length === 1) {
            printLine("Uso incorrecto. Prueba con 'bove --help'.", "error");
            return;
        }

        handleBove(parts[1]);
        return;
    }

    if (normalized === "repair") {
        runRepair();
        return;
    }

    if (normalized === "protocol_gus") {
        accessProtocolGus();
        return;
    }

    if (parts[0] === "base64") {
        handleBase64(parts);
        return;
    }

    if (parts[0] === "make_me") {
        handleMakeMe(parts, false);
        return;
    }

    if (parts[0] === "sudo") {
        if (parts.length >= 2 && parts[1] === "make_me") {
            handleMakeMe(parts.slice(1), true);
            return;
        }

        printLine("sudo: acción no permitida en este entorno.", "error");
        return;
    }

    if (normalized === "reboot") {
        printLine("Permiso insuficiente para reinicio completo. Solo el núcleo caótico puede forzar un reboot.", "error");
        return;
    }

    if (normalized === "exit") {
        printLine("No puedes salir. Esto forma parte del protocolo.", "error");
        return;
    }

    if (normalized === "clear") {
        output.innerHTML = "";
        return;
    }

    printLine(`Comando no reconocido: ${command}`, "error");
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const command = input.value;
    await handleCommand(command);
    input.value = "";
});

bootTerminal();
input.focus();