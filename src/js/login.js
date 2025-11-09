// Sistema de Login Gamificado
const speech = document.getElementById('speechText');
let currentInterval;
let loginAttempts = 0;

// Inicializar sistema de partículas
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

// Sistema de sonido
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
    }
}

// Efecto de escritura mejorado
function typeText(text, isError = false) {
    if (currentInterval) {
        clearInterval(currentInterval);
    }
    
    speech.textContent = "";
    speech.className = 'speech-bubble' + (isError ? ' error-message' : '');
    
    let i = 0;
    
    currentInterval = setInterval(() => {
        if (i < text.length) {
            speech.textContent += text.charAt(i);
            i++;
            
            // Sonido de tecleo cada 3 caracteres
            if (i % 3 === 0) {
                playSound('typeSound');
            }
        } else {
            clearInterval(currentInterval);
            currentInterval = null;
        }
    }, 40);
}

// Partículas para inputs
function initInputParticles() {
    const inputs = document.querySelectorAll('.game-input');
    
    inputs.forEach(input => {
        const particleId = input.id.replace('Input', 'Particles');
        const particleContainer = document.getElementById(particleId);
        
        if (particleContainer) {
            input.addEventListener('focus', () => {
                createInputParticles(particleContainer, input);
            });
            
            input.addEventListener('input', () => {
                if (document.activeElement === input) {
                    createInputParticles(particleContainer, input);
                }
            });
        }
    });
}

function createInputParticles(container, input) {
    // Limpiar partículas existentes
    container.innerHTML = '';
    
    // Crear nuevas partículas
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--color-border-accent);
            border-radius: 50%;
            bottom: 0;
            left: ${Math.random() * 100}%;
            animation: particleRise 1s ease-out forwards;
            opacity: 0;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Indicador de fuerza de contraseña
function initPasswordStrength() {
    const passwordInput = document.getElementById('passwordInput');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (passwordInput && strengthFill && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            strengthFill.style.width = `${strength.percentage}%`;
            strengthText.textContent = `Seguridad: ${strength.percentage}%`;
            
            // Cambiar color según la fuerza
            if (strength.percentage < 40) {
                strengthFill.style.background = 'linear-gradient(90deg, #e74c3c, #e67e22)';
                strengthText.style.color = '#e74c3c';
            } else if (strength.percentage < 70) {
                strengthFill.style.background = 'linear-gradient(90deg, #e67e22, #f1c40f)';
                strengthText.style.color = '#f1c40f';
            } else {
                strengthFill.style.background = 'linear-gradient(90deg, #f1c40f, #2ecc71)';
                strengthText.style.color = '#2ecc71';
            }
        });
    }
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    // Longitud
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    
    // Complejidad
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    
    // Bonus por patrones complejos
    if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        score += 10;
    }
    
    return {
        percentage: Math.min(score, 100),
        score: score
    };
}

// Efectos de hover para botones
function initHoverEffects() {
    const buttons = document.querySelectorAll('.login-button, .toggle, .guest-mode');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playSound('hoverSound');
            createButtonRipple(button);
        });
        
        button.addEventListener('click', () => {
            playSound('clickSound');
        });
    });
}

// Efecto ripple para botones
function createButtonRipple(button) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: 0;
        top: 0;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Sistema de login gamificado
function initLoginSystem() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            initiateLoginSequence();
        });
    }
}

function initiateLoginSequence() {
    const loadingOverlay = document.getElementById('loginLoading');
    const progressFill = document.getElementById('progressFill');
    const loadingText = document.getElementById('loadingText');
    
    // Mostrar overlay de carga
    loadingOverlay.classList.remove('hidden');
    
    // Simular proceso de login
    const steps = [
        { percent: 20, text: "VERIFICANDO CREDENCIALES..." },
        { percent: 40, text: "CONECTANDO CON EL SERVIDOR..." },
        { percent: 60, text: "VALIDANDO INFORMACIÓN..." },
        { percent: 80, text: "CARGANDO PERFIL DE USUARIO..." },
        { percent: 95, text: "PREPARANDO EXPERIENCIA..." },
        { percent: 100, text: "¡ACCESO CONCEDIDO!..." }
    ];
    
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            progressFill.style.width = `${step.percent}%`;
            loadingText.textContent = step.text;
            currentStep++;
            
            // Efectos de sonido
            if (step.percent === 40 || step.percent === 80) {
                playSound('clickSound');
            }
        } else {
            clearInterval(progressInterval);
            // Enviar formulario real
            document.getElementById('loginForm').submit();
        }
    }, 400);
}

// Función para mostrar error
function showError(message) {
    typeText(message, true);
    
    // Efecto de vibración en el formulario
    const formPanel = document.querySelector('.form-panel');
    formPanel.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        formPanel.style.animation = '';
    }, 500);
}

// Crear efecto de confeti
function createConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const colors = ['#E3B448', '#FFD700', '#4CAF50', '#5DADE2', '#E74C3C', '#9B59B6'];
    
    for (let i = 0; i < 60; i++) {
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
        
        // Rotación y animación
        const rotation = Math.random() * 360;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 1;
        
        confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`;
        
        container.appendChild(confetti);
        
        // Limpiar después de la animación
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (duration + delay) * 1000);
    }
}

// Modo demostración
function activateGuestMode() {
    playSound('clickSound');
    typeText('¡Modo demostración activado! Explora sin iniciar sesión.');
    
    // Simular redirección después de un tiempo
    setTimeout(() => {
        window.location.href = 'intro.php?guest=true';
    }, 2000);
}

// Mensajes aleatorios del personaje
function initCharacterDialogue() {
    const messages = [
        "¡Ingresa tus credenciales para continuar la aventura!",
        "¿Listo para dominar la gestión de proyectos?",
        "Tu próxima gran aventura te espera...",
        "¡El conocimiento es poder! Accede ahora.",
        "Cada login te acerca a la maestría.",
        "¡No te quedes fuera de la acción!"
    ];
    
    // Cambiar mensaje periódicamente
    setInterval(() => {
        if (!currentInterval) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            typeText(randomMessage);
        }
    }, 8000);
}

// Inicialización completa
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar sistemas
    initParticles();
    initInputParticles();
    initPasswordStrength();
    initHoverEffects();
    initLoginSystem();
    initCharacterDialogue();
    
    // Mensaje inicial
    const speech = document.getElementById('speechText');
    if (speech.textContent.trim() === "") {
        typeText('¡Ingresa tus credenciales para continuar la aventura!');
    }
    
    // Verificar si hay mensaje de error del PHP
    const speechText = speech.textContent.trim();
    if (speechText.includes('incorrecta') || speechText.includes('no encontrado')) {
        speech.classList.add('error-message');
    }
    
    // Añadir animación ripple si no existe
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes particleRise {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-20px) scale(0);
                    opacity: 0;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Hacer funciones globales
window.activateGuestMode = activateGuestMode;
window.typeText = typeText;
window.showError = showError;