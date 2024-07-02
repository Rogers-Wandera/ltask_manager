const Model = require("../model");
const usercolumns = require("./user.columns");
const bcrypt = require("bcryptjs");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

class UserModel extends Model {
  constructor() {
    super("users");
    this.columns = usercolumns;
  }

  getId() {
    return uuid();
  }

  async CreateUser() {
    try {
      const user = await this._viewOne({ email: this.columns.email });
      if (user) {
        throw new Error("The user with that email already exists");
      }
      this.columns.creationDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      this.columns.id = this.getId();
      this.columns.password = bcrypt.hashSync(this.columns.password, 15);
      this.columns.createdBy = this.columns.id;
      const response = await this._add();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
