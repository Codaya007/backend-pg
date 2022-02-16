const { Router } = require("express");
const { createComentario } = require("../controllers/controllerComentario");
const { authentication } = require("../middlewares");


const comentarioRouter = Router();

comentarioRouter.post("/", authentication, async (req, res, next) => {
   const { descripcion, usuarioId, productoId } = req.body;

   const response = await createComentario(descripcion, usuarioId, productoId);
   if (response.error) return next(response.error);

   res.status(201).json(response);
});

comentarioRouter.get("/:productoId", authentication);

comentarioRouter.put("/:productoId", authentication);

comentarioRouter.delete("/:productoId", authentication);

module.exports = comentarioRouter;
