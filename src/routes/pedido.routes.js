const { Router } = require('express');
const { getAllPedidos, getPedidosByUsuario, createPedido, updateStatusPedido } = require('../controllers/controllerPedido');
const { Usuario } = require('../db');
const pedidoRouter = Router();

// Requerimos los middlewares de autenticación
const { authentication, adminAuthentication } = require("../middlewares");


// @route GET pedidos/
// @desc Obtener todos los pedidos realizados o filtrar por fecha si se especifica
// @access Private Admin
pedidoRouter.get('/',
   authentication,
   adminAuthentication,
   async (req, res, next) => {
      // const { date } = req.query;

      let get = await getAllPedidos();
      if (get.error) return next(get.error);

      return res.json(get);
   }
)


// @route GET pedidos/:userId
// @desc Obtener todos los pedidos que ha realizado un usuario
// @access Private
pedidoRouter.get('/:userId',
   authentication,
   async (req, res, next) => {
      const { userId } = req.params;

      // Traigo el usuario que me proporcionó el token
      let user = await Usuario.findByPk(req.usuario.id);
      user = user.toJSON();

      // Le permito el acceso si el usuario es el propietario del token o es admin
      if (req.usuario.id === parseInt(userId) || user.rol == "2") {
         let get = await getPedidosByUsuario(userId);
         if (get.error) return next(get.error);
         return res.json(get);
      }

      next({ status: 403, message: "No está autorizado para esta acción" });
   }
)


// @route POST pedidos/
// @desc Realizar un pedido
// @access Private
pedidoRouter.post('/',
   authentication,
   async (req, res, next) => {

      const { pedidos } = req.body;

      if (pedidos) {
         let get = await createPedido(pedidos, req.usuario.id);

         if (get.error) return next(get.error);

         return res.json(get);
      }

      res.status(400).end();
   }
);


// @route PUT pedidos/:idPedido
// @desc Actualizar el estado de un pedido
// @access Private Admin
pedidoRouter.put('/:pedidoId',
   authentication,
   adminAuthentication,
   async (req, res, next) => {
      const { pedidoId } = req.params;
      const { status } = req.body;

      let get = await updateStatusPedido(pedidoId, status);

      if (get.error) return next(get.error);

      return res.json(get);
   }
);

module.exports = pedidoRouter;