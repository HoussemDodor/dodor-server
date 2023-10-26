const allowedOrigins = require("./allowedOrigins.js")

const corsOptions = {
  origin: (origin, callback) => {
    //TODO: REMOVE THE SECOND HALF OF THE IF STATEMENT WHEN DEPLOYING
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;
