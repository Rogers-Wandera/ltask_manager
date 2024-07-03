const express = require("express");
const UserRoute = require("./users/user.route");
const TaskRoute = require("./tasks/task.route");
const router = express.Router();

router.use("/users", UserRoute);
router.use("/tasks", TaskRoute);
module.exports = router;
