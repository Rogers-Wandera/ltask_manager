const UserModel = require("../../models/users/user.model");

class UserController {
  constructor() {
    this.model = new UserModel();
  }

  async CreateUser(req, res) {
    const response = await this.model.CreateUser();
    res.status(200).json(response);
  }
}
module.exports = UserController;
