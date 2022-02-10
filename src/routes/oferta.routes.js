const { Router } = require('express');
const { getAllOfertas, createOferta, updateOferta, deleteOferta, getOfertaById } = require('../controllers/controllerOfertas');


const offersRouter = Router();

offersRouter.get('/', async (req, res, next) => {
     let result = await getAllOfertas();

     if (result.error) return next(result.error);

     res.send(result);
})

offersRouter.get('/:id', async (req, res, next) => {
     const { id } = req.params;

     const result = await getOfertaById(id);

     if (result.error) return next(result.error);

     res.send(result);
})

offersRouter.post('/', async (req, res, next) => {
     const { titulo, descripcion, porcentajeDescuento, productos } = req.body;

     let result = await createOferta(titulo, descripcion, porcentajeDescuento, productos);

     if (result.error) return next(result.error);

     res.json(result);
})

offersRouter.put('/:id', async (req, res, next) => {
     const { titulo, descripcion, porcentajeDescuento, estado, cantidad } = req.body;
     const { id } = req.params;

     let result = await updateOferta(id, titulo, descripcion, porcentajeDescuento, estado, cantidad);

     if (result.error) return next(result.error);

     res.json(result);
})

offersRouter.delete('/:id', async (req, res) => {
     const { id } = req.params;

     let destroy = await deleteOferta(id);

     if (destroy) return next(destroy.error);

     res.status(204).end();
})





module.exports = offersRouter
