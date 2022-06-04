const Accuracy = require("../Models/accuracyModel");
const Submission = require("../Models/submissionModel");
const User = require("../Models/userModel");

exports.getSubmissionsById = async (req, res) => {
  let param = req.params;
  console.log(param);
  if (!param.email_id || !param.question_id) {
    res.send({
      erorr: true,
      message: "data is insufficient",
    });
  }
  try {
    let data = await Submission.find({
      user_id: param.email_id,
      question_id: param.question_id,
    });
    res.send({
      error: false,
      message: "submission found",
      data: data,
    });
  } catch (e) {
    res.send({
      erorr: true,
      message: "some error occurred",
    });
  }
};

exports.postSubmission = async (req, res) => {
  let body = req.body;
  if (
    !body.user_id ||
    !body.question_id ||
    !body.submit_code ||
    !body.ex_status ||
    !body.points
  ) {
    return res.send({
      erorr: true,
      message: "data is not sufficient",
    });
  }
  console.log(body);
  try {
    let user = await User.findOne({ _id: body.user_id });
    user.total_submissions = user.total_submissions + 1;
    if (body.ex_status === "success") {
      let pointsDes = await Submission.findOne({
        user_id: body.user_id,
        question_id: body.question_id,
        ex_status: "success",
      });
      console.log("pointsDes", pointsDes);
      if (!pointsDes) user.total_points = user.total_points + body.points;
    }
    let accuracy = await Accuracy.findOne({
      question_id: body.question_id,
      user_id: body.user_id,
    });
    if (!accuracy) {
      let data = await Accuracy.create({
        question_id: body.question_id,
        total_submission_for_question: 1,
        user_id: body.user_id,
        is_passed: body.ex_status === "success" ? true : false,
      });
      await data.save();
    } else if (accuracy && !accuracy.is_passed) {
      accuracy.total_submission_for_question =
        accuracy.total_submission_for_question + 1;
      accuracy.is_passed = body.ex_status === "success" ? true : false;
      await accuracy.save();
    }
    await user.save();
    let data = await Submission.create({
      user_id: body.user_id,
      question_id: body.question_id,
      submit_code: body.submit_code,
      ex_status: body.ex_status,
      language_code: body.language_code,
    });
    await data.save();
    return res.send({
      error: false,
      message: "Submission added successfully",
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.send({
      erorr: true,
      message: "error occurred",
    });
  }
};
