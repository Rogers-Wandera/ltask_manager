const UserModel = require("../../models/users/user.model");
const { CreateUserSchema, LoginSchema } = require("./user.schema");

class UserController {
  constructor() {
    this.model = new UserModel();
  }

  async CreateUser(req, res) {
    const { value, error } = CreateUserSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      throw new Error(errorMessage);
    }
    delete value.confirmPassword;
    this.model.columns = { ...this.model.columns, ...value };
    const response = await this.model.CreateUser();
    res.status(200).json(response);
  }

  LoginUser = async (req, res) => {
    const { value, error } = LoginSchema.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      throw new Error(errorMessage);
    }
    this.model.columns = { ...this.model.columns, ...value };
    const response = await this.model.Login();
    res
      .status(200)
      .json({ msg: "User logged in successfully", token: response });
  };

  GetUsers = async (req, res) => {
    const users = await this.model.GetUsers();
    res.status(200).json(users);
  };
}
module.exports = UserController;
