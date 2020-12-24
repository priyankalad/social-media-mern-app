const mongoose = require("mongoose");
const config = require("../config.json");

function connect() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      config.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = { connect, disconnect };
