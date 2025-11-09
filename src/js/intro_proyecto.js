// 1. DATOS "PRE-HECHOS" DE LAS INTRODUCCIONES
const introData = {
    scrum: {
        '1': {
            title: "SCRUM: Escenario 1",
            name: "Proyecto: App 'NeoBank'",
            description: "Se te ha asignado como Scrum Master para un nuevo proyecto de banca móvil. El cliente quiere una app con lo básico (consultar saldo, transferencias). Tienes 2 sprints de 5 días cada uno (10 días totales) y un presupuesto inicial del 100%. Tienes 10 tareas (historias de usuario) por completar. ¡Gestiona bien tus días!",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'scrum.html?caso=1'
        },
        '2': {
            title: "SCRUM: Escenario 2",
            name: "Proyecto: 'PixelStore'",
            description: "Tu equipo debe desarrollar una tienda en línea para un cliente que vende arte pixelado. Los requisitos son claros, pero el tiempo es corto. Tienes 2 sprints de 5 días para entregar un MVP funcional. El presupuesto es ajustado y necesitas priorizar las funcionalidades clave.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'scrum.html?caso=2'
        },
        '3': {
            title: "SCRUM: Escenario 3",
            name: "Proyecto: 'HealthTrack Pro'",
            description: "Desarrolla una aplicación de seguimiento de salud para un startup médico. El proyecto requiere integración con wearables y una interfaz intuitiva para pacientes mayores.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'scrum.html?caso=3'
        },
        '4': {
            title: "SCRUM: Escenario 4",
            name: "Proyecto: 'EduLearn Platform'",
            description: "Crea una plataforma de aprendizaje en línea para una institución educativa. El cliente quiere funcionalidades de video, quizzes y seguimiento de progreso. Tienes 3 sprints de 2 semanas cada uno para entregar el MVP.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'scrum.html?caso=4'
        },
        '5': {
            title: "SCRUM: Escenario 5",
            name: "Proyecto: 'SmartHome Control'",
            description: "Desarrolla una aplicación de control para dispositivos de hogar inteligente. El proyecto incluye integración con múltiples protocolos IoT y una interfaz responsive para diferentes dispositivos.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'scrum.html?caso=5'
        }
    },
    pmbok: {
        '1': {
            title: "PMBOK: Escenario 1",
            name: "Proyecto: 'Puente del Norte'",
            description: "Como Project Manager, debes supervisar la construcción de un puente. Los planes son fijos y el presupuesto es estricto. Tu éxito se medirá por el control de costos y cronograma.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'pmbok.html?caso=1'
        },
        '2': {
            title: "PMBOK: Escenario 2",
            name: "Proyecto: 'Sistema ERP Corporativo'",
            description: "Implementa un sistema ERP para una empresa manufacturera con múltiples sedes. Debes coordinar entre departamentos y mantener el proyecto dentro del alcance definido.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'pmbok.html?caso=2'
        },
        '3': {
            title: "PMBOK: Escenario 3",
            name: "Proyecto: 'Expansión de Red 5G'",
            description: "Coordina la expansión de la red 5G en una región metropolitana. El proyecto involucra permisos municipales, instalación de torres y coordinación con múltiples proveedores.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'pmbok.html?caso=3'
        },
        '4': {
            title: "PMBOK: Escenario 4",
            name: "Proyecto: 'Centro de Datos Verde'",
            description: "Construye un centro de datos sostenible con certificación LEED. Debes gestionar aspectos técnicos, ambientales y cumplir con estrictas normativas de eficiencia energética.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'pmbok.html?caso=4'
        },
        '5': {
            title: "PMBOK: Escenario 5",
            name: "Proyecto: 'Fusión Empresarial'",
            description: "Dirige el proceso de fusión entre dos empresas del sector financiero. Coordina la integración de sistemas, procesos y culturas organizacionales siguiendo la guía PMBOK.",
            duration: "10 días",
            budget: "100%",
            tasks: "10 tareas",
            link: 'pmbok.html?caso=5'
        }
    }
};

// 2. OBTENER PARÁMETROS DE LA URL
const urlParams = new URLSearchParams(window.location.search);
const metodologia = urlParams.get('metodologia');
const casoId = urlParams.get('caso');

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
        duration: "-",
        budget: "-",
        tasks: "-",
        link: 'simulacion_hub.html'
    };
}


// 4. INICIALIZAR PARTÍCULAS
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#ffffff" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.5, 
                    random: true 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                }
            }
        });
    }
}

// 5. ANIMACIÓN DE TEXTO TIPO MÁQUINA DE ESCRIBIR
function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// 6. ACTUALIZAR INTERFAZ CON ANIMACIONES
async function updateInterface() {
    const titleElement = document.getElementById('intro-title');
    const nameElement = document.getElementById('intro-scenario-name');
    const descriptionElement = document.getElementById('intro-description');
    const durationElement = document.getElementById('duration-value');
    const budgetElement = document.getElementById('budget-value');
    const tasksElement = document.getElementById('tasks-value');

    // Animación del título
    await typeWriter(titleElement, data.title, 70);
    
    // Quitar efecto de máquina de escribir después de completar
    setTimeout(() => {
        titleElement.style.borderRight = 'none';
    }, 1000);

    // Actualizar el resto del contenido con animaciones
    setTimeout(() => {
        nameElement.textContent = data.name;
        descriptionElement.textContent = data.description;
        
        // Animar los valores numéricos
        animateValue(durationElement, 0, parseInt(data.duration) || 0, 1000, 'días');
        animateValue(budgetElement, 0, parseInt(data.budget) || 0, 1000, data.budget.includes('$') ? '' : '%');
        animateValue(tasksElement, 0, parseInt(data.tasks) || 0, 1000, 'tareas');
    }, 500);
}

// 7. ANIMACIÓN DE CONTADORES NUMÉRICOS
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + (suffix ? ` ${suffix}` : '');
        
        if (current === end) {
            clearInterval(timer);
            // Mostrar el valor real (por si hay símbolos como $ o %)
            if (suffix === '%' && data.budget.includes('%')) {
                element.textContent = data.budget;
            } else if (suffix === '' && data.budget.includes('$')) {
                element.textContent = data.budget;
            } else if (suffix === 'días' && data.duration.includes('días')) {
                element.textContent = data.duration;
            } else if (suffix === 'tareas' && data.tasks.includes('tareas')) {
                element.textContent = data.tasks;
            }
        }
    }, stepTime);
}

// 8. CONFIGURAR BOTÓN DE INICIO
function setupStartButton() {
    const startButton = document.getElementById('start-sim-button');
    
    startButton.addEventListener('click', () => {
        // Efecto de carga antes de redirigir
        startButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> CARGANDO...';
        startButton.disabled = true;
        
        // Agregar efecto de pulso al botón
        startButton.style.animation = 'pulse 1s infinite';
        
        setTimeout(() => {
            window.location.href = data.link;
        }, 2000);
    });
}

// 9. INICIALIZAR LA APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar partículas
    initParticles();
    
    // Configurar la interfaz
    updateInterface();
    
    // Configurar el botón de inicio
    setupStartButton();
    
    // Agregar estilo para animación de pulso
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

// 10. MANEJAR ERRORES
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
    
    // Mostrar mensaje de error amigable
    const errorElement = document.createElement('div');
    errorElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 1000;
        text-align: center;
    `;
    errorElement.innerHTML = `
        <h3>¡Ups! Algo salió mal</h3>
        <p>La simulación no pudo cargar correctamente.</p>
        <button onclick="location.reload()" style="margin-top: 10px; padding: 10px 20px; background: white; border: none; border-radius: 5px; cursor: pointer;">Reintentar</button>
    `;
    
    document.body.appendChild(errorElement);
});