import { Project } from './Project.js';
import { getScenarioData } from './Scenarios.js';

// --- OBJETOS DEL JUEGO ---
let proyectoActual;
let decisionesDelEscenario;
let decisionActualIndex = 0; // Rastreador del día/decisión actual

// --- REFERENCIAS AL DASHBOARD (VISTA PRINCIPAL) ---
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

// --- 2. FUNCIONES PRINCIPALES DEL JUEGO ---

/**
 * Actualiza TODA la información del dashboard (barras, textos, etc.).
 */
function updateDashboard() {
    const p = proyectoActual; // Alias
    
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
    scenarioTitleEl.textContent = `SIMULACIÓN SCRUM: SPRINT ${p.getCurrentSprint()}`;
}

/**
 * Muestra el modal pop-up con la decisión del día.
 */
function showDecision(decision) {
    modalTitle.textContent = decision.getTitle();
    modalScenario.textContent = decision.getScenarioDescription();
    
    // Limpiar contenido anterior
    modalOptionsContainer.innerHTML = "";
    modalConsequenceText.textContent = "";
    modalContinueButton.classList.add('hidden'); // Ocultar botón "Continuar" del modal

    // Crear botones de opción
    for (const option of decision.getOptions()) {
        const botonOpcion = document.createElement('button');
        botonOpcion.textContent = option.getOptionText();
        botonOpcion.className = 'option-button';
        
        botonOpcion.addEventListener('click', () => {
            handleOptionClick(option);
        });
        
        modalOptionsContainer.appendChild(botonOpcion);
    }
    
    modal.classList.remove('hidden'); // Mostrar el modal
}

/**
 * Se llama cuando el usuario elige una opción dentro del modal.
 */
function handleOptionClick(option) {
    // 1. Aplicar la lógica al "cerebro"
    option.aplicar(proyectoActual); 
    
    // 2. Mostrar la consecuencia en el modal
    modalConsequenceText.textContent = option.getConsequenceText();
    
    // 3. Limpiar opciones y mostrar botón "Continuar" del modal
    modalOptionsContainer.innerHTML = "";
    modalContinueButton.classList.remove('hidden');
}

/**
 * Se llama al hacer clic en "CONTINUAR DÍA" (en el dashboard).
 */
function onMainContinueClick() {
    // El índice del array de decisiones es el día actual - 1
    const dayIndex = proyectoActual.getCurrentDay() - 1;
    
    if (dayIndex >= decisionesDelEscenario.length) {
        endGame();
        return;
    }
    
    // Muestra la decisión correspondiente al día actual
    showDecision(decisionesDelEscenario[dayIndex]);
}

/**
 * Se llama al hacer clic en "Continuar" (DENTRO DEL MODAL).
 */
function onModalContinueClick() {
    // 1. Avanzar el día en el modelo
    proyectoActual.avanzarDia();
    
    // 2. Actualizar el dashboard (barras, día, tareas)
    updateDashboard();
    
    // 3. Ocultar el modal
    modal.classList.add('hidden');

    // 4. Comprobar si el juego ha terminado
    if (proyectoActual.getCurrentDay() > proyectoActual.getTotalDays() || proyectoActual.isFailed()) {
        endGame();
    }
}

/**
 * Finaliza el juego (éxito o fracaso).
 */
function endGame() {
    mainContinueButton.disabled = true; // Desactivar el botón principal
    mainContinueButton.textContent = "SIMULACIÓN TERMINADA";
    
    // Mostrar un resumen final en el modal
    modalTitle.textContent = "Simulación Finalizada";
    modalOptionsContainer.innerHTML = "";
    modalContinueButton.classList.add('hidden');

    if (proyectoActual.isFailed()) {
        modalScenario.textContent = "El proyecto ha fracasado. No has cumplido con los objetivos de costo, calidad o tiempo.";
    } else {
        modalScenario.textContent = "¡Felicidades! Has completado el escenario.";
    }
    
    modalConsequenceText.textContent = `Resultados Finales: Tareas restantes: ${proyectoActual.getTareasRestantes()}, Calidad: ${proyectoActual.getCalidad()}%`;
    modal.classList.remove('hidden');
    // Aquí podrías añadir un botón para "Volver al Menú"
}


// --- 3. INICIO ---

/**
 * Función que carga los datos "pre-hechos".
 */
function cargarDatosEscenario() {
    // 1. Leer el ID del caso desde la URL
    // (Ej: /scrum.html?caso=1)
    const urlParams = new URLSearchParams(window.location.search);
    const casoId = urlParams.get('caso') || '1'; // '1' por defecto

    // 2. Obtener los datos pre-hechos de la fábrica
    decisionesDelEscenario = getScenarioData('scrum', casoId);

    // 3. Crear el objeto Project (¡esto es importante!)
    // (Ajusta los números según tu escenario)
    const totalTareas = 20; // Tareas totales para el escenario 1
    const totalDias = 10;   // Días totales para el escenario 1
    proyectoActual = new Project(totalTareas, totalDias);

    // 4. Actualizar el título de la página
    scenarioTitleEl.textContent = `SIMULACIÓN SCRUM: ESCENARIO ${casoId}`;
}

// --- 4. EJECUTAR EL JUEGO ---

// Enlazar los botones a sus funciones
mainContinueButton.addEventListener('click', onMainContinueClick);
modalContinueButton.addEventListener('click', onModalContinueClick);

// ¡INICIA EL JUEGO!
cargarDatosEscenario(); // Carga los datos pre-hechos
updateDashboard(); // Muestra el estado inicial (100%, 20 tareas, etc.)