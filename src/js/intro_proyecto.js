// 1. DATOS "PRE-HECHOS" DE LAS INTRODUCCIONES
// (Esto es como tu tutorial.js, almacena el contenido)
const introData = {
    scrum: {
        '1': {
            title: "SCRUM: Escenario 1",
            name: "Proyecto: App 'NeoBank'",
            description: "Se te ha asignado como Scrum Master para un nuevo proyecto de banca móvil. El cliente quiere una app con lo básico (consultar saldo, transferencias). Tienes 2 sprints de 5 días cada uno (10 días totales) y un presupuesto inicial del 100%. Tienes 20 tareas (historias de usuario) por completar. ¡Gestiona bien tus días!",
            link: 'scrum.html?caso=1' // Enlace al dashboard
        },
        '2': {
            title: "SCRUM: Escenario 2",
            name: "Proyecto: 'PixelStore'",
            description: "Tu equipo debe desarrollar una tienda en línea para un cliente que vende arte pixelado. Los requisitos son claros, pero el tiempo es corto. Tienes 2 sprints de 5 días...",
            link: 'scrum.html?caso=2'
        },
        // ... (añade los casos 3, 4, 5) ...
    },
    pmbok: {
        '1': {
            title: "PMBOK: Escenario 1",
            name: "Proyecto: 'Puente del Norte'",
            description: "Como Project Manager, debes supervisar la construcción de un puente. Los planes son fijos y el presupuesto es estricto. Tu éxito se medirá por el control de costos y cronograma.",
            link: 'pmbok.html?caso=1'
        },
        // ... (añade los casos 2, 3, 4, 5) ...
    }
};

// 2. OBTENER PARÁMETROS DE LA URL
const urlParams = new URLSearchParams(window.location.search);
const metodologia = urlParams.get('metodologia') || 'scrum';
const casoId = urlParams.get('caso') || '1';

// 3. ENCONTRAR LOS DATOS CORRECTOS
let data;
if (introData[metodologia] && introData[metodologia][casoId]) {
    data = introData[metodologia][casoId];
} else {
    // Fallback por si no se encuentra
    data = {
        title: "Error",
        name: "Escenario no encontrado",
        description: "Por favor, regresa a la pantalla de selección de escenarios.",
        link: 'simulacion_hub.html'
    };
}

// 4. ACTUALIZAR EL HTML (Esperar a que el HTML esté listo)
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar los textos
    document.getElementById('intro-title').textContent = data.title;
    document.getElementById('intro-scenario-name').textContent = data.name;
    document.getElementById('intro-description').textContent = data.description;
    
    // Configurar el botón "COMENZAR"
    const startButton = document.getElementById('start-sim-button');
    startButton.onclick = () => {
        window.location.href = data.link;
    };
});