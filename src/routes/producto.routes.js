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

module.exports = productRouter;