const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", async (req, res) => {
  const listofUsers = await Users.findAll();
  res.json(listofUsers);
});


module.exports = router;