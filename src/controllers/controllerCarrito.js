const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Carrito, Usuario, CarritoDetalle, Producto } = require("../db");

async function carritoPost(req, res, next) {
  try {
    const { usuarioId, productoId } = req.body;
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
      const detalleCarrito = await CarritoDetalle.create({
        carritoId: nuevoCarrito[0].id,
        productoId: producto.id,
      });
      return res.status(201).json({
        message: "El producto fue Registrado en el carrito",
        data: detalleCarrito,
      });
    }
    return res
      .status(203)
      .json({ message: "El producto NO fue Registrado en el carrito" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  carritoPost,
};
