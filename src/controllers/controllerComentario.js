const { Comentario, Pedido } = require("../db");
const { Op } = require('sequelize');

const createComentario = async (descripcion, usuarioId, productoId) => {
   try {

      // let pedido = await Pedido.findOne({
      //    where: {
      //       [Op.and]: [
      //          {
      //             usuarioId
      //          },
      //          {
      //             productoId
      //          }
      //       ]
      //    }
      // });

      // if (!pedido) return { error: { status: 401, message: "No puede comentar un producto que no ha comprado" } };
      // // Si si ha comprado el producto, ahora valido que no haya comentado ya el producto
      // pedido = pedido.toJSON();

      let comentarioExists = await Comentario.findOne({
         where: {
            [Op.and]: [
               {
                  usuarioId
               },
               {
                  productoId
               }
            ]
         }
      });
      if (comentarioExists) return { error: { status: 400, message: "Solo puede agregar un comentario por producto" } };

      let newComentario = await Comentario.create({ descripcion, usuarioId, productoId });

      return newComentario;
   } catch (error) {
      console.log(error);
      return { error: {} };
   }
}

const getAllComentarios = async () => {
   try {
      const comentarios = await Comentario.findAll({})
      return comentarios;
   } catch (error) {
      console.log(error);
      return { error: {} }
   }
}


const getAllComentariosByProduct = async (productoId) => {
   try {
      const comentarios = await Comentario.findAll({ where: { productoId } })
      return comentarios;
   } catch (error) {
      console.log(error);
      return { error: {} }
   }
}

const getComentario = async () => {

}

const updateComentario = async () => {

}

const deleteComentario = async () => {

}


module.exports = {
   createComentario,
   getComentario,
   getAllComentarios,
   updateComentario,
   deleteComentario,
   getAllComentariosByProduct
}