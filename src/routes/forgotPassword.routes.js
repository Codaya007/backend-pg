const { Router } = require("express");
const { forgotPassword } = require("../controllers/controllerForgotPassword");
const forgotPasswordRouter = Router();
const authentication = require("../middlewares/authentication");

forgotPasswordRouter.post("/", authentication, forgotPassword);

module.exports = forgotPasswordRouter;
