const { Producto, Usuario, Categoria } = require('../db')
const DATA_PRODUCTS = require("../data/productos.db.js");
const DATA_USERS = require("../data/usuarios.db");
const DATA_CATEGORIES = require("../data/categorias.db");
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
          ...e
        },
      });
    });
    //console.log('DB success')
    //await Producto.bulkCreate(productosMaped, { validate: true });
    //También le creo un admin de prueba

    console.log("Productos cargados exitosamente");
  } catch (error) {
    // console.log(error);
    console.log("No ha sido posible cargar los productos en la DB");
  }

  try {
    const usuariosMaped = await Promise.all(DATA_USERS.map(async (e) => {
      let contrasena = "", avatar = "";
      contrasena = await bcrypt.hash(e.contrasena, 10);
      avatar = gravatar.url("admin@gmail.com", {
        s: "200", //size
        r: "pg", //rate
        d: "mm",
      });

      return {
        nombre: e.nombre,
        usuario: e.usuario,
        contrasena,
        email: e.email,
        pais: e.pais,
        provincia: e.provincia,
        direccion: e.provincia,
        telefono: e.telefono,
        rol: e.rol,
        avatar
      };
    }));

    usuariosMaped.forEach(async (e) => {
      const user = await Usuario.findOne({ where: { email: e.email } });
      !user && await Usuario.create({
        ...e
      })
    });

    console.log("Usuarios cargados exitosamente");
  } catch (error) {
    console.log(error);
    console.log("No ha sido posible cargar los usuarios en la DB");
  }

  try {
    DATA_CATEGORIES.forEach(async (e) => {
      const category = await Categoria.findOne({ where: { nombre: e.nombre } });

      !category && Categoria.create(e);
    })

    console.log("Categorías cargadas exitosamente");
  } catch (error) {
    console.log(error.message);
    console.log("No ha sido posible cargar las categorías en la DB");
  }
}

module.exports = LoadDb;
