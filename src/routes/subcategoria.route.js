const { Router } = require('express');
const { subcategoriaPost, getAllsubCategorias, subcategoriaUpdate, subcategoriaDelete } = require('../controllers/controllerSubcategoria');
const { check } = require('express-validator');
const subcategorRouter = Router();

// Requerimos los middlewares de autenticación
const { authentication, adminAuthentication } = require("../middlewares");


// @route POST categories/
// @desc Crear una nueva categoría
// @access Private Admin
subcategorRouter.post('/', [
   check('nombre', 'El campo nombre es requerido').trim().not().isEmpty()
],
   authentication, adminAuthentication, subcategoriaPost);


// @route GET categories/
// @desc Obtener todas las categorías con su información
// @access Public
subcategorRouter.get('/', getAllsubCategorias);


// @route UPDATE categories/
// @desc Actualizar una categoría por id recibido por body
// @access Private Admin
subcategorRouter.put('/update', [
   check('nombre', 'El campo nombre es requerido').trim().not().isEmpty(),
   check('id', 'El campo id es un valor numérico requerido').trim().not().isEmpty().isInt()
], authentication, adminAuthentication, subcategoriaUpdate);


// @route DELETE categories/
// @desc Eliminar una categoría por id recibido por body
// @access Private Admin
subcategorRouter.delete('/delete', [
   check('id', 'El campo id es un valor numérico requerido').trim().not().isEmpty().isInt()
], authentication, adminAuthentication, subcategoriaDelete);

module.exports = subcategorRouter;