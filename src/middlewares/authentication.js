const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {

   // el token viene en el header de la petición, lo tomamos:
   const token = req.header('x-auth-token');

   // Si no nos han proporcionado un token lanzamos un error
   if (!token) {
      return next({ status: 404, message: "Token not found" });
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET);

      //Obtenemos el payload del token (usuario)
      req.usuario = decoded.usuario;
      next();

   } catch (error) {
      console.log(error);
      next({ status: 400, message: "Invalid token" });
   }
}