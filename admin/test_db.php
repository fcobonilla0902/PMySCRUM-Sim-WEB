<?php
session_start();
$_SESSION['usuario'] = 'test_user';

include '../config/database.php';

echo "<h2>Test de Base de Datos</h2>";

// Usar la conexión $db existente
if ($db->connect_error) {
    die("Error de conexión: " . $db->connect_error);
}
echo "✓ Conexión exitosa<br>";

// Test inserción
$sql = "INSERT INTO records_juegos (usuario, juego_id, tipo, resultado, tiempo, costos, calidad, motivacion) 
        VALUES ('test_user', 1, 0, 1, 80, 75, 85, 90)";

if ($db->query($sql) === TRUE) {
    echo "✓ Inserción test exitosa. ID: " . $db->insert_id . "<br>";
} else {
    echo "✗ Error en inserción: " . $db->error . "<br>";
}

// Mostrar últimos registros
$result = $db->query("SELECT * FROM records_juegos ORDER BY id DESC LIMIT 3");
echo "<h3>Últimos registros:</h3>";
while($row = $result->fetch_assoc()) {
    echo "ID: " . $row['id'] . " - Usuario: " . $row['usuario'] . " - Juego: " . $row['juego_id'] . "<br>";
}

// NO cerrar $db
?>