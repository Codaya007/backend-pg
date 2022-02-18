const { Router } = require("express");
const { createComentario, getAllComentarios, getAllComentariosByProduct } = require("../controllers/controllerComentario");
const { authentication } = require("../middlewares");
const { check, validationResult } = require('express-validator');


const comentarioRouter = Router();

comentarioRouter.post("/", [
   check('descripcion', 'El campo descripcion es requerido').trim().not().isEmpty(),
   check('productoId', 'El campo productoId es un valor numérico requerido').trim().not().isEmpty().isInt()
], authentication, async (req, res, next) => {
   const { descripcion, productoId } = req.body;
   const { id: usuarioId } = req.usuario;

   // Validaciones de express-validator
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return next({ status: 400, errors });
   }

   // Si no hay errores, continúo
   const response = await createComentario(descripcion, usuarioId, productoId);
   if (response.error) return next(response.error);

   res.status(201).json(response);
});


comentarioRouter.get("/", async (req, res, next) => {
   const response = await getAllComentarios();
   if (response.error) return next(response.error);

   res.json(response);
});


comentarioRouter.get("/:productoId", async (req, res, next) => {
   const response = await getAllComentariosByProduct(req.params.productoId);
   if (response.error) return next(response.error);

   res.json(response);
});


// comentarioRouter.put("/:productoId", authentication);

// comentarioRouter.delete("/:productoId", authentication);

module.exports = comentarioRouter;
