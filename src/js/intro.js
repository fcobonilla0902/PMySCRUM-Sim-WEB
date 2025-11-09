document.addEventListener('DOMContentLoaded', () => {

    // Inicializar partículas
    initParticles();
    
    // Inicializar sistema de sonido
    initSoundSystem();
    
    // Inicializar progresos circulares
    initProgressCircles();
    
    // Inicializar interacciones de tarjetas
    initCardInteractions();
    
    // Inicializar personaje guía
    initGuideCharacter();

});

// Inicializar partículas
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 50, 
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
                    value: 0.4, 
                    random: true 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#E3B448",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
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
    // Precargar sonidos
    const sounds = ['hoverSound', 'clickSound', 'selectSound'];
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

// Inicializar progresos circulares
function initProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = circle.dataset.progress;
        setTimeout(() => {
            circle.style.background = `conic-gradient(var(--color-border-accent) ${progress}%, #333 ${progress}%)`;
        }, 800);
    });
}

// Inicializar interacciones de tarjetas
function initCardInteractions() {
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach(card => {
        // Efecto hover con sonido
        card.addEventListener('mouseenter', () => {
            playSound('hoverSound');
            createSoundWave(card);
            
            // Efecto visual adicional
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // Efecto click
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            playSound('selectSound');
            
            // Efecto visual de selección
            card.style.animation = 'cardSelect 0.5s ease';
            
            const destination = card.dataset.destination;
            
            if (destination) {
                // Mostrar mensaje de carga contextual
                showLoadingMessage(card);
                
                setTimeout(() => {
                    window.location.href = destination;
                }, 1200);
            }
        });
    });

    // Botones de acción
    const buttons = document.querySelectorAll('.game-button[data-destination]');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            playSound('clickSound');
            
            const destination = button.dataset.destination;
            showLoadingMessage(button);
            
            setTimeout(() => {
                window.location.href = destination;
            }, 1000);
        });
    });
}

// Inicializar personaje guía
function initGuideCharacter() {
    const characterDialog = document.getElementById('characterDialog');
    const dialogText = characterDialog.querySelector('.dialog-text');
    
    // Mensajes aleatorios del personaje
    const messages = [
        "¡Hola! Soy tu guía en esta aventura de gestión de proyectos",
        "Elige entre aprender teoría o practicar con simulaciones",
        "Cada camino te dará experiencia y desbloqueará nuevos contenidos",
        "¿Listo para convertirte en un maestro de la gestión de proyectos?",
        "No te olvides de revisar el tutorial si eres nuevo"
    ];
    
    // Cambiar mensaje periódicamente
    let messageIndex = 0;
    setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        dialogText.textContent = messages[messageIndex];
        
        // Efecto de transición
        characterDialog.style.animation = 'none';
        setTimeout(() => {
            characterDialog.style.animation = 'dialogPulse 4s ease-in-out infinite';
        }, 10);
    }, 8000);
    
    // Interacción al hacer clic en el personaje
    const character = document.querySelector('.guide-character');
    character.addEventListener('click', () => {
        playSound('clickSound');
        showTipMessage();
    });
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
function showLoadingMessage(element) {
    let message = "CARGANDO...";
    
    if (element.classList.contains('theory-card')) {
        message = "PREPARANDO CONTENIDO DIDÁCTICO...";
    } else if (element.classList.contains('simulation-card')) {
        message = "INICIANDO SIMULACIÓN INTERACTIVA...";
    } else if (element.classList.contains('tutorial-button')) {
        message = "CARGANDO TUTORIAL INICIAL...";
    }
    
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
        <div style="font-size: 1.3em; margin-bottom: 30px; text-shadow: 0 0 10px rgba(227, 180, 72, 0.5);">
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
        <div style="margin-top: 20px; font-size: 0.7em; color: var(--color-text-light);">
            PREPARANDO EXPERIENCIA...
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function showTipMessage() {
    const tips = [
        "Consejo: Comienza con el tutorial si es tu primera vez",
        "Tip: Completa ambos caminos para dominar todas las metodologías",
        "Dato: Gana puntos de experiencia en las simulaciones",
        "Logro: Desbloquea contenido especial al subir de nivel"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Actualizar mensaje del personaje
    const dialogText = document.getElementById('characterDialog').querySelector('.dialog-text');
    const originalText = dialogText.textContent;
    
    dialogText.textContent = randomTip;
    dialogText.style.color = '#4cd964';
    
    setTimeout(() => {
        dialogText.textContent = originalText;
        dialogText.style.color = '';
    }, 4000);
}

// Mostrar logros
function showAchievements() {
    playSound('clickSound');
    
    const overlay = document.createElement('div');
    overlay.className = 'achievements-overlay';
    overlay.style.display = 'flex';
    
    overlay.innerHTML = `
        <div class="achievements-container">
            <h2 style="color: var(--color-border-accent); margin-bottom: 20px;">🏆 LOGROS DISPONIBLES</h2>
            
            <div style="text-align: left; margin-bottom: 25px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <i class="bi bi-check-circle" style="color: var(--color-learning);"></i>
                    <span style="color: var(--color-text-light); font-size: 0.8em;">Completar Tutorial Inicial</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <i class="bi bi-star" style="color: var(--color-practice);"></i>
                    <span style="color: var(--color-text-light); font-size: 0.8em;">Primera Simulación Exitosa</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <i class="bi bi-journals" style="color: var(--color-theory);"></i>
                    <span style="color: var(--color-text-light); font-size: 0.8em;">Leer Todo el Contenido Teórico</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="bi bi-trophy" style="color: var(--color-border-accent);"></i>
                    <span style="color: var(--color-text-light); font-size: 0.8em;">Alcanzar Nivel 5</span>
                </div>
            </div>
            
            <button onclick="this.closest('.achievements-overlay').remove()" style="
                background: var(--color-button-primary);
                color: var(--color-text-light);
                border: 3px solid var(--color-text-dark);
                padding: 10px 25px;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Press Start 2P', cursive;
                font-size: 0.7em;
            ">ENTENDIDO</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Cerrar al hacer clic fuera
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Añadir animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes cardSelect {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Hacer la función global para el HTML
window.showAchievements = showAchievements;