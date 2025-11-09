<?php
session_start();
header('Content-Type: application/json');

// Verificar si el usuario está logueado
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado']);
    exit;
}

include '../config/database.php';

// Verificar si la conexión a la base de datos se estableció correctamente
if (!isset($db)) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos']);
    exit;
}

try {
    // Datos recibidos
    $usuario = $_SESSION['usuario'];
    $progreso = isset($_POST['progreso']) ? intval($_POST['progreso']) : 0;

    // Verificar si ya existe un registro para este usuario
    $checkStmt = $db->prepare("SELECT id FROM teoria_scrum WHERE usuario = ?");
    $checkStmt->bind_param('s', $usuario);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    $existingRecord = $result->fetch_assoc();

    if ($existingRecord) {
        // Actualizar registro existente
        $stmt = $db->prepare("UPDATE teoria_scrum SET progreso = ? WHERE usuario = ?");
        $stmt->bind_param('is', $progreso, $usuario);
        $result = $stmt->execute();
    } else {
        // Insertar nuevo registro
        $stmt = $db->prepare("INSERT INTO teoria_scrum (usuario, progreso) VALUES (?, ?)");
        $stmt->bind_param('si', $usuario, $progreso);
        $result = $stmt->execute();
    }

    if ($result) {
        echo json_encode(['success' => true, 'progreso' => $progreso, 'usuario' => $usuario]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error en la consulta: ' . $db->error]);
    }

} catch(Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error: ' . $e->getMessage()]);
}
?>