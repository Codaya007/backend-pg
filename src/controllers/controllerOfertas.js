const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Ofertas, OfertaProducto } = require('../db')


const getOffers = async()=>{
    let get = await Ofertas.findAll({include: OfertaProducto})
    if(!get.length){
        
        return [{message:'No offers yet'}]
    }else{
        return get
    }
    

}

const postOffers = async (titulo, descripcion, porcentajeDescuento, estado, cantidad) => {
    try {
      let exist = await Ofertas.findOne({ where: { titulo } });
  
      if (exist) return { error: { status: 400, message: "Ya existe un producto con ese nombre (title)" } };
  
      let createProduct = await Ofertas.create({
        titulo, 
        descripcion, 
        porcentajeDescuento, 
        estado, 
        cantidad
      });
  
      return createProduct;
  
    } catch (error) {
      console.log(error);
      return { error: {} };
    }
  }

  const putOffers = async (titulo, descripcion, porcentajeDescuento, estado, cantidad, id) => {
    try {
      let update = await Ofertas.update(
        {
          titulo, 
          descripcion, 
          porcentajeDescuento, 
          estado, 
          cantidad
        },
        { where: { id } })
      return "Success update";
  
    } catch (error) {
      return { error: {} };
    }
  }

  const deleteOffers = async (id) => {
    try {
      let dest = await Ofertas.destroy({
        where: { id }
      })
  
      return;
    } catch (error) {
      console.log(error);
      return { error: {} }
    }
  }


module.exports = {
    getOffers,
    postOffers,
    putOffers,
    deleteOffers
}