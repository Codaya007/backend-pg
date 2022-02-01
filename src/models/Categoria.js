// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  sequelize.define('Categoria', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, { timestamps: false });
};