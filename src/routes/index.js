const { Router } = require('express');

// Importar todos los routers;
const userRouter = require('./usuario.routes');
const productRouter = require('./producto.routes')
const pedidoRouter = require('./pedido.routes')
const categoryRouter = require('./categoria.routes')
const pagosRouter = require('./pagos.routes')
const offersRouter = require('./oferta.routes')

const router = Router();

// Configurar los routers
// Ejemplo: 
// router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/pedidos', pedidoRouter);
router.use('/categories', categoryRouter);
router.use('/offers', offersRouter);
router.use('/pagos', pagosRouter);


module.exports = router;
