const { Users } = require("../models");
require("dotenv").config();

const handleLogout = async (req, res) => {
  // Delete the accesToken also on the client
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No Content
  const refreshToken = cookies.jwt;

  const foundUser = await Users.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) {
    // No User is found but the request has a cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  try {
    await foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // add { secure: true } When pushing to production
    res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(503);
  }
};

module.exports = { handleLogout };
