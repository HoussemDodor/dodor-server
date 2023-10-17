const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require('./middleware/errorHandler')

app.use(express.json());
app.use(logger);

// TODO: CORS
const whitelist = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://app.dodor.nl",
];
const corsOptions = {
  origin: (origin, callback) => {
    // TODO: REMOVE ORIGIN WHEN DEPLOYING
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccesStatus: 200,
};


app.use(cors(corsOptions));

const db = require("./models");

// Routers
const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
