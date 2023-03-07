const fs = require("fs")

class ProductManager {

    constructor(path){
        this.products=[];
        this.path = path;
    }

    leeArchivo = async()=>{
        try{
            const file = await fs.promises.readFile(this.path, "utf-8")
            const productoAObj = JSON.parse(file)
            this.products = productoAObj.data
        }
        catch(error){
            console.log(error)
        }
    }

    escribirArchivo =async()=>{
        try{
            const productoAObj = {
                data: this.products,
            }
            const productsJson = JSON.stringify(productoAObj)
            await fs.promises.writeFile(this.path,productsJson)

        }
        catch(error){
            console.log(error)

        }
    }
    addProduct = async(producto) => {

        const {title,description,price,thumbnail,code,stock} = producto;
        
        await this.leeArchivo();
        
        const productInfo = {
            id:this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(productInfo);
        console.log(this.products);
        await this.escribirArchivo();
        
    }
    getProduct =async()=>{
        await this.leeArchivo();
        return  this.products
    }
    getProductById = async (idFind)=>{
        await this.leeArchivo()
        console.log(this.products)
        const resultFind = this.products.find((prod)=>{
            if(parseInt(idFind)===prod.id){
                return true
            } else {
                return false 
            }
        
        })
        if(resultFind){
            return resultFind
        }else {console.log(`El prodcut con ID ${idFind} no fue encontrado, por favor pruebe otro`)
            
        }       
    }
    updateProductById = async (idFind,dataUpdate)=>{
        await this.leeArchivo()
        const resultFind = this.products.findIndex((prod)=>{
            if(idFind===prod.id){
                return true
            } else {
                return false 
            }
            
        })
        console.log(resultFind);
        if(resultFind){
            Object.assign(this.products[resultFind], dataUpdate)
            return this.products[resultFind]
        }else {console.log(`El prodcut con ID ${idFind} no fue encontrado, por favor pruebe otro`)
            
        }       
    }
    deleteProductById = async (idFind)=>{
        await this.leeArchivo()
        const resultFind = this.products.findIndex((prod)=>{
            if(idFind===prod.id){
                return true
            } else {
                return false 
            }
            
        })
        //console.log(resultFind)
        
        if(resultFind>=0){
            this.products.splice(resultFind,1)
         await this.escribirArchivo();   
        }else {console.log(`El prodcut con ID ${idFind} no fue encontrado, por favor pruebe otro`)
            
        }       
    }


}




/* const executable = async () =>{
    const p1 = {
            title: "Tornillos",
            description: "Tornillos de la buena ",
            price: 12,
            thumbnail: "bbb",
            code: "YBMP90",
            stock: 90
    }
    
     await listaProductos.addProduct(p1);
    console.log( await listaProductos.getProductById(1));
    console.log(await listaProductos.updateProductById(4,{stock:55}));
    console.log(await listaProductos.deleteProductById(1));
}


executable(); */

module.exports = ProductManager