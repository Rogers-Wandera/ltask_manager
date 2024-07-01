const UserModel = require("../../models/users/user.model");
const { CreateUserSchema } = require("./user.schema");

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
}
module.exports = UserController;
