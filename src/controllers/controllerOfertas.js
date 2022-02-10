const { ACTIVA } = require("../data/constantes");
const { Ofertas, OfertaProducto, Producto } = require('../db')


const getOfertaById = async (id) => {
  let oferta = await Ofertas.findByPk(id);

  if (!oferta) return { error: { status: 404, message: "Oferta no encontrada" } };

  return oferta;
}


const getAllOfertas = async () => {
  let get = await Ofertas.findAll({ include: OfertaProducto, where: { estado: ACTIVA } });
  console.log(get);
  return get
}


const createOferta = async (titulo, descripcion, porcentajeDescuento, productos) => {
  try {
    let exist = await Ofertas.findOne({ where: { titulo } });

    if (exist) return { error: { status: 400, message: `Ya existe una oferta con el titulo ${titulo}` } };

    // Valido que todos los productos que se van a poner en promoción existan y que alcance la cantidad dada
    productos = await Promise.all(productos.map(async (prod) => {
      let producto = await Producto.findByPk(prod.id);
      if (!producto) return;

      producto = producto.toJSON();
      if (producto.cantidad < 1) return;

      // Si hay menos productos en stock de los que estan para oferta, le entrego todo el stock
      prod.cantidad = prod.cantidad <= producto.cantidad ? prod.cantidad : producto.cantidad;

      return prod;
    }));

    // console.log(productos);

    productos = productos.filter(prod => prod);


    if (!productos.length) return {
      error: { status: 400, message: "No hay suficientes productos en stock" }
    };

    // Creamos la oferta
    let ofertaCreada = await Ofertas.create({
      titulo,
      descripcion,
      porcentajeDescuento,
      // El estado es por defecto ACTIVO
    });
    ofertaCreada = ofertaCreada.toJSON();

    // Creo las relaciones entre oferta - producto con la instancia OfertaProducto
    await Promise.all(productos.map(async (prod) => {
      await OfertaProducto.create({
        productoId: prod.id,
        ofertaId: ofertaCreada.id,
        cantidad: prod.cantidad
      });
    }));

    return ofertaCreada;
  } catch (error) {
    console.log(error);
    return { error: {} };
  }
}

const updateOferta = async (id, titulo, descripcion, porcentajeDescuento, estado, cantidad) => {
  try {
    let updated = await Ofertas.update(
      {
        titulo,
        descripcion,
        porcentajeDescuento,
        estado,
        cantidad
      },
      { where: { id } })
    return { message: "Actualización exitosa" };
  } catch (error) {
    console.log(error);
    return { error: {} };
  }
}

const deleteOferta = async (id) => {
  try {
    let deleted = await Ofertas.destroy({
      where: { id }
    });

    if (!deleted) return { error: { status: 404, message: "Id de la oferta no es válido" } };

    return;
  } catch (error) {
    console.log(error);
    return { error: {} }
  }
}


module.exports = {
  getAllOfertas,
  createOferta,
  updateOferta,
  deleteOferta,
  getOfertaById
}