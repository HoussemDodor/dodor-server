const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents");
const errorHandler = require('./middleware/errorHandler')

app.use(express.json());
app.use(cors(corsOptions));
app.use(logger);
app.use(errorHandler);

const db = require("./models");

// Routers
app.use("/auth", require("./routes/Auth"));
app.use("/users", require("./routes/Users"));

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
