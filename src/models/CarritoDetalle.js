// Exportamos una funcion que define el modelo

const { types } = require("pg");

// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  const CarritoDetalle = sequelize.define("CarritoDetalle", {
    cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  });

  CarritoDetalle.associate = (models) => {
    // Relacionando con Producto  (1:1)
    CarritoDetalle.belongsTo(models.Producto, {
      sourceKey: "id",
      foreignKey: "productoId",
    });
    //Relaciondo con Carrito (1:1)
    CarritoDetalle.belongsTo(models.Carrito, {
      sourceKey: "id",
      foreignKey: "carritoId",
    });
  };
};
