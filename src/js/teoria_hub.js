document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar partículas
    initParticles();
    
    // Inicializar sistema de sonido
    initSoundSystem();
    
    // Inicializar progresos
    initProgressBars();
    
    // Inicializar interacciones de tarjetas
    initCardInteractions();
    
    // Inicializar profesor guía
    initProfessorGuide();

});

// Inicializar partículas
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 40, 
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
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: "#E3B448",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
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
    const sounds = ['hoverSound', 'clickSound', 'pageTurnSound', 'achievementSound'];
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

// Inicializar barras de progreso
function initProgressBars() {
    // Progreso general
    const generalProgress = document.querySelector('.progress-fill');
    if (generalProgress) {
        const progress = generalProgress.dataset.progress;
        setTimeout(() => {
            generalProgress.style.width = `${progress}%`;
        }, 500);
    }
    
    // Animar logros
    animateAchievements();
}

function animateAchievements() {
    const achievements = document.querySelectorAll('.achievement-item.unlocked');
    achievements.forEach((achievement, index) => {
        setTimeout(() => {
            achievement.style.animation = 'achievementUnlock 0.5s ease';
            setTimeout(() => {
                achievement.style.animation = '';
            }, 500);
        }, index * 200);
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
            
            playSound('pageTurnSound');
            
            // Efecto visual de selección
            card.style.animation = 'cardSelect 0.5s ease';
            
            const destination = card.dataset.destination;
            const methodology = card.classList.contains('pmbok-card') ? 'PMBOK' : 'SCRUM';
            
            if (destination) {
                // Mostrar mensaje de carga contextual
                showLoadingMessage(methodology);
                
                setTimeout(() => {
                    window.location.href = destination;
                }, 1500);
            }
        });
    });

    // Botones de acción
    const buttons = document.querySelectorAll('.game-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.classList.contains('quick-review')) {
                e.preventDefault();
                startQuickReview();
            } else if (button.classList.contains('secondary-button')) {
                e.preventDefault();
                showStudyPlan();
            }
        });
    });
}

// Inicializar profesor guía
function initProfessorGuide() {
    const professorDialog = document.getElementById('professorDialog');
    const dialogText = professorDialog.querySelector('.dialog-text');
    
    // Mensajes aleatorios del profesor
    const messages = [
        "¡Bienvenido a la biblioteca! Elige tu camino de aprendizaje",
        "PMBOK: Metodología tradicional y estructurada",
        "SCRUM: Enfoque ágil e iterativo para proyectos",
        "Completa ambos módulos para dominar la gestión de proyectos",
        "¡Cada lección te acerca a la maestría!"
    ];
    
    // Cambiar mensaje periódicamente
    let messageIndex = 0;
    setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        dialogText.textContent = messages[messageIndex];
        
        // Efecto de transición
        professorDialog.style.animation = 'none';
        setTimeout(() => {
            professorDialog.style.animation = 'dialogPulse 4s ease-in-out infinite';
        }, 10);
    }, 8000);
    
    // Interacción al hacer clic en el profesor
    const professor = document.querySelector('.professor-guide');
    professor.addEventListener('click', () => {
        playSound('clickSound');
        showStudyTip();
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

// Funciones de acción
function startQuickReview() {
    playSound('clickSound');
    
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
         INICIANDO REPASO RÁPIDO
        </div>
        <div style="margin-bottom: 30px; font-size: 0.8em; color: var(--color-text-light); max-width: 400px; line-height: 1.5;">
            Preparando preguntas clave de PMBOK y SCRUM para reforzar tu aprendizaje...
        </div>
        <div class="loading-spinner" style="
            width: 50px;
            height: 50px;
            border: 4px solid #333;
            border-top: 4px solid var(--color-border-accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        "></div>
        <div style="font-size: 0.7em; color: var(--color-text-light);">
            CARGANDO CONTENIDO INTERACTIVO...
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Simular carga y redirigir
    setTimeout(() => {
        overlay.remove();
        // Aquí podrías redirigir a una página de repaso
        // window.location.href = 'quick_review.html';
    }, 3000);
}

function showStudyPlan() {
    playSound('clickSound');
    
    const overlay = document.createElement('div');
    overlay.className = 'study-plan-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(13, 27, 42, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    overlay.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--color-card-bg), #3A506B);
            border: 4px solid var(--color-border-accent);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 0 40px rgba(227, 180, 72, 0.5);
        ">
            <h2 style="color: var(--color-border-accent); margin-bottom: 25px; font-size: 1.1em;">📚 PLAN DE ESTUDIO RECOMENDADO</h2>
            
            <div style="text-align: left; margin-bottom: 30px;">
                <div style="margin-bottom: 20px;">
                    <h3 style="color: var(--color-pmbok); font-size: 0.8em; margin-bottom: 10px;">🎯 PMBOK (RECOMENDADO PRIMERO)</h3>
                    <ul style="color: var(--color-text-light); font-size: 0.7em; line-height: 1.6; padding-left: 20px;">
                        <li>Fundamentos de la gestión tradicional</li>
                        <li>Grupos de procesos y áreas de conocimiento</li>
                        <li>Documentación y planificación detallada</li>
                    </ul>
                </div>
                
                <div>
                    <h3 style="color: var(--color-scrum); font-size: 0.8em; margin-bottom: 10px;">⚡ SCRUM (POSTERIORMENTE)</h3>
                    <ul style="color: var(--color-text-light); font-size: 0.7em; line-height: 1.6; padding-left: 20px;">
                        <li>Metodologías ágiles y adaptativas</li>
                        <li>Sprints y reuniones diarias</li>
                        <li>Entrega iterativa de valor</li>
                    </ul>
                </div>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <p style="color: var(--color-border-accent); font-size: 0.7em; margin: 0;">
                 CONSEJO: Comienza con PMBOK para entender las bases, luego avanza a SCRUM
                </p>
            </div>
            
            <button onclick="this.closest('.study-plan-overlay').remove()" style="
                background: var(--color-button-primary);
                color: var(--color-text-light);
                border: 3px solid var(--color-text-dark);
                padding: 12px 30px;
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

function showStudyTip() {
    const tips = [
        "Estudia 30 minutos diarios para mejor retención",
        "Completa ambos módulos para visión integral",
        "Toma notas durante las lecciones",
        "Repasa contenido anterior regularmente"
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Actualizar mensaje del profesor
    const dialogText = document.getElementById('professorDialog').querySelector('.dialog-text');
    const originalText = dialogText.textContent;
    
    dialogText.textContent = randomTip;
    dialogText.style.color = '#4cd964';
    
    setTimeout(() => {
        dialogText.textContent = originalText;
        dialogText.style.color = '';
    }, 4000);
}

// Mensajes de carga
function showLoadingMessage(methodology) {
    const message = `CARGANDO MÓDULO ${methodology}...`;
    
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
            PREPARANDO CONTENIDO EDUCATIVO...
        </div>
    `;
    
    document.body.appendChild(overlay);
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
    
    @keyframes achievementUnlock {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Hacer las funciones globales para el HTML
window.startQuickReview = startQuickReview;
window.showStudyPlan = showStudyPlan;