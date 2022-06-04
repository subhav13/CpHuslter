let mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email_id: {
      type: mongoose.Schema.Types.String,
      trim: true,
      unique: true,
      required: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    fileId: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    upload_profile_pic: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    total_submissions: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    total_points: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    accuracy: {
      type: mongoose.Schema.Types.Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
