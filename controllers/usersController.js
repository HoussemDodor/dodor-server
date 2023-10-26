const { Users } = require("../models");

const getAllUsers = async (req, res) => {
  const listofUsers = await Users.findAll();
  res.json(listofUsers);
};

module.exports = { getAllUsers };
