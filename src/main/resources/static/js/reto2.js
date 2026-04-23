// Métodos del reto 2 con sus posibles versiones correctas completas
const metodos = [
    {
        numero: 1,
        titulo: "iniciarProtocolo",
        descripcion: "Corrige la línea defectuosa del método encargado de iniciar el protocolo ROOT.",
        codigoOriginal: `// Método usado para comprobar si el usuario ROOT puede iniciar el protocolo.
public void iniciarProtocolo(Usuario user) {
    if (user.isRoot = true) {
        activarSistema();
    }
}`,
        solucionesValidas: [
            `// Método usado para comprobar si el usuario ROOT puede iniciar el protocolo.
public void iniciarProtocolo(Usuario user) {
    if (user.isRoot == true) {
        activarSistema();
    }
}`,
            `// Método usado para comprobar si el usuario ROOT puede iniciar el protocolo.
public void iniciarProtocolo(Usuario user) {
    if (user.isRoot) {
        activarSistema();
    }
}`,
            `// Método usado para comprobar si el usuario ROOT puede iniciar el protocolo.
public void iniciarProtocolo(Usuario user) {
    if (true == user.isRoot) {
        activarSistema();
    }
}`
        ]
    },
    {
        numero: 2,
        titulo: "sistemaDisponible",
        descripcion: "Corrige la comparación del estado principal del sistema.",
        codigoOriginal: `// Método usado para validar el estado principal del sistema.
public boolean sistemaDisponible(String estado) {
    if (estado == "ACTIVO") {
        return true;
    }
    return false;
}`,
        solucionesValidas: [
            `// Método usado para validar el estado principal del sistema.
public boolean sistemaDisponible(String estado) {
    if ("ACTIVO".equals(estado)) {
        return true;
    }
    return false;
}`,
            `// Método usado para validar el estado principal del sistema.
public boolean sistemaDisponible(String estado) {
    if (estado != null && estado.equals("ACTIVO")) {
        return true;
    }
    return false;
}`,
            `// Método usado para validar el estado principal del sistema.
public boolean sistemaDisponible(String estado) {
    return "ACTIVO".equals(estado);
}`,
            `// Método usado para validar el estado principal del sistema.
public boolean sistemaDisponible(String estado) {
    return estado != null && estado.equals("ACTIVO");
}`,
            `// Método usado para validar el estado principal del sistema.
public boolean sistemaDisponible(String estado) {
    if (estado != null && "ACTIVO".equals(estado)) {
        return true;
    }
    return false;
}`
        ]
    },
    {
        numero: 3,
        titulo: "revisarModulos",
        descripcion: "Corrige el recorrido de la lista de módulos auxiliares.",
        codigoOriginal: `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    for (int i = 0; i <= modulos.size(); i++) {
        System.out.println(modulos.get(i));
    }
}`,
        solucionesValidas: [
            `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    for (int i = 0; i < modulos.size(); i++) {
        System.out.println(modulos.get(i));
    }
}`,
            `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    for (String modulo : modulos) {
        System.out.println(modulo);
    }
}`,
            `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    if (modulos != null) {
        for (int i = 0; i < modulos.size(); i++) {
            System.out.println(modulos.get(i));
        }
    }
}`,
            `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    if (modulos != null) {
        for (String modulo : modulos) {
            System.out.println(modulo);
        }
    }
}`,
            `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    if (modulos == null) {
        return;
    }
    for (int i = 0; i < modulos.size(); i++) {
        System.out.println(modulos.get(i));
    }
}`,
            `// Método usado para revisar los módulos auxiliares recuperados.
public void revisarModulos(List<String> modulos) {
    if (modulos == null) {
        return;
    }
    for (String modulo : modulos) {
        System.out.println(modulo);
    }
}`
        ]
    },
    {
        numero: 4,
        titulo: "moduloEmocionalActivo",
        descripcion: "Corrige la validación del módulo emocional para evitar un fallo por referencias nulas.",
        codigoOriginal: `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    if (sesion.getUsuario().isActivo()) {
        return true;
    }
    return false;
}`,
        solucionesValidas: [
            `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    if (sesion != null && sesion.getUsuario() != null && sesion.getUsuario().isActivo()) {
        return true;
    }
    return false;
}`,
            `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    return sesion != null && sesion.getUsuario() != null && sesion.getUsuario().isActivo();
}`,
            `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    if (sesion == null || sesion.getUsuario() == null) {
        return false;
    }
    return sesion.getUsuario().isActivo();
}`,
            `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    if (sesion == null) {
        return false;
    }
    if (sesion.getUsuario() == null) {
        return false;
    }
    return sesion.getUsuario().isActivo();
}`,
            `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    if (sesion != null && sesion.getUsuario() != null) {
        return sesion.getUsuario().isActivo();
    }
    return false;
}`,
            `// Método usado para confirmar si el módulo emocional sigue operativo.
public boolean moduloEmocionalActivo(Sesion sesion) {
    return sesion != null
        && sesion.getUsuario() != null
        && sesion.getUsuario().isActivo();
}`
        ]
    },
    {
        numero: 5,
        titulo: "evaluarRiesgo",
        descripcion: "Advertencia: este método contiene una anomalía lógica de prioridad.",
        codigoOriginal: `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad >= 18) {
        return "RIESGO MODERADO";
    } else if (edad >= 30) {
        return "RIESGO CRITICO";
    }
    return "RIESGO BAJO";
}`,
        solucionesValidas: [
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad >= 30) {
        return "RIESGO CRITICO";
    } else if (edad >= 18) {
        return "RIESGO MODERADO";
    }
    return "RIESGO BAJO";
}`,
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad >= 18 && edad < 30) {
        return "RIESGO MODERADO";
    } else if (edad >= 30) {
        return "RIESGO CRITICO";
    }
    return "RIESGO BAJO";
}`,
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad >= 30) {
        return "RIESGO CRITICO";
    }
    if (edad >= 18 && edad < 30) {
        return "RIESGO MODERADO";
    }
    return "RIESGO BAJO";
}`,
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad < 18) {
        return "RIESGO BAJO";
    } else if (edad >= 30) {
        return "RIESGO CRITICO";
    }
    return "RIESGO MODERADO";
}`,
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad < 18) {
        return "RIESGO BAJO";
    }
    if (edad >= 30) {
        return "RIESGO CRITICO";
    }
    return "RIESGO MODERADO";
}`,
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    if (edad >= 30) {
        return "RIESGO CRITICO";
    }
    return edad >= 18 ? "RIESGO MODERADO" : "RIESGO BAJO";
}`,
            `// Método usado para asignar el nivel de riesgo cuando se detecta proximidad al evento 30.
public String evaluarRiesgo(int edad) {
    return edad >= 30 ? "RIESGO CRITICO" : edad >= 18 ? "RIESGO MODERADO" : "RIESGO BAJO";
}`
        ]
    }
];

