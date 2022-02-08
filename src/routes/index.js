const { Router } = require("express");

// Importar todos los routers;
const userRouter = require("./usuario.routes");
const productRouter = require("./producto.routes");
const pedidoRouter = require("./pedido.routes");
const categoryRouter = require("./categoria.routes");
const carritoRouter = require("./carrito.routes");

const router = Router();

// Configurar los routers
// Ejemplo:
// router.use('/auth', authRouter);

router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/pedidos", pedidoRouter);
router.use("/categories", categoryRouter);
router.use("/carrito", carritoRouter);

module.exports = router;
