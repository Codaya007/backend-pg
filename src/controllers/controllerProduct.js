const axios = require('axios')
const API = 'https://fakestoreapi.com/products'
const {Producto} = require('../db')


const getAllProductos = async()=>{
    try {
        
        let getDB = await Producto.findAll()
        console.log('esto es productos',getDB.length)
        if(getDB <= 0){
            let get = await axios.get(`${API}`)
            let data = get.data
          
            let showapi = await data.map((el)=>{
                return{
                    id:el.id,
                    title:el.title,
                    price:el.price,
                    description:el.description,
                    category:el.category,
                    image:el.image,
                    rate:el.rating.rate,
                    count:el.rating.count,
                }
                 
            })
            let save = await data.map((el)=>{
                Producto.create({
                    id:el.id,
                    title:el.title,
                    price:el.price,
                    description:el.description,
                    category:el.category,
                    image:el.image,
                    rate:el.rating.rate,
                    count:el.rating.count
                })
            })
            return showapi
        }else{
            return getDB
        }
        
        
    } catch (err) {
        console.log(err)
        return err
    }

}

const getDetail = async(id)=>{
    id = parseInt(id)  
    let get = await Producto.findAll({
        where:id
    })

    if(get.length === 1){

        return get

    }else{

        let getApi = await axios.get(`${API}/${id}`) 
        let data = getApi.data
        let showapi = {
                id:data.id,
                title:data.title,
                price:data.price,
                description:data.description,
                category:data.category,
                image:data.image,
                rate:data.rating.rate,
                count:data.rating.count,
            }
        return showapi
    }    
}

module.exports = { 
    getAllProductos,
    getDetail
}
    
