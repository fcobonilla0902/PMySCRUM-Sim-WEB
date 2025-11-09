<?php
session_start();
header('Content-Type: application/json');

// Desactivar visualización de errores
ini_set('display_errors', 0);
error_reporting(0);

// Incluir configuración de base de datos
include '../config/database.php';

// Validar que el usuario esté logueado
if (!isset($_SESSION['usuario'])) {
    echo json_encode(['success' => false, 'error' => 'Usuario no autenticado']);
    exit;
}

// Leer los datos JSON enviados
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data === null) {
    echo json_encode(['success' => false, 'error' => 'Datos JSON inválidos']);
    exit;
}

// Validar datos requeridos
$required_fields = ['juego_id', 'tipo', 'resultado', 'tiempo', 'costos', 'calidad', 'motivacion'];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        echo json_encode(['success' => false, 'error' => "Campo requerido faltante: $field"]);
        exit;
    }
}

// Usar la conexión $db que ya existe desde database.php
if (!$db) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos']);
    exit;
}

try {
    // Preparar la consulta INSERT usando la conexión $db existente
    $sql = "INSERT INTO records_juegos (usuario, juego_id, tipo, resultado, tiempo, costos, calidad, motivacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $db->prepare($sql);
    if (!$stmt) {
        throw new Exception('Error al preparar la consulta: ' . $db->error);
    }
    
    // Vincular parámetros
    $bind_result = $stmt->bind_param(
        "siiiiiii", 
        $_SESSION['usuario'],
        $data['juego_id'],
        $data['tipo'],
        $data['resultado'],
        $data['tiempo'],
        $data['costos'],
        $data['calidad'],
        $data['motivacion']
    );
    
    if (!$bind_result) {
        throw new Exception('Error al vincular parámetros: ' . $stmt->error);
    }
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        $response = [
            'success' => true, 
            'message' => 'Resultados guardados correctamente',
            'insert_id' => $stmt->insert_id
        ];
    } else {
        throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
    }
    
    // Cerrar statement
    $stmt->close();
    
    echo json_encode($response);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'error' => $e->getMessage()
    ]);
}

// NO cerrar $db para no afectar otras partes de la aplicación
?>