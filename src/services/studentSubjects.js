const {
    sequelize,
    EstudianteMateria: studentSubjectModel,
    Estudiantes: studentModel,
    Materias: SubjectModel
} = require("../models");

const getstudentSubject = async (id) => {
    const studentSubject = await studentSubjectModel.findOne({
        where: {
            id,
            estado: 1,
        },
    });
    return studentSubject;
}

const getstudentSubjects = async (where) => {
    const studentSubjects = await studentSubjectModel.findAll({
        where: { estado: 1, ...where },
        include: [{model: studentModel, require:true, as: "estudiante"}, {model: SubjectModel, require:true, as: "materias",}],
        order: [["id", "DESC"]]
    });
    return studentSubjects;
}

const createstudentSubject = async (data) => {
    const t = await sequelize.transaction();

    try {
        const { id: newstudentSubject } = await studentSubjectModel.create(data,
            {
                transaction: t,
            }
        );
        await t.commit();
        return {
            success: true,
            newstudentSubject,
        };
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
}

const updatestudentSubject = async (data, id) => {
    const t = await sequelize.transaction();

    try {
        const studentSubject = await studentSubjectModel.findOne({
            where: {
                id,
                estado: 1,
            },
        });

        if (studentSubject) {
            await filmsModel.update(data,
                {
                    where: {
                        id
                    },
                    transaction: t,
                }
            );
            await t.commit();

            const StrundetUpdated = await studentSubjectModel.findOne({
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

const deletestudentSubject = async (id) => {
    const t = await sequelize.transaction();

    try {
        
        await studentSubjectModel.update(
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
    getstudentSubject,
    getstudentSubjects,
    createstudentSubject,
    updatestudentSubject,
    deletestudentSubject
};