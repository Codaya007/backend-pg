// Exportamos una funcion que define el modelo

const { types } = require("pg");

// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  const Carrito = sequelize.define("Carrito", {
    cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  });

  Carrito.associate = (models) => {
    // Relacionando con Usuario   (1:1)
    Carrito.belongsTo(models.Usuario, {
      sourceKey: "id",
      foreignKey: "usuarioId",
    });

    // Relacionando con producto (N:M)
    Carrito.belongsTo(models.Producto, {
      sourceKey: "id",
      foreignKey: "productoId",
    });
  };
};
