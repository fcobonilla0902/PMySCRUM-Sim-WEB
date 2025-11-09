import { Project } from './Project.js';
import { getScenarioData } from './Scenarios.js';

// --- OBJETOS DEL JUEGO ---
let proyectoActual;
let decisionesDelEscenario;
let metodologiaActual;

// --- REFERENCIAS AL DASHBOARD ---
const barraTiempo = document.getElementById('bar-tiempo');
const valorTiempo = document.getElementById('value-tiempo');
const barraPresupuesto = document.getElementById('bar-presupuesto');
const valorPresupuesto = document.getElementById('value-presupuesto');
const barraCalidad = document.getElementById('bar-calidad');
const valorCalidad = document.getElementById('value-calidad');
const barraMotivacion = document.getElementById('bar-motivacion');
const valorMotivacion = document.getElementById('value-motivacion');
const taskCountEl = document.getElementById('task-count');
const dayCountEl = document.getElementById('day-count');
const scenarioTitleEl = document.getElementById('scenario-title');
const mainContinueButton = document.getElementById('mainContinueButton');

// --- REFERENCIAS AL MODAL DE DECISIÓN ---
const modal = document.getElementById('decision-modal');
const modalTitle = document.getElementById('modal-title');
const modalScenario = document.getElementById('modal-scenario');
const modalOptionsContainer = document.getElementById('modal-options-container');
const modalConsequenceText = document.getElementById('modal-consequence-text');
const modalContinueButton = document.getElementById('modal-continue-button');

// --- FUNCIONES PRINCIPALES DEL JUEGO ---

function updateDashboard() {
    const p = proyectoActual;
    
    valorTiempo.textContent = `${p.getTiempo()}%`;
    barraTiempo.style.width = `${p.getTiempo()}%`;
    barraTiempo.style.backgroundColor = (p.getTiempo() < 30) ? '#E74C3C' : '#4CAF50';

    valorPresupuesto.textContent = `${p.getCosto()}%`;
    barraPresupuesto.style.width = `${p.getCosto()}%`;
    barraPresupuesto.style.backgroundColor = (p.getCosto() < 30) ? '#E74C3C' : '#4CAF50';
    
    valorCalidad.textContent = `${p.getCalidad()}%`;
    barraCalidad.style.width = `${p.getCalidad()}%`;
    barraCalidad.style.backgroundColor = (p.getCalidad() < 30) ? '#E74C3C' : '#4CAF50';
    
    valorMotivacion.textContent = `${p.getMotivacion()}%`;
    barraMotivacion.style.width = `${p.getMotivacion()}%`;
    barraMotivacion.style.backgroundColor = (p.getMotivacion() < 30) ? '#E74C3C' : '#4CAF50';

    taskCountEl.textContent = `${p.getTareasRestantes()}`;
    dayCountEl.textContent = `${p.getCurrentDay()} / ${p.getTotalDays()}`;
    

    scenarioTitleEl.textContent = `SIMULACIÓN PMBOK: FASE ${p.getCurrentDay()}`;
}

function showDecision(decision) {
    modalTitle.textContent = decision.getTitle();
    modalScenario.textContent = decision.getScenarioDescription();
    
    modalOptionsContainer.innerHTML = "";
    modalConsequenceText.textContent = "";
    modalContinueButton.classList.add('hidden');

    for (const option of decision.getOptions()) {
        const botonOpcion = document.createElement('button');
        botonOpcion.textContent = option.getOptionText();
        botonOpcion.className = 'option-button';
        
        botonOpcion.addEventListener('click', () => {
            handleOptionClick(option);
        });
        
        modalOptionsContainer.appendChild(botonOpcion);
    }
    
    modal.classList.remove('hidden');
}

function handleOptionClick(option) {
    // Aplicar la decisión (SIEMPRE completa 1 tarea)
    option.aplicar(proyectoActual); 
    
    // Mostrar consecuencia
    modalConsequenceText.textContent = option.getConsequenceText();
    
    modalOptionsContainer.innerHTML = "";
    modalContinueButton.classList.remove('hidden');
}

