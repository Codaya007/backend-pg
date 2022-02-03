const { Router } = require('express');
const { categoriaPost,getAllCategorias,categoriaUpdate,categoriaDelete} = require('../controllers/controllerCategorias')
const categorRouter = Router();

// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares");

categorRouter.post('/', categoriaPost);
categorRouter.get('/', getAllCategorias);
categorRouter.post('/update', categoriaUpdate)
categorRouter.post('/delete', categoriaDelete)

module.exports = categorRouter;