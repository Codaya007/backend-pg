const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Carrito, Usuario } = require("../db");

async function carritoPost(req, res, next) {
  try {
    const { usuarioId, productoId } = req.body;
    if (!usuarioId || !productoId)
      return res.status(400).json({ message: "Los datos son requeridos" });
    const nuevoCarrito = await Carrito.create({ usuarioId, productoId });
    if (nuevoCarrito)
      return res
        .status(201)
        .json({ message: "El producto fue Registrado en el carrito" });
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
