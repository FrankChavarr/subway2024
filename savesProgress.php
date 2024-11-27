<?php
// Configuración de CORS (ajustar en producción)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Establecer el tipo de contenido como JSON para la respuesta
header("Content-Type: application/json");

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar si los datos requeridos están presentes
    if (isset($_POST['userId']) && isset($_POST['unlockedStations'])) {
        $userId = $_POST['userId'];
        $unlockedStations = $_POST['unlockedStations'];

        // Validar los datos
        if (!is_string($userId) || empty($userId)) {
            http_response_code(400); // Solicitud incorrecta
            echo json_encode(["error" => "El userId es inválido o está vacío."]);
            exit;
        }

        // Decodificar las estaciones desbloqueadas (si es JSON en el campo del formulario)
        $decodedStations = json_decode($unlockedStations, true);
        if (!is_array($decodedStations)) {
            http_response_code(400);
            echo json_encode(["error" => "El formato de unlockedStations no es válido."]);
            exit;
        }

        // Convertir las estaciones desbloqueadas a JSON para almacenar en la base de datos
        $unlockedStationsJson = json_encode($decodedStations);

        // Conexión a la base de datos
        $host = "localhost";
        $dbName = "estacionesDB";
        $username = "admin";
        $password = "subterraneo2024";

        try {
            // Crear conexión PDO
            $pdo = new PDO("mysql:host=$host;dbname=$dbName;charset=utf8", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Verificar si el progreso ya existe para este usuario
            $sql = "SELECT * FROM progreso_usuario WHERE userid = :userid";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':userid', $userId);
            $stmt->execute();
            $existingData = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingData) {
                // Si el usuario tiene progreso, actualizar
                $sql = "UPDATE progreso_usuario SET unlockedStations = :unlockedStations WHERE userid = :userid";
            } else {
                // Si no existe, insertar un nuevo registro
                $sql = "INSERT INTO progreso_usuario (userid, unlockedStations) VALUES (:userid, :unlockedStations)";
            }

            // Preparar y ejecutar la consulta
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':userid', $userId);
            $stmt->bindParam(':unlockedStations', $unlockedStationsJson);
            $stmt->execute();

            // Respuesta exitosa
            http_response_code(200);
            echo json_encode(["message" => "Progreso guardado exitosamente."]);
        } catch (PDOException $e) {
            // Manejo de errores de la base de datos
            http_response_code(500);
            echo json_encode(["error" => "Error al guardar el progreso: " . $e->getMessage()]);
        }
    } else {
        // Faltan parámetros requeridos
        http_response_code(400);
        echo json_encode(["error" => "Parámetros requeridos faltantes."]);
    }
} else {
    // Solicitud inválida
    http_response_code(405); // Método no permitido
    echo json_encode(["error" => "Método no permitido."]);
}
?>
