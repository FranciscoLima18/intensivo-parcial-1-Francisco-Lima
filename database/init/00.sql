CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabla de usuarios sin el hash
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE,
    roles TEXT[] NOT NULL DEFAULT '{}'::TEXT[]
)
;

-- Tabla con solo el hash
CREATE TABLE IF NOT EXISTS credenciales (
    id_usuario INTEGER NOT NULL PRIMARY KEY REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    password_hash TEXT NOT NULL
)
;

-- Tabla de departamentos
CREATE TABLE IF NOT EXISTS departamentos (
    id_departamento SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla de localidades
CREATE TABLE IF NOT EXISTS localidades (
    id_localidad INTEGER PRIMARY KEY,
    id_departamento INTEGER NOT NULL REFERENCES departamentos(id_departamento) ON DELETE CASCADE,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    UNIQUE(id_departamento, nombre) -- Evita duplicados dentro del mismo departamento
);

-- Dar de alta 1 usuario admin y dos normales.
WITH nuevos_usuarios AS (
  INSERT INTO usuarios (nombre, roles)
  VALUES 
    ('admin', ARRAY[1,2]),
    ('usuario1', ARRAY[2]),
    ('usuario2', ARRAY[2])
  RETURNING id_usuario
)
INSERT INTO credenciales (id_usuario, password_hash)
SELECT id_usuario,crypt('contraseña', gen_salt('bf'))
FROM nuevos_usuarios
;

INSERT INTO departamentos (nombre) VALUES
    ('Artigas'),
    ('Canelones'),
    ('Cerro Largo'),
    ('Colonia'),
    ('Durazno'),
    ('Flores'),
    ('Florida'),
    ('Lavalleja'),
    ('Maldonado'),
    ('Montevideo'),
    ('Paysandú'),
    ('Río Negro'),
    ('Rivera'),
    ('Rocha'),
    ('Salto'),
    ('San José'),
    ('Soriano'),
    ('Tacuarembó'),
    ('Treinta y Tres')
;

