const express = require("express");
const UserRoute = require("./users/user.route");
const router = express.Router();

router.use("/users", UserRoute);
module.exports = router;
