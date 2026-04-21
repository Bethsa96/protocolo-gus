// Configuración central del contador.
// La fechaObjetivo es el momento exacto al que debe llegar la cuenta atrás.
const CONFIG = {
    fechaObjetivo: "2026-07-02T17:30:00"
};

const objetivo = new Date(CONFIG.fechaObjetivo);

// Radio del círculo SVG usado para calcular el perímetro del anillo.
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
let redireccionRealizada = false;

// Comprueba si la fecha es válida antes de arrancar el contador.
if (isNaN(objetivo.getTime())) {
    console.error("La fechaObjetivo no es válida:", CONFIG.fechaObjetivo);
}

/**
 * Actualiza visualmente el anillo de progreso de un círculo del contador.
 * @param {string} selector Selector CSS del círculo SVG.
 * @param {number} value Valor actual.
 * @param {number} max Valor máximo de referencia para calcular el porcentaje.
 */
function setProgress(selector, value, max) {
    const circle = document.querySelector(selector);
    if (!circle) return;

    const progress = Math.max(0, Math.min(value / max, 1));
    const offset = CIRCUMFERENCE * (1 - progress);

    circle.style.strokeDasharray = `${CIRCUMFERENCE}`;
    circle.style.strokeDashoffset = offset;
}

/**
 * Añade un cero a la izquierda para mostrar horas, minutos o segundos
 * con formato de dos dígitos.
 */
function pad(value) {
    return String(value).padStart(2, "0");
}

/**
 * Calcula el tiempo restante hasta la fecha objetivo y actualiza
 * tanto los números como los anillos del contador.
 */
function actualizarContador() {
    if (isNaN(objetivo.getTime())) {
        console.error("No se puede actualizar el contador porque la fecha objetivo es inválida.");
        return;
    }
    
    const ahora = new Date();
    const diferencia = objetivo - ahora;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (diferencia <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        setProgress(".days-ring", 0, 10);
        setProgress(".hours-ring", 0, 24);
        setProgress(".minutes-ring", 0, 60);
        setProgress(".seconds-ring", 0, 60);

        if (!redireccionRealizada) {
            redireccionRealizada = true;
            window.location.href = "/retos";
        }

        return;
        setProgress(".hours-ring", 0, 24);
        setProgress(".minutes-ring", 0, 60);
        setProgress(".seconds-ring", 0, 60);

        if (!redireccionRealizada) {
            redireccionRealizada = true;
            window.location.href = "/retos";
        }

        return;
    }

    const totalSegundos = Math.floor(diferencia / 1000);

    const dias = Math.floor(totalSegundos / (60 * 60 * 24));
    const horas = Math.floor((totalSegundos % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((totalSegundos % (60 * 60)) / 60);
    const segundos = totalSegundos % 60;

    daysEl.textContent = dias;
    hoursEl.textContent = pad(horas);
    minutesEl.textContent = pad(minutos);
    secondsEl.textContent = pad(segundos);

    // El anillo de días solo entra en "modo dramático" en la ventana final.
    const ventanaCriticaDias = 10;

    if (dias > ventanaCriticaDias) {
        setProgress(".days-ring", ventanaCriticaDias, ventanaCriticaDias);
    } else {
        setProgress(".days-ring", dias, ventanaCriticaDias);
    }
    setProgress(".hours-ring", horas, 24);
    setProgress(".minutes-ring", minutos, 60);
    setProgress(".seconds-ring", segundos, 60);
}

// Primera actualización inmediata y refresco cada segundo.
actualizarContador();
setInterval(actualizarContador, 1000);