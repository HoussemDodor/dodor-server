const { Users } = require("../models");
const bcrypt = require("bcrypt");
require('dotenv').config();

const handleNewUser = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  // check for duplicates
  const duplicate = await Users.findOne({ where: { username: username } });
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10); // encrypt password
    Users.create({ username: username, pwd: hashedPwd }); // store user in database
    res.status(201).json({ 'success': `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
