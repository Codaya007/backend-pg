const axios = require ('axios');
const { Producto, } = require ('../db')
const { API_ALL } = process.env;

async function LoadDb(req, res) {
  try {
    {
      // await axios.get(API_ALL)
      // .then((response)=>response.json)
      // .then((data)=>console.log(data))
      const AllProductApi = await axios.get(API_ALL);
      const ModelProduct = AllProductApi.data.map((e) => {
        return {
          title: e.title,
          price: e.price,
          description:e.description ,
          category: e.category,
          image: e.image,
          rate: e.rating.rate,
          count: e.rating.count,
          //cantidad : e=1 ,
          //population: e.population ? e.population : 0,
        };
      });
      ModelProduct.forEach(async (e) => {
        await Producto.findOrCreate({
          where: {
            title: e.title,
            price: e.price,
            description: e.description,
            category: e.category,
            image: e.image,
            rate: e.rate,
            count: e.count,
            //cantidad: e.cantidad,
           // population: e.population,
          },
        });
      });
    }
    console.log('DB success')
  } catch (error) {
    res.send(error);
  }
}
module.exports= {LoadDb}
