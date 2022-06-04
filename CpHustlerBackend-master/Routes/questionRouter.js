let express = require("express");
const {
  getAllQuestion,
  postQuestion,
} = require("../Controllers/questionController");
const router = express.Router();

router.get("/get-all-quesiton", getAllQuestion);
router.post("/create-question", postQuestion);

module.exports = router;
