//const audio = document.getElementById("miAudio");

// Cuando el usuario hace clic en cualquier parte del documento, se activa el sonido
//document.addEventListener("click", () => {
  // remove muted and explicitly play on the user gesture; run once to avoid repeated calls
  //audio.muted = false;
  //audio.play().catch(() => {});
//}, { once: true });

// codigo nuevo
// src/js/background_music.js

function initializeAudio() {
    const audio = document.getElementById("miAudio");
    
    if (!audio) {
        console.warn("Elemento de audio no encontrado");
        return;
    }

    // Configurar audio
    audio.volume = 1.0;
    audio.muted = false;

    // Recuperar el tiempo guardado inmediatamente
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime && !isNaN(parseFloat(savedTime))) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Intentar reproducir si ya estaba habilitado
    const audioEnabled = localStorage.getItem('audioEnabled');
    if (audioEnabled === 'true') {
        setTimeout(() => {
            audio.play().catch(error => {
                // Silenciar errores de autoplay, se resolverán con interacción del usuario
            });
        }, 100);
    }

    // Habilitar audio con interacción del usuario
    document.addEventListener("click", () => {
        audio.muted = false;
        audio.play().catch(() => {});
        localStorage.setItem('audioEnabled', 'true');
    }, { once: true });

    // Guardar tiempo periódicamente
    setInterval(() => {
        if (!audio.paused && !isNaN(audio.currentTime)) {
            localStorage.setItem('audioTime', audio.currentTime);
        }
    }, 300);

    // Guardar antes de salir
    window.addEventListener('beforeunload', () => {
        if (!isNaN(audio.currentTime)) {
            localStorage.setItem('audioTime', audio.currentTime);
        }
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAudio);
} else {
    initializeAudio();
}