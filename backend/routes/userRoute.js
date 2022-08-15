const router = require("express").Router();
const authController = require("./../controller/authController");

router.route("/signup").post(authController.sign_up);

router.route("/verify").post(authController.verifyCode);

module.exports = router;
