require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/question", require("./Routes/questionRouter"));
app.use("/submission", require("./Routes/submissionRouter"));
app.use("/user", require("./Routes/userRouter"));

module.exports = app;
