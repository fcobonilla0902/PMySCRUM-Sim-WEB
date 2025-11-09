// Datos del módulo Scrum
const scrumData = {
    totalCards: 6,
    completedCards: 0, // Se calculará basado en el progreso
    totalXP: 0,
    currentAdvice: 0,
    certificationLevel: 1
};

// Consejos del coach Scrum
const coachAdvices = [
    "¡Hola! Soy tu coach Scrum. Haz clic en las tarjetas para dominar el framework ágil.",
    "Scrum se basa en 3 pilares: Transparencia, Inspección y Adaptación. ¡Memorízalos!",
    "Los 3 roles de Scrum trabajan en armonía. Cada uno tiene responsabilidades únicas.",
    "Un sprint es un time-box de 2-4 semanas. ¡La consistencia es clave!",
    "Los eventos Scrum mantienen el ritmo. Daily, Review y Retrospectiva son esenciales.",
    "Los artefactos hacen visible el trabajo. Backlog e Incremento son tus mejores amigos.",
    "¡Excelente! Has dominado los conceptos Scrum. ¡Prepárate para la certificación!"
];

// Preguntas y respuestas del coach
const coachQuestions = [
    {
        question: "¿Cuál es la duración máxima de un Sprint?",
        options: ["1 semana", "2-4 semanas", "6 semanas", "No tiene límite"],
        answer: 1
    },
    {
        question: "¿Quién es responsable del Product Backlog?",
        options: ["Scrum Master", "Equipo de Desarrollo", "Product Owner", "Project Manager"],
        answer: 2
    },
    {
        question: "¿Cuánto dura el Daily Scrum?",
        options: ["30 minutos", "1 hora", "15 minutos", "El tiempo necesario"],
        answer: 2
    }
];

document.addEventListener('DOMContentLoaded', async () => {
    
    // Inicializar partículas
    initParticles();
    
    // Inicializar sistema de sonido
    initSoundSystem();
    
    // CARGAR PROGRESO GUARDADO PRIMERO
    await cargarProgresoGuardado();
    
    // Configurar interacciones
    setupInteractions();
    
    // Actualizar UI con el progreso cargado
    actualizarUIProgreso();

});

//  Cargar progreso guardado desde la BD
async function cargarProgresoGuardado() {
    
    try {
        const response = await fetch('../../admin/obtener_progreso_scrum.php');
        const result = await response.json();
        
        
        if (result.success) {
            const progresoGuardado = result.progreso;
            
            // Calcular cuántas cards están completadas basado en el progreso
            scrumData.completedCards = Math.floor((progresoGuardado / 100) * scrumData.totalCards);
            
            // Asegurarse de que no exceda el total
            if (scrumData.completedCards > scrumData.totalCards) {
                scrumData.completedCards = scrumData.totalCards;
            }
            
            
        } else {
            scrumData.completedCards = 0;
        }
    } catch (error) {
        scrumData.completedCards = 0;
    }
}

// Actualizar la UI con el progreso cargado
function actualizarUIProgreso() {
    const progress = (scrumData.completedCards / scrumData.totalCards) * 100;
    const progressFill = document.getElementById('scrum-progress');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (progressPercent) {
        progressPercent.textContent = `${Math.round(progress)}%`;
    }
    
    // Marcar las cards como completadas basado en el progreso
    marcarCardsCompletadas();
    
    // Actualizar certificación
    updateCertification();
    
    // Verificar si el módulo ya estaba completo
    if (scrumData.completedCards === scrumData.totalCards) {
        enableScrumCertification();
    }
}

