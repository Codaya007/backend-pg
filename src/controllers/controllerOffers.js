const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Offers, Categoria } = require('../db')


const getOffers = async()=>{
    let get = await Offers.findAll({include: Categoria})
    if(!get.length){
        
        return [{message:'No offers yet'}]
    }else{
        return get
    }
    

}

const postOffers = async (title, price, priceOffers, description, category, image, rate, count, cantidad) => {
    try {
      let exist = await Offers.findOne({ where: { title } });
  
      if (exist) return { error: { status: 400, message: "Ya existe un producto con ese nombre (title)" } };
  
      let createProduct = await Offers.create({
        title,
        price,
        priceOffers,
        description,
        categoriaId: category,
        image,
        rate,
        count,
        cantidad
      });
  
      return createProduct;
  
    } catch (error) {
      console.log(error);
      return { error: {} };
    }
  }

  const putOffers = async (title, price, priceOffers, description, category, image, rate, count, cantidad, id) => {
    try {
      // id = parseInt(id)
      let update = await Offers.update(
        {
          title: title,
          price: price,
          priceOffers:priceOffers,
          description: description,
          categoriaId: category, //categoryId almacena el id de la categoría a la que pertenece
          image: image,
          rate: rate,
          count: count,
          cantidad: cantidad
        },
        { where: { id } })
      return "Success update";
  
    } catch (error) {
      return { error: {} };
    }
  }

  const deleteOffers = async (id) => {
    try {
      // console.log(id)
      let dest = await Offers.destroy({
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