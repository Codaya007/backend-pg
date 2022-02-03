const { Router } = require('express');
const userRouter = require('./usuario.routes');
const Product = require('./producto.routes')
const Categor = require('./categoria.routes')

// Importar todos los routers;
// Ejemplo: 
// const authRouter = require('./auth.routes');
// const continentRouter = require('./continent.routes')

const router = Router();

// Configurar los routers
// Ejemplo: 
// router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/products', Product)
router.use('/categorias', Categor);


module.exports = router;
