// DEBUG 1: Si ves esto, ¡el script se cargó!

document.addEventListener('DOMContentLoaded', () => {
    
    // DEBUG 2: Esto se ejecuta cuando el HTML está listo.

    // Inicializar partículas
    initParticles();
    
    // Inicializar barras de progreso
    initProgressBars();
    
    // Inicializar sistema de sonido
    initSoundSystem();

    // Animar barras de progreso con los valores reales de PHP
    animateProgressBars();

    // Obtener todas las tarjetas desbloqueadas
    const unlockedCards = document.querySelectorAll('.game-card.unlocked[data-caso]');

    // DEBUG 3: ¿Cuántas tarjetas encontró?


    unlockedCards.forEach(card => {
        // DEBUG 4: Informa por cada tarjeta que enlaza.

        // Efecto hover con sonido
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
            playSound('hoverSound');
            
            // Efecto visual de onda de sonido
            createSoundWave(card);
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });

        card.addEventListener('click', () => {
            // DEBUG 5: ¡ÉXITO! El clic fue detectado.

            playSound('clickSound');
            
            // Efecto visual de selección
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);

            const metodologia = card.dataset.metodologia;
            const caso = card.dataset.caso;
            const dificultad = card.dataset.dificultad;

            // DEBUG 6: Muestra los datos que leyó.

            if (metodologia && caso) {
                // Mostrar mensaje de carga
                showLoadingMessage(dificultad);
                
                setTimeout(() => {
                    const url = `context.html?metodologia=${metodologia}&caso=${caso}`;
                    
                    // DEBUG 7: Muestra a dónde va a redirigir.
                    window.location.href = url;
                }, 1000);
            } 
        });
    });

    // Añadir efectos a las tarjetas bloqueadas
    const lockedCards = document.querySelectorAll('.game-card.locked');
    lockedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            playSound('hoverSound');
            card.style.animation = 'shake 0.5s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });

        card.addEventListener('click', () => {
            playSound('clickSound');
            showLockedMessage();
        });
    });
});

// FUNCIÓN NUEVA: Animar barras de progreso con valores reales
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// Inicializar partículas
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 60, 
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
                    color: "#E3B448",
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
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

// Inicializar barras de progreso (mantener esta función por compatibilidad)
function initProgressBars() {
    // Esta función ahora es redundante pero la mantenemos por compatibilidad
    // La nueva función animateProgressBars hace la animación principal
    console.log("initProgressBars llamado - usando animateProgressBars en su lugar");
    animateProgressBars();
}

// Sistema de sonido
function initSoundSystem() {
    // Precargar sonidos
    const sounds = ['hoverSound', 'clickSound', 'unlockSound'];
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

// Efectos visuales
function createSoundWave(element) {
    const wave = document.createElement('div');
    wave.className = 'sound-wave';
    element.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
    }, 500);
}

// Mensajes del sistema
function showLoadingMessage(dificultad) {
    const messages = {
        facil: "INICIANDO MISIÓN DE ENTRENAMIENTO...",
        medio: "PREPARANDO DESAFÍO INTERMEDIO...", 
        dificil: "CARGANDO MISIÓN ÉPICA...",
        expert: "INICIANDO PRUEBA MAESTRA...",
        master: "ACTIVANDO MODO LEGENDARIO..."
    };
    
    const message = messages[dificultad] || "CARGANDO SIMULACIÓN...";
    
    // Crear overlay de carga
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(13, 27, 42, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        font-family: 'Press Start 2P', cursive;
        color: var(--color-border-accent);
        text-align: center;
    `;
    
    overlay.innerHTML = `
        <div style="font-size: 1.5em; margin-bottom: 30px; text-shadow: 0 0 10px rgba(227, 180, 72, 0.5);">
            ${message}
        </div>
        <div class="loading-spinner" style="
            width: 50px;
            height: 50px;
            border: 4px solid #333;
            border-top: 4px solid var(--color-border-accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <div style="margin-top: 20px; font-size: 0.8em; color: var(--color-text-light);">
            PREPARANDO RECURSOS...
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function showLockedMessage() {
    // Crear mensaje de bloqueado
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(27, 38, 59, 0.95);
        border: 4px solid var(--color-border-accent);
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        z-index: 1000;
        font-family: 'Press Start 2P', cursive;
        color: var(--color-text-light);
        box-shadow: 0 0 30px rgba(227, 180, 72, 0.5);
    `;
    
    message.innerHTML = `
        <div style="font-size: 1.2em; color: var(--color-border-accent); margin-bottom: 20px;">
            🔒 MISIÓN BLOQUEADA
        </div>
        <div style="font-size: 0.8em; margin-bottom: 20px; line-height: 1.5;">
            COMPLETA MISIONES ANTERIORES PARA DESBLOQUEAR ESTE DESAFÍO
        </div>
        <button onclick="this.parentElement.remove()" style="
            background: var(--color-button-primary);
            color: var(--color-text-light);
            border: 3px solid var(--color-text-dark);
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Press Start 2P', cursive;
            font-size: 0.7em;
        ">ENTENDIDO</button>
    `;
    
    document.body.appendChild(message);
}

// Animación de shake para tarjetas bloqueadas
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .card-hover {
        animation: pulse 0.5s ease-in-out;
    }
    
    /* Animación suave para las barras de progreso */
    .progress-fill {
        transition: width 1s ease-in-out;
    }
`;
document.head.appendChild(style);

// Efectos de progreso cuando se completa una misión
function completeMission(metodologia, caso, puntuacion) {
    // Aquí podrías añadir lógica para actualizar progresos
    
    // Ejemplo: Actualizar barras de progreso
    if (metodologia === 'scrum') {
        // Incrementar progreso de Scrum
        updateProgressBar('.scrum-progress', 10);
    } else if (metodologia === 'pmbok') {
        // Incrementar progreso de PMBOK
        updateProgressBar('.pmbok-progress', 10);
    }
}

function updateProgressBar(selector, increment) {
    const bar = document.querySelector(selector);
    if (bar) {
        const currentProgress = parseInt(bar.dataset.progress);
        const newProgress = Math.min(currentProgress + increment, 100);
        bar.dataset.progress = newProgress;
        bar.style.width = `${newProgress}%`;
        
        // Actualizar porcentaje
        const percentElement = bar.parentElement.nextElementSibling;
        if (percentElement) {
            percentElement.textContent = `${newProgress}%`;
        }
    }
}