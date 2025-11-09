<?php
include '../config/database.php';
$error = ''; 
$usuario_value = '';
$is_error = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = mysqli_real_escape_string($db, $_POST['usuario']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $usuario_value = htmlspecialchars($usuario);

    // Verificar si el usuario existe
    $check_query = "SELECT password FROM usuarios WHERE usuario = '$usuario'";
    $check_resultado = mysqli_query($db, $check_query);
    
    if ($check_resultado && mysqli_num_rows($check_resultado) > 0) {
        $row = mysqli_fetch_assoc($check_resultado);
        $db_password_hash = $row['password'];
        
        // Verificar contraseña
        if (password_verify($password, $db_password_hash)) {
            // Login exitoso - iniciar sesión y redirigir
            session_start();
            $_SESSION['usuario'] = $usuario;
            
            // Enviar respuesta JSON para el manejo con JavaScript
            header('Location: intro.php');
            exit;
        } else {
            $error = 'Contraseña incorrecta.';
            $is_error = true;
        }
    } else {
        $error = 'Usuario no encontrado. Intenta de nuevo.';
        $is_error = true;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PMYSCRUM - Login</title>
    <link rel="stylesheet" href="../src/css/login.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body id="game-screen">

    <!-- Partículas de fondo -->
    <div id="particles-js"></div>

    <div class="header"> 
        <h1>INICIAR SESION - DESBLOQUEA LA AVENTURA</h1>
    </div>
    
    <button class="back-button" onclick="location.href = 'intro.php'">
        <i class="bi bi-arrow-left"></i>
    </button>

    <!-- Efectos de confeti -->
    <div id="confetti-container"></div>

    <div class="login-game-container">
        <!-- Panel izquierdo - Personaje y progreso -->
        <div class="game-panel">
            <div class="character-section">
                <div class="character-container">
                    <div class="character">
                        <img src="../src/img/personaje2.png" alt="Personaje Pixelado Guía" class="pixel-character-image">
                        <div class="character-glow"></div>
                        <div class="character-shadow"></div>
                    </div>
                    
                    <div class="speech-bubble <?php echo $is_error ? 'error-message' : ''; ?>" id="speechText">
                        <?php if (!empty($error)) echo $error; ?> 
                    </div>
                </div>
            </div>

            <!-- Estadísticas de progreso -->
            <div class="progress-section">
                <div class="progress-title">TU PROGRESO ESPERA</div>
                <div class="progress-stats">
                    <div class="progress-stat">
                        <i class="bi bi-journals"></i>
                        <span>+10 Contenidos</span>
                    </div>
                    <div class="progress-stat">
                        <i class="bi bi-puzzle"></i>
                        <span>5 Simulaciones</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel derecho - Formulario gamificado -->
        <div class="form-panel">
            <div class="form-header">
                <div class="form-title">
                    <i class="bi bi-key"></i>
                    <h2>ACCESO AL JUEGO</h2>
                </div>
                <div class="security-level">
                    <i class="bi bi-shield-check"></i>
                    Nivel de Seguridad: ALTO
                </div>
            </div>

            <form class="game-form" method="POST" id="loginForm">
                <div class="input-field">
                    <div class="input-label">
                        <i class="bi bi-person"></i>
                        <span>IDENTIFICACIÓN DE USUARIO</span>
                    </div>
                    <input type="text" name="usuario" placeholder="Ingresa tu usuario" required value="<?php echo $usuario_value; ?>" 
                           class="game-input" id="usernameInput">
                    <div class="input-particles" id="usernameParticles"></div>
                </div>

                <div class="input-field">
                    <div class="input-label">
                        <i class="bi bi-lock"></i>
                        <span>CÓDIGO DE ACCESO</span>
                    </div>
                    <input type="password" name="password" placeholder="Ingresa tu contraseña" required 
                           class="game-input" id="passwordInput">
                    <div class="input-particles" id="passwordParticles"></div>
                </div>

                <!-- Indicador de fuerza de contraseña -->
                <div class="password-strength" id="passwordStrength">
                    <div class="strength-bar">
                        <div class="strength-fill" id="strengthFill"></div>
                    </div>
                </div>

                <button type="submit" class="login-button" id="loginButton">
                    <i class="bi bi-play-circle"></i>
                    <span class="button-text">INICIAR SESION</span>
                    <div class="button-sparkle"></div>
                </button>

                <div class="form-footer">
                    <div class="toggle" onclick="window.location.href='registro.php'">
                        <i class="bi bi-person-plus"></i>
                        ¿Nuevo aventurero? ¡Regístrate aquí!
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Overlay de carga -->
    <div id="loginLoading" class="login-loading-overlay hidden">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text" id="loadingText">VERIFICANDO CREDENCIALES...</div>
            <div class="loading-progress">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        </div>
    </div>

    <audio id="miAudio" src="../src/audio/Ruins.mp3" autoplay loop muted></audio>

    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script src="../src/js/login.js"></script>
    <script src="../src/js/background_music.js" type="module"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const speech = document.getElementById('speechText');
            if (speech.textContent.trim() === "") {
                typeText('¡Ingresa tus credenciales para continuar la aventura!');
            }
        });
    </script>
</body>
</html>