<?php
    include '../config/database.php';
    session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PMYSCURM - Introducción</title>
    <link rel="stylesheet" href="../src/css/intro.css"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body id="game-screen">
 
    <div class="header"> 
        <h1>Metodologías de Admin de Proyectos</h1>
    </div>

    <button class="back-button" onclick="location.href='../index.html';">
        <i class="bi bi-arrow-left"></i>
    </button>

    <!-- Partículas de fondo -->
    <div id="particles-js"></div>

    <?php
        if(!isset($_SESSION['usuario'])){
    ?>

    <!-- VERSIÓN NO LOGUEADA - REDISEÑADA -->
    <div class="no_sesion">
        <!-- Header informativo -->
        <div class="login-header">

        </div>

        <!-- Contenido principal centrado -->
        <div class="login-main-content">
            <!-- Personaje y diálogo -->
            <div class="character-section">
                <div class="character-container">
                    <div class="character character-sinSesion">
                        <img src="../src/img/personaje2.png" alt="Personaje Pixelado Guía" class="pixel-character-image">
                        <div class="character-glow"></div>
                        <div class="character-shadow"></div>
                    </div>
                    
                    <div class="dialog-bubble" id="dialog-bubble">
                        <h2 class="step-title" id="step-title">¡AVENTURERO! INICIA SESIÓN PARA DESBLOQUEAR LA EXPERIENCIA COMPLETA</h2>
                        <p class="step-label">Nivel de acceso: <span class="access-level">BLOQUEADO</span></p>
                    </div>
                </div>
            </div>


            <!-- Botón de acción principal -->
            <div class="action-section">
                <div class="login-button-container">
                    <div class="button-particles" id="buttonParticles"></div>
                    <button class="game-button pulse login-main-button" onclick="location.href = 'login.php'">
                        <i class="bi bi-key"></i> 
                        <span class="button-text">INICIAR SESION PARA JUGAR</span>
                    </button>
                    <div class="login-subtext">
                        <i class="bi bi-shield-check"></i>
                        Conexión segura - Tu progreso se guarda en la nube
                    </div>
                </div>
            </div>

            <!-- Estadísticas rápidas -->
            <div class="stats-section">
                <div class="stats-grid">
                    <div class="stat-item">
                        <i class="bi bi-people"></i>
                        <div class="stat-info">
                            <span class="stat-number">+100</span>
                            <span class="stat-label">Jugadores</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="bi bi-trophy"></i>
                        <div class="stat-info">
                            <span class="stat-number">50</span>
                            <span class="stat-label">Logros</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="bi bi-star"></i>
                        <div class="stat-info">
                            <span class="stat-number">∞</span>
                            <span class="stat-label">Experiencia</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Efectos de confeti -->
        <div id="confetti-container"></div>
    </div>

    <?php
        } else{
    ?>

    <!-- VERSIÓN LOGUEADA -->
    <div class="guide-character">
        <div class="character-dialog" id="characterDialog">
            <span class="dialog-text">¡Hola! Soy tu guía en esta aventura de gestión de proyectos</span>
            <div class="dialog-arrow"></div>
        </div>
        <div class="character">
            <img src="../src/img/personaje2.png" alt="Guía Pixelado" class="pixel-guide">
            <div class="character-shadow"></div>
        </div>
    </div>

    <div class="game-content">
        <!-- Estadísticas rápidas -->
        <div class="quick-stats">
            <div class="stat-bubble">
                <i class="bi bi-journals"></i>
                <span>2 Metodologías</span>
            </div>
            <div class="stat-bubble">
                <i class="bi bi-puzzle"></i>
                <span>10+ Casos Prácticos</span>
            </div>
            <div class="stat-bubble">
                <i class="bi bi-graph-up"></i>
                <span>Sistema de Niveles</span>
            </div>
        </div>

        <p class="game-instruction">
            <span class="instruction-main">ELIGE TU CAMINO DE APRENDIZAJE</span>
            <span class="instruction-sub">Domina PMBOK y SCRUM a través de contenido interactivo y simulaciones prácticas</span>
        </p>

        <div class="cards-container">
            <!-- Tarjeta Teoría -->
            <div class="game-card theory-card" data-destination="teoria_hub.html">
                <div class="card-glow"></div>
                <div class="card-header header-izq">
                    <span class="card-badge learning">APRENDIZAJE</span>
                </div>
                
                <div class="card-icons">
                    <img src="../src/img/PMBOK_Icon.png" alt="Icono PMBOK" class="card-icon floating">
                    <img src="../src/img/SCRUM_Icon.png" alt="Icono SCRUM" class="card-icon floating delayed">
                </div>
                
                <p class="card-title">¡Aprende la teoría!</p>
                
                <div class="card-features">
                    <span><i class="bi bi-check-circle"></i> Contenido Didáctico</span>
                    <span><i class="bi bi-check-circle"></i> Guías Paso a Paso</span>
                    <span><i class="bi bi-check-circle"></i> Ejemplos Prácticos</span>
                </div>

            </div>

            <!-- Tarjeta Simulación -->
            <div class="game-card simulation-card" data-destination="simulacion_hub.php">
                <div class="card-glow"></div>
                <div class="card-header">
                    <span class="card-badge practice">PRÁCTICA</span>
                </div>
                
                <div class="card-icons">
                    <img src="../src/img/Simulacion_Icon.png" alt="Icono Simulacion" class="card-icon main-icon">
                </div>
                
                <p class="card-title">Simulación Interactiva</p>
                
                <div class="card-features">
                    <span><i class="bi bi-star"></i> Casos Reales</span>
                    <span><i class="bi bi-star"></i> Toma de Decisiones</span>
                    <span><i class="bi bi-star"></i> Sistema de Puntos</span>
                </div>

            </div>
        </div>

        <!-- Botones de acción -->
        <div class="action-buttons">
            <button class="game-button tutorial-button pulse" data-destination="tutorial.html">
                <i class="bi bi-play-circle"></i>
                VER TUTORIAL INICIAL
            </button>
            
            <button class="game-button secondary-button" onclick="showAchievements()">
                <i class="bi bi-trophy"></i>
                LOGROS
            </button>
        </div>
    </div>
    <?php
        }
    ?>


    <audio id="miAudio" src="../src/audio/Ruins.mp3" autoplay loop muted></audio>

    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script src="../src/js/intro.js" type="module"></script>
    <script src="../src/js/background_music.js" type="module"></script>
</body>
</html>