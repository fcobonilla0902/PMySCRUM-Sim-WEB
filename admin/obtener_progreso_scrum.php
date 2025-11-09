<?php
session_start();
header('Content-Type: application/json');

// Verificar si el usuario está logueado
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado', 'progreso' => 0]);
    exit;
}

include '../config/database.php';

if (!isset($db)) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión a BD', 'progreso' => 0]);
    exit;
}

try {
    $usuario = $_SESSION['usuario'];
    
    // Obtener el progreso guardado
    $stmt = $db->prepare("SELECT progreso FROM teoria_scrum WHERE usuario = ?");
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $progresoData = $result->fetch_assoc();

    if ($progresoData) {
        echo json_encode([
            'success' => true, 
            'progreso' => $progresoData['progreso'],
            'usuario' => $usuario
        ]);
    } else {
        // Si no existe registro, devolver 0%
        echo json_encode([
            'success' => true, 
            'progreso' => 0,
            'usuario' => $usuario
        ]);
    }

} catch(Exception $e) {
    echo json_encode([
        'success' => false, 
        'error' => 'Error: ' . $e->getMessage(),
        'progreso' => 0
    ]);
}
?>