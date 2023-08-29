require('dotenv').config();

const app =
  process.env.NODE_ENV === "production"
    ? require("./dist/src/app")
    : require("./src/app");

/**
 * Start backend server app
 */
app.start();
