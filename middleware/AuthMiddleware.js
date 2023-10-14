const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accestoken = req.header("accesToken");

  if (!accestoken) return res.json({ error: "Not authorized" });

  try {
    const validtoken = verify(accestoken, "CHANGE_THIS_SECRET_LATER");
    if (validtoken) return next();
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { validateToken };
