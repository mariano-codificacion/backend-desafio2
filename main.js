import { Product } from './product.js'
import { promises as fs } from 'fs'



class ProductManager {
    constructor(path) {
       
        this.path = path;
    }


    //Retornar todos los productos
    async getProducts() {
        let products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        //this.products = JSON.parse(this.path, 'utf-8'))
        console.log(products);
    }

    async addProduct(product) {
        let products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        //Consulto si mi producto ya existe en el txt
        if (products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }
        //Lo agrego al array al ya saber que no existe
        products.push(product)
        //Parsearlo y guardar el array modificado
        await fs.writeFile(this.path, JSON.stringify(products))
        return products
    }

    async getProductById(id) {
        //En el productManager, la ruta esta en this.path
        let products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const buscado = products.find(producto => producto.id === id)
        if (buscado) {
            console.log(buscado)
        } else {
            console.log("Producto no existe")
        }
    }
    
    async updateProduct (id, { title, description, price, thumbnail, code, stock, }) {

        let products = JSON.parse(await fs.readFile(this.path, 'utf-8'));

        const indice = products.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            //Mediante el indice modifico todos los atributos de mi objeto
            products[indice].title = title
            products[indice].description = description
            products[indice].price = price
            products[indice].thumbnail = thumbnail
            products[indice].code = code
            products[indice].stock = stock
            
            await fs.writeFile(this.path, JSON.stringify(products))
        
        } else {
            console.log("Producto no encontrado")
        }
    }
    
    async deleteProduct (id) {
        
        let products =  JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const buscado = products.find(item => item.id === id);
        if (!buscado) {
            console.log("error: not found");
        }
        const prods = products.filter(prod => prod.id != id)
        products = prods;
        await fs.writeFile(this.path, JSON.stringify(products))
    }
    
}

const productManager = new ProductManager('./prueba.txt')
const product1 = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
//const product2 = new Product("producto prueba", "Este es un producto prueba", 220, "Sin imagen", "abc124", 20)
productManager.getProducts();
productManager.addProduct(product1)
//productManager.addProduct(product2)
//productManager.getProducts();
console.log(productManager.getProductById(2))
productManager.deleteProduct(3)
productManager.getProducts();
productManager.updateProduct(1,{title: "zanahoria",description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 20})
//productManager.deleteProduct(2)
//console.log(productManager.getProductById(1))
productManager.getProducts();
//productManager.deleteProduct(2)
//console.log(productManager.getProducts())
