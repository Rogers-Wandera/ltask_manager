const express = require("express");
const TaskController = require("../../controllers/tasks/task.controller");
const controller = new TaskController();

const router = express.Router();

router.route("/").post();

module.exports = router;
