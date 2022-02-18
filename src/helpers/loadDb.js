const loadProductos = require("./loadProductos");
const loadCategorias = require("./loadCategorias");
const loadUsuarios = require("./loadUsuarios");
const loadPedidos = require("./loadPedidos");
const loadOfertas = require("./loadOfertas");

async function LoadDb() {
  try {
    await loadCategorias();

    await loadUsuarios();

    await loadProductos();

    await loadPedidos();

    await loadOfertas();
  } catch (error) {
    console.log(error);
  }
}

module.exports = LoadDb;
