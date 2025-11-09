// Datos del módulo PMBOK
const pmbokData = {
    totalCards: 5,
    completedCards: 0, // Se calculará basado en el progreso
    totalXP: 0,
    currentSpeech: 0
};

// Consejos del mentor
const mentorSpeeches = [
    "¡Bienvenido, aventurero! Haz clic en las tarjetas para descubrir los secretos del PMBOK.",
    "Cada tarjeta te dará XP. ¡Completa todas para convertirte en un Maestro PMBOK!",
    "El PMBOK es tu mapa en la gestión de proyectos. Domínalo y ningún proyecto se te resistirá.",
    "¿Sabías que el PMBOK v7 se centra más en principios que en procesos? ¡Evolución constante!",
    "Las áreas de conocimiento son tus herramientas. Aprende a usarlas todas eficazmente.",
    "¡Felicidades! Has aprendido los fundamentos del PMBOK. ¡Estás listo para la práctica!"
];

document.addEventListener('DOMContentLoaded', async () => {
    
    // Inicializar partículas
    initParticles();
    
    // Inicializar sistema de sonido
    initSoundSystem();
    
    // CARGAR PROGRESO GUARDADO PRIMERO
    await cargarProgresoGuardadoPMBOK();
    
    // Configurar interacciones
    setupInteractions();
    
    // Actualizar UI con el progreso cargado
    actualizarUIProgresoPMBOK();
    
});


async function cargarProgresoGuardadoPMBOK() {
    
    try {
        const response = await fetch('../../admin/obtener_progreso_pmbok.php');
        const result = await response.json();
        
        
        if (result.success) {
            const progresoGuardado = result.progreso;
            
            // Calcular cuántas cards están completadas basado en el progreso
            pmbokData.completedCards = Math.floor((progresoGuardado / 100) * pmbokData.totalCards);
            
            // Asegurarse de que no exceda el total
            if (pmbokData.completedCards > pmbokData.totalCards) {
                pmbokData.completedCards = pmbokData.totalCards;
            }

            
        } else {
            pmbokData.completedCards = 0;
        }
    } catch (error) {
        pmbokData.completedCards = 0;
    }
}

// Actualizar la UI con el progreso cargado
function actualizarUIProgresoPMBOK() {
    const progress = (pmbokData.completedCards / pmbokData.totalCards) * 100;
    const progressFill = document.getElementById('reading-progress');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (progressPercent) {
        progressPercent.textContent = `${Math.round(progress)}%`;
    }
    
    // Marcar las cards como completadas basado en el progreso
    marcarCardsCompletadasPMBOK();
    
    // Actualizar logros
    updateAchievements();
    
    // Verificar si el módulo ya estaba completo
    if (pmbokData.completedCards === pmbokData.totalCards) {
        enableModuleCompletion();
    }
}

// Marcar las cards como completadas basado en el progreso
function marcarCardsCompletadasPMBOK() {
    const cards = document.querySelectorAll('.interactive-card');
    
    cards.forEach((card, index) => {
        if (index < pmbokData.completedCards) {
            card.classList.add('completed');
            
            // Calcular XP ganada para esta card
            const xpElement = card.querySelector('.card-xp');
            if (xpElement) {
                const xpText = xpElement.textContent;
                const xpGained = parseInt(xpText.match(/\d+/)[0]);
                pmbokData.totalXP += xpGained;
            }
        }
    });
    
}

// Inicializar partículas
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { 
                    value: 35, 
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
                    distance: 120,
                    color: "#E3B448",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.6,
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
    const sounds = ['hoverSound', 'clickSound', 'achievementSound', 'pageTurnSound'];
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

// Configurar interacciones
function setupInteractions() {
    // Tarjetas interactivas
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('completed')) {
                playSound('hoverSound');
                createSoundWave(card);
            }
        });
        
        card.addEventListener('click', () => {
            if (!card.classList.contains('completed')) {
                completeCard(card);
            }
        });
    });
    
    // Botones de aprender más
    const learnButtons = document.querySelectorAll('.learn-more');
    learnButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.interactive-card');
            if (!card.classList.contains('completed')) {
                completeCard(card);
            }
            showCardDetails(button.dataset.card);
        });
    });
    
    // Botón de siguiente consejo
    document.getElementById('next-tip').addEventListener('click', nextSpeech);
    
    // Botón de completar módulo
    document.getElementById('complete-module').addEventListener('click', completeModule);
}

// Completar tarjeta
function completeCard(card) {
    if (card.classList.contains('completed')) return;
    
    playSound('pageTurnSound');
    
    // Marcar como completada
    card.classList.add('completed');
    pmbokData.completedCards++;
    
    // Calcular XP ganada
    const xpElement = card.querySelector('.card-xp');
    const xpText = xpElement.textContent;
    const xpGained = parseInt(xpText.match(/\d+/)[0]);
    pmbokData.totalXP += xpGained;
    
    // Mostrar efecto visual
    showCardCompletion(card, xpGained);
    
    // Actualizar progreso Y GUARDAR EN BD AUTOMÁTICAMENTE
    updateProgress();
    
    // Verificar si se completó el módulo
    if (pmbokData.completedCards === pmbokData.totalCards) {
        enableModuleCompletion();
    }
}

