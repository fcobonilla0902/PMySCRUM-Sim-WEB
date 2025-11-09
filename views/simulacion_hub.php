<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PMYSCURM - Simulación</title>
    <link rel="stylesheet" href="../src/css/simulacion_hub.css"> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body id="game-screen">

    <div class="header"> 
        <h1>Escenarios simulados</h1>
    </div>

    <button class="back-button" onclick="location.href='intro.php';">
        <i class="bi bi-arrow-left"></i>
    </button>

    <!-- Partículas de fondo -->
    <div id="particles-js"></div>

    <div class="game-content">

        <p class="game-instruction">
             ELIGE TU MISIÓN PARA DEMOSTRAR TUS HABILIDADES EN GESTIÓN DE PROYECTOS<br>
            <span class="sub-instruction">Cada caso completado te dará puntos de experiencia</span>
        </p>

        <!-- Progreso de metodologías -->
        <div class="methodology-progress">
            <?php
            session_start();
            include '../config/database.php';
            
            // Inicializar porcentajes
            $scrumProgress = 0;
            $pmbokProgress = 0;
            
            // Array para almacenar niveles completados
            $nivelesCompletados = [];
            
            if (isset($_SESSION['usuario'])) {
                // Consultar niveles completados por metodología
                $usuario = $_SESSION['usuario'];
                
                // Consultar niveles completados de SCRUM (tipo = 0)
                $queryScrum = "SELECT COUNT(DISTINCT juego_id) as niveles_completados 
                              FROM records_juegos 
                              WHERE usuario = ? AND tipo = 0 AND resultado = 1";
                $stmtScrum = $db->prepare($queryScrum);
                $stmtScrum->bind_param("s", $usuario);
                $stmtScrum->execute();
                $resultScrum = $stmtScrum->get_result();
                $rowScrum = $resultScrum->fetch_assoc();
                $nivelesScrum = $rowScrum['niveles_completados'] ?? 0;
                $scrumProgress = ($nivelesScrum / 5) * 100; // 5 niveles máximo
                
                // Consultar niveles completados de PMBOK (tipo = 1)
                $queryPmbok = "SELECT COUNT(DISTINCT juego_id) as niveles_completados 
                              FROM records_juegos 
                              WHERE usuario = ? AND tipo = 1 AND resultado = 1";
                $stmtPmbok = $db->prepare($queryPmbok);
                $stmtPmbok->bind_param("s", $usuario);
                $stmtPmbok->execute();
                $resultPmbok = $stmtPmbok->get_result();
                $rowPmbok = $resultPmbok->fetch_assoc();
                $nivelesPmbok = $rowPmbok['niveles_completados'] ?? 0;
                $pmbokProgress = ($nivelesPmbok / 5) * 100; // 5 niveles máximo
                
                // Consultar niveles específicos completados
                $queryNiveles = "SELECT tipo, juego_id FROM records_juegos 
                                WHERE usuario = ? AND resultado = 1 
                                GROUP BY tipo, juego_id";
                $stmtNiveles = $db->prepare($queryNiveles);
                $stmtNiveles->bind_param("s", $usuario);
                $stmtNiveles->execute();
                $resultNiveles = $stmtNiveles->get_result();
                
                while ($row = $resultNiveles->fetch_assoc()) {
                    $nivelesCompletados[$row['tipo'] . '_' . $row['juego_id']] = true;
                }
                
                $stmtScrum->close();
                $stmtPmbok->close();
                $stmtNiveles->close();
            }
            ?>
            <div class="progress-bar-container">
                <span class="progress-label">SCRUM MASTER</span>
                <div class="progress-bar">
                    <div class="progress-fill scrum-progress" data-progress="<?php echo $scrumProgress; ?>"></div>
                </div>
                <span class="progress-percent"><?php echo round($scrumProgress); ?>%</span>
            </div>
            <div class="progress-bar-container">
                <span class="progress-label">PMBOK EXPERT</span>
                <div class="progress-bar">
                    <div class="progress-fill pmbok-progress" data-progress="<?php echo $pmbokProgress; ?>"></div>
                </div>
                <span class="progress-percent"><?php echo round($pmbokProgress); ?>%</span>
            </div>
        </div>

        <br>
        <p class="game-instruction">MISIONES SCRUM - DESARROLLO ÁGIL</p>
        <div class="cards-container">
            <?php
            // Función para verificar si un nivel está completado
            function nivelCompletado($tipo, $caso) {
                global $nivelesCompletados;
                return isset($nivelesCompletados[$tipo . '_' . $caso]);
            }
            ?>
            
            <div class="game-card unlocked <?php echo nivelCompletado(0, 1) ? 'completed' : ''; ?>" data-metodologia="scrum" data-caso="1" data-dificultad="facil">
                <div class="card-header">
                    <span class="difficulty-badge easy">FÁCIL</span>
                    <span class="xp-reward">+50 XP</span>
                </div>
                <img src="../src/img/banco.png" alt="Caso 1">
                <p>NEOBANK APP</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>

            <div class="game-card unlocked <?php echo nivelCompletado(0, 2) ? 'completed' : ''; ?>" data-metodologia="scrum" data-caso="2" data-dificultad="medio">
                <div class="card-header">
                    <span class="difficulty-badge medium">MEDIO</span>
                    <span class="xp-reward">+100 XP</span>
                </div>
                <img src="../src/img/tienda.png" alt="Caso 2">
                <p>PIXELSTORE</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>

            <div class="game-card unlocked <?php echo nivelCompletado(0, 3) ? 'completed' : ''; ?>" data-metodologia="scrum" data-caso="3" data-dificultad="dificil">
                <div class="card-header">
                    <span class="difficulty-badge hard">DIFÍCIL</span>
                    <span class="xp-reward">+200 XP</span>
                </div>
                <img src="../src/img/salud.png" alt="Caso 3">
                <p>HEALTHTRACK PRO</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>

            <div class="game-card unlocked <?php echo nivelCompletado(0, 4) ? 'completed' : ''; ?>" data-metodologia="scrum" data-caso="4">
                <div class="card-header">
                    <span class="difficulty-badge expert">EXPERT</span>
                    <span class="xp-reward">+300 XP</span>
                </div>
                <img src="../src/img/escuela.png" alt="Caso 3">
                <p>EDULEARN PLATFORM</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>

            <div class="game-card unlocked <?php echo nivelCompletado(0, 5) ? 'completed' : ''; ?>" data-metodologia="scrum" data-caso="5">
                <div class="card-header">
                    <span class="difficulty-badge master">MASTER</span>
                    <span class="xp-reward">+500 XP</span>
                </div>
                <img src="../src/img/casa.png" alt="Caso 3">
                <p>SMARTHOME CONTROL</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <p class="game-instruction">MISIONES PMBOK - GESTIÓN TRADICIONAL</p>
        <div class="cards-container">
            <div class="game-card unlocked <?php echo nivelCompletado(1, 1) ? 'completed' : ''; ?>" data-metodologia="pmbok" data-caso="1" data-dificultad="facil">
                <div class="card-header">
                    <span class="difficulty-badge easy">FÁCIL</span>
                    <span class="xp-reward">+50 XP</span>
                </div>
                <img src="../src/img/puente.png" alt="Caso 1">
                <p>PUENTE DEL NORTE</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>
            
            <div class="game-card unlocked <?php echo nivelCompletado(1, 2) ? 'completed' : ''; ?>" data-metodologia="pmbok" data-caso="2" data-dificultad="medio">
                <div class="card-header">
                    <span class="difficulty-badge medium">MEDIO</span>
                    <span class="xp-reward">+100 XP</span>
                </div>
                <img src="../src/img/manufactura.png" alt="Caso 2">
                <p>ERP CORPORATIVO</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>

            <div class="game-card unlocked <?php echo nivelCompletado(1, 3) ? 'completed' : ''; ?>" data-metodologia="pmbok" data-caso="3">
                <div class="card-header">
                    <span class="difficulty-badge hard">DIFÍCIL</span>
                    <span class="xp-reward">+200 XP</span>
                </div>
                <img src="../src/img/5G.png" alt="Caso 2">
                <p>EXPANSIÓN DE RED 5G</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>

            <div class="game-card unlocked <?php echo nivelCompletado(1, 4) ? 'completed' : ''; ?>" data-metodologia="pmbok" data-caso="4">
                <div class="card-header">
                    <span class="difficulty-badge expert">EXPERT</span>
                    <span class="xp-reward">+300 XP</span>
                </div>
                <img src="../src/img/verde.png" alt="Caso 2">
                <p>CENTRO DE DATOS VERDE</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>    

            <div class="game-card unlocked <?php echo nivelCompletado(1, 5) ? 'completed' : ''; ?>" data-metodologia="pmbok" data-caso="5">
                <div class="card-header">
                    <span class="difficulty-badge master">MASTER</span>
                    <span class="xp-reward">+500 XP</span>
                </div>
                <img src="../src/img/financiero.png" alt="Caso 2">
                <p>FUSIÓN EMPRESARIAL</p>
                <div class="card-footer">
                    <div class="card-stats">
                        <span><i class="bi bi-clock"></i> 10 días</span>
                        <span><i class="bi bi-list-task"></i> 10 tareas</span>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <audio id="miAudio" src="../src/audio/Ruins.mp3" autoplay loop muted></audio>

</body>

    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script src="../src/js/simulacion_hub.js" type="module"></script>
    <script src="../src/js/background_music.js" type="module"></script>
</html>