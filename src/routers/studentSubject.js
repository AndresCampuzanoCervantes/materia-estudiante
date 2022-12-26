const expresss = require("express");
const studentSubjectsService = require("../services/studentSubjects");

const studentSubjectsApi = (app) => {
    const router = expresss.Router();
    app.use("/studentSubjects", router);

    router.get("/:studentSubjectId", async function (req, res, next) {
        const { studentSubjectId } = req.params;
        try {
            const studentSubject = await studentSubjectsService.getstudentSubject(studentSubjectId);

            res.status(200).json({
                studentSubject,
                message: studentSubject
                    ? "se encontro el estudiante."
                    : "no se encontro el estudiante.",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/getstudentSubjects", async function (req, res, next) {
        const { body: where } = req;
        try {
            const studentSubjects = await studentSubjectsService.getstudentSubjects(where);

            res.status(200).json({
                studentSubjects,
                message:
                    studentSubjects.length > 0
                        ? "Se encontro los estudiantes."
                        : "No se encontro los estudiantes.",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
            const movieCreated = await studentSubjectsService.createstudentSubject(data);
            res.status(201).json({
                movieCreated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/:studentSubjectId", async function (req, res, next) {
        const { body: data } = req;
        const { studentSubjectId } = req.params;

        try {
            const strundetUpdated = await studentSubjectsService.updatestudentSubject(data, studentSubjectId);

            res.status(201).json({
                strundetUpdated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:studentSubjectId", async function (req, res, next) {
        const { studentSubjectId } = req.params;

        try {
            const studentSubjectDeleted = await studentSubjectsService.deletestudentSubject(studentSubjectId);

            res.status(200).json({
                studentSubjectId: studentSubjectDeleted,
            });
        } catch (error) {
            next(error);
        }
    });

}

module.exports = studentSubjectsApi;