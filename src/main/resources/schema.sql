DROP TABLE IF EXISTS evidencias;
DROP TABLE IF EXISTS incidentes;
DROP TABLE IF EXISTS modificaciones;
DROP TABLE IF EXISTS registros_acceso;
DROP TABLE IF EXISTS modulos;
DROP TABLE IF EXISTS entidades;

CREATE TABLE entidades (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    alias VARCHAR(100),
    estado VARCHAR(50) NOT NULL,
    nivel_acceso VARCHAR(50) NOT NULL,
    observaciones VARCHAR(500)
);

CREATE TABLE modulos (
    id INT PRIMARY KEY,
    nombre_modulo VARCHAR(100) NOT NULL,
    criticidad VARCHAR(20) NOT NULL,
    estado_actual VARCHAR(30) NOT NULL,
    descripcion VARCHAR(500)
);

CREATE TABLE registros_acceso (
    id INT PRIMARY KEY,
    entidad_id INT NOT NULL,
    modulo_id INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    accion VARCHAR(50) NOT NULL,
    resultado VARCHAR(30) NOT NULL,
    FOREIGN KEY (entidad_id) REFERENCES entidades(id),
    FOREIGN KEY (modulo_id) REFERENCES modulos(id)
);

CREATE TABLE modificaciones (
    id INT PRIMARY KEY,
    entidad_id INT NOT NULL,
    modulo_id INT NOT NULL,
    campo_modificado VARCHAR(100) NOT NULL,
    valor_anterior VARCHAR(200),
    valor_nuevo VARCHAR(200),
    nivel_anomalia VARCHAR(20) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (entidad_id) REFERENCES entidades(id),
    FOREIGN KEY (modulo_id) REFERENCES modulos(id)
);

CREATE TABLE incidentes (
    id INT PRIMARY KEY,
    codigo_incidente VARCHAR(50) NOT NULL,
    modulo_id INT NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    patron_detectado VARCHAR(50) NOT NULL,
    clasificacion VARCHAR(20) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (modulo_id) REFERENCES modulos(id)
);

CREATE TABLE evidencias (
    id INT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    entidad_relacionada_id INT,
    nivel_confianza VARCHAR(20) NOT NULL,
    origen VARCHAR(50) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (entidad_relacionada_id) REFERENCES entidades(id)
);