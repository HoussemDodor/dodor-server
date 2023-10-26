const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { verifyJWT } = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger);
app.use(errorHandler);

const db = require("./models");

// Unprotected routers
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// Protected Routes
app.use(verifyJWT);
app.use("/users", require("./routes/users"));

// use { alter: true } as a parameter in .sync() to update the database in mySQL
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
