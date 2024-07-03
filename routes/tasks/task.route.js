const express = require("express");
const TaskController = require("../../controllers/tasks/task.controller");
const controller = new TaskController();

const router = express.Router();

router.route("/").post((req, res) => controller.CreateTask(req, res));

module.exports = router;
