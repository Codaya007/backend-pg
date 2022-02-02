// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  sequelize.define('Producto', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    title : {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    price:{
      type: DataTypes.FLOAT,
      
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate:{
      type: DataTypes.FLOAT,
      
    },
    count: {
      type: DataTypes.INTEGER,
      
    },
    cantidad: {
      type: DataTypes.INTEGER,
      
    },

  }, { timestamps: false });
};
