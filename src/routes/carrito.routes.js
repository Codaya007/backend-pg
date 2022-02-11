const { Router } = require("express");
const { carritoPost } = require("../controllers/controllerCarrito");
const { Usuario } = require("../db");
const adminAuthentication = require("../middlewares/adminAuthentication");
const authentication = require("../middlewares/authentication");
const carritoRouter = Router();

carritoRouter.post("/", carritoPost);

module.exports = carritoRouter;
