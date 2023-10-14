const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.get("/", validateToken, async (req, res) => {
  const listofUsers = await Users.findAll();
  res.json(listofUsers);
});

router.post("/", async (req, res) => {
  const user = req.body;
  bcrypt.hash(user.pwd, 10).then((hash) => {
    Users.create({
      username: user.username,
      pwd: hash,
      email: user.email,
      name: user.name,
      surname: user.surname,
      salt: 10,
    });
  });

  res.json("SUCCES");
});

router.post("/login", async (req, res) => {
  const { username, pwd } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) return res.json({ error: "User doesn't exist" });

  bcrypt.compare(pwd, user.pwd).then((match) => {
    if (!match) res.json({ error: "Wrong username/password combination" });
    else {
      const accestoken = sign(
        { username: user.username, id: user.id },
        "CHANGE_THIS_SECRET_LATER"
      );
      res.json({ accestoken: accestoken });
    }
  });
});

module.exports = router;
