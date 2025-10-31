// 1. Array con la información de los 4 pasos del tutorial
const tutorialSteps = [
    {
        label: "Paso 1:",
        title: "Escoger Metodologia",
        instruction: "Elegir la metodologia SCRUM o PMBOK <br> del caso propuesto",
        image: "../src/img/paso1.png" 
    },
    {
        label: "Paso 2:",
        title: "¿Cómo Jugarlo?",
        instruction: "En base a las decisiones <br> del jugador se administrará el proyecto",
        image: "../src/img/paso2.png" 
    },
    {
        label: "Paso 3:",
        title: "Toma buenas decisiones",
        instruction: "Cada elección afectará el <br> tiempo, costo, calidad y motivación del equipo. <br> ¡Toma las decisiones correctas y lleva tu proyecto al éxito!",
        image: "../src/img/paso3.png"
    },
    {
        label: "Paso 4:",
        title: "Resultados y Retroalimentación",
        instruction: "Entregar el producto final al cliente <br> y realizar la retrospectiva del equipo",
        image: "../src/img/paso4.png"
    }
];

let currentStepIndex = 0;

// 2. Referencias a los elementos HTML
const labelElement = document.getElementById('step-label');
const titleElement = document.getElementById('step-title');
const imageElement = document.getElementById('step-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const dialogBubble = document.getElementById('dialog-bubble'); // Nueva referencia

// Define la URL a la que se debe redirigir al salir del tutorial
const INTRO_URL = 'ruta_a_tu_pagina_de_introduccion.html'; 

// 3. Función para actualizar la interfaz
function updateStep(index) {
    const step = tutorialSteps[index];
    const lastIndex = tutorialSteps.length - 1;

    // Actualiza panel de paso
    labelElement.innerHTML = step.label;
    titleElement.innerHTML = step.title;

    // Actualiza imagen del tutorial
    imageElement.src = step.image;
    imageElement.alt = step.title;

    // Actualiza burbuja del personaje
    dialogBubble.innerHTML = step.instruction;

    // ====================================
    // ✅ LÓGICA DEL BOTÓN 'ANTERIOR' / 'INTRO'
    // ====================================
    if (index === 0) {
        // Primer paso: Cambia el texto y la acción para volver a la intro
        prevButton.innerHTML = "&#9664; Intro";
        prevButton.disabled = false; // Debe estar activo
        // **IMPORTANTE:** Aquí se cambia la función del botón
        prevButton.onclick = () => { 
            location.href = '../views/intro.html';
        };

    } else {
        // Pasos intermedios: Vuelve a la navegación normal
        prevButton.innerHTML = "&#9664; Anterior";
        prevButton.disabled = false; // Solo si deseas deshabilitarlo al inicio, sino déjalo en false
        // **IMPORTANTE:** Asegura que la función vuelva a ser `changeStep(-1)`
        prevButton.onclick = () => { changeStep(-1); };
    }

    // ====================================
    // ✅ LÓGICA DEL BOTÓN 'SIGUIENTE' / 'JUGAR'
    // ====================================
    if (index === lastIndex) {
        // Último paso: Cambia el texto y la acción para iniciar el juego
        nextButton.innerHTML = "¡Jugar!";
        nextButton.disabled = false;
        // **IMPORTANTE:** Aquí se cambia la función del botón
        nextButton.onclick = () => {
             // Redirigir a la página del juego principal
            console.log("¡Comenzando el Juego!");
            location.href = '../views/simulacion_hub.html';
        };

    } else {
        // Pasos intermedios: Navegación normal
        nextButton.innerHTML = "Siguiente &#9654;";
        nextButton.disabled = false;
        // **IMPORTANTE:** Asegura que la función vuelva a ser `changeStep(1)`
        nextButton.onclick = () => { changeStep(1); };
    }
}

// 4. Función para cambiar de paso
function changeStep(direction) {
    const newIndex = currentStepIndex + direction;
    // La comprobación de límites es más simple ahora
    if (newIndex >= 0 && newIndex < tutorialSteps.length) {
        currentStepIndex = newIndex;
        updateStep(currentStepIndex);
    }
}

// 5. Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateStep(currentStepIndex);
});