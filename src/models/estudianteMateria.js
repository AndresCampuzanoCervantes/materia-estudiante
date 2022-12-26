"use strict";
module.exports = (sequelize, DataTypes) => {
    const EstudianteMateria = sequelize.define(
        "EstudianteMateria",
        {
            id: {
                type: DataTypes.BIGINT(20),
                primaryKey: true,
                autoIncrement: true,
            },
            id_estudiante: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            },
            id_materia: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            },
            orden: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            estado: {
                type: DataTypes.TINYINT(4),
                allowNull: false,
                defaultValue: 1,
            }
        },
        {
            tableName: "estudiante-materia",
            timestamps: false,
        }
    );

    EstudianteMateria.associate = function (models) {
        EstudianteMateria.belongsTo(models.Estudiantes, {
            foreignKey: "id_estudiante",
            as: "estudiante",
        });
        EstudianteMateria.belongsTo(models.Materias, {
            foreignKey: "id_materia",
            as: "materias",
        });
    };

    return EstudianteMateria;
};