const { Router } = require('express');
const productRouter = Router();

// requerimos el modelo de Producto
const { Producto } = require('../db');

// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares");

// productRouter.get('/' , getAllActivities)

module.exports = router;