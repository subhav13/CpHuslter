let mongoose = require("mongoose");

const accuracySchema = new mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total_submission_for_question: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    is_passed: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Accuracy = mongoose.model("Accuracy", accuracySchema);

module.exports = Accuracy;
