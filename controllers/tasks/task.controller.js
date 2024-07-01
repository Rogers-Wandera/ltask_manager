const TaskModel = require("../../models/tasks/task.model");

class TaskController {
  constructor() {
    this.model = new TaskModel();
  }
}
module.exports = TaskController;