function onMainContinueClick() {
    const dayIndex = proyectoActual.getCurrentDay() - 1;
    
    if (dayIndex >= decisionesDelEscenario.length || proyectoActual.getTareasRestantes() <= 0) {
        endGame();
        return;
    }
    
    showDecision(decisionesDelEscenario[dayIndex]);
}

function onModalContinueClick() {
    // Avanzar el día y completar 1 tarea (esto ya se hizo en la decisión)
    proyectoActual.avanzarDia();
    
    updateDashboard();
    modal.classList.add('hidden');

    // CONDICIONES CORREGIDAS para terminar el juego
    // Si CUALQUIER métrica llega a 0, el juego termina en fracaso
    if (proyectoActual.getCurrentDay() > proyectoActual.getTotalDays() || 
        proyectoActual.isFailed() || 
        proyectoActual.getTareasRestantes() <= 0 ||
        proyectoActual.getTiempo() <= 15 ||
        proyectoActual.getCosto() <= 15 ||
        proyectoActual.getCalidad() <= 15 ||
        proyectoActual.getMotivacion() <= 15) {
        endGame();
    }
}


function endGame() {
    mainContinueButton.disabled = true;
    mainContinueButton.textContent = "SIMULACIÓN TERMINADA";
    
    modalTitle.textContent = "Simulación Finalizada";
    modalOptionsContainer.innerHTML = "";
    modalContinueButton.classList.add('hidden');

    const tareasRestantes = proyectoActual.getTareasRestantes();
    const tareasCompletadas = proyectoActual.getTotalTareas() - tareasRestantes;
    
    // Obtener los valores actuales de todas las métricas
    const tiempo = proyectoActual.getTiempo();
    const costos = proyectoActual.getCosto();
    const calidad = proyectoActual.getCalidad();
    const motivacion = proyectoActual.getMotivacion();
    
    // Determinar el estado general del proyecto - CORREGIDO
    let resultadoFinal = 0; // 0 = fracasó, 1 = funcionó
    let mensajeResultado = "";

    // VERIFICAR SI ALGUNA MÉTRICA LLEGÓ A 0 (condición de fracaso inmediato)
    if (tiempo <= 0 || costos <= 0 || calidad <= 0 || motivacion <= 0) {
        // Determinar cuál métrica falló para el mensaje específico
        let metricasFalladas = [];
        if (tiempo <= 0) metricasFalladas.push("Tiempo");
        if (costos <= 0) metricasFalladas.push("Costos");
        if (calidad <= 0) metricasFalladas.push("Calidad");
        if (motivacion <= 0) metricasFalladas.push("Motivación");
        
        mensajeResultado = `El proyecto ha fracasado. Las siguientes métricas llegaron a 0: ${metricasFalladas.join(", ")}.`;
        resultadoFinal = 0;
    }
    // LUEGO verificar si el proyecto falló por otras razones
    else if (proyectoActual.isFailed()) {
        mensajeResultado = "El proyecto ha fracasado. No has cumplido con los objetivos.";
        resultadoFinal = 0;
    }
    // LUEGO verificar si quedaron tareas pendientes al acabarse los días
    else if (tareasRestantes > 0 && proyectoActual.getCurrentDay() > proyectoActual.getTotalDays()) {
        mensajeResultado = "Se acabó el tiempo pero quedaron tareas pendientes.";
        resultadoFinal = 0;
    }
    // FINALMENTE, solo si se completaron todas las tareas Y las métricas son aceptables
    else if (tareasRestantes <= 0) {
        mensajeResultado = "¡Felicidades! Completaste todas las tareas exitosamente.";
        resultadoFinal = 1;
    }
    // Caso por defecto (no debería ocurrir)
    else {
        mensajeResultado = "El proyecto no pudo ser evaluado correctamente.";
        resultadoFinal = 0;
    }

    // GUARDAR RESULTADOS EN LA BASE DE DATOS
    guardarResultadosEnBD(resultadoFinal);

    // Resto del código existente...
    modalScenario.textContent = mensajeResultado;
    
    // Función para obtener retroalimentación específica por área
    function getFeedback(area, valor, nombre) {
        if (valor <= 0) return `<i class="bi bi-slash-circle-fill" style="color: #2C3E50;"></i> <strong>${nombre}:</strong> ${valor}% - CRÍTICO (Llegó a 0)`;
        if (valor >= 80) return `<i class="bi bi-check-circle-fill" style="color: #27AE60;"></i> <strong>${nombre}:</strong> ${valor}% - Excelente desempeño`;
        if (valor >= 60) return `<i class="bi bi-exclamation-triangle-fill" style="color: #F39C12;"></i> <strong>${nombre}:</strong> ${valor}% - Buen trabajo, pero hay margen de mejora`;
        if (valor >= 40) return `<i class="bi bi-exclamation-circle-fill" style="color: #E67E22;"></i> <strong>${nombre}:</strong> ${valor}% - Necesita atención, riesgo moderado`;
        if (valor >= 20) return `<i class="bi bi-x-circle-fill" style="color: #E74C3C;"></i> <strong>${nombre}:</strong> ${valor}% - Situación crítica, requiere acción inmediata`;
        return `<i class="bi bi-x-circle-fill" style="color: #E74C3C;"></i> <strong>${nombre}:</strong> ${valor}% - Estado catastrófico`;
    }

    // Función para obtener recomendaciones específicas
    function getRecommendations() {
        const recomendaciones = [];
        const tiempo = proyectoActual.getTiempo();
        const costo = proyectoActual.getCosto();
        const calidad = proyectoActual.getCalidad();
        const motivacion = proyectoActual.getMotivacion();
        
        if (tiempo <= 0) {
            recomendaciones.push("<strong>Tiempo:</strong> El tiempo se agotó completamente. Necesitas mejor planificación y priorización.");
        } else if (tiempo < 60) {
            recomendaciones.push("<strong>Gestión del Tiempo:</strong> Considera mejor planificación y priorización de tareas");
        }
        
        if (costo <= 0) {
            recomendaciones.push("<strong>Costos:</strong> Los recursos financieros se agotaron. Controla mejor el presupuesto.");
        } else if (costo < 60) {
            recomendaciones.push("<strong>Control de Costos:</strong> Revisa gastos y optimiza recursos disponibles");
        }
        
        if (calidad <= 0) {
            recomendaciones.push("<strong>Calidad:</strong> La calidad del producto es inaceptable. Invierte en testing y revisiones.");
        } else if (calidad < 60) {
            recomendaciones.push("<strong>Calidad:</strong> Invierte más en testing y revisiones de código");
        }
        
        if (motivacion <= 0) {
            recomendaciones.push("<strong>Motivación:</strong> El equipo está completamente desmotivado. Mejora la comunicación y el ambiente laboral.");
        } else if (motivacion < 60) {
            recomendaciones.push("<strong>Motivación:</strong> Mejora la comunicación y reconoce logros del equipo");
        }
        
        if (recomendaciones.length === 0) {
            return "¡Excelente gestión en todas las áreas! Mantén este nivel de desempeño.";
        }
        
        return recomendaciones.join('<br>');
    }

    // Crear HTML con formato mejorado y responsive
    modalConsequenceText.innerHTML = `
        <div class="results-container">
            <div class="results-header">
                <h3>RESULTADOS FINALES</h3>
            </div>
            
            <div class="evaluation-section">
                <h4>EVALUACIÓN POR ÁREAS</h4>
                <div class="evaluation-list">
                    <div class="evaluation-item">${getFeedback('tiempo', tiempo, 'Tiempo')}</div>
                    <div class="evaluation-item">${getFeedback('costo', costos, 'Costos')}</div>
                    <div class="evaluation-item">${getFeedback('calidad', calidad, 'Calidad')}</div>
                    <div class="evaluation-item">${getFeedback('motivacion', motivacion, 'Motivación')}</div>
                </div>
            </div>
            
            <div class="recommendations-section">
                <h4>RETROALIMENTACIÓN</h4>
                <div class="recommendations-list">
                    ${getRecommendations()}
                </div>
            </div>
        </div>
    `;
    
    // Añadir estilos inline para el contenido específico
    modalConsequenceText.style.cssText = `
        display: block;
        margin-bottom: 5px;
        text-align: left;
        line-height: 1.5;
        font-size: 1.4em;
        max-height: 60vh;
        overflow-y: auto;
        padding: 15px;
    `;
    
    // LIMPIAR el contenedor de opciones completamente
    modalOptionsContainer.innerHTML = '';
    
    // Inicialmente ocultar el contenedor (está vacío)
    modalOptionsContainer.style.display = 'none';
    
    // Crear un contenedor específico para el botón de volver
    const backButtonContainer = document.createElement('div');
    backButtonContainer.id = 'modal-back-container';
    
    // Crear y configurar el botón de volver
    const backButton = document.createElement('button');
    backButton.innerHTML = '<i class="bi bi-arrow-left-circle"></i> VOLVER A SIMULACIONES';
    backButton.className = 'modal-back-button';
    
    backButton.addEventListener('click', () => {
        window.location.href = 'simulacion_hub.php';
    });
    
    // Agregar el botón al contenedor específico
    backButtonContainer.appendChild(backButton);
    
    // Agregar el contenedor del botón al modal
    modalOptionsContainer.appendChild(backButtonContainer);
    
    // MOSTRAR el contenedor ahora que tiene contenido
    modalOptionsContainer.style.display = 'flex';
    
    modal.classList.remove('hidden');
}

