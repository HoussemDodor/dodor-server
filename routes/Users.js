const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { verifyJWT } = require("../middleware/verifyJWT");

router.route("/").get(verifyJWT, userController.getAllUsers);

module.exports = router;
