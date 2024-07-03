const mysql2 = require("mysql2/promise");

class Connection {
  constructor() {
    this.conn = null;
  }
  async connect() {
    this.conn = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
  }

  async query(sql, params = []) {
    if (!this.conn) {
      await this.connect();
    }
    return await this.conn.query(sql, params);
  }

  async execute(sql, params = []) {
    if (!this.conn) {
      await this.connect();
    }
    return await this.conn.execute(sql, params);
  }
  insert(table, data) {
    let query = `INSERT INTO ${table} (`;
    const keys = [];
    const values = [];
    Object.keys(data).forEach((key) => {
      if (data[key] != null) {
        keys.push(key);
        values.push(data[key]);
      }
    });
    if (keys.length <= 0) {
      throw new Error("No columns to insert");
    }
    query += keys.join(", ");
    query += `) VALUES (${keys.map(() => "?").join(", ")});`;
    console.log(query);
    return { query, values };
  }

  async findOne(table, conditions = {}) {
    try {
      if (Object.keys(conditions).length <= 0) {
        throw new Error("Conditions are required and must be an object");
      }
      let query = `Select *from ${table} WHERE `;
      const keys = [];
      const values = [];
      Object.keys(conditions).forEach((key) => {
        if (conditions[key] !== null) {
          keys.push(key);
          values.push(conditions[key]);
        }
      });
      if (values.length <= 0) {
        throw new Error("Where columns are empty");
      }
      query += keys.map((key) => `${key}=?`).join(" AND ");
      console.log(query);
      const [results] = await this.execute(query, values);
      if (results.length > 0) {
        return results[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

const dbInstance = new Connection();
module.exports = { Connection, dbInstance };
