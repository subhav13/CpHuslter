let express = require("express");
const {
  getSubmissionsById,
  postSubmission,
} = require("../Controllers/submissionController");
const router = express.Router();

router.get("/get-sub-id/:question_id/:email_id", getSubmissionsById);
router.post("/create-sub", postSubmission);

module.exports = router;
