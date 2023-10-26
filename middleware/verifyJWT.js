const { verify } = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.username;
    next();
  });
}

module.exports = { verifyJWT };
