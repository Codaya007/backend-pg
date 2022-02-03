const { Router } = require('express');
const { categoriaPost,getAllCategorias,categoriaUpdate} = require('../controllers/controllerCategorias')
const categorRouter = Router();

// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares");

categorRouter.post('/', categoriaPost);
categorRouter.get('/', getAllCategorias);
categorRouter.post('/update', categoriaUpdate)

module.exports = categorRouter;