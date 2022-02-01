const { Router } = require('express');
const userRouter = require('./usuario.routes');

// Importar todos los routers;
// Ejemplo: 
// const authRouter = require('./auth.routes');
// const continentRouter = require('./continent.routes')

const router = Router();

// Configurar los routers
// Ejemplo: 
// router.use('/auth', authRouter);

router.use('/user', userRouter);


module.exports = router;