function guardarResultadosEnBD(resultadoFinal) {
    // Obtener datos del juego actual
    const urlParams = new URLSearchParams(window.location.search);
    const casoId = urlParams.get('caso') || sessionStorage.getItem('caso') || '1';
    const metodologia = 'pmbok';
    
    // Determinar el tipo (0 = scrum, 1 = pmbok)
    const tipo = 1;
    
    // Obtener los porcentajes finales
    const tiempo = proyectoActual.getTiempo();
    const costos = proyectoActual.getCosto();
    const calidad = proyectoActual.getCalidad();
    const motivacion = proyectoActual.getMotivacion();

    console.log('📊 Datos a enviar:', {
        juego_id: parseInt(casoId),
        tipo: tipo,
        resultado: resultadoFinal,
        tiempo: tiempo,
        costos: costos,
        calidad: calidad,
        motivacion: motivacion
    });

    // Preparar los datos para enviar
    const datos = {
        juego_id: parseInt(casoId),
        tipo: tipo,
        resultado: resultadoFinal,
        tiempo: tiempo,
        costos: costos,
        calidad: calidad,
        motivacion: motivacion
    };

    // Enviar datos al servidor
    fetch('../../admin/guardar_resultados.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    })
    .then(async response => {
        const text = await response.text();
        console.log('📨 Respuesta cruda del servidor:', text);
        
        try {
            const data = JSON.parse(text);
            return data;
        } catch (e) {
            console.error('❌ No se pudo parsear JSON:', e);
            throw new Error(`Respuesta no JSON: ${text.substring(0, 200)}`);
        }
    })
    .then(data => {
        console.log('✅ Respuesta JSON:', data);
        if (data.success) {
            console.log('🎉 Resultados guardados exitosamente');
        } else {
            console.error('❌ Error del servidor:', data.error);
        }
    })
    .catch(error => {
        console.error('💥 Error completo:', error);
    });
}

// --- INICIO ---

function cargarDatosEscenario() {
    const urlParams = new URLSearchParams(window.location.search);
    const casoId = urlParams.get('caso') || sessionStorage.getItem('caso') || '1';
    
    // Leer metodología 
    metodologiaActual = 'pmbok';

    decisionesDelEscenario = getScenarioData(metodologiaActual, casoId);

    const totalTareas = 10;
    const totalDias = 10;
    proyectoActual = new Project(totalTareas, totalDias);

    scenarioTitleEl.textContent = `SIMULACIÓN PMBOK: FASE ${proyectoActual.getCurrentDay()}`;

}

// Enlazar los botones a sus funciones
mainContinueButton.addEventListener('click', onMainContinueClick);
modalContinueButton.addEventListener('click', onModalContinueClick);



// ¡INICIA EL JUEGO!
cargarDatosEscenario();
updateDashboard();