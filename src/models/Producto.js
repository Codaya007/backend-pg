// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  const Producto = sequelize.define('Producto', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,

    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,

    },
    count: {
      type: DataTypes.INTEGER,

    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },

  }, {
    timestamps: true
  });

  Producto.associate = models => {

    // Relacionando un Producto con Categoría (1:m)
    Producto.belongsTo(models.Categoria, {
      sourceKey: 'id',
      foreignKey: 'categoriaId'
    });

  };
};
