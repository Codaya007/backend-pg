const { Carrito, Usuario, CarritoDetalle, Producto } = require("../db");

async function carritoPost(req, res, next) {
  try {
    const { productoId, cantidad, usuarioId } = req.body;

    if (!usuarioId)
      return res.status(400).json({ message: "Los datos son requeridos" });
    const usuario = await Usuario.findOne({ where: { id: usuarioId } });
    const producto = await Producto.findOne({ where: { id: productoId } });
    const nuevoCarrito = await Carrito.findOrCreate({
      where: {
        usuarioId: usuario.id,
      },
    });

    if (nuevoCarrito) {
      await CarritoDetalle.findOrCreate({
        where:{
          productoId: producto.id,
          carritoId: nuevoCarrito[0].id,
          cantidad
         },
         defaults: { cantidad},
      });
     
      
      return res.status(201).end();
    }
    return res
      .status(203)
      .json({ message: "El producto NO fue Registrado en el carrito" });
  } catch (error) {
    console.log(error);
    return next({});
  }
}

async function carritoGet(req, res, next) {
  const { usuarioId } = req.params;
  if (!usuarioId) {
    return res.status(400).json({ message: "data are requerid" });
  }
  try {
    const carrito = await Carrito.findOne({
      include: [CarritoDetalle],
      where: { usuarioId },
    });
    if (carrito) {
      const pendingProduct = carrito.CarritoDetalles.map(async (detalle) => {
        const producto = await Producto.findOne({
          where: {
            id: detalle.productoId,
          },
        });
        return {
          id: detalle.id,
          cantidad: detalle.cantidad,
          carritoId: detalle.carritoId,
          producto,
        };
      });
      const productoResult = await Promise.all(pendingProduct);
      console.log(productoResult);
      // const objetoCarrito = {
      //   ...carrito,
      //   CarritoDetalles: productoResult,
      // };

      return res.status(200).json(productoResult);
    } else {
      return next({ status: 404, message: "Carrito not founded" });
    }
  } catch (error) {
    console.log(error);
    return next({});
  }
}

module.exports = {
  carritoPost,
  carritoGet,
};
