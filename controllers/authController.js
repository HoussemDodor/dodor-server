const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");

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
  const match = bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWTs
    const accesToken = sign(
      { username: foundUser.username, id: foundUser.id },
      "CHANGE_THIS_SECRET_LATER"
    );
    res.json({ accesToken: accesToken });
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
