USE planoartistico;

-- Login

CREATE TABLE Login (
    ID INT NOT NULL auto_increment,
    nome VARCHAR(10) NOT NULL,
    senha VARCHAR(200) NOT NULL,
    dataCriacao TIMESTAMP NULL DEFAULT current_timestamp,
    PRIMARY KEY (ID)
);

-- Postagem

CREATE TABLE postagem (
    ID INT NOT NULL auto_increment,
    titulo VARCHAR(30) NOT NULL,
    nomeOriginal VARCHAR(50) NOT NULL,
    chave VARCHAR(100) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    url VARCHAR(100) NOT NULL,
    urlPreview VARCHAR(100) NOT NULL,
    urlFrente VARCHAR(100) NOT NULL,
    urlVerso VARCHAR(100) NOT NULL,
    tamanhoArquivo INT NOT NULL,
    dataCriacao TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    direita INT(11) NULL DEFAULT 0,
    esquerda INT(11) NULL DEFAULT 0,
    cima INT(11) NULL DEFAULT 0,
    baixo INT(11) NULL DEFAULT 0,
    largura INT(11) NULL DEFAULT 50,
    chaveArteFrente VARCHAR(100) NULL,
    chaveArteVerso VARCHAR(100) NULL,
    PRIMARY KEY (ID)
);