const { Router } = require('express');
const offersRouter = Router();
const { getOffers, postOffers, putOffers, deleteOffers } = require('../controllers/controllerOfertas')

offersRouter.get('/', async (req, res) => {
     let result = await getOffers()
     res.send(result)
})

offersRouter.post('/', async (req, res) => {
     const { titulo, descripcion, porcentajeDescuento, estado, cantidad } = req.body
     let post = await postOffers(titulo, descripcion, porcentajeDescuento, estado, cantidad)
     res.send(post)
})

offersRouter.put('/:id', async (req, res, next) => {
     const { titulo, descripcion, porcentajeDescuento, estado, cantidad} = req.body;
     const { id } = req.params;

     let put = await putOffers(titulo, descripcion, porcentajeDescuento, estado, cantidad, id);
     if (put.error) return next(put.error);

     res.json(put);
})

offersRouter.delete('/:id', async (req, res) => {
     const { id } = req.params;

     let destroy = await deleteOffers(id);
     if (destroy) return next(destroy.error);

     res.status(204).end();
})





module.exports = offersRouter
