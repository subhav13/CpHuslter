const Question = require("../Models/questionModel");

exports.getAllQuestion = async (req, res) => {
  try {
    let data = await Question.find({});
    res.send({
      error: false,
      message: "Questions fetched successfully",
      data: data,
    });
  } catch (e) {
    res.send({
      erorr: true,
      message: "error occurred",
    });
  }
};

exports.postQuestion = async (req, res) => {
  let body = req.body;
  console.log(body)
  if (
    !body.title ||
    !body.points ||
    !body.difficulty_level ||
    !body.description ||
    !body.sample_test_case_input ||
    !body.sample_test_case_output
  ) {
    return res.send({
      erorr: true,
      message: "data is not sufficient",
    });
  }
  try {
    let data = await Question.create(body);
    await data.save();
    return res.send({
      error: false,
      message: "Questions build successfully",
      data: data,
    });
  } catch (e) {
    console.log(e)
    return res.send({
      erorr: true,
      message: "error occurred",
    });
  }
};
