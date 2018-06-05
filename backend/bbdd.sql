CREATE DATABASE IF NOT EXISTS remiseria_humberto;
USE remiseria_humberto;

CREATE TABLE usuarios(
    id int(255) auto_increment not null,
    nombre varchar(255) not null,
    CONSTRAINT pk_usuarios PRIMARY KEY (id)
)ENGINE=InnoDb;
