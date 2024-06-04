CREATE DATABASE tienda;

USE tienda;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255),
    descripcion TEXT,
    categoria VARCHAR(50)
);

INSERT INTO productos (nombre, precio, imagen, descripcion, categoria) VALUES
('Promo 2x1', 18000, 'assets/img/product/no-imagen.jpg', 'descripcion del producto', 'promos'),
('Hamburguesa Clásica', 8000, 'assets/img/product/no-imagen.jpg', 'Hamburguesa con queso y tomate', 'hamburguesas'),
('Salchipapa Tradicional', 7000, 'assets/img/product/no-imagen.jpg', 'Salchipapa con salsas y papas', 'salchipapas'),
('Perro Caliente', 5000, 'assets/img/product/no-imagen.jpg', 'Perro caliente con mostaza y ketchup', 'perros'),
('Jugo Natural', 3000, 'assets/img/product/no-imagen.jpg', 'Jugo de frutas natural', 'jugos');
