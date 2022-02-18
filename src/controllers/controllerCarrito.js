const { Carrito, Usuario, CarritoDetalle, Producto } = require("../db");

async function carritoPost(req, res, next) {
  try {
    const { productoId, cantidad } = req.body;
    const { id: usuarioId } = req.usuario;

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
        where: {
          productoId: producto.id,
          carritoId: nuevoCarrito[0].id,
          cantidad
        },
        defaults: { cantidad },
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
      return res.status(200).json(carrito);
    } else {
      return next({ status: 404, message: "Carrito not founded" });
    }
  } catch (error) {
    console.log(error);
    return next({});
  }
}


const updateCarrito = async (id, descripcion) => {
  try {
    await Carrito.update(
      {
        descripcion
      },
      { where: { id } })
    return "Success update";

  } catch (error) {
    console.log(error)
    return { error: {} };
  }
}

// Elimina todo el carrito y sus CarritoDetalle relacionados
const deleteCarrito = async (usuarioId) => {
  try {
    const carrito = await Carrito.findOne({ where: { usuarioId } });

    if (!carrito) {
      return { error: { status: 404, message: "Carrito no encontrado" } };
    }

    carrito = carrito.toJSON();

    // Elimino los productos -> CarritoDetalles
    await CarritoDetalle.destroy({ where: { carritoId: carrito.id } });

    // Elimino el carrito en sí
    await Carrito.destroy({ where: { usuarioId } });
    return;
  } catch (error) {
    console.log(error);
    return { error: { status: 400, message: "No ha sido posible eliminar el carrito" } };
  }
}


module.exports = {
  carritoPost,
  carritoGet,
  updateCarrito,
  deleteCarrito
};
