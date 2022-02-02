const { Router } = require('express');
const { getAllProductos, getProductoById } = require('../controllers/controllerProduct')
const productRouter = Router();

// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares");

// @route GET products/:id
// @desc Obtener la información de un producto por id
// @access Public
productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    let get = await getProductoById(id);
    res.json(get);

})

productRouter.get('/', getAllProductos);

module.exports = productRouter;