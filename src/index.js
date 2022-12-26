const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const studentsApi = require("./routers/students");
const SubjectApi = require("./routers/subject");
const studentSubjectsApi = require("./routers/studentSubject");
const cors = require('cors');


app.use(cors())
app.use(express.json());
app.set("key", config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

studentsApi(app);
SubjectApi(app);
studentSubjectsApi(app)

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});