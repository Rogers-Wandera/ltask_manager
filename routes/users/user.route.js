const express = require("express");
const UserController = require("../../controllers/users/user.controller");
const controller = new UserController();

const router = express.Router();

router
  .route("/")
  .post((req, res) => controller.CreateUser(req, res))
  .get(controller.GetUsers);

router.route("/login").post(controller.LoginUser);

module.exports = router;
