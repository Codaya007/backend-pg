const { Producto, Usuario } = require('../db')
const DATA_PRODUCTS = require("../data/productos.db.js");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

async function LoadDb() {
  try {
    const productosMaped = DATA_PRODUCTS.map((e) => {
      return {
        title: e.title,
        price: e.price,
        description: e.description,
        image: e.image,
        rate: e.rating.rate,
        count: e.rating.count,
        cantidad: 25
      };
    });
    productosMaped.forEach(async (e) => {
      await Producto.findOrCreate({
        where: {
          title: e.title,
          price: e.price,
          description: e.description,
          image: e.image,
          rate: e.rate,
          count: e.count,
          cantidad:e.cantidad
        },
      });
    });
    //console.log('DB success')
    //await Producto.bulkCreate(productosMaped, { validate: true });
    //También le creo un admin de prueba
    let contrasena = "", avatar = "";
    try {
      contrasena = await bcrypt.hash("admin123", 10);
      avatar = gravatar.url("admin@gmail.com", {
        s: "200", //size
        r: "pg", //rate
        d: "mm",
      });
    } catch (error) {
      console.log("No se ha podido hashear la contraseña del admin");
    }
    await Usuario.create({
      "nombre": "Admin",
      "usuario": "Admin",
      "contrasena": contrasena,
      "email": "admin@gmail.com",
      "pais": "Ecuador",
      "provincia": "Quito",
      "direccion": "Av. Amazonica y Felipe Muñoz",
      "telefono": "0921823478",
      "rol": "2",
      avatar
    })

    console.log("Productos cargados con éxito");
  } catch (error) {
    // console.log(error);
    console.log("No ha sido posible cargar los productos en la DB");
  }
}

module.exports = LoadDb;
