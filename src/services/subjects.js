const {
    sequelize,
    Materias: SubjectModel,
} = require("../models");

const getSubject = async (id) => {
    const Subject = await SubjectModel.findOne({
        where: {
            id,
            estado: 1,
        },
    });
    return Subject;
}

const getSubjects = async (where) => {
    
    const Subjects = await SubjectModel.findAll({
        where: { estado: 1, ...where },
        order: [["id", "DESC"]]
    });
    return Subjects;
}

const createSubject = async (data) => {
    const t = await sequelize.transaction();

    try {
        const { id: newSubject } = await SubjectModel.create(data,
            {
                transaction: t,
            }
        );
        await t.commit();
        return {
            success: true,
            newSubject,
        };
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
}

const updateSubject = async (data, id) => {
    const t = await sequelize.transaction();

    try {
        const Subject = await SubjectModel.findOne({
            where: {
                id,
                estado: 1,
            },
        });

        if (Subject) {
            await filmsModel.update(data,
                {
                    where: {
                        id
                    },
                    transaction: t,
                }
            );
            await t.commit();

            const StrundetUpdated = await SubjectModel.findOne({
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

const deleteSubject = async (id) => {
    const t = await sequelize.transaction();

    try {
        
        await SubjectModel.update(
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
    getSubject,
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject
};