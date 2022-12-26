const expresss = require("express");
const SubjectsService = require("../services/subjects");

const SubjectsApi = (app) => {
    const router = expresss.Router();
    app.use("/subjects", router);

    router.get("/:SubjectId", async function (req, res, next) {
        const { SubjectId } = req.params;
        try {
            const Subject = await SubjectsService.getSubject(SubjectId);

            res.status(200).json({
                Subject,
                message: Subject
                    ? "se encontro la materia."
                    : "no se encontro la materia.",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/getSubjects", async function (req, res, next) {
        const { body: where } = req;
        try {
            const Subjects = await SubjectsService.getSubjects(where);

            res.status(200).json({
                Subjects,
                message:
                    Subjects.length > 0
                        ? "Materias encontradas."
                        : "Materias no encontradas.",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
            const movieCreated = await SubjectsService.createSubject(data);
            res.status(201).json({
                movieCreated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/:SubjectId", async function (req, res, next) {
        const { body: data } = req;
        const { SubjectId } = req.params;

        try {
            const strundetUpdated = await SubjectsService.updateSubject(data, SubjectId);

            res.status(201).json({
                strundetUpdated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:SubjectId", async function (req, res, next) {
        const { SubjectId } = req.params;

        try {
            const SubjectDeleted = await SubjectsService.deleteSubject(SubjectId);

            res.status(200).json({
                SubjectId: SubjectDeleted,
            });
        } catch (error) {
            next(error);
        }
    });

}

module.exports = SubjectsApi;