const { Router } = require('express');
const { updateRateProducto ,getAllProductos, getAllProductosByCategory, getProductoById, postProducto, deleteProducto, putProducto } = require('../controllers/controllerProduct')
const productRouter = Router();

// Requerimos el middleware de autenticación
const { authentication, adminAuthentication } = require("../middlewares");

// @route GET products/:id
// @desc Obtener la información de un producto por id
// @access Public
productRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    let get = await getProductoById(id);
    if (get.error) return next(get.error);

    res.json(get);

})


// @route GET products/
// @desc Obtener la información de todos los productos
// @access Public
productRouter.get('/', async (req, res, next) => {
    let { title = null } = req.query;

    const get = await getAllProductos(title);
    if (get.error) return next(get.error);

    res.json(get);
});


// @route GET products/category/:categoryId
// @desc Obtener la información de todos los productos de una categoria
// @access Public
productRouter.get('/category/:categoriaId', async (req, res, next) => {
    let { categoriaId } = req.params;

    const get = await getAllProductosByCategory(categoriaId);
    if (get.error) return next(get.error);

    res.json(get);
});


// TRABAJO JOHAN
// @route POST products/
// @desc Crear un nuevo producto con la información raída por body
// @access Private Admin
productRouter.post('/', authentication, adminAuthentication, async (req, res, next) => {
    const { title, price, description, category, image, cantidad } = req.body

    let post = await postProducto(title, price, description, category, image, cantidad);
    if (post.error) return next(post.error);

    res.status(201).json(post);
})


// @route PUT products/:id
// @desc Actualiza un nuevo producto por id
// @access Private Admin
productRouter.put('/:id', authentication, adminAuthentication, async (req, res, next) => {
    const { title, price, description, category, image, cantidad } = req.body;
    const { id } = req.params;

    let put = await putProducto(title, price, description, category, image, cantidad, id);
    if (put.error) return next(put.error);

    res.json(put);
})

// @route UPDATE rate y count Productos/
// @desc Actualizar una rate y count  por id recibido por body
// @access Private Usuario
productRouter.put('/rate',authentication,adminAuthentication, updateRateProducto);


// @route DELETE products/:id
// @desc Elimina un producto por id
// @access Private Admin
productRouter.delete('/:id', authentication, adminAuthentication, async (req, res, next) => {
    const { id } = req.params;

    let destroy = await deleteProducto(id);
    if (destroy) return next(destroy.error);

    res.status(204).end();
})

module.exports = productRouter;