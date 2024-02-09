const { default: mongoose } = require("mongoose");

async function dbConnect() {
  try {
    mongoose
      .connect('mongodb://localhost:27017/store-telegram')
      .then(() => {
        console.log("connect db");
      })
      .catch(() => {
        console.log("db error");
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnect;
