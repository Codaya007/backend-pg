const { Router }  = require('express');
const { getAllProductos, getDetail } = require('../controllers/controllerProduct')
const productRouter = Router();

// requerimos el modelo de Producto
const { Producto } = require('../db');

// Requerimos el middleware de autenticación
const { authentication } = require("../middlewares");

// productRouter.get('/' , getAllActivities)
productRouter.get('/:id',async(req, res, next)=>{
    const {id} = req.params
    if(!id){
        next()
    }else{

        let get = await getDetail(id)
        res.send(get)
    }

})


productRouter.get('/', async(req, res)=>{
    let get = await getAllProductos()
    res.send(get)
})


// productRouter.get('/', async(req, res)=>{
//     const { name } = req.query;
  
//     try {
//       if (!name) {
//         const ProductAll = await Producto.findAll;
//         res.send(ProductAll);
//       } else {
//         const ProductQuery = await Producto.findAll({
//           where: {
//             name: {
//               [Op.iLike]: `%${name}%`
//             }
//           }
//         });
  
//         if (!ProductQuery[0]) {
//           console.log("error");
  
//           return res
//             .status(404)
//             .json({
//               error: ` no se encuentra ningun Pais con el nombre , ${name}`,
//             });
//         }
//         return res.send(ProductQuery);
//       }
//     } catch (error) {
//       res.send(error);
//     }
//   })
  

  


module.exports = productRouter;