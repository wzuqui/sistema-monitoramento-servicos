--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
INSERT INTO Servicos (Nome) VALUES ('MSSQL');
INSERT INTO Servicos (Nome) VALUES ('Backend');
INSERT INTO Ouvintes (OrigemId, Ip, Porta, Ouvindo) VALUES (1, '127.0.0.1', 1433, 1);
INSERT INTO Conexoes (OrigemId, DestinoId, Ip, Porta) VALUES (2, 1, '127.0.0.1', 1433);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DELETE FROM Conexoes WHERE OrigemId = 2;
DELETE FROM Ouvintes WHERE OrigemId = 1;
DELETE FROM Servicos WHERE Nome = 'Backend';
DELETE FROM Servicos WHERE Nome = 'MSSQL';
DELETE FROM SQLITE_SEQUENCE WHERE name='Conexoes';
DELETE FROM SQLITE_SEQUENCE WHERE name='Ouvintes';
DELETE FROM SQLITE_SEQUENCE WHERE name='Servicos';
