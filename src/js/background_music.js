// src/js/background_music.js - Sistema de Audio Continuo
class BackgroundMusic {
    constructor() {
        this.audioContext = null;
        this.audioSource = null;
        this.audioBuffer = null;
        this.startedAt = 0;
        this.pausedAt = 0;
        this.isPlaying = false;
        this.audioFile = '../src/audio/Ruins.mp3';
        this.volume = 0.7;
        
        this.init();
    }

    async init() {
        try {
            // Crear AudioContext (pero no iniciarlo hasta interacción del usuario)
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Cargar el audio
            await this.loadAudio();
            
            // Configurar eventos
            this.setupEventListeners();
            
            // Restaurar estado anterior si existe
            this.restorePlaybackState();
            
        } catch (error) {
            console.error('Error inicializando audio:', error);
        }
    }

    async loadAudio() {
        try {
            const response = await fetch(this.audioFile);
            const arrayBuffer = await response.arrayBuffer();
            this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        } catch (error) {
            console.error('Error cargando audio:', error);
        }
    }

    setupEventListeners() {
        // Iniciar audio con la primera interacción del usuario
        const startAudio = () => {
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Solo reproducir si no está ya reproduciendo
            if (!this.isPlaying && this.audioBuffer) {
                this.play();
            }
            
            // Remover event listeners después de la primera interacción
            document.removeEventListener('click', startAudio);
            document.removeEventListener('keydown', startAudio);
            document.removeEventListener('touchstart', startAudio);
        };

        document.addEventListener('click', startAudio, { once: true });
        document.addEventListener('keydown', startAudio, { once: true });
        document.addEventListener('touchstart', startAudio, { once: true });

        // Guardar estado antes de cambiar de página
        window.addEventListener('beforeunload', () => {
            this.savePlaybackState();
        });

        // Pausar cuando la página no es visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.savePlaybackState();
            } else {
                this.restorePlaybackState();
            }
        });
    }

    play() {
        if (!this.audioBuffer || this.isPlaying) return;

        try {
            // Crear fuente de audio
            this.audioSource = this.audioContext.createBufferSource();
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.loop = true;

            // Configurar volumen
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = this.volume;

            // Conectar nodos
            this.audioSource.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Calcular tiempo de inicio
            const startTime = this.pausedAt % this.audioBuffer.duration;
            
            // Reproducir
            this.audioSource.start(0, startTime);
            this.startedAt = this.audioContext.currentTime - startTime;
            this.isPlaying = true;

            // Guardar estado de reproducción
            sessionStorage.setItem('musicPlaying', 'true');

        } catch (error) {
            console.error('Error reproduciendo audio:', error);
        }
    }

    pause() {
        if (!this.isPlaying || !this.audioSource) return;

        try {
            // Calcular tiempo actual
            this.pausedAt = (this.audioContext.currentTime - this.startedAt) % this.audioBuffer.duration;
            
            // Detener reproducción
            this.audioSource.stop();
            this.audioSource = null;
            this.isPlaying = false;

            // Guardar estado
            sessionStorage.setItem('musicPlaying', 'false');
            this.savePlaybackState();

        } catch (error) {
            console.error('Error pausando audio:', error);
        }
    }

    savePlaybackState() {
        if (this.isPlaying && this.audioContext) {
            const currentTime = (this.audioContext.currentTime - this.startedAt) % this.audioBuffer.duration;
            sessionStorage.setItem('musicTime', currentTime.toString());
            sessionStorage.setItem('musicPlaying', 'true');
        } else if (!this.isPlaying) {
            sessionStorage.setItem('musicTime', this.pausedAt.toString());
            sessionStorage.setItem('musicPlaying', 'false');
        }
        
        sessionStorage.setItem('musicVolume', this.volume.toString());
    }

    restorePlaybackState() {
        try {
            const savedTime = sessionStorage.getItem('musicTime');
            const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
            const savedVolume = sessionStorage.getItem('musicVolume');

            if (savedTime && !isNaN(parseFloat(savedTime))) {
                this.pausedAt = parseFloat(savedTime);
            }

            if (savedVolume && !isNaN(parseFloat(savedVolume))) {
                this.volume = parseFloat(savedVolume);
            }

            // Solo reproducir automáticamente si estaba reproduciéndose
            // y el usuario ya interactuó antes
            if (wasPlaying && this.audioContext && this.audioContext.state === 'running') {
                setTimeout(() => {
                    if (!this.isPlaying) {
                        this.play();
                    }
                }, 500);
            }
        } catch (error) {
            console.error('Error restaurando estado:', error);
        }
    }

    setVolume(newVolume) {
        this.volume = Math.max(0, Math.min(1, newVolume));
        sessionStorage.setItem('musicVolume', this.volume.toString());
    }

    getCurrentTime() {
        if (this.isPlaying && this.audioContext) {
            return (this.audioContext.currentTime - this.startedAt) % this.audioBuffer.duration;
        }
        return this.pausedAt;
    }

    // Método para cambiar entre play/pause manualmente
    togglePlayback() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
}

// Crear instancia global
const backgroundMusic = new BackgroundMusic();

// Exportar para uso global (opcional)
window.backgroundMusic = backgroundMusic;

// Inicializar controles de música si existen
function initMusicControls() {
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            backgroundMusic.togglePlayback();
            musicToggle.textContent = backgroundMusic.isPlaying ? '🔊' : '🔇';
        });
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            backgroundMusic.setVolume(e.target.value / 100);
        });
        
        // Establecer valor inicial
        volumeSlider.value = backgroundMusic.volume * 100;
    }
}

// Inicializar controles cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicControls);
} else {
    initMusicControls();
}

export default backgroundMusic;