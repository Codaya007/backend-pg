const { Router } = require("express");
const { carritoPost, carritoGet, deleteCarrito } = require("../controllers/controllerCarrito");
const authentication = require("../middlewares/authentication");
const carritoRouter = Router();

carritoRouter.post("/", authentication, carritoPost);


carritoRouter.get("/:usuarioId", authentication, carritoGet);


carritoRouter.delete("/:usuarioId", authentication, async (req, res, next) => {
   const destroy = await deleteCarrito(req.params.usuarioId);
   if (destroy) return next(destroy.error);

   res.status(204).end();
});

module.exports = carritoRouter;
