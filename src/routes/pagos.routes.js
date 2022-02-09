const { Router } = require('express');
const { pagosPost } = require('../controllers/controllerPagos')
const pagoRouter = Router();

// Requerimos los middlewares de autenticación
const { authentication } = require("../middlewares");


// @route POST categories/
// @desc Crear una nueva categoría
// @access Private Admin
//pagoRouter.post('/', authentication, adminAuthentication, pagosPost);
pagoRouter.post('/', authentication, pagosPost);

module.exports = pagoRouter;