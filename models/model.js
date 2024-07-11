const { dbInstance } = require("../db/conn");

class Model {
  constructor(table) {
    this.table = table;
    this.db = dbInstance;
    this.columns = { id: null };
  }
  async _add() {
    await dbInstance.connect();
    const { query, values } = this.db.insert(this.table, this.columns);
    const [results] = await this.db.execute(query, values);
    if (results.affectedRows > 0) {
      return { insertId: results.insertId, success: true };
    } else {
      return { insertId: null, success: false };
    }
  }
  async _delete() {}
  async _update() {}
  async _view(conditions = {}) {
    let query = `SELECT *FROM ${this.table}`;
    const keys = [];
    const values = [];
    if (Object.keys(conditions).length > 0) {
      Object.keys(conditions).forEach((key) => {
        if (conditions[key] !== null && conditions[key] !== undefined) {
          keys.push(key);
        }
      });
      query += " WHERE ";
      query += keys.map((key) => `${key}=?`).join(" AND ");
    }
    const [results] = await this.db.execute(query, values);
    return results;
  }
  async _viewOne(conditions = {}) {
    return this.db.findOne(this.table, conditions);
  }
  async runSql(sql, params = []) {}
}
module.exports = Model;
