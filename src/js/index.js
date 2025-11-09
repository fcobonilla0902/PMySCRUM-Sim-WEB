// PMYSCRUM - Página de Inicio Gamificada

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar partículas
    initParticles();
    
    // Cargar progreso del jugador
    loadPlayerProgress();
    
    // Configurar interacciones
    setupInteractions();
    
    // Iniciar animaciones
    startAnimations();

});

// Datos del jugador
const playerData = {
    level: 1,
    xp: 0,
    totalXP: 0,
    modulesCompleted: 0
};

// Inicializar partículas
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
                    value: 0.3, 
                    random: true 
                },
                size: { 
                    value: 2, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
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

// Cargar progreso del jugador
function loadPlayerProgress() {
    const savedProgress = localStorage.getItem('playerProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        Object.assign(playerData, progress);
        updatePlayerStats();
    }
}

// Guardar progreso del jugador
function savePlayerProgress() {
    localStorage.setItem('playerProgress', JSON.stringify(playerData));
}

// Actualizar estadísticas del jugador en la UI
function updatePlayerStats() {
    const levelElement = document.getElementById('player-level');
    const xpElement = document.getElementById('player-xp');
    
    if (levelElement) levelElement.textContent = playerData.level;
    if (xpElement) xpElement.textContent = playerData.xp;
}

// Configurar interacciones
// Configurar interacciones
function setupInteractions() {
    const startButton = document.getElementById('start-button');
    
    if (startButton) {
        // Efecto hover
        startButton.addEventListener('mouseenter', () => {
            playSound('hoverSound');
            createButtonParticles(startButton);
        });
        
        // Efecto click
        startButton.addEventListener('click', (e) => {
            e.preventDefault();
            playSound('clickSound');
            playSound('startSound');
            
            // Deshabilitar el botón para evitar múltiples clicks
            startButton.disabled = true;
            startButton.style.opacity = '0.7';
            startButton.style.cursor = 'not-allowed';
            
            // Efectos visuales al hacer click
            createConfetti();
            createButtonRipple(e);
            
            // Redirigir después de que termine el confeti (3 segundos)
            setTimeout(() => {
                window.location.href = 'views/intro.php';
            }, 3000); // Aumentado de 1000ms a 3000ms
        });
    }
    
    // Efectos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            const startButton = document.getElementById('start-button');
            if (startButton && !startButton.disabled) {
                startButton.click();
            }
        }
    });
}

// Iniciar animaciones
function startAnimations() {
    createFloatingParticles();
    startLogoAnimation();
}

// Crear partículas flotantes adicionales
function createFloatingParticles() {
    const container = document.querySelector('.content');
    for (let i = 0; i < 15; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Tamaño y color aleatorio
    const size = Math.random() * 3 + 1;
    const hue = 45 + Math.random() * 15; // Tonos dorados
    const opacity = Math.random() * 0.3 + 0.1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsla(${hue}, 70%, 60%, ${opacity})`;
    
    // Animación única
    const duration = Math.random() * 6 + 4;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    container.appendChild(particle);
    
    // Limpiar partículas periódicamente
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Animación del logo
function startLogoAnimation() {
    const logo = document.querySelector('.logo-pulse');
    if (logo) {
        setInterval(() => {
            logo.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(${0.8 + Math.random() * 0.4})`;
        }, 3000);
    }
}

// Crear confeti
function createConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = ['#E3B448', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Posición inicial aleatoria
        const startX = Math.random() * window.innerWidth;
        confetti.style.left = `${startX}px`;
        
        // Color aleatorio
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.background = color;
        
        // Tamaño y forma aleatoria
        const size = Math.random() * 8 + 4;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Rotación aleatoria
        const rotation = Math.random() * 360;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        // Duración y delay aleatorio
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`;
        
        container.appendChild(confetti);
        
        // Limpiar confeti después de la animación
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
}

// Crear efecto de partículas en botón
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--color-border-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Posición alrededor del botón
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.left = `50%`;
        particle.style.top = `50%`;
        particle.style.transform = `translate(-50%, -50%)`;
        
        button.appendChild(particle);
        
        // Animación
        particle.animate([
            { 
                transform: `translate(-50%, -50%) translate(0, 0)`,
                opacity: 1
            },
            { 
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        // Limpiar partícula
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
}

// Crear efecto ripple en botón
function createButtonRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('div');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    button.appendChild(ripple);
    
    // Añadir animación CSS si no existe
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Limpiar ripple
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Sistema de sonido
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
    }
}

// Efecto de escritura para texto (opcional)
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Actualizar progreso cuando se complete un módulo (para usar desde otras páginas)
function updatePlayerProgress(xpEarned, moduleCompleted = false) {
    playerData.xp += xpEarned;
    playerData.totalXP += xpEarned;
    
    // Calcular nivel basado en XP (100 XP por nivel)
    const newLevel = Math.floor(playerData.totalXP / 100) + 1;
    if (newLevel > playerData.level) {
        playerData.level = newLevel;
        // Aquí podrías añadir efectos de subida de nivel
    }
    
    if (moduleCompleted) {
        playerData.modulesCompleted++;
    }
    
    updatePlayerStats();
    savePlayerProgress();
}

// Efecto de shake para elementos
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Añadir animación shake si no existe
if (!document.querySelector('#shake-animation')) {
    const style = document.createElement('style');
    style.id = 'shake-animation';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}