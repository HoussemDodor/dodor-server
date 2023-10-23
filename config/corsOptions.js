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

module.exports = corsOptions;
