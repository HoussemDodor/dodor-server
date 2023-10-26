const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const foundUser = await Users.findOne({ where: { username: username } });
  if (!foundUser) return res.sendStatus(401); //No User exists so unauthorized

  // evaluate password
  const match = bcrypt.compare(pwd, foundUser.pwd);
  if (match) {
    // create JWTs
    const accesToken = sign(
      { username: foundUser.username },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    try {
      foundUser.refreshToken = refreshToken;
      await foundUser.save();
    } catch (err) {
      return res
        .sendStatus(401)
        .json({ message: "Could not save the refreshToken to the" });
    }
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7,
    });
    res.json({ accesToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
