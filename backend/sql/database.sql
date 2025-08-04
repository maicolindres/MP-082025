-- Create Casos Table
CREATE TABLE Casos (
    id INT PRIMARY KEY IDENTITY(1,1),
    numero_caso VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    estado VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    fecha_creacion DATETIME DEFAULT GETDATE(),
    id_fiscal_asignado INT,
    id_fiscalia INT
);
GO

-- Stored Procedure to get all casos
CREATE OR ALTER PROCEDURE sp_get_all_casos
AS
BEGIN
    SELECT 
        c.id,
        c.numero_caso,
        c.descripcion,
        c.estado,
        c.fecha_creacion,
        c.id_fiscal_asignado,
        f.nombre AS nombre_fiscal,
        c.id_fiscalia,
        fi.nombre AS nombre_fiscalia
    FROM Casos c
    LEFT JOIN Fiscales f ON c.id_fiscal_asignado = f.id
    LEFT JOIN Fiscalias fi ON c.id_fiscalia = fi.id;
END;
GO

-- Stored Procedure to insert a new caso
CREATE PROCEDURE sp_insert_caso
    @numero_caso VARCHAR(50),
    @descripcion TEXT,
    @estado VARCHAR(50) = 'pendiente',
    @id_fiscal_asignado INT,
    @id_fiscalia INT
AS
BEGIN
    INSERT INTO Casos (numero_caso, descripcion, estado, id_fiscal_asignado, id_fiscalia)
    VALUES (@numero_caso, @descripcion, @estado, @id_fiscal_asignado, @id_fiscalia);
END;
GO

-- Stored Procedure to get a caso by ID
CREATE PROCEDURE sp_get_caso_by_id
    @id INT
AS
BEGIN
    SELECT * FROM Casos WHERE id = @id;
END;
GO

-- Stored Procedure to update a caso by ID
CREATE PROCEDURE sp_update_caso
    @id INT,
    @numero_caso VARCHAR(50),
    @descripcion TEXT,
    @estado VARCHAR(50),
    @id_fiscal_asignado INT,
    @id_fiscalia INT
AS
BEGIN
    UPDATE Casos
    SET numero_caso = @numero_caso,
        descripcion = @descripcion,
        estado = @estado,
        id_fiscal_asignado = @id_fiscal_asignado,
        id_fiscalia = @id_fiscalia
    WHERE id = @id;
END;
GO

-- Stored Procedure to delete a caso by ID
CREATE PROCEDURE sp_delete_caso
    @id INT
AS
BEGIN
    DELETE FROM Casos WHERE id = @id;
END;
GO


--IF OBJECT_ID('sp_delete_caso', 'P') IS NOT NULL
--    DROP PROCEDURE sp_delete_caso;
--GO


-- Tabla Fiscalias
CREATE TABLE Fiscalias (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL
);
GO

-- Tabla Fiscales
CREATE TABLE Fiscales (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    id_fiscalia INT NOT NULL,
    FOREIGN KEY (id_fiscalia) REFERENCES Fiscalias(id)
);
GO

-- Tabla LogsReasignacion
CREATE TABLE LogsReasignacion (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_caso INT NOT NULL,
    id_fiscal_anterior INT NOT NULL,
    id_fiscal_nuevo INT NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),
    motivo VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_caso) REFERENCES Casos(id),
    FOREIGN KEY (id_fiscal_anterior) REFERENCES Fiscales(id),
    FOREIGN KEY (id_fiscal_nuevo) REFERENCES Fiscales(id)
);
GO

-- Procedimiento para reasignar caso
CREATE PROCEDURE sp_reasignar_caso
    @id_caso INT,
    @id_fiscal_nuevo INT
AS
BEGIN
    DECLARE @estado_actual VARCHAR(50);
    DECLARE @id_fiscalia_actual INT;
    DECLARE @id_fiscalia_nuevo INT;
    DECLARE @id_fiscal_anterior INT;

    SELECT @estado_actual = estado, @id_fiscal_anterior = id_fiscal_asignado, @id_fiscalia_actual = id_fiscalia
    FROM Casos WHERE id = @id_caso;

    SELECT @id_fiscalia_nuevo = id_fiscalia FROM Fiscales WHERE id = @id_fiscal_nuevo;

    IF @estado_actual = 'pendiente' AND @id_fiscalia_actual = @id_fiscalia_nuevo
    BEGIN
        UPDATE Casos SET id_fiscal_asignado = @id_fiscal_nuevo WHERE id = @id_caso;
    END
    ELSE
    BEGIN
        INSERT INTO LogsReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
        VALUES (@id_caso, @id_fiscal_anterior, @id_fiscal_nuevo, 'Intento fallido de reasignación');
    END
