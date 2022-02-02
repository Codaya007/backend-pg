const { Producto, } = require('../db')
const DATA_PRODUCTS = require("../data/productos.db.js")

async function LoadDb() {
  try {
    const productosMaped = DATA_PRODUCTS.map((e) => {
      return {
        title: e.title,
        price: e.price,
        description: e.description,
        category: e.category,
        image: e.image,
        rate: e.rating.rate,
        count: e.rating.count,
      };
    });

    await Producto.bulkCreate(productosMaped, { validate: true });

    console.log("Productos cargados con éxito");
  } catch (error) {
    console.log(error);
    console.log("No ha sido posible cargar los productos en la DB");
  }
}

module.exports = LoadDb;
