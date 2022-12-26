"use strict";
module.exports = (sequelize, DataTypes) => {
    const Materias = sequelize.define(
        "Materias",
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
            codigo: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            creditos: {
                type: DataTypes.BIGINT(20),
                allowNull: false,
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
                allowNull: false,
            },
        },
        {
            tableName: "materia",
            timestamps: false,
        }
    );

    Materias.associate = function (models) {
        Materias.hasMany(models.EstudianteMateria, {
            foreignKey: "id_materia",
            as: "EstudianteMaterias",
        });
    };

    return Materias;
};