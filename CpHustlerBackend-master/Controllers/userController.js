const req = require("express/lib/request");
const { path } = require("../app");
const Accuracy = require("../Models/accuracyModel");
const Submission = require("../Models/submissionModel");
const User = require("../Models/userModel");

exports.createUser = async (req, res) => {
  let body = req.body;
  if (!body.email_id || !body.password) {
    return res.send({
      erorr: true,
      message: "email id is required",
    });
  }
  try {
    let data = await User.create(body);
    await data.save();
    return res.send({
      error: false,
      message: "User built successfully",
      data: data,
    });
  } catch (e) {
    return res.send({
      erorr: true,
      message: "error occurred",
    });
  }
};

exports.getUserById = async (req, res) => {
  let body = req.params;
  if (!body.email_id) {
    res.send({
      erorr: true,
      message: "data is insufficient",
    });
  }
  try {
    let data = await User.findOne({ email_id: body.email_id });
    console.log(data);
    if (data) {
      res.send({
        erorr: true,
        message: "user found",
        data: data,
      });
    } else {
      res.send({
        erorr: true,
        message: "user not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      erorr: true,
      message: "error occurred",
    });
  }
};

exports.getProfileDetails = async (req, res) => {
  let body = req.params;
  try {
    if (!body._id) {
      return res.send({
        error: true,
        message: "id is required",
      });
    }
    let user = await User.findOne({ _id: body._id });
    let accuracyData = await Accuracy.find({ user_id: body._id });
    let submission = await Submission.find({ user_id: body._id }).populate({
      path: "question_id",
    });
    return res.send({
      error: false,
      message: "Getting Profile Details",
      data: {
        user: user,
        accuracy: accuracyData,
        submission: submission,
      },
    });
  } catch (e) {
    return res.send({
      error: true,
      message: "Error Occurred",
    });
  }
};

exports.uploadProfilePic = async (req, res) => {
  let body = req.body;
  try {
    if (!body.id || !body.img_url) {
      return res.send({
        error: true,
        message: "id and image url is required",
      });
    }
    let user = await User.findOne({
      _id: body.id,
    });
    user.upload_profile_pic = body.img_url;
    user.fileId = body.fileId;
    
    await user.save();
    return res.send({
      error: false,
      message: "image uploaded successfully",
      url: body.img_url,
    });
  } catch (e) {
    res.send({ error: true, message: "error occurred while image upload" });
  }
};
