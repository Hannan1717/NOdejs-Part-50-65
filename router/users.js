const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/user");

router.route("/users").get(usercontroller.getusers).post(usercontroller.post);

router.get("/users/create", usercontroller.create);

router.get("/users/:id", usercontroller.show);

router.get("/users/:id/edit", usercontroller.edit);

router.put("/users/:id", usercontroller.update);

router.delete("/users/:id", usercontroller.delete);

module.exports = router;
