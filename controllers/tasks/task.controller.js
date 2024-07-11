const TaskModel = require("../../models/tasks/task.model");
const jwt = require("jsonwebtoken");

class TaskController {
  constructor() {
    this.model = new TaskModel();
  }

  async CreateTask(req, res) {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader) {
      throw new Error("No headers found");
    }
    if (!authHeader.startsWith("Bearer")) {
      throw new Error("No token found");
    }
    const token = authHeader.split(" ")[1];
    let user = null;
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw err;
      }
      user = payload.user;
    });
    this.model.columns.userId = user.id;
    this.model.columns = { ...this.model.columns, ...req.body };
    const response = await this.model.create();
    res.status(200).json({ msg: "hello", response });
  }

  async GetTasks(req, res) {
    const tasks = await this.model.GetAllTasks();
    res.status(200).json(tasks);
  }
}
module.exports = TaskController;
