const { Router } = require('express');
const { categoriaPost, getAllCategorias, categoriaUpdate, categoriaDelete } = require('../controllers/controllerCategorias')
const categorRouter = Router();

// Requerimos los middlewares de autenticación
const { authentication, adminAuthentication } = require("../middlewares");


// @route POST categories/
// @desc Crear una nueva categoría
// @access Private Admin
categorRouter.post('/', authentication, adminAuthentication, categoriaPost);


// @route GET categories/
// @desc Obtener todas las categorías con su información
// @access Public
categorRouter.get('/', getAllCategorias);


// @route UPDATE categories/
// @desc Eliminar una categoría por id recibido por body
// @access Private Admin
categorRouter.put('/update', authentication, adminAuthentication, categoriaUpdate);


// @route DELETE categories/
// @desc Eliminar una categoría por id recibido por body
// @access Private Admin
categorRouter.delete('/delete', authentication, adminAuthentication, categoriaDelete);

module.exports = categorRouter;