// Mostrar detalles de la tarjeta
function showCardDetails(cardId) {
    const cardDetails = {
        '1': "El PMBOK (Project Management Body of Knowledge) es el estándar global en gestión de proyectos, desarrollado por el PMI.",
        '2': "Las 10 áreas de conocimiento del PMBOK cubren todos los aspectos necesarios para gestionar proyectos exitosamente.",
        '3': "La entrega de valor asegura que los proyectos aporten beneficios tangibles a la organización y stakeholders.",
        '4': "La adaptación permite aplicar el PMBOK en cualquier tipo de proyecto, desde pequeños equipos hasta grandes corporaciones.",
        '5': "PMBOK v7 introduce 12 principios y 8 dominios de desempeño, enfocándose en resultados más que en procesos."
    };
    
    const speechContent = document.getElementById('speech-content');
    speechContent.textContent = cardDetails[cardId];
    playSound('clickSound');
}

// Mostrar completación de tarjeta
function showCardCompletion(card, xpGained) {
    // Crear efecto visual de completación
    const completionEffect = document.createElement('div');
    completionEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, transparent 50%, rgba(76, 217, 100, 0.2) 100%);
        border-radius: 20px;
        animation: completionPulse 1s ease-out;
        z-index: 1;
    `;
    
    card.appendChild(completionEffect);
    
    // Mostrar popup de XP
    showXPPopup(card, xpGained);
    
    // Remover efecto después de la animación
    setTimeout(() => {
        completionEffect.remove();
    }, 1000);
}

// Mostrar popup de XP
function showXPPopup(card, xp) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-xp);
        color: var(--color-text-dark);
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.7em;
        font-weight: bold;
        z-index: 2;
        animation: xpFloat 1.5s ease-out forwards;
    `;
    
    popup.textContent = `+${xp} XP`;
    card.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 1500);
}

// Actualizar progreso
function updateProgress() {
    const progress = (pmbokData.completedCards / pmbokData.totalCards) * 100;
    const progressFill = document.getElementById('reading-progress');
    const progressPercent = document.querySelector('.progress-percent');
    
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.round(progress)}%`;
    
    guardarProgresoEnBD(Math.round(progress));
    
    // Actualizar logros
    updateAchievements();
}

// Guardar progreso PMBOK en la base de datos
async function guardarProgresoEnBD(progreso) {
    
    try {
        const formData = new FormData();
        formData.append('progreso', progreso);
        
        const response = await fetch('../../admin/progreso_teoria_pmbok.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Mostrar notificación de éxito
           // showPmbokNotification('Progreso PMBOK: ' + result.progreso + '%', 'success');
        } else {
            showPmbokNotification('Error: ' + result.error, 'error');
        }
    } catch (error) {
        showPmbokNotification('Error de conexión', 'error');
    }
}

// Mostrar notificaciones PMBOK
function showPmbokNotification(mensaje, tipo = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: bold;
        background: ${tipo === 'success' ? '#E3B448' : '#f44336'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = mensaje;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Actualizar logros
function updateAchievements() {
    const achievements = document.querySelectorAll('.achievement');
    
    if (pmbokData.completedCards >= 1) {
        achievements[0].classList.remove('locked');
        achievements[0].classList.add('unlocked');
    }
    
    if (pmbokData.completedCards >= 3) {
        achievements[1].classList.remove('locked');
        achievements[1].classList.add('unlocked');
    }
    
    if (pmbokData.completedCards === pmbokData.totalCards) {
        achievements[2].classList.remove('locked');
        achievements[2].classList.add('unlocked');
    }
}

// Habilitar completación del módulo
function enableModuleCompletion() {
    const completeButton = document.getElementById('complete-module');
    completeButton.style.background = 'var(--color-progress)';
    completeButton.style.transform = 'scale(1.05)';
    completeButton.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.5)';
    
    // Actualizar speech final
    pmbokData.currentSpeech = mentorSpeeches.length - 1;
    document.getElementById('speech-content').textContent = mentorSpeeches[pmbokData.currentSpeech];
}

// Completar módulo
function completeModule() {
    if (pmbokData.completedCards < pmbokData.totalCards) {
        alert('¡Completa todas las tarjetas primero!');
        return;
    }
    
    playSound('achievementSound');
    
    // Mostrar logro final
    showFinalAchievement();
    
    // Redirigir después de un delay
    setTimeout(() => {

        guardarProgresoEnBD(100);
        
        // Redirigir al hub de teoría
        window.location.href = 'teoria_hub.html';
    }, 3000);
}

// Mostrar logro final
function showFinalAchievement() {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup show';
    achievement.innerHTML = `
        <div class="achievement-icon">
            <i class="bi bi-trophy"></i>
        </div>
        <div class="achievement-content">
            <h4>MÓDULO PMBOK COMPLETADO</h4>
            <p>+${pmbokData.totalXP + 50} XP - ¡Eres un Experto PMBOK!</p>
        </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.remove();
    }, 3000);
}

// Siguiente speech del mentor
function nextSpeech() {
    playSound('clickSound');
    pmbokData.currentSpeech = (pmbokData.currentSpeech + 1) % mentorSpeeches.length;
    document.getElementById('speech-content').textContent = mentorSpeeches[pmbokData.currentSpeech];
}

// Guardar progreso (placeholder para integración con backend)
function saveProgress() {
    const progressData = {
        module: 'pmbok',
        completed: true,
        xpEarned: pmbokData.totalXP + 50,
        completionDate: new Date().toISOString()
    };
    
    // Aquí integrarías con tu sistema de base de datos
    // localStorage.setItem('pmbokProgress', JSON.stringify(progressData));
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

// Añadir animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes completionPulse {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.1); opacity: 0; }
    }
    
    @keyframes xpFloat {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -100px) scale(1.2); opacity: 0; }
    }
`;
document.head.appendChild(style);