require("dotenv").config();
const express = require("express");
const { dbInstance } = require("./db/conn");
require("express-async-errors");
const MainRoute = require("./routes/main.route");

const app = express();

app.use((req, res, next) => {
  // logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.md");
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(MainRoute);
const PORT = process.env.SERVER_PORT;

app.use((err, req, res, next) => {
  return res.status(400).json({
    message: err.message,
    code: err.code || "app_error",
    statusCode: err.statusCode || 400,
    stack: err.stack,
  });
});

app.listen(PORT, async () => {
  await dbInstance.connect();
  console.log(`Server is running on port ${PORT}`);
});
