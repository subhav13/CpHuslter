let mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    points: {
      type: mongoose.Schema.Types.Number,
      default: 5,
    },
    difficulty_level: {
      type: mongoose.Schema.Types.String,
      default: 5, // 1 for easy, 2 for intermediate, 3 for expert
    },
    description: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    sample_test_case_input: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    sample_test_case_output: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
