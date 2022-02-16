// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    const Comentario = sequelize.define('Comentario', {
       // Valor predeterminado de la fecha => hora actual
      myDate: {
           type: DataTypes.DATE,    
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  
    }, { timestamps: false });
  
    Comentario.associate = models => {
  
      // Relacionando un Categoría con Productos (1:m)
      Comentario.belongsTo(models.Producto, {
        sourceKey: 'id',
        foreignKey: 'comentarioId'
      });
  
    };
  };