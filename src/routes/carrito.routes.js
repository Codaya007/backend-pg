const { Router } = require("express");
const { carritoPost, carritoGet } = require("../controllers/controllerCarrito");
const { Usuario } = require("../db");
const adminAuthentication = require("../middlewares/adminAuthentication");
const authentication = require("../middlewares/authentication");
const carritoRouter = Router();

carritoRouter.post("/", authentication, carritoPost);
carritoRouter.get("/:usuarioId", authentication, carritoGet);

module.exports = carritoRouter;
