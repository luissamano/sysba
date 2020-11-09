CREATE DATABASE db_examen;
GO

USE db_examen;
GO

CREATE TABLE tblDepartamentos (
	id INT IDENTITY(1,1) PRIMARY KEY,
	departamento NVARCHAR(50) NOT NULL
);
GO

CREATE TABLE tblEmpleados (
	id INT IDENTITY(1,1) PRIMARY KEY,
	nombre NVARCHAR(50) NOT NULL,
	edad INT NOT NULL,
	sexo CHAR NOT NULL,
	id_departamento INT FOREIGN KEY REFERENCES tblDepartamentos(id)
);
GO

-- Insertado de datos

INSERT INTO tblDepartamentos (departamento) 
VALUES ('Finanzas'), ('RH'), ('Sistemas')
GO

INSERT INTO tblEmpleados (nombre, edad, sexo, id_departamento) 
VALUES ('Sofia', 26, 'F', 1), ('Luis', 23, 'M', 2), ('Martin', 3, 'M', 3), ('Luz', 39, 'F', 2)
GO


SELECT * FROM tblEmpleados;
SELECT * FROM tblDepartamentos;



-- Procedimientos alamcenados

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spEmpleados 
AS
BEGIN
	SELECT e.id, e.nombre, e.edad, e.sexo, d.id, d.departamento FROM tblEmpleados e
	INNER JOIN tblDepartamentos d
	ON e.id_departamento = d.id;
END
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spDepartamentos 
AS
BEGIN
	SELECT * FROM tblDepartamentos;
END
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spEmpleadosByDepartamento 
	@id_departamento INT = NULL
AS
BEGIN
	SELECT e.id, e.nombre, e.edad, e.sexo, d.id, d.departamento FROM tblEmpleados e
	INNER JOIN tblDepartamentos d
	ON e.id_departamento = d.id
	WHERE d.id = @id_departamento;
END
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE spInsertEmpleado 
	@nombre NVARCHAR(50) = NULL,
	@edad INT = NULL,
	@sexo CHAR = NULL,
	@id_departamento INT = NULL
AS
BEGIN
	INSERT INTO tblEmpleados (nombre, edad, sexo, id_departamento)
	VALUES (@nombre, @edad, @sexo, @id_departamento)
END
GO



