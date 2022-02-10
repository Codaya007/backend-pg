const { Router } = require('express');
const { getAllOfertas, createOferta, updateOferta, deleteOferta, getOfertaById, getOfertasActivas, removeProducto, addProducto } = require('../controllers/controllerOfertas');


const offersRouter = Router();

// Requerimos los middlewares de autenticación
const { authentication, adminAuthentication } = require("../middlewares");


offersRouter.get('/', async (req, res, next) => {
     let result = await getAllOfertas();

     if (result.error) return next(result.error);

     res.send(result);
})


offersRouter.get('/active', async (req, res, next) => {
     let result = await getOfertasActivas();

     if (result.error) return next(result.error);

     res.send(result);
})


offersRouter.get('/:id', async (req, res, next) => {
     const { id } = req.params;

     const result = await getOfertaById(id);

     if (result.error) return next(result.error);

     res.send(result);
})


offersRouter.post('/', authentication, adminAuthentication, async (req, res, next) => {
     const { titulo, descripcion, porcentajeDescuento, productos } = req.body;

     let result = await createOferta(titulo, descripcion, porcentajeDescuento, productos);

     if (result.error) return next(result.error);

     res.json(result);
})


// Esta ruta me permite cambiar el titulo, descripcion, porcentajeDescuento o estado
// De los productos de esta oferta no me deja modificar mas que la cantidad
// Si no le paso productos funciona igual
offersRouter.put('/:id', authentication, adminAuthentication, async (req, res, next) => {
     const { titulo, descripcion, porcentajeDescuento, estado, productos } = req.body;
     const { id } = req.params;

     let result = await updateOferta(id, titulo, descripcion, porcentajeDescuento, estado, productos);

     if (result.error) return next(result.error);

     res.json(result);
})


offersRouter.put('/add/:ofertaId', authentication, adminAuthentication, async (req, res, next) => {
     const { producto } = req.body;
     const { ofertaId } = req.params;

     let result = await addProducto(ofertaId, producto);

     if (result.error) return next(result.error);

     res.json(result);
})


offersRouter.put('/remove/:ofertaId', authentication, adminAuthentication, async (req, res, next) => {
     const { productoId } = req.body;
     const { ofertaId } = req.params;

     let destroy = await removeProducto(ofertaId, productoId);

     if (destroy) return next(destroy.error);

     res.status(204).end();
})


offersRouter.delete('/:id', authentication, adminAuthentication, async (req, res) => {
     const { id } = req.params;

     let destroy = await deleteOferta(id);

     if (destroy) return next(destroy.error);

     res.status(204).end();
})





module.exports = offersRouter
