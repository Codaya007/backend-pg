const Usuario = require('../db');

module.exports = async (req, res, next) => {
   try {
      const user = await Usuario.findOne({
         where: {
            id: req.user.id
         }
      });

      if (user.role === 1) {
         return next({
            status: 403,
            message: 'Acceso denegado'
         }
         );
      }

      next();
   } catch (error) {
      console.log(error);
      next({ status: 500 });
   }
}