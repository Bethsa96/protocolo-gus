// Guarda la última visita del usuario en localStorage.
const claveVisita = "protocolo_gus_ultima_visita";
localStorage.setItem(claveVisita, new Date().toISOString());

// Mensajes rotatorios del bloque de sincronización de la pantalla inicial.
const mensajesSync = [
    "Sincronizando módulos...",
    "Verificando integridad del sistema...",
    "Esperando ventana de activación...",
    "Preparando protocolo de acceso..."
];

let indiceSync = 0;
const syncText = document.getElementById("syncText");

// Cambia el texto de sincronización cada pocos segundos
// para dar sensación de sistema activo.
if (syncText) {
    setInterval(() => {
        indiceSync = (indiceSync + 1) % mensajesSync.length;
        syncText.textContent = mensajesSync[indiceSync];
    }, 2600);
}

/**
 * Devuelve la clave usada en localStorage para guardar el estado
 * de completado de un reto concreto.
 */
function obtenerClaveRetoCompletado(retoId) {
    return `protocolo_gus_reto_${retoId}_completado`;
}

/**
 * Indica si un reto está marcado como completado en localStorage.
 */
function estaRetoCompletado(retoId) {
    return localStorage.getItem(obtenerClaveRetoCompletado(retoId)) === "true";
}

/**
 * Marca un reto como completado en localStorage.
 */
function marcarRetoComoCompletado(retoId) {
    localStorage.setItem(obtenerClaveRetoCompletado(retoId), "true");
}

/**
 * Elimina la marca de completado de un reto.
 * Útil para pruebas o para reiniciar un módulo concreto.
 */
function desmarcarRetoComoCompletado(retoId) {
    localStorage.removeItem(obtenerClaveRetoCompletado(retoId));
}

/**
 * Recorre las tarjetas de la pantalla de retos y actualiza su aspecto
 * si el reto correspondiente ya está completado.
 */
function aplicarEstadoCompletadoEnTarjetas() {
    const tarjetas = document.querySelectorAll(".reto-card");

    tarjetas.forEach((tarjeta) => {
        const retoId = tarjeta.dataset.retoId;
        if (!retoId) return;

        const completado = estaRetoCompletado(retoId);
        if (!completado) return;

        tarjeta.classList.remove("reto-disponible", "reto-bloqueado");
        tarjeta.classList.add("reto-completado");

        const estado = tarjeta.querySelector(".reto-estado");
        if (estado) {
            estado.textContent = "COMPLETADO";
        }

        const boton = tarjeta.querySelector(".boton-reto");
        if (boton) {
            boton.textContent = "Revisar";
            boton.classList.remove("boton-deshabilitado");
            boton.removeAttribute("aria-disabled");
            boton.removeAttribute("tabindex");
        }
    });
}

/**
 * Marca el reto actual como completado desde la pantalla de detalle
 * y redirige de nuevo a la lista de módulos.
 */
function marcarComoCompletadoDesdeDetalle(boton) {
    const retoId = boton.dataset.retoId;
    if (!retoId) return;

    marcarRetoComoCompletado(retoId);
    window.location.href = "/retos";
}

/**
 * Actualiza la mini cuenta atrás del próximo desbloqueo en la pantalla de retos.
 */
function iniciarContadorProximoDesbloqueo() {
    const elemento = document.getElementById("proximo-desbloqueo-countdown");
    if (!elemento) return;

    const fechaTexto = elemento.dataset.fecha;
    if (!fechaTexto) return;

    const fechaObjetivo = new Date(fechaTexto);

    if (isNaN(fechaObjetivo.getTime())) {
        elemento.textContent = "Fecha no válida";
        return;
    }

    function actualizar() {
        const ahora = new Date();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia <= 0) {
            elemento.textContent = "Disponible ahora";
            return;
        }

        const totalSegundos = Math.floor(diferencia / 1000);
        const horas = Math.floor(totalSegundos / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        elemento.textContent = `${horas}h ${String(minutos).padStart(2, "0")}m ${String(segundos).padStart(2, "0")}s`;
    }

    actualizar();
    setInterval(actualizar, 1000);
}

// Aplica solo las funciones necesarias según la pantalla cargada.
document.addEventListener("DOMContentLoaded", () => {
    aplicarEstadoCompletadoEnTarjetas();
    iniciarContadorProximoDesbloqueo();
});