<?php
// Incluir el archivo de conexión a la base de datos
include "database.php";

// Consultar los datos de los productos
$sql = "SELECT * FROM productos";
$result = $conn->query($sql);

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    // Inicializar un array para almacenar los datos de los productos
    $productos = array();

    // Iterar sobre los resultados y almacenarlos en el array
    while ($row = $result->fetch_assoc()) {
        // Crear un array asociativo para cada producto
        $producto = array(
            "nombre" => $row["nombre"],
            "precio" => $row["precio"],
            "imagen" => $row["imagen"],
            "descripcion" => $row["descripcion"],
            "categoria" => $row["categoria"]
        );

        // Agregar el producto al array de productos
        $productos[] = $producto;
    }

    // Convertir el array de productos a formato JSON y devolverlo
    header('Content-Type: application/json');
    echo json_encode($productos);
} else {
    // Si no se encontraron productos, devolver un mensaje
    echo "No se encontraron productos.";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