// Estado del progreso del reto
const state = {
    indiceActual: 0,
    retoCompletado: false
};

// Referencias a la interfaz
const metodoActualNumero = document.getElementById("metodo-actual-numero");
const metodoTitulo = document.getElementById("metodo-titulo");
const metodoDescripcion = document.getElementById("metodo-descripcion");
const bloqueCodigo = document.getElementById("bloque-codigo");
const editorCodigo = document.getElementById("editorCodigo");
const btnValidar = document.getElementById("btnValidar");
const feedback = document.getElementById("feedback");
const resultado = document.getElementById("resultado-reto");

/**
 * Normaliza el texto de un bloque de código para comparar soluciones
 * evitando diferencias menores de espacios o líneas en blanco.
 * @param {string} text Código a normalizar.
 * @returns {string}
 */
function normalizarCodigo(text) {
    return text
        .replace(/\r/g, "")
        .replace(/\s+\{/g, " {")
        .replace(/\(\s+/g, "(")
        .replace(/\s+\)/g, ")")
        .split("\n")
        .map(line => line.trim().replace(/\s+/g, " "))
        .filter(line => line.length > 0)
        .join("\n")
        .trim();
}

/**
 * Muestra el método actual en pantalla.
 */
function renderMetodo() {
    const metodo = metodos[state.indiceActual];

    metodoActualNumero.textContent = metodo.numero;
    metodoTitulo.textContent = metodo.titulo;
    metodoDescripcion.textContent = metodo.descripcion;
    bloqueCodigo.textContent = metodo.codigoOriginal;

    editorCodigo.value = metodo.codigoOriginal;
    ocultarFeedback();

    editorCodigo.focus();
}

/**
 * Muestra un mensaje de feedback al usuario.
 * @param {string} mensaje Texto del mensaje.
 * @param {string} tipo Clase visual: success o error.
 */
function mostrarFeedback(mensaje, tipo) {
    feedback.textContent = mensaje;
    feedback.className = `feedback ${tipo}`;
    feedback.classList.remove("oculto");
}

/**
 * Oculta el bloque de feedback.
 */
function ocultarFeedback() {
    feedback.className = "feedback oculto";
    feedback.textContent = "";
}

/**
 * Marca el reto como completado y guarda su estado.
 */
function completarReto() {
    if (state.retoCompletado) {
        return;
    }

    state.retoCompletado = true;
    resultado.classList.remove("oculto");

    marcarRetoComoCompletado(2);
    localStorage.setItem("protocolo_gus_reto_2_letra", "U");
}

/**
 * Valida el método actual comparando el código editado con las versiones válidas.
 */
function validarMetodoActual() {
    const metodo = metodos[state.indiceActual];
    const codigoEditado = normalizarCodigo(editorCodigo.value);
    const solucionesValidas = metodo.solucionesValidas.map(normalizarCodigo);

    if (!editorCodigo.value.trim()) {
        mostrarFeedback("Debes editar el método antes de aplicar la corrección.", "error");
        return;
    }

    const esValido = solucionesValidas.includes(codigoEditado);

    if (!esValido) {
        mostrarFeedback(
            "La anomalía ha sido localizada, pero la corrección aplicada no es válida. La lógica del método sigue siendo inestable.",
            "error"
        );
        return;
    }

    mostrarFeedback("Corrección aplicada. Método restaurado correctamente.", "success");

    setTimeout(() => {
        state.indiceActual++;

        if (state.indiceActual >= metodos.length) {
            completarReto();
            ocultarFeedback();
            return;
        }

        renderMetodo();
    }, 1100);
}

btnValidar.addEventListener("click", validarMetodoActual);

editorCodigo.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.ctrlKey) {
        validarMetodoActual();
    }
});

// Inicializa la interfaz con el primer método
renderMetodo();