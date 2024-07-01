const Model = require("../model");
const taskscolumns = require("./task.columns");

class TaskModel extends Model {
  constructor() {
    super("tasks");
    this.columns = taskscolumns;
  }
}

module.exports = TaskModel;
