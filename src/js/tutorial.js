// 1. Array con la información de los 4 pasos del tutorial MEJORADO
const tutorialSteps = [
    {
        label: "PASO 1:",
        title: "ESCOGER METODOLOGÍA",
        instruction: "¡Bienvenido! Elige entre SCRUM para proyectos ágiles o PMBOK para enfoques tradicionales. Cada metodología tiene sus propias reglas y estrategias.",
        image: "../src/img/paso1.png",
        time: "2min",
        xp: "+10 XP",
        tip: "SCRUM es ideal para proyectos cambiantes, PMBOK para proyectos con requisitos bien definidos"
    },
    {
        label: "PASO 2:",
        title: "¿CÓMO JUGARLO?",
        instruction: "Toma decisiones clave que afectarán el rumbo de tu proyecto. Cada elección influye en el tiempo, costo y calidad del resultado final.",
        image: "../src/img/paso2.png",
        time: "3min", 
        xp: "+15 XP",
        tip: "Lee cuidadosamente cada escenario antes de tomar decisiones"
    },
    {
        label: "PASO 3:",
        title: "TOMA BUENAS DECISIONES",
        instruction: "Cada elección afectará el tiempo, costo, calidad y motivación del equipo. ¡Toma las decisiones correctas y lleva tu proyecto al éxito! Balancea los recursos sabiamente.",
        image: "../src/img/paso3.png",
        time: "4min",
        xp: "+20 XP",
        tip: "Mantén un balance entre calidad, tiempo y presupuesto"
    },
    {
        label: "PASO 4:",
        title: "RESULTADOS Y RETROALIMENTACIÓN",
        instruction: "¡Aprende de cada simulación para mejorar en la siguiente!",
        image: "../src/img/paso4.png",
        time: "2min",
        xp: "+25 XP",
        tip: "Revisa siempre la retroalimentación para identificar áreas de mejora"
    }
];

let currentStepIndex = 0;
let isTyping = false;
let typingTimeout;

// 2. Referencias a los elementos HTML
const labelElement = document.getElementById('step-label');
const titleElement = document.getElementById('step-title');
const imageElement = document.getElementById('step-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const dialogContent = document.getElementById('dialog-content');
const typingIndicator = document.querySelector('.typing-indicator');
const progressFill = document.getElementById('tutorial-progress');
const currentStepElement = document.getElementById('current-step');
const totalStepsElement = document.getElementById('total-steps');
const tipsContent = document.getElementById('tips-content');
const achievementPopup = document.getElementById('achievement-popup');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

// Define la URL a la que se debe redirigir al salir del tutorial
const INTRO_URL = '../views/intro.php';
const GAME_URL = '../views/simulacion_hub.php';

// 3. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar partículas
    initParticles();
    
    // Inicializar sistema de sonido
    initSoundSystem();
    
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar primer paso
    updateStep(currentStepIndex);
    
    // Configurar información total de pasos
    totalStepsElement.textContent = tutorialSteps.length;
});

// Sistema de partículas
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 30, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#E3B448" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.2, 
                    random: true 
                },
                size: { 
                    value: 2, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: "#E3B448",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
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

// Sistema de sonido
function initSoundSystem() {
    const sounds = ['hoverSound', 'clickSound', 'pageTurnSound', 'achievementSound', 'typingSound'];
    sounds.forEach(soundId => {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.volume = 0.3;
        }
    });
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Eventos para marcadores de progreso
    document.querySelectorAll('.step-marker').forEach(marker => {
        marker.addEventListener('click', () => {
            const stepIndex = parseInt(marker.dataset.step);
            if (stepIndex <= currentStepIndex) {
                changeStep(stepIndex - currentStepIndex);
            }
        });
    });
    
    // Eventos para indicadores de imagen
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.addEventListener('click', () => {
            const stepIndex = parseInt(indicator.dataset.step);
            changeStep(stepIndex - currentStepIndex);
        });
    });
    
    // Evento para imagen ampliada
    document.querySelector('.image-frame').addEventListener('click', openImageModal);
    document.querySelector('.close-modal').addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImageModal();
    });
    
    // Eventos de hover para botones
    document.querySelectorAll('.game-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                playSound('hoverSound');
                createSoundWave(button);
            }
        });
    });
}

