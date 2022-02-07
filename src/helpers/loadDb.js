const loadProductos = require("./loadProductos");
const loadCategorias = require("./loadCategorias");
const loadUsuarios = require("./loadUsuarios");

async function LoadDb() {
  try {
    await loadCategorias();
    await loadUsuarios();
    await loadProductos();
  } catch (error) {
    console.log(error);
  }
}

module.exports = LoadDb;
