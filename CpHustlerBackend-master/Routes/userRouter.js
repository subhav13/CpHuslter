let express = require("express");
const {
  createUser,
  getUserById,
  getProfileDetails,
  uploadProfilePic,
} = require("../Controllers/userController");
const router = express.Router();

router.post("/create", createUser);
router.get("/get-user/:email_id", getUserById);
router.get("/get-profile-details/:_id", getProfileDetails);
router.post("/upload-profile-pic", uploadProfilePic);
module.exports = router;
