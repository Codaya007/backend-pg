const { Pedido, LineaDePedido, Producto, Usuario } = require("../db");
const { Op } = require('sequelize');

module.exports = {
   createPedido: async (pedidos, userId) => {
      // El pedido que viene por body debería tener un array pedido con un objeto que contenda un idProducto y cantidad

      try {
         // Traigo todos los productos solicitados
         let productosPedidos = await Promise.all(pedidos.map((pedido) => {
            return Producto.findAll({
               // Me aseguro de que al menos haya un producto del solicitado (que esté en stock)
               attributes:
                  ["price", "cantidad", "id"],
               where: {
                  [Op.and]: [
                     {
                        id: pedido.productoId
                     },
                     {
                        cantidad: {
                           [Op.gte]: 1
                        },
                     }
                  ]
               }
            })
         }));

         // Los filtro en caso de que algun producto solicitado no exista o no haya en stock
         let productosEncontrados = productosPedidos.filter(prod => prod.length !== 0);
         productosEncontrados = productosEncontrados.map(prod => prod[0].toJSON());

         // Ahora voy a determinar si la cantidad requerida de ese producto alcanza con la existente sino le entrego todo lo que hay en stock
         let pedidoFinal = productosEncontrados.map(prod => {
            // Hallo la cantidad requerida del producto
            const cantidadRequerida = pedidos.find(el => parseInt(el.productoId) === prod.id).cantidad;
            const cantidad = cantidadRequerida <= prod.cantidad ? cantidadRequerida : prod.cantidad;
            return {
               ...prod,
               // Si la cantidad requerida es mayor a la existente, le entrego todo lo que tengo en stock
               cantidad,
               total: Math.round(cantidad * prod.price * 100) / 100
            }
         });

         // Calculo el valor total de la compra, para ello multiplico la cantidad de productos que vendo por el precio del producto
         let total = Math.round(pedidoFinal.reduce((prev, current) => (current.price * current.cantidad) + prev, 0) * 100) / 100;

         // Ahora creo el pedido
         let pedidoRealizado = await Pedido.create({ usuarioId: userId, total });
         pedidoRealizado = pedidoRealizado.toJSON();

         // Ahora creo todas las líneas de pedidos
         await Promise.all(pedidoFinal.map((el) => {
            // Hallo la cantidad de productos que hay ahora sin los vendidos en el pedido actual
            const cantidadActual = productosEncontrados.find(bd => bd.id === el.id).cantidad;

            Producto.update(
               {
                  cantidad: cantidadActual - el.cantidad
               },
               {
                  where: {
                     id: el.id
                  }
               });

            return LineaDePedido.create({
               pedidoId: pedidoRealizado.id,
               productoId: el.id,
               cantidad: el.cantidad,
               total: el.total
            });
         }));

         return { pedidoFinal, total };
      } catch (error) {
         console.log(error);

         return { error: {} }
      }
   },
   getAllPedidos: async () => {
      try {
         let pedidos = await Pedido.findAll({});

         if (!pedidos.length) {
            return { error: { status: 404, message: "No hay pedidos registrados" } };
         } else {
            return pedidos;
         }
      } catch (error) {
         console.log(error);
         return { error: {} }
      }
   },
   getPedidosByUsuario: async (userId) => {
      try {
         const user = await Usuario.findByPk(userId);

         if (!user) return { error: { status: 400, message: "Usuario no válido" } };

         let pedidos = await Pedido.findAll({
            where: {
               usuarioId: userId,
            }
         });

         if (!pedidos.length) {
            return { status: 404, message: "No tiene pedidos registrados" };
         } else {
            return pedidos;
         }
      } catch (error) {
         console.log(error);
         return { error: {} }
      }
   }
};
