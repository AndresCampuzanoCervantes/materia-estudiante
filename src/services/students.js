const {
    sequelize,
    Estudiantes: studentModel,
} = require("../models");

const getStudent = async (id) => {
    const student = await studentModel.findOne({
        where: {
            id,
            estado: 1,
        },
    });
    return student;
}

const getStudents = async (where) => {
    const students = await studentModel.findAll({
        where: { estado: 1, ...where },
        order: [["id", "DESC"]]
    });
    return students;
}

const createStudent = async (data) => {
    const t = await sequelize.transaction();

    try {
        const { id: newStudent } = await studentModel.create(data,
            {
                transaction: t,
            }
        );
        await t.commit();
        return {
            success: true,
            newStudent,
        };
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
}

const updateStudent = async (data, id) => {
    const t = await sequelize.transaction();

    try {
        const student = await studentModel.findOne({
            where: {
                id,
                estado: 1,
            },
        });

        if (student) {
            await filmsModel.update(data,
                {
                    where: {
                        id
                    },
                    transaction: t,
                }
            );
            await t.commit();

            const StrundetUpdated = await studentModel.findOne({
                where: { id: movieId, estado: 1 },
            });

            return {
                success: true,
                StrundetUpdated,
            };

        } else {
            return {
                success: false,
                message: "el estudiante no se encuentra registrado",
            };
        }
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
}

const deleteStudent = async (id) => {
    const t = await sequelize.transaction();

    try {
        
        await studentModel.update(
            {
                estado: -1,
            },
            {
                where: {
                    id
                },
                transaction: t,
            }
        );

        await t.commit();
        return { success: true, deleted: id };
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
}
module.exports = {
    getStudent,
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};