const express = require("express");

const loginController = require("../controllers_server/login.controllers");
const router = express.Router();

router.route("/signUp").post(loginController.signUp);
router.route("/login").post(loginController.login);

router.route("/users").get(loginController.getAllUsers)
                      
router.route("/users/:id").delete(loginController.deleteUserById);

router.put('/update-password/:id', loginController.updatePassword);


module.exports = router;
