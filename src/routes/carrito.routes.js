const { Router } = require("express");
const { carritoPost, carritoGet } = require("../controllers/controllerCarrito");
const { Usuario } = require("../db");
const adminAuthentication = require("../middlewares/adminAuthentication");
const authentication = require("../middlewares/authentication");
const carritoRouter = Router();

carritoRouter.post("/", carritoPost);
carritoRouter.get("/:usuarioId", carritoGet);

module.exports = carritoRouter;
