--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE Servicos (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nome TEXT NOT NULL COLLATE NOCASE
);


CREATE TABLE Ouvintes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    OrigemId INTEGER NOT NULL,
    Ip TEXT NOT NULL,
    Porta INTEGER NOT NULL,
    Ouvindo BOOLEAN NOT NULL,
    CONSTRAINT FK_Ouvintes_OrigemId FOREIGN KEY (OrigemId) REFERENCES Origens (Id)
);

CREATE TABLE Conexoes (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    OrigemId INTEGER NOT NULL,
    DestinoId INTEGER NOT NULL,
    Ip TEXT NOT NULL,
    Porta INTEGER NOT NULL,
    CONSTRAINT FK_Conexoes_OrigemId FOREIGN KEY (OrigemId) REFERENCES Origens (Id),
    CONSTRAINT FK_Conexoes_DestinoId FOREIGN KEY (DestinoId) REFERENCES Origens (Id)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE Conexoes;
DROP TABLE Ouvintes;
DROP TABLE Servicos;