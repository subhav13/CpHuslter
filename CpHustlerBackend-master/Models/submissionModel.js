let mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    submit_code: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    ex_status: {
      type: mongoose.Schema.Types.String,
    },
    language_code: {
      type: mongoose.Schema.Types.String,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
