const sqlQuery = document.getElementById("sqlQuery");
const btnEjecutarQuery = document.getElementById("btnEjecutarQuery");
const sqlFeedback = document.getElementById("sqlFeedback");

const resultadoVacio = document.getElementById("resultadoVacio");
const tablaResultadosWrapper = document.getElementById("tablaResultadosWrapper");
const tablaResultadosHead = document.getElementById("tablaResultadosHead");
const tablaResultadosBody = document.getElementById("tablaResultadosBody");

const btnEmitirConclusion = document.getElementById("btnEmitirConclusion");
const modalConclusion = document.getElementById("modalConclusion");
const culpableIdInput = document.getElementById("culpableIdInput");
const btnConfirmarConclusion = document.getElementById("btnConfirmarConclusion");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const modalFeedback = document.getElementById("modalFeedback");

const resultadoReto = document.getElementById("resultado-reto");

const ID_CULPABLE_CORRECTO = 1;

/**
 * Muestra feedback en pantalla.
 * @param {HTMLElement} elemento Elemento de feedback.
 * @param {string} mensaje Mensaje a mostrar.
 * @param {string} tipo success o error.
 */
function mostrarFeedback(elemento, mensaje, tipo) {
    elemento.textContent = mensaje;
    elemento.className = `feedback ${tipo}`;
    elemento.classList.remove("oculto");
}

/**
 * Oculta feedback.
 * @param {HTMLElement} elemento Elemento a ocultar.
 */
function ocultarFeedback(elemento) {
    elemento.textContent = "";
    elemento.className = "feedback oculto";
}

/**
 * Limpia la tabla de resultados.
 */
function limpiarResultados() {
    tablaResultadosHead.innerHTML = "";
    tablaResultadosBody.innerHTML = "";
}

/**
 * Pinta el resultado de una consulta SQL en forma de tabla.
 * @param {Array<Object>} rows Filas devueltas por la API.
 */
function renderizarResultados(rows) {
    limpiarResultados();

    if (!rows || rows.length === 0) {
        resultadoVacio.textContent = "La consulta no devolvió resultados.";
        resultadoVacio.classList.remove("oculto");
        tablaResultadosWrapper.classList.add("oculto");
        return;
    }

    const columnas = Object.keys(rows[0]);

    const trHead = document.createElement("tr");
    columnas.forEach(columna => {
        const th = document.createElement("th");
        th.textContent = columna;
        trHead.appendChild(th);
    });
    tablaResultadosHead.appendChild(trHead);

    rows.forEach(row => {
        const tr = document.createElement("tr");

        columnas.forEach(columna => {
            const td = document.createElement("td");
            const valor = row[columna];
            td.textContent = valor === null ? "null" : valor;
            tr.appendChild(td);
        });

        tablaResultadosBody.appendChild(tr);
    });

    resultadoVacio.classList.add("oculto");
    tablaResultadosWrapper.classList.remove("oculto");
}

/**
 * Ejecuta la consulta escrita por el usuario.
 */
async function ejecutarConsulta() {
    const query = sqlQuery.value.trim();

    ocultarFeedback(sqlFeedback);

    if (!query) {
        mostrarFeedback(sqlFeedback, "Debes escribir una consulta SQL antes de ejecutarla.", "error");
        return;
    }

    try {
        const response = await fetch("/api/reto3/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (!data.ok) {
            mostrarFeedback(sqlFeedback, data.error || "No se pudo ejecutar la consulta.", "error");
            return;
        }

        renderizarResultados(data.rows);
        mostrarFeedback(sqlFeedback, "Consulta ejecutada correctamente.", "success");
    } catch (error) {
        mostrarFeedback(sqlFeedback, "Se produjo un error al conectar con el sistema de consultas.", "error");
    }
}

/**
 * Abre el modal para emitir la conclusión.
 */
function abrirModalConclusion() {
    culpableIdInput.value = "";
    ocultarFeedback(modalFeedback);
    modalConclusion.classList.remove("oculto");
    culpableIdInput.focus();
}

/**
 * Cierra el modal.
 */
function cerrarModalConclusion() {
    modalConclusion.classList.add("oculto");
}

/**
 * Marca el reto como completado.
 */
function completarReto3() {
    resultadoReto.classList.remove("oculto");
    marcarRetoComoCompletado(3);
    localStorage.setItem("protocolo_gus_reto_3_letra", "S");
    localStorage.setItem("reto3Culpable", "SALTARINA");
}

/**
 * Valida la conclusión introducida por el jugador.
 */
function confirmarConclusion() {
    const valor = culpableIdInput.value.trim();

    ocultarFeedback(modalFeedback);

    if (!valor) {
        mostrarFeedback(modalFeedback, "Debes introducir un ID antes de confirmar la conclusión.", "error");
        return;
    }

    const id = Number(valor);

    if (id === ID_CULPABLE_CORRECTO) {
        cerrarModalConclusion();
        completarReto3();
        return;
    }

    mostrarFeedback(
        modalFeedback,
        `ERROR DE JUICIO

Has señalado a una entidad sin pruebas suficientes.
Recordatorio legal:
encarcelar inocentes sigue estando mal visto, incluso en sistemas comprometidos.`,
        "error"
    );
}

btnEjecutarQuery.addEventListener("click", ejecutarConsulta);
btnEmitirConclusion.addEventListener("click", abrirModalConclusion);
btnCerrarModal.addEventListener("click", cerrarModalConclusion);
btnConfirmarConclusion.addEventListener("click", confirmarConclusion);

sqlQuery.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.ctrlKey) {
        ejecutarConsulta();
    }
});

culpableIdInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        confirmarConclusion();
    }
});

modalConclusion.addEventListener("click", function (event) {
    if (event.target === modalConclusion) {
        cerrarModalConclusion();
    }
});