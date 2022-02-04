const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Producto } = require('../db')

async function getAllProductos(title) {
  try {
    if (!title) {
      // const ProductAll = await Producto.findAll({ include: Categoria });
      const ProductAll = await Producto.findAll({});
      return ProductAll;
    } else {
      const ProductQuery = await Producto.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`
          },
        },
        // include: Categoria
      });

      if (!ProductQuery[0]) {
        return {
          error: {
            status: 404,
            message: `No se encuentra ningun Producto con el nombre '${title}'`
          }
        };
      }

      return ProductQuery;
    }
  } catch (error) {
    console.log(error);
    return { error: {} };
  }
}

const getProductoById = async (id) => {
  try {
    const foundedProduct = await Producto.findByPk(id);
    if (!foundedProduct) return { error: { status: 404, message: "Producto no encontrado" } };

    return foundedProduct;
  } catch (e) {
    console.log(e);
    return { error: {} };
  }
}


const postProducto = async (title, price, description, category, image, rate, count, cantidad) => {
  try {
    let createProduct = await Producto.create({
      title,
      price,
      description,
      category,
      image,
      rate,
      count,
      cantidad
    });

    return createProduct;

  } catch (error) {
    console.log(error);
    return { error: {} };
  }
}

const putProducto = async (title, price, description, category, image, rate, count, cantidad, id) => {
  try {
    // id = parseInt(id)
    let update = await Producto.update(
      {
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        rate: rate,
        count: count,
        cantidad: cantidad

      },
      { where: { id: id } })
    return `success update`

  } catch (error) {
    console.log(error.message)
  }

}

const deleteProducto = async (id) => {
  try {
    // console.log(id)
    let dest = await Producto.destroy({
      where: { id }
    })

    return;
  } catch (error) {
    console.log(error);
    return { error: {} }
  }
}

module.exports = {
  getAllProductos,
  getProductoById,
  postProducto,
  deleteProducto,
  putProducto
}


