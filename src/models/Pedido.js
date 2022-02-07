// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const { COMPLETADO, PENDIENTE } = require("../data/constantes");

module.exports = (sequelize, DataTypes) => {
   // defino el modelo
   const Pedido = sequelize.define('Pedido', {
      usuarioId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM(PENDIENTE, COMPLETADO),
         allowNull: false,
         defaultValue: PENDIENTE
      },
      total: {
         type: DataTypes.DOUBLE,
         allowNull: false,
      },
   }, {
      timestamps: true
   });


   Pedido.associate = models => {

      // Relacionando Pedido y Lineas de pedido
      Pedido.hasMany(models.LineaDePedido, {
         sourceKey: 'id',
         foreignKey: 'pedidoId'
      });

      // Relacionando Pedido y Usuario
      Pedido.belongsTo(models.Usuario, {
         sourceKey: 'id',
         foreignKey: 'usuarioId'
      });
   }
};