const expresss = require("express");
const studentsService = require("../services/students");

const StudentsApi = (app) => {
    const router = expresss.Router();
    app.use("/students", router);

    router.get("/:studentId", async function (req, res, next) {
        const { studentId } = req.params;
        try {
            const student = await studentsService.getStudent(studentId);

            res.status(200).json({
                student,
                message: student
                    ? "se encontro el estudiante."
                    : "no se encontro el estudiante.",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/getStudents", async function (req, res, next) {
        const { body: where } = req;
        try {
            const students = await studentsService.getStudents(where);

            res.status(200).json({
                students,
                message:
                    students.length > 0
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
            const movieCreated = await studentsService.createStudent(data);
            res.status(201).json({
                movieCreated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/:studentId", async function (req, res, next) {
        const { body: data } = req;
        const { studentId } = req.params;

        try {
            const strundetUpdated = await studentsService.updateStudent(data, studentId);

            res.status(201).json({
                strundetUpdated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:studentId", async function (req, res, next) {
        const { studentId } = req.params;

        try {
            const studentDeleted = await studentsService.deleteStudent(studentId);

            res.status(200).json({
                studentId: studentDeleted,
            });
        } catch (error) {
            next(error);
        }
    });

}

module.exports = StudentsApi;