// Marcar las cards como completadas basado en el progreso
function marcarCardsCompletadas() {
    const cards = document.querySelectorAll('.interactive-card');
    
    cards.forEach((card, index) => {
        if (index < scrumData.completedCards) {
            card.classList.add('completed');
            
            // Calcular XP ganada para esta card
            const xpElement = card.querySelector('.card-xp');
            if (xpElement) {
                const xpText = xpElement.textContent;
                const xpGained = parseInt(xpText.match(/\d+/)[0]);
                scrumData.totalXP += xpGained;
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
                    value: 40, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#e74c3c" 
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
                    color: "#e74c3c",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.7,
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
    const sounds = ['hoverSound', 'clickSound', 'achievementSound', 'sprintSound'];
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
    const nextAdviceBtn = document.getElementById('next-advice');
    if (nextAdviceBtn) {
        nextAdviceBtn.addEventListener('click', nextAdvice);
    }
    
    // Botón de preguntar
    const askQuestionBtn = document.getElementById('ask-question');
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', askQuestion);
    }
    
    // Botón de completar Scrum
    const completeScrumBtn = document.getElementById('complete-scrum');
    if (completeScrumBtn) {
        completeScrumBtn.addEventListener('click', completeScrumCertification);
    }
}

// Completar tarjeta
function completeCard(card) {
    if (card.classList.contains('completed')) return;
    
    playSound('sprintSound');
    
    // Marcar como completada
    card.classList.add('completed');
    scrumData.completedCards++;
    
    // Calcular XP ganada
    const xpElement = card.querySelector('.card-xp');
    const xpText = xpElement.textContent;
    const xpGained = parseInt(xpText.match(/\d+/)[0]);
    scrumData.totalXP += xpGained;
    
    // Mostrar efecto visual
    showCardCompletion(card, xpGained);
    
    // ACTUALIZAR PROGRESO Y GUARDAR EN BD
    updateProgress();
    
    // Actualizar certificación
    updateCertification();
    
    // Verificar si se completó el módulo
    if (scrumData.completedCards === scrumData.totalCards) {
        enableScrumCertification();
    }
}

// Mostrar detalles de la tarjeta
function showCardDetails(cardId) {
    const cardDetails = {
        '1': "Scrum es un framework ágil ligero que ayuda a las personas, equipos y organizaciones a generar valor a través de soluciones adaptativas para problemas complejos.",
        '2': "Cada rol en Scrum tiene responsabilidades específicas pero todos trabajan colaborativamente hacia el mismo objetivo: entregar valor incremental.",
        '3': "El Sprint es el corazón de Scrum, donde las ideas se convierten en valor. Es un contenedor para todos los demás eventos.",
        '4': "Los eventos Scrum crean regularidad y minimizan la necesidad de reuniones no definidas en Scrum. Todos son time-boxed.",
        '5': "Los artefactos Scrum representan trabajo o valor. Están diseñados para maximizar la transparencia de la información clave.",
        '6': "Scrum es simple de entender pero difícil de dominar. La práctica constante y la mejora continua son esenciales."
    };
    
    const dialogueContent = document.getElementById('coach-speech');
    if (dialogueContent && cardDetails[cardId]) {
        dialogueContent.textContent = cardDetails[cardId];
        playSound('clickSound');
    }
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
        background: radial-gradient(circle, transparent 50%, rgba(231, 76, 60, 0.2) 100%);
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
    const progress = (scrumData.completedCards / scrumData.totalCards) * 100;
    const progressFill = document.getElementById('scrum-progress');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (progressPercent) {
        progressPercent.textContent = `${Math.round(progress)}%`;
    }
    
    // ESTA LÍNEA GUARDA AUTOMÁTICAMENTE EN BD
    guardarProgresoScrumEnBD(Math.round(progress));
    
    // Actualizar certificación
    updateCertification();
}

// FUNCIÓN: Guardar progreso Scrum en la base de datos
async function guardarProgresoScrumEnBD(progreso) {
    
    try {
        const formData = new FormData();
        formData.append('progreso', progreso);
        
        const response = await fetch('../../admin/progreso_teoria_scrum.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Mostrar notificación de éxito
            //showScrumNotification('Progreso Scrum: ' + result.progreso + '%', 'success');
        } else {
            showScrumNotification('Error: ' + result.error, 'error');
        }
    } catch (error) {
        showScrumNotification('Error de conexión', 'error');
    }
}

// FUNCIÓN: Mostrar notificaciones Scrum
function showScrumNotification(mensaje, tipo = 'info') {
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
        background: ${tipo === 'success' ? '#e74c3c' : '#f44336'};
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

// Actualizar certificación
function updateCertification() {
    const certSteps = document.querySelectorAll('.cert-step');
    
    // Determinar nivel basado en tarjetas completadas
    if (scrumData.completedCards >= 2) {
        scrumData.certificationLevel = 2;
        if (certSteps.length > 1) {
            certSteps[1].classList.add('completed');
            certSteps[1].classList.remove('active', 'locked');
            if (certSteps.length > 2) {
                certSteps[2].classList.add('active');
                certSteps[2].classList.remove('locked');
            }
        }
    }
    
    if (scrumData.completedCards >= 4) {
        scrumData.certificationLevel = 3;
        if (certSteps.length > 2) {
            certSteps[2].classList.add('completed');
            certSteps[2].classList.remove('active', 'locked');
            if (certSteps.length > 3) {
                certSteps[3].classList.add('active');
                certSteps[3].classList.remove('locked');
            }
        }
    }
}

// Habilitar certificación Scrum
function enableScrumCertification() {
    const completeButton = document.getElementById('complete-scrum');
    if (completeButton) {
        completeButton.style.background = 'var(--color-progress)';
        completeButton.style.transform = 'scale(1.05)';
        completeButton.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.5)';
        
        // Actualizar advice final
        scrumData.currentAdvice = coachAdvices.length - 1;
        const coachSpeech = document.getElementById('coach-speech');
        if (coachSpeech) {
            coachSpeech.textContent = coachAdvices[scrumData.currentAdvice];
        }
        
        // Completar último paso de certificación
        const certSteps = document.querySelectorAll('.cert-step');
        if (certSteps.length > 3) {
            certSteps[3].classList.add('completed');
            certSteps[3].classList.remove('active', 'locked');
        }
    }
}

// Completar certificación Scrum
function completeScrumCertification() {
    if (scrumData.completedCards < scrumData.totalCards) {
        showCoachMessage("¡Completa todas las tarjetas primero para obtener tu certificación!");
        return;
    }

    // Reproducir sonido de logro
    playSound('achievementSound');
    
    // Mostrar logro final
    showScrumMasterAchievement();
    
    // GUARDAR PROGRESO FINAL (100%)
    guardarProgresoScrumEnBD(100);
    
    // Redirigir después de un delay
    setTimeout(() => {
        window.location.href = 'teoria_hub.html';
    }, 3000);
}

// Mostrar logro de Scrum Master
function showScrumMasterAchievement() {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup show';
    achievement.innerHTML = `
        <div class="achievement-icon">
            <i class="bi bi-trophy"></i>
        </div>
        <div class="achievement-content">
            <h4>MÓDULO SCRUM COMPLETADO</h4>
            <p>+${scrumData.totalXP + 75} XP - ¡Eres un Experto Scrum!</p>
        </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.remove();
    }, 3000);
}

// Siguiente consejo del coach
function nextAdvice() {
    playSound('clickSound');
    scrumData.currentAdvice = (scrumData.currentAdvice + 1) % coachAdvices.length;
    const coachSpeech = document.getElementById('coach-speech');
    if (coachSpeech) {
        coachSpeech.textContent = coachAdvices[scrumData.currentAdvice];
    }
}

// Preguntar al coach
function askQuestion() {
    playSound('clickSound');
    
    const randomQuestion = coachQuestions[Math.floor(Math.random() * coachQuestions.length)];
    const dialogueContent = document.getElementById('coach-speech');
    
    if (!dialogueContent) return;
    
    let questionText = `P: ${randomQuestion.question}\n\n`;
    randomQuestion.options.forEach((option, index) => {
        questionText += `${index + 1}. ${option}\n`;
    });
    
    dialogueContent.textContent = questionText;
    
    // Simular respuesta después de un tiempo
    setTimeout(() => {
        const correctAnswer = randomQuestion.options[randomQuestion.answer];
        dialogueContent.textContent = `¡Correcto! La respuesta es: ${correctAnswer}\n\n¡Bien hecho!`;
    }, 3000);
}

// Mostrar mensaje del coach
function showCoachMessage(message) {
    const dialogueContent = document.getElementById('coach-speech');
    if (dialogueContent) {
        dialogueContent.textContent = message;
    }
}

// Guardar progreso (placeholder para integración con backend)
function saveScrumProgress() {
    const progressData = {
        module: 'scrum',
        completed: true,
        xpEarned: scrumData.totalXP + 75,
        certificationLevel: scrumData.certificationLevel,
        completionDate: new Date().toISOString()
    };
    
    // Aquí integrarías con tu sistema de base de datos
    // localStorage.setItem('scrumProgress', JSON.stringify(progressData));
}

// Efectos visuales
function createSoundWave(element) {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid rgba(231, 76, 60, 0.3);
        border-radius: 20px;
        animation: soundWave 0.5s ease-out forwards;
        pointer-events: none;
    `;
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
    
    @keyframes soundWave {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.05); opacity: 0; }
    }
`;
document.head.appendChild(style);