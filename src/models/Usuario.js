// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,

    },
    pais: {
      type: DataTypes.STRING,

    },
    provincia: {
      type: DataTypes.STRING,

    },
    direccion: {
      type: DataTypes.STRING,

    },
    telefono: {
      type: DataTypes.STRING,

    },
    rol: {
      // 1 -> normal; 2 -> admin
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
    },


  }, { timestamps: false });
};
