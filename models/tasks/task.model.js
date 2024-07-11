const { format } = require("date-fns");
const Model = require("../model");
const taskscolumns = require("./task.columns");

class TaskModel extends Model {
  constructor() {
    super("tasks");
    this.columns = taskscolumns;
  }

  async create() {
    try {
      this.columns.creationDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      const response = await this._add();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async GetAllTasks() {
    const tasks = await this._view({ userId: this.columns.userId });
    return tasks;
  }
}

module.exports = TaskModel;
