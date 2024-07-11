const Model = require("../model");
const usercolumns = require("./user.columns");
const bcrypt = require("bcryptjs");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

class UserModel extends Model {
  constructor() {
    super("users");
    this.columns = usercolumns;
  }

  getId() {
    return uuid();
  }

  async GetUsers() {
    const users = await this._view();
    return users;
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

  async Login() {
    try {
      const user = await this._viewOne({ email: this.columns.email });
      if (!user) {
        throw new Error("No user with that email found");
      }
      const match = bcrypt.compareSync(this.columns.password, user.password);
      if (!match) {
        throw new Error("Passwords donnot match");
      }
      const token = jwt.sign(
        {
          user: {
            id: user.id,
            displayName: `${user.firstName} ${user.lastName}`,
          },
          sub: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
