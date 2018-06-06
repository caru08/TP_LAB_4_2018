CREATE DATABASE IF NOT EXISTS remiseria_humberto;
USE remiseria_humberto;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios(
    id int(255) auto_increment not null,
    name varchar(255) not null,
    email varchar(50),
    sex varchar(50),
    role varchar(50),
    password varchar(255) not null,
    CONSTRAINT pk_usuarios PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
)ENGINE=InnoDb;

INSERT INTO usuarios VALUES (null, 'admin', 'admin@email.com', '', 'admin', '81dc9bdb52d04dc20036dbd8313ed055') 
