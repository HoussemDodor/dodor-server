const { Users } = require("../models");
const { verify, sign } = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await Users.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) return res.sendStatus(403); //Forbidden

  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    const accesToken = sign(
      { username: decoded.username },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accesToken });
  });
};

module.exports = { handleRefreshToken };
