const express = require("express")  
const ProductManager = require("./class/ProductManager")


const app = express()
const port = 3001

const productManager = new ProductManager("./files/productsBase.json")

app.use(express.urlencoded({extended:true})) // Para activar el encoded

app.get("/products", async(req,res)=>{

    const {limit} = req.query
    //console.log(limit)
    const products = await productManager.getProduct()

    const seleccion = limit ? products.slice(0, limit) : products

    res.json(seleccion)

})
app.get("/products/:id", async(req,res)=>{

    const {id} = req.params
    //console.log(id)
    
    const products = await productManager.getProductById(id)

    res.json({products})

})



app.listen(port,()=>{
    console.log(`Corriendo en puerto ${port} `)
})