END;
GO

CREATE TABLE HistorialCasos (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_caso INT NOT NULL,
    estado VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL, -- explicación de la actualización (opcional)
    fecha DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_caso) REFERENCES Casos(id)
);
GO
CREATE PROCEDURE sp_registrar_historial_caso
    @id_caso INT,
    @estado VARCHAR(50),
    @descripcion VARCHAR(255) = NULL
AS
BEGIN
    INSERT INTO HistorialCasos (id_caso, estado, descripcion)
    VALUES (@id_caso, @estado, @descripcion);
END;
GO


CREATE PROCEDURE sp_GetFiscalias
AS
BEGIN
    SELECT 
        id, 
        nombre
    FROM Fiscalias
    ORDER BY nombre;
END
GO

CREATE PROCEDURE sp_GetFiscales
AS
BEGIN
    SELECT 
        f.id,
        f.nombre,
        f.id_fiscalia
    FROM Fiscales f
    ORDER BY f.nombre;
END
GO

CREATE PROCEDURE sp_GetHistorialCaso
    @id_caso INT
AS
BEGIN
    SELECT 
        id,
        id_caso,
        estado,
        descripcion,
        fecha
    FROM HistorialCasos
    WHERE id_caso = @id_caso
    ORDER BY fecha DESC;
END
GO

CREATE PROCEDURE sp_GetHistorialCaso
    @id_caso INT
AS
BEGIN
    SELECT 
        id,
        id_caso,
        estado,
        descripcion,
        fecha
    FROM HistorialCasos
    WHERE id_caso = @id_caso
    ORDER BY fecha DESC;
END
GO

CREATE PROCEDURE sp_GetInformeCasos
    @estado VARCHAR(50) = NULL,
    @fecha_desde DATE = NULL,
    @fecha_hasta DATE = NULL
AS
BEGIN
    SELECT 
        estado,
        COUNT(*) AS total
    FROM Casos
    WHERE 
        (@estado IS NULL OR estado = @estado)
        AND (@fecha_desde IS NULL OR fecha_creacion >= @fecha_desde)
        AND (@fecha_hasta IS NULL OR fecha_creacion <= @fecha_hasta)
    GROUP BY estado
    ORDER BY estado;
END
GO

CREATE PROCEDURE sp_GetLogsReasignacion
AS
BEGIN
    SELECT 
        l.id,
        l.id_caso,
        l.id_fiscal_anterior,
        l.id_fiscal_nuevo,
        l.motivo,
        l.fecha,
        c.numero_caso,
        fa.nombre AS nombre_fiscal_anterior,
        fn.nombre AS nombre_fiscal_nuevo
    FROM LogsReasignacion l
    LEFT JOIN Casos c ON l.id_caso = c.id
    LEFT JOIN Fiscales fa ON l.id_fiscal_anterior = fa.id
    LEFT JOIN Fiscales fn ON l.id_fiscal_nuevo = fn.id
    ORDER BY l.fecha DESC;
END
GO

CREATE PROCEDURE sp_UpdateCasoById
    @id INT,
    @numero_caso VARCHAR(50) = NULL,
    @descripcion TEXT = NULL,
    @estado VARCHAR(50) = NULL,
    @id_fiscal_asignado INT = NULL,
    @id_fiscalia INT = NULL
AS
BEGIN
    -- Actualizar solo los campos que no son NULL
    UPDATE Casos 
    SET 
        numero_caso = ISNULL(@numero_caso, numero_caso),
        descripcion = ISNULL(@descripcion, descripcion),
        estado = ISNULL(@estado, estado),
        id_fiscal_asignado = ISNULL(@id_fiscal_asignado, id_fiscal_asignado),
        id_fiscalia = ISNULL(@id_fiscalia, id_fiscalia)
    WHERE id = @id;
    
    -- Retornar el número de filas afectadas
    SELECT @@ROWCOUNT AS rowsAffected;
END
GO

CREATE PROCEDURE sp_RegistrarHistorialCaso
    @id_caso INT,
    @estado VARCHAR(50),
    @descripcion VARCHAR(255)
AS
BEGIN
    INSERT INTO HistorialCasos (id_caso, estado, descripcion)
    VALUES (@id_caso, @estado, @descripcion);
END
GO