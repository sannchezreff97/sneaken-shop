-- Base de Datos para SNEAKEN. (Mendoza Store)
-- Examen Parcial Nro 2 - Práctica Profesional I (2026)

CREATE DATABASE IF NOT EXISTS sneaken_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sneaken_db;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Categorías (Géneros/Secciones)
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO categorias (id, nombre) VALUES 
(1, 'Hombre'), 
(2, 'Mujer'), 
(3, 'Kids')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);

-- Tabla de Productos (Las 22 zapatillas base del sistema)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    categoria_id INT NOT NULL,
    precio_ars DECIMAL(10, 2) NOT NULL,
    cuotas_texto VARCHAR(100) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    es_liquidacion TINYINT(1) DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar los 22 productos reales de Sneaken Shop
INSERT INTO productos (id, titulo, categoria_id, precio_ars, cuotas_texto, imagen, es_liquidacion) VALUES
(1, 'Zapatillas Montagne trekking', 1, 69999.00, '6 x $11.500 s/int.', 'imagenes/hombre1.webp', 0),
(2, 'Zapatillas Puma Park Lifestyle', 1, 100000.00, '6 x $16.666 s/int.', 'imagenes/hombre2.webp', 0),
(3, 'Zapatillas DC Shoes', 1, 120000.00, '6 x $20.000 s/int.', 'imagenes/hombre3.webp', 0),
(4, 'Zapatillas Stone Classic', 1, 75000.00, '6 x $12.500 s/int.', 'imagenes/hombre4.jpg', 0),
(5, 'Zapatillas John Foos', 1, 95000.00, '6 x $15.833 s/int.', 'imagenes/hpmbre5.webp', 0),
(6, 'Zapatos Britches', 1, 115000.00, '6 x $19.166 s/int.', 'imagenes/gala1.webp', 0),
(7, 'Zapatos Monstceler Gala', 1, 130000.00, '6 x $21.666 s/int.', 'imagenes/gala2.jpg', 0),

(8, 'Zapatillas Nike Airbag', 2, 150000.00, '6 x $25.000 s/int.', 'imagenes/mujer1.webp', 1),
(9, 'Zapatillas Adidas Print', 2, 100000.00, '6 x $16.666 s/int.', 'imagenes/mujer2.webp', 0),
(10, 'Zapatillas Aretha Negra', 2, 79000.00, '6 x $13.166 s/int.', 'imagenes/mujer3.webp', 0),
(11, 'Zapatillas Nike Revolution 8', 2, 129999.00, '6 x $21.666 s/int.', 'imagenes/mujer4.jpg', 0),
(12, 'Zapatillas Reebok F-S Purple', 2, 95000.00, '6 x $15.833 s/int.', 'imagenes/mujer5.webp', 0),
(13, 'Zapatos Stiletto', 2, 105000.00, '6 x $17.500 s/int.', 'imagenes/gala3.webp', 0),
(14, 'Zapatos Vizano Taco', 2, 135000.00, '6 x $22.500 s/int.', 'imagenes/gala4.webp', 0),

(15, 'Zapatillas Topper Spider', 3, 50999.00, '6 x $8.499 s/int.', 'imagenes/niño1.webp', 0),
(16, 'Zapatillas Fashion Galaxy', 3, 59000.00, '6 x $9.833 s/int.', 'imagenes/niño2.webp', 0),
(17, 'Zapatillas Addnice Classic', 3, 47000.00, '6 x $7.833 s/int.', 'imagenes/niño3.webp', 0),
(18, 'Escarpines Creaciones Emanuel Niño', 3, 39000.00, '6 x $6.500 s/int.', 'imagenes/niño7.jpeg', 0),
(19, 'Zapatillas Carpinchi', 3, 52000.00, '6 x $8.666 s/int.', 'imagenes/niña4.webp', 0),
(20, 'Zapatillas Topper Lovers', 3, 44000.00, '6 x $7.333 s/int.', 'imagenes/niña5.webp', 0),
(21, 'Zapatillas Pattin Girl', 3, 62000.00, '6 x $10.333 s/int.', 'imagenes/niña6.webp', 0),
(22, 'Escarpines Creaciones Emanuel Niña', 3, 40000.00, '6 x $6.666 s/int.', 'imagenes/naña8.jpeg', 0)
ON DUPLICATE KEY UPDATE titulo=VALUES(titulo), precio_ars=VALUES(precio_ars);

-- Tabla de Pedidos / Compras
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nombre_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(120) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    provincia VARCHAR(100) NOT NULL,
    total_ars DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    cuotas INT NOT NULL DEFAULT 1,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla Detalle de Pedidos
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    talle INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
