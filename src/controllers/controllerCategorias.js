const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Categoria } = require("../db");

async function categoriaPost(req, res , next) {
  try{
  const { nombre } = req.body;

  const valdidateact = await Categoria.findOne({
    where: {
      nombre: nombre,
    },
  });

  if (!valdidateact) {
    const addCateg = await Categoria.create({
      nombre: nombre,
    });
    return res.json(addCateg);
    // res.status(200).send({addCateg,
    //     status: 200,
    //     message: 'Data find Successfully'})
    
  }
  return res.json({
    aviso : ` Ya existe la Categoria  , ${nombre}`,
  });

  }catch(error){
    console.log(error)
    next(SERVER_ERROR)
  }
}

async function categoriaUpdate(req, res , next) {
    try{
    const {id, nombre } = req.body;
  
    const UpdateCateg =await Categoria.update({
        nombre: nombre,
    },
   {where: {id: id} });
   
   
   if(!UpdateCateg){
    return res.status(200).send({
      status: 404,
      message: 'No data found'
    });
    }
    res.status(200).send({
    status: 200,
    message: 'Los datos se actualizaron correctamente'
 });

  }catch(error){
    console.log(error)
    next(SERVER_ERROR)
  }
}

async function getAllCategorias(req, res) {
    const { nombre } = req.query;
  
    try {
      if (!nombre) {
        // const ProductAll = await Producto.findAll({ include: Categoria });
        const CategAll = await Categoria.findAll({});
        res.send(CategAll);
      } else {
        const CategQuery = await Categoria.findAll({
          where: {
            nombre: {
              [Op.iLike]: `%${nombre}%`
            },
          },
          // include: Categoria
        });
  
        if (!CategQuery[0]) {
          console.log("error");
  
          return res
            .status(404)
            .json({
              error: ` no se encuentra ninguna Categoria con el nombre , ${nombre}`,
            });
        }
        return res.send(CategQuery);
      }
    } catch (error) {
        console.log(err);
        next(SERVER_ERROR);
    }
  }
  async function categoriaDelete(req, res , next) {
    try{
    const {id} = req.body;
  
    const UpdateCateg =await Categoria.destroy(
     {where: {id: id} });
   
   if(!UpdateCateg){
    return res.status(200).send({
      status: 404,
      message: 'No data found'
    });
    }
    res.status(200).send({
    status: 200,
    message: 'Los datos se borraron correctamente'
 });

  }catch(error){
    console.log(error)
    next(SERVER_ERROR)
  }
}


module.exports = {
    categoriaPost,
    getAllCategorias,
    categoriaUpdate,
    categoriaDelete
}