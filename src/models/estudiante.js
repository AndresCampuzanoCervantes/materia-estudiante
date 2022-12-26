"use strict";
module.exports = (sequelize, DataTypes) => {
    const Estudiantes = sequelize.define(
        "Estudiantes",
        {
            id: {
                type: DataTypes.BIGINT(20),
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
                allowNull: false,
            },
        },
        {
            tableName: "estudiante",
            timestamps: false,
        }
    );

    Estudiantes.associate = function (models) {
        Estudiantes.hasMany(models.EstudianteMateria, {
            foreignKey: "id_estudiante",
            as: "EstudianteMaterias",
        });
    };

    return Estudiantes;
};