// 4. Función para actualizar la interfaz MEJORADA
function updateStep(index) {
    const step = tutorialSteps[index];
    const lastIndex = tutorialSteps.length - 1;

    // Actualizar progreso visual
    updateProgressVisuals(index);
    
    // Actualizar panel de paso
    labelElement.textContent = step.label;
    titleElement.textContent = step.title;
    
    // Actualizar badges de tiempo y XP
    document.querySelector('.time-badge').innerHTML = `<i class="bi bi-clock"></i> ${step.time}`;
    document.querySelector('.xp-badge').innerHTML = `<i class="bi bi-star"></i> ${step.xp}`;
    
    // Actualizar imagen del tutorial con transición
    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.src = step.image;
        imageElement.alt = step.title;
        imageElement.style.opacity = '1';
    }, 300);
    
    // Actualizar consejo rápido
    tipsContent.textContent = step.tip;
    
    // Efecto de escritura en la burbuja
    typeWriterEffect(step.instruction);
    
    // Actualizar paso actual
    currentStepElement.textContent = index + 1;

    // Animar panel de consejos
    animateTipsPanel();

    
    // ====================================
    // LÓGICA DEL BOTÓN 'ANTERIOR' / 'INTRO'
    // ====================================
    if (index === 0) {
        prevButton.innerHTML = '<i class="bi bi-arrow-left"></i> VOLVER A INTRO';
        prevButton.disabled = false;
        prevButton.onclick = () => { 
            playSound('clickSound');
            location.href = INTRO_URL;
        };
    } else {
        prevButton.innerHTML = '<i class="bi bi-arrow-left"></i> ANTERIOR';
        prevButton.disabled = false;
        prevButton.onclick = () => { changeStep(-1); };
    }
    
    // ====================================
    // LÓGICA DEL BOTÓN 'SIGUIENTE' / 'JUGAR'
    // ====================================
    if (index === lastIndex) {
        nextButton.innerHTML = '¡JUGAR! <i class="bi bi-joystick"></i>';
        nextButton.disabled = false;
        nextButton.onclick = () => {
            playSound('achievementSound');
            showCompletionAchievement();
            setTimeout(() => {
                location.href = GAME_URL;
            }, 2000);
        };
    } else {
        nextButton.innerHTML = 'SIGUIENTE <i class="bi bi-arrow-right"></i>';
        nextButton.disabled = false;
        nextButton.onclick = () => { changeStep(1); };
    }
    
    // Mostrar logro al completar pasos
    if (index > 0) {
        showStepAchievement(index);
    }
}

// 5. Función para cambiar de paso MEJORADA
function changeStep(direction) {
    const newIndex = currentStepIndex + direction;
    
    if (newIndex >= 0 && newIndex < tutorialSteps.length) {
        playSound('pageTurnSound');
        currentStepIndex = newIndex;
        updateStep(currentStepIndex);
    }
}

// Efecto de escritura mecánica
function typeWriterEffect(text) {
    if (isTyping) {
        clearTimeout(typingTimeout);
        isTyping = false;
    }
    
    dialogContent.textContent = '';
    typingIndicator.classList.add('active');
    playSound('typingSound');
    
    let i = 0;
    isTyping = true;
    
    function type() {
        if (i < text.length && isTyping) {
            dialogContent.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, 30);
        } else {
            typingIndicator.classList.remove('active');
            isTyping = false;
        }
    }
    
    type();
}

// Actualizar progresos visuales
function updateProgressVisuals(index) {
    // Actualizar barra de progreso
    const progressPercentage = ((index + 1) / tutorialSteps.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Actualizar marcadores de pasos
    document.querySelectorAll('.step-marker').forEach((marker, i) => {
        marker.classList.remove('active', 'completed');
        if (i === index) {
            marker.classList.add('active');
        } else if (i < index) {
            marker.classList.add('completed');
        }
    });
    
    // Actualizar indicadores de imagen
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.remove('active');
        if (i === index) {
            indicator.classList.add('active');
        }
    });
}

// Mostrar logro de paso completado
function showStepAchievement(stepIndex) {
    const achievement = document.querySelector('.achievement-popup');
    const achievementText = achievement.querySelector('p');
    
    achievementText.textContent = `+${stepIndex * 10} XP - Paso ${stepIndex} completado`;
    
    achievement.classList.add('show');
    playSound('achievementSound');
    
    setTimeout(() => {
        achievement.classList.remove('show');
    }, 2000);
}

// Mostrar logro de finalización
function showCompletionAchievement() {
    const achievement = document.querySelector('.achievement-popup');
    const achievementTitle = achievement.querySelector('h4');
    const achievementText = achievement.querySelector('p');
    
    achievementTitle.textContent = 'TUTORIAL COMPLETADO';
    achievementText.textContent = '+50 XP - ¡Estás listo para jugar!';
    
    achievement.classList.add('show');
}

// Modal de imagen ampliada
function openImageModal() {
    modalImage.src = imageElement.src;
    imageModal.classList.add('show');
    playSound('clickSound');
}

function closeImageModal() {
    imageModal.classList.remove('show');
    playSound('clickSound');
}

// Efectos visuales
function createSoundWave(element) {
    const wave = document.createElement('div');
    wave.className = 'sound-wave';
    element.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
    }, 500);
}

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        changeStep(-1);
    } else if (e.key === 'ArrowRight' && currentStepIndex < tutorialSteps.length - 1) {
        changeStep(1);
    } else if (e.key === 'Escape') {
        closeImageModal();
    }
});

// Efecto especial para el panel de consejos izquierdo
function animateTipsPanel() {
    const tipsPanel = document.querySelector('.left-tips');
    tipsPanel.style.animation = 'panelSlideIn 0.5s ease-out';
    
    // Reset animation after it completes
    setTimeout(() => {
        tipsPanel.style.animation = '';
    }, 500);
}

// Hacer funciones globales para HTML
window.changeStep = changeStep;
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;