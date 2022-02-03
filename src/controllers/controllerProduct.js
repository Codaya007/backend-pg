const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Producto, Categoria } = require('../db')

async function getAllProductos(req, res) {
  const { title } = req.query;

  try {
    if (!title) {
      // const ProductAll = await Producto.findAll({ include: Categoria });
      const ProductAll = await Producto.findAll({});
      res.send(ProductAll);
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
        console.log("error");

        return res
          .status(404)
          .json({
            error: ` no se encuentra ningun Producto con el nombre , ${title}`,
          });
      }
      return res.send(ProductQuery);
    }
  } catch (error) {
    res.send(error);
  }
}

const getProductoById = async (id) => {
  try {
    id = parseInt(id)
  } catch (e) {
    console.log(e);
    next({ status: 400, message: "El id del producto no es valido" })
  }

  let get = await Producto.findAll({
    where: id
  })

  return get;
}

module.exports = {
  getAllProductos,
  getProductoById